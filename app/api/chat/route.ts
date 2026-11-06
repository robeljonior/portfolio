import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/assistantPrompt";

export const runtime = "nodejs";

const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

/* Best-effort per-IP limit. Resets when the server restarts; enough to stop casual abuse. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 25;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function parse(body: unknown): Anthropic.MessageParam[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const raw = (body as { messages: unknown[] }).messages.slice(-MAX_MESSAGES);
  const messages: Anthropic.MessageParam[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string" || !content.trim()) return null;
    messages.push({ role, content: content.slice(0, MAX_CHARS) });
  }
  // The API needs the conversation to start and end on a user turn.
  while (messages[0]?.role === "assistant") messages.shift();
  return messages.length && messages[messages.length - 1].role === "user" ? messages : null;
}

const text = (message: string, status: number) =>
  new Response(message, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return text("The chat isn't switched on yet. Email robelmamoshet@gmail.com and I'll reply directly.", 503);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (limited(ip)) return text("That's a lot of questions at once. Give it a few minutes, or email me directly.", 429);

  const messages = parse(await request.json().catch(() => null));
  if (!messages) return text("Send a question as text.", 400);

  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: "claude-opus-5-5",
    max_tokens: 4000,
    output_config: { effort: "low" },
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages,
    // If a safety classifier declines, the API retries on its recommended fallback model.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode("I can't help with that one. Ask me about my work, or email me."));
        }
      } catch (error) {
        const reason =
          error instanceof Anthropic.RateLimitError
            ? "The chat is busy right now. Try again in a minute."
            : error instanceof Anthropic.AuthenticationError
              ? "The chat isn't configured correctly yet."
              : "Something went wrong on my side. Try again, or email me.";
        if (!(error instanceof Anthropic.APIUserAbortError)) console.error("chat error", error);
        controller.enqueue(encoder.encode(`\n${reason}`));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

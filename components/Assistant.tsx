"use client";

import { FormEvent, useState } from "react";

const SUGGESTIONS = [
  "Who is Robel Mamushet?",
  "What technologies does he use?",
  "What banking systems has he worked on?",
  "How can I contact him?",
];

const ANSWERS = [
  {
    keywords: ["who", "robel", "about", "experience"],
    answer:
      "Robel Mamushet is a Backend Software Engineer at Atlas Computer Technology in Addis Ababa, Ethiopia. Since Dec 2022 he has built banking and fintech systems for Hijra, Wegagen, Enat and Siinqee Bank. He holds a Bachelor's in Computational Science from Micro-Link.",
  },
  {
    keywords: ["technology", "technologies", "stack", "use", "tools"],
    answer:
      "Backend: Go (Gin), Java, Spring Boot, Jakarta EE (WildFly), Node.js. Messaging and workflow: Kafka, ActiveMQ, Apache Camel, Camunda BPMN. Data: PostgreSQL, MySQL, Redis, Cassandra. Infrastructure: Docker, Jenkins, Git, Keycloak. Frontend: Next.js, React, TypeScript, React Native.",
  },
  {
    keywords: ["bank", "fintech", "payment", "ussd", "financial", "transaction"],
    answer:
      "He ported a production USSD gateway from Java/Spring Boot to Go, catching 12 behaviour differences before release; built a USSD banking platform with Spring Boot and Camunda BPMN; and integrated core banking systems over SOAP/XML with Apache Camel.",
  },
  {
    keywords: ["contact", "email", "hire", "linkedin", "github", "cv", "resume"],
    answer:
      "You can reach Robel at robelmamoshet@gmail.com, connect on LinkedIn at linkedin.com/in/robel-mamushet, or view his work on GitHub at github.com/robeljonior.",
  },
];

function answerFor(question: string) {
  const normalized = question.toLowerCase();
  const match = ANSWERS.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));
  return match?.answer ?? "I can answer questions about Robel's experience, banking systems, technologies, projects, and contact details. Try one of the suggested questions below.";
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi. I am Robel's portfolio assistant. Ask me about his backend engineering work, systems, or experience." },
  ]);

  const ask = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || typing) return;
    setQuestion("");
    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setTyping(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: "assistant", text: answerFor(trimmed) }]);
      setTyping(false);
    }, 500);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(question);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
      {open && (
        <div className="mb-3 flex w-[min( calc(100vw-2rem),380px)] flex-col overflow-hidden border border-[#527078] bg-ink text-paper shadow-[0_24px_80px_-24px_rgba(0,0,0,.55)]">
          <div className="flex items-center justify-between border-b border-[#3a5259] px-4 py-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.16em] text-gold-bright">RM / direct line</p>
              <p className="mt-1 text-sm font-semibold">Portfolio assistant</p>
            </div>
            <button type="button" aria-label="Close assistant" onClick={() => setOpen(false)} className="text-xl text-[#aebdb7] hover:text-gold-bright">×</button>
          </div>
          <div className="max-h-[340px] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-8 text-right" : "mr-5"}>
                <p className={`inline-block px-3 py-2 text-left text-xs leading-5 ${message.role === "user" ? "bg-gold text-ink" : "border border-[#3a5259] bg-white/[0.04] text-[#d3dfd9]"}`}>
                  {message.text}
                </p>
              </div>
            ))}
            {typing && <p className="font-mono text-[10px] uppercase tracking-[.12em] text-gold-bright">typing ...</p>}
          </div>
          <div className="border-t border-[#3a5259] px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => ask(suggestion)} className="border border-[#527078] px-2 py-1 text-left font-mono text-[9px] text-[#c3d0ca] hover:border-gold-bright hover:text-gold-bright">
                  {suggestion}
                </button>
              ))}
            </div>
            <form onSubmit={submit} className="flex gap-2">
              <input value={question} onChange={(event) => setQuestion(event.target.value)} aria-label="Ask the portfolio assistant" placeholder="Ask a question ..." className="min-w-0 flex-1 border border-[#527078] bg-transparent px-3 py-2 text-xs text-paper outline-none placeholder:text-[#6c827c] focus:border-gold-bright" />
              <button type="submit" aria-label="Send question" className="bg-gold px-3 text-sm font-bold text-ink hover:bg-gold-bright">↗</button>
            </form>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setOpen((current) => !current)} className="flex items-center gap-2 border border-ink bg-gold px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-ink shadow-lg hover:bg-gold-bright" aria-expanded={open}>
        <span className="h-2 w-2 rounded-full bg-teal-mid" aria-hidden="true" />
        Ask Robel&apos;s twin
      </button>
    </div>
  );
}

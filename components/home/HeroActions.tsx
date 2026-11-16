"use client";

import { Bot } from "lucide-react";
import { openChat } from "@/components/site/ChatTwin";

export default function AskTwin() {
  return (
    <button type="button" onClick={openChat} className="press group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
      <span className="grid h-7 w-7 place-items-center rounded-full border border-mint/40 text-mint transition-colors group-hover:bg-mint group-hover:text-onaccent">
        <Bot className="h-3.5 w-3.5" />
      </span>
      Questions? Ask my AI twin
    </button>
  );
}

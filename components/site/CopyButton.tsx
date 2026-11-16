"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the value is still visible to select */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="press grid h-6 w-6 place-items-center rounded text-faint transition-colors duration-150 hover:bg-raised hover:text-ink"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-lcd" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

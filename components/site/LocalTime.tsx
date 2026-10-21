"use client";

import { useEffect, useState } from "react";

const ZONE = "Africa/Addis_Ababa";

function describe(now: Date) {
  const time = now.toLocaleTimeString("en-US", { timeZone: ZONE, hour: "numeric", minute: "2-digit" });
  // Addis Ababa is UTC+3 all year; compare with the visitor's own offset.
  const diff = 3 + now.getTimezoneOffset() / 60;
  const note =
    diff === 0 ? "same time as you" : `${Math.abs(diff)}h ${diff > 0 ? "ahead of" : "behind"} you`;
  return { time, note };
}

export default function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return <span className="text-muted">UTC+3</span>;
  const { time, note } = describe(now);
  return (
    <span>
      {time} <span className="text-faint">· {note}</span>
    </span>
  );
}

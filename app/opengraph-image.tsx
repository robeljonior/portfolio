import { ImageResponse } from "next/og";

export const alt = "Robel Mamushet, Backend Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card shown when the site is shared on LinkedIn, X, Slack and so on. */
export default function OpenGraphImage() {
  const nodes = [
    [70, 300], [250, 300], [420, 150], [480, 330], [680, 230], [860, 160], [700, 450], [880, 500],
  ];
  const edges = [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [3, 6], [6, 7]];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#081618", color: "#eee6d4", position: "relative" }}>
        <svg width="1200" height="630" style={{ position: "absolute", left: 220, top: 0, opacity: 0.55 }}>
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#40aaa0" strokeWidth="2" strokeDasharray="6 8" />
          ))}
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="14" fill={i === 5 || i === 6 ? "#40aaa0" : "#e6c669"} />
          ))}
        </svg>
        <div style={{ display: "flex", fontSize: 26, color: "#e6c669", letterSpacing: 2 }}>BACKEND SOFTWARE ENGINEER</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1 }}>Robel Mamushet</div>
          <div style={{ fontSize: 34, marginTop: 24, color: "#acaa9a" }}>Java · Spring Boot · Go · Microservices</div>
          <div style={{ fontSize: 26, marginTop: 14, color: "#acaa9a" }}>Banking & fintech: USSD, payments, core banking integration</div>
        </div>
      </div>
    ),
    size,
  );
}

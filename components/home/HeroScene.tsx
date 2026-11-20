"use client";

import { Html, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ARCH_EDGES, ARCH_FLOW, ARCH_NODES, type ArchNode, nodeById } from "@/lib/architecture";

const MONEY = new Set(["payment", "transaction"]);

/* Map the 100 x 100 layout box into scene units. */
const toVec = (n: ArchNode) => new THREE.Vector3((n.x - 50) / 12, (50 - n.y) / 12, n.z / 10);

type Palette = { gold: string; mint: string; ink: string; muted: string; ground: string };

/** Reads the theme colours from CSS variables, and again when the theme changes. */
function usePalette(): Palette {
  const read = (): Palette => {
    const css = getComputedStyle(document.documentElement);
    const rgb = (name: string) => `rgb(${css.getPropertyValue(`--${name}`).trim().split(/\s+/).join(",")})`;
    return { gold: rgb("gold"), mint: rgb("mint"), ink: rgb("ink"), muted: rgb("muted"), ground: rgb("ground") };
  };
  const [palette, setPalette] = useState<Palette>(read);
  useEffect(() => {
    const obs = new MutationObserver(() => setPalette(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return palette;
}

function ServiceNode({
  node,
  palette,
  active,
  onHover,
}: {
  node: ArchNode;
  palette: Palette;
  active: boolean;
  onHover: (id: string | null) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const pos = useMemo(() => toVec(node), [node]);
  // Money-moving services glow gold; the rest of the platform is mint.
  const core = MONEY.has(node.id) ? palette.gold : palette.mint;
  useFrame(() => {
    if (!ref.current) return;
    const target = active ? 1.35 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
  });

  return (
    <group ref={ref} position={pos}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        {node.kind === "data" ? <cylinderGeometry args={[0.22, 0.22, 0.3, 24]} /> : node.kind === "broker" ? <octahedronGeometry args={[0.25]} /> : <icosahedronGeometry args={[0.21, 1]} />}
        <meshStandardMaterial color={core} emissive={core} emissiveIntensity={active ? 1.1 : 0.6} roughness={0.35} metalness={0.2} flatShading />
      </mesh>
      {/* Halo ring that faces the camera. */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[0.34, 0.365, 48]} />
        <meshBasicMaterial color={active ? core : palette.mint} transparent opacity={active ? 0.9 : 0.3} side={THREE.DoubleSide} />
      </mesh>
      <Html center position={[0, -0.62, 0]} style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
        <div className="whitespace-nowrap text-center font-mono text-[11px] leading-4" style={{ color: active ? palette.ink : palette.muted }}>
          {node.label}
          {active && <div style={{ color: palette.mint }}>{node.tech}</div>}
        </div>
      </Html>
    </group>
  );
}

/** Packets run the payment path hop by hop, then loop. */
function Packets({ palette }: { palette: Palette }) {
  const hops = useMemo(() => ARCH_FLOW.map(([a, b]) => [toVec(nodeById(a)), toVec(nodeById(b))] as const), []);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const HOP = 0.75;
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime / HOP;
    const cycle = hops.length + 1.5; // a short pause before the next request
    const at = t % cycle;
    hops.forEach(([from, to], i) => {
      const m = refs.current[i];
      if (!m) return;
      const local = at - i;
      // Each hop shows a packet while it travels; the last few stay lit briefly.
      const visible = local >= 0 && local <= 1;
      m.visible = visible;
      if (visible) {
        const e = local < 0.5 ? 2 * local * local : 1 - Math.pow(-2 * local + 2, 2) / 2;
        tmp.copy(from).lerp(to, e);
        m.position.copy(tmp);
      }
    });
  });

  return (
    <>
      {hops.map((_, i) => (
        <mesh key={i} ref={(el) => {
            refs.current[i] = el;
          }} visible={false}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshBasicMaterial color={palette.gold} toneMapped={false} />
        </mesh>
      ))}
    </>
  );
}

function System({ palette, onHover, active }: { palette: Palette; onHover: (id: string | null) => void; active: string | null }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (!group.current) return;
    // Follow the mouse a little; at rest the system holds still.
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.35, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.2, 0.05);
  });

  return (
    <group ref={group}>
      {ARCH_EDGES.map(([a, b]) => {
        const lit = active === a || active === b;
        return (
          <Line
            key={`${a}-${b}`}
            points={[toVec(nodeById(a)), toVec(nodeById(b))]}
            color={palette.mint}
            lineWidth={lit ? 1.8 : 1}
            transparent
            opacity={lit ? 0.95 : 0.4}
            dashed={!lit}
            dashSize={0.12}
            gapSize={0.1}
          />
        );
      })}
      <Packets palette={palette} />
      {ARCH_NODES.map((n) => (
        <ServiceNode key={n.id} node={n} palette={palette} active={active === n.id} onHover={onHover} />
      ))}
    </group>
  );
}

/**
 * The 3D hero: a payment request moving through a banking system.
 * Rendering stops when the scene scrolls out of view.
 */
export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const palette = usePalette();
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const focus = active ? nodeById(active) : null;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.cursor = active ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [active]);

  return (
    <div ref={wrap} className="relative h-full w-full">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 12.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={() => onReady?.()}
        aria-hidden="true"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[6, 6, 8]} intensity={50} color={palette.mint} />
        <pointLight position={[-6, -4, 6]} intensity={30} color={palette.gold} />
        <System palette={palette} onHover={setActive} active={active} />
      </Canvas>
      <p className="pointer-events-none absolute inset-x-0 bottom-0 min-h-[2.5rem] text-center text-xs leading-5 text-muted" aria-live="polite">
        {focus ? (
          <>
            <span className="text-ink">{focus.label}</span> · {focus.role}
          </>
        ) : (
          <span className="text-faint">One payment request, end to end. Hover a service.</span>
        )}
      </p>
    </div>
  );
}

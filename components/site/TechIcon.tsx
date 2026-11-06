import * as si from "simple-icons";
import type { SimpleIcon } from "simple-icons";

const ICONS: Record<string, SimpleIcon> = {
  Go: si.siGo,
  "Go (Gin)": si.siGo,
  Gin: si.siGin,
  Java: si.siOpenjdk,
  "Spring Boot": si.siSpringboot,
  "Node.js": si.siNodedotjs,
  Kafka: si.siApachekafka,
  "Camunda BPMN": si.siCamunda,
  Camunda: si.siCamunda,
  PostgreSQL: si.siPostgresql,
  MySQL: si.siMysql,
  Redis: si.siRedis,
  Cassandra: si.siApachecassandra,
  Docker: si.siDocker,
  "Jenkins CI/CD": si.siJenkins,
  Jenkins: si.siJenkins,
  Git: si.siGit,
  Keycloak: si.siKeycloak,
  "Next.js": si.siNextdotjs,
  React: si.siReact,
  "React Native": si.siReact,
  TypeScript: si.siTypescript,
  Kubernetes: si.siKubernetes,
  Terraform: si.siTerraform,
  Prometheus: si.siPrometheus,
  Grafana: si.siGrafana,
  "Claude API": si.siClaude,
};

/** Brand mark for a technology, or nothing when no mark exists. */
export default function TechIcon({ name, className = "h-3.5 w-3.5" }: { name: string; className?: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

export function Chip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 glass-soft rounded-md px-2 py-1 font-mono text-[11px] text-muted">
      <TechIcon name={name} />
      {name}
    </span>
  );
}

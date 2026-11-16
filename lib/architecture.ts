/**
 * The system drawn in the hero: a typical banking request path of the kind
 * Robel builds. Generic service names only, nothing company-specific.
 * Positions are in a 100 x 100 box (x right, y down); z is depth for the 3D view.
 */
export type ArchNode = {
  id: string;
  label: string;
  /** One line on what this service does, shown on hover/focus. */
  role: string;
  tech: string;
  x: number;
  y: number;
  z: number;
  kind: "edge" | "service" | "data" | "broker";
};

export const ARCH_NODES: ArchNode[] = [
  { id: "client", label: "Client", role: "USSD session, mobile app or partner system", tech: "USSD · REST", x: 6, y: 50, z: 0, kind: "edge" },
  { id: "gateway", label: "API Gateway", role: "One entry point: routing, rate limits, sessions", tech: "Go · Gin", x: 26, y: 50, z: 6, kind: "service" },
  { id: "auth", label: "Auth Service", role: "Verifies the customer and issues a token", tech: "Keycloak", x: 44, y: 18, z: -8, kind: "service" },
  { id: "payment", label: "Payment Service", role: "Validates the payment and checks it isn't a duplicate", tech: "Spring Boot", x: 50, y: 52, z: 10, kind: "service" },
  { id: "transaction", label: "Transaction Service", role: "Posts the debit and credit to core banking", tech: "Java · Camel", x: 72, y: 34, z: -4, kind: "service" },
  { id: "database", label: "Database", role: "Durable record of every transaction", tech: "PostgreSQL", x: 92, y: 22, z: 4, kind: "data" },
  { id: "broker", label: "Message Broker", role: "Publishes payment events so services stay decoupled", tech: "Kafka", x: 68, y: 72, z: 8, kind: "broker" },
  { id: "notify", label: "Notification Service", role: "Sends the SMS receipt once the payment settles", tech: "Kafka consumer", x: 90, y: 88, z: -6, kind: "service" },
];

export const ARCH_EDGES: [string, string][] = [
  ["client", "gateway"],
  ["gateway", "auth"],
  ["gateway", "payment"],
  ["payment", "transaction"],
  ["transaction", "database"],
  ["payment", "broker"],
  ["broker", "notify"],
];

/** The order a single payment request lights the edges up, as [from, to] pairs. */
export const ARCH_FLOW: [string, string][] = [
  ["client", "gateway"],
  ["gateway", "auth"],
  ["gateway", "payment"],
  ["payment", "transaction"],
  ["transaction", "database"],
  ["payment", "broker"],
  ["broker", "notify"],
];

export const nodeById = (id: string) => ARCH_NODES.find((n) => n.id === id)!;

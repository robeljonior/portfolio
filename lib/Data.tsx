// lib/data.ts

export type Tech = string;

export type Social = {
  label: string;
  href: string;
  iconKey: "github" | "linkedin" | "instagram";
};

export type CaseStudy = {
  context: string;
  problem: string;
  role: string;
  decisions: string[];
  result: string;
};

export type SystemItem = {
  /** 1, 2, 3 … shows the project as a featured case study in that order. Leave out for "More work". */
  featured?: number;
  /** Public repo for this project, if there is one. Falls back to the GitHub profile. */
  repo?: string;
  icon: string;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  slug: string;
  details: {
    summary: string;
    responsibilities: string[];
    stack: string[];
  };
  steps: { label: string; text: string }[];
  caseStudy?: CaseStudy;
};

export type StackGroup = {
  label: string;
  values: string[];
};

/* ---------- nav ---------- */

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Architecture", href: "#architecture" },
  { label: "Contact", href: "#contact" },
] as const;

/* ---------- hero ---------- */

export const TECH: Tech[] = ["Java", "Spring Boot", "Go", "Node.js", "Microservices"];

export const EMAIL = "robelmamoshet@gmail.com";
export const CV_URL = "/Robel-Mamushet-CV.txt";
export const AVAILABILITY = "Addis Ababa · UTC+3 · Open to remote";
export const TITLE = "Full-stack engineer, backend first";
export const PITCH = "I build banking backends in Go and Java, and the Next.js dashboards on top of them.";
/** Working-hours overlap from Addis Ababa (UTC+3, no daylight saving). */
export const OVERLAP = "Full workday overlap with Europe, mornings with US East.";

export const LINKEDIN_URL = "https://www.linkedin.com/in/robel-mamushet";
export const GITHUB_URL = "https://github.com/robeljonior";

export const SOCIALS: Social[] = [
  { label: "GitHub", href: GITHUB_URL, iconKey: "github" },
  { label: "LinkedIn", href: LINKEDIN_URL, iconKey: "linkedin" },
];

/* ---------- about ---------- */

export const ABOUT_STATS = [
  { value: "~4", label: "years in banking & fintech" },
  { value: "04", label: "banks served" },
  { value: "12", label: "diffs caught before a Go release" },
];

export const EXPERIENCE = {
  company: "Atlas Computer Technology",
  location: "Addis Ababa, Ethiopia",
  role: "Software Engineer",
  period: "Dec 2022 — present",
  summary:
    "Joined as a Junior Developer and grew into a Software Engineer role, building banking systems for Hijra, Wegagen, Enat and Siinqee Bank.",
  responsibilities: [
    "Ported the production USSD gateway from Java/Spring Boot to Go (Gin), with Redis and Cassandra session storage and Keycloak authentication; a side-by-side review caught 12 behaviour differences before release",
    "Built a USSD banking platform with Spring Boot and Camunda BPMN workflows, giving bank customers mobile banking without a smartphone or internet",
    "Integrated core banking systems over SOAP/XML using Apache Camel routes",
    "Designed message-driven communication between microservices with Kafka and ActiveMQ",
    "Built services in Node.js and web dashboards in Next.js and TypeScript on top of the backend APIs",
    "Migrated and maintained Jakarta EE services on WildFly",
    "Built CI/CD pipelines with Docker, Git and Jenkins; optimized PostgreSQL and MySQL queries for transactional services",
    "Earlier: built web and mobile apps with React and React Native, including a customizable DTF printing e-commerce site",
  ],
};

/** Career path at Atlas, oldest first. Order of the middle steps still to be confirmed by Robel. */
export const TIMELINE = [
  { when: "Dec 2022", title: "Joined Atlas as a Junior Developer", text: "Web and mobile apps in React and React Native, including a customizable DTF printing e-commerce site." },
  { when: "", title: "USSD banking platform", text: "Spring Boot and Camunda BPMN workflows: mobile banking without a smartphone or internet." },
  { when: "", title: "Core banking integration", text: "Apache Camel routes over SOAP/XML; Kafka and ActiveMQ between microservices." },
  { when: "", title: "Jakarta EE on WildFly", text: "Migrated and maintained enterprise services; CI/CD with Docker, Git and Jenkins." },
  { when: "", title: "USSD gateway ported to Go", text: "Gin, Redis and Cassandra sessions, Keycloak auth. 12 behaviour differences caught before release." },
  { when: "Now", title: "Software Engineer", text: "Banking systems for Hijra, Wegagen, Enat and Siinqee Bank." },
];

export const EDUCATION = {
  degree: "Bachelor's Degree, Computational Science",
  school: "Micro-Link",
  period: "2018 — 2022",
};

export const LANGUAGES = "English (professional) · Amharic (native)";

/* ---------- work ---------- */

export const SYSTEMS: SystemItem[] = [
  {
    icon: "⇄",
    eyebrow: "Financial & digital banking",
    title: "Transaction services that stay traceable",
    body: "Backend services behind payment workflows for Ethiopian banks, with validation, error handling, tuned SQL, and production debugging.",
    tags: ["Java", "Spring Boot", "PostgreSQL"],
    slug: "payment-transaction-flows",
    details: {
      summary:
        "Transaction services for banks including Hijra, Wegagen, Enat and Siinqee Bank, built for correctness under failure and full traceability in production.",
      responsibilities: [
        "Developed transaction-related business logic for banking payment workflows",
        "Optimized PostgreSQL and MySQL queries for transactional services",
        "Investigated payment issues and integration failures across systems",
      ],
      stack: ["Java", "Spring Boot", "REST APIs", "PostgreSQL", "MySQL"],
    },
    steps: [
      { label: "Request comes in", text: "A payment is initiated — by a customer, a partner system, or an internal process." },
      { label: "Checks run", text: "The system verifies the request is valid, funds are available, and nothing looks suspicious." },
      { label: "Transaction processes", text: "Money moves between accounts, coordinated across the different systems involved." },
      { label: "Result confirmed", text: "Everyone gets a clear answer: success, or a specific reason it didn't go through." },
      { label: "Trail is kept", text: "Every step is logged, so any transaction can be traced and explained later." },
    ],
  },
  {
    icon: "⛓",
    eyebrow: "Core banking integration",
    title: "Core banking over SOAP/XML, events over Kafka",
    body: "Apache Camel routes into SOAP/XML core banking systems, and message-driven communication between microservices with Kafka and ActiveMQ.",
    tags: ["Apache Camel", "Kafka", "ActiveMQ"],
    featured: 3,
    slug: "distributed-system-integration",
    details: {
      summary:
        "The connective layer between modern microservices and the banks' core systems, so data stays accurate and consistent no matter which system it started in.",
      responsibilities: [
        "Integrated core banking systems over SOAP/XML using Apache Camel routes",
        "Designed message-driven communication between microservices with Kafka and ActiveMQ",
        "Modelled business processes as Camunda BPMN workflows",
      ],
      stack: ["Apache Camel", "SOAP/XML", "Kafka", "ActiveMQ", "Camunda BPMN"],
    },
    steps: [
      { label: "Data originates", text: "Information is created or updated in one system — a channel, a microservice, or the core bank." },
      { label: "Rules applied", text: "The data is checked against business rules before it's allowed to move anywhere." },
      { label: "Systems sync", text: "Camel routes and Kafka/ActiveMQ messages update every system that needs the change." },
      { label: "Failures contained", text: "If one system is unavailable, the process fails safely instead of leaving things half-done." },
      { label: "Consistency verified", text: "The data is confirmed accurate and matching across every system involved." },
    ],
    caseStudy: {
      context:
        "Core banking systems at many banks expose SOAP/XML interfaces, while new channel services are REST microservices.",
      problem:
        "Modern services needed reliable access to the core bank, and to each other, without every service learning SOAP or calling every other service directly.",
      role: "Built the Apache Camel routes into core banking and designed the messaging between microservices.",
      decisions: [
        "Apache Camel routes as the single, tested translation layer between REST and SOAP/XML",
        "Kafka and ActiveMQ for message-driven communication instead of chains of synchronous calls",
        "Camunda BPMN for multi-step business processes that span several systems",
      ],
      result: "Channel services talk to core banking through one integration layer, and a slow or failed system no longer blocks the others.",
    },
  },
  {
    icon: "◈",
    eyebrow: "Go migration",
    title: "Porting a production USSD gateway to Go",
    body: "Rebuilt the USSD gateway from Java/Spring Boot in Go (Gin), with Redis and Cassandra sessions and Keycloak auth. A side-by-side review caught 12 behaviour differences before release.",
    tags: ["Go", "Gin", "Redis", "Cassandra"],
    featured: 1,
    slug: "go-backend-services",
    details: {
      summary:
        "A production USSD gateway moved from Java/Spring Boot to Go without changing what bank customers see. Running both versions side by side surfaced 12 behaviour differences, all fixed before release.",
      responsibilities: [
        "Ported the gateway from Java/Spring Boot to Go (Gin)",
        "Stored USSD sessions in Redis and Cassandra",
        "Secured the service with Keycloak authentication",
        "Ran a side-by-side review of old and new behaviour that caught 12 differences before release",
      ],
      stack: ["Go", "Gin", "Java", "Spring Boot", "Redis", "Cassandra", "Keycloak"],
    },
    steps: [
      { label: "Legacy reviewed", text: "The Java service's behaviour is studied in detail so nothing is lost in translation." },
      { label: "Service rebuilt", text: "The same flows are rewritten in Go with Gin, Redis and Cassandra sessions, and Keycloak auth." },
      { label: "Side-by-side review", text: "Old and new run on the same inputs; 12 behaviour differences are found and fixed." },
      { label: "Safely switched over", text: "Traffic moves to the Go gateway carefully, with the old one ready as a fallback." },
      { label: "Monitored in production", text: "The service is watched closely after launch to catch any remaining edge cases." },
    ],
    caseStudy: {
      context:
        "USSD is how many customers of Ethiopian banks use mobile banking: they dial a short code like *123# on any phone, with no internet or smartphone needed.",
      problem:
        "The production USSD gateway ran on Java/Spring Boot. It had to move to Go without changing a single menu, message or session rule that live bank customers rely on.",
      role: "Ported the gateway to Go (Gin) and ran the side-by-side review that verified it before release.",
      decisions: [
        "Gin for a small, fast HTTP layer in front of the carrier connection",
        "Redis for live session state and Cassandra for durable session storage",
        "Keycloak for authentication, shared with the rest of the platform",
        "Ran old and new gateways on the same inputs and compared every response before switching traffic",
      ],
      result: "12 behaviour differences found and fixed before release, so customers saw no change when traffic moved to Go.",
    },
  },
  {
    icon: "◎",
    eyebrow: "USSD banking platform",
    title: "Mobile banking without a smartphone",
    body: "A USSD banking platform built with Spring Boot and Camunda BPMN workflows, giving bank customers mobile banking with no smartphone or internet.",
    tags: ["Spring Boot", "Camunda", "USSD"],
    featured: 2,
    slug: "ussd-mobile-gateway",
    details: {
      summary:
        "Feature-phone banking for customers of Ethiopian banks: dial a short code, follow the menu, and complete balance checks and transfers over USSD.",
      responsibilities: [
        "Built the USSD banking platform with Spring Boot",
        "Modelled banking menus and approvals as Camunda BPMN workflows",
        "Connected the channel to the same core services used by app and web",
      ],
      stack: ["Java", "Spring Boot", "Camunda BPMN", "Redis", "USSD"],
    },
    steps: [
      { label: "Customer dials", text: "A customer dials a short code like *123# from any phone — no internet needed." },
      { label: "Gateway receives", text: "The USSD gateway receives the request from the carrier and identifies the session." },
      { label: "Workflow runs", text: "A Camunda BPMN workflow decides the next step of the banking menu." },
      { label: "Menu responds", text: "The service tracks where the customer is in the menu and sends back the next screen." },
      { label: "Session completes", text: "Once the customer confirms an action, the result is processed and the session closes cleanly." },
    ],
    caseStudy: {
      context:
        "Many bank customers in Ethiopia use feature phones. USSD menus are often the only way they can bank on their phone.",
      problem:
        "Banks needed mobile banking that works on any phone, with multi-step menus (balance, transfers, approvals) that are easy to change per bank.",
      role: "Built the USSD banking platform with Spring Boot and modelled the banking menus as Camunda BPMN workflows.",
      decisions: [
        "Camunda BPMN so each menu flow is a visible, editable workflow instead of nested if-statements",
        "Session state kept outside the service so a USSD session survives across requests",
        "Reused the same core banking services as the app and web channels",
      ],
      result: "Customers of partner banks can check balances and move money from any phone, with no smartphone or internet.",
    },
  },
  {
    icon: "▣",
    eyebrow: "Enterprise Java",
    title: "Jakarta EE services on WildFly",
    body: "Migrated and maintained Jakarta EE services running on WildFly, keeping long-lived banking code healthy as it moved forward.",
    tags: ["Jakarta EE", "WildFly", "Java"],
    slug: "jakarta-ee-wildfly",
    details: {
      summary:
        "Long-running enterprise services kept stable and up to date, so changes to established banking code stay fast and low-risk.",
      responsibilities: [
        "Migrated Jakarta EE services on WildFly",
        "Maintained and debugged them in production",
        "Kept business logic separated from integration and persistence concerns",
      ],
      stack: ["Java", "Jakarta EE", "WildFly", "SQL"],
    },
    steps: [
      { label: "Need identified", text: "A migration, feature or defect is raised by the team or a bank." },
      { label: "Change planned", text: "The affected modules and their dependencies are mapped before touching code." },
      { label: "Service updated", text: "The service is migrated or changed and redeployed on WildFly." },
      { label: "Behaviour verified", text: "Existing flows are retested so nothing that worked before breaks." },
      { label: "Shipped and stable", text: "The change goes live and is confirmed stable in production." },
    ],
  },
  {
    icon: "✓",
    eyebrow: "Delivery pipelines",
    title: "CI/CD that makes releases routine",
    body: "CI/CD pipelines with Docker, Git and Jenkins so banking services build, test and ship the same way every time.",
    tags: ["Docker", "Jenkins", "Git"],
    slug: "quality-release-confidence",
    details: {
      summary:
        "Repeatable builds and deployments for transactional services, giving the team confidence that every release works as intended.",
      responsibilities: [
        "Built CI/CD pipelines with Docker, Git and Jenkins",
        "Containerized services for consistent environments",
        "Investigated defects and production issues with developers and QA",
      ],
      stack: ["Docker", "Jenkins", "Git", "CI/CD"],
    },
    steps: [
      { label: "Code pushed", text: "A change is pushed to Git and picked up by Jenkins." },
      { label: "Build & test", text: "The service is built and its tests run automatically." },
      { label: "Image created", text: "A Docker image is produced so every environment runs the same thing." },
      { label: "Deployed", text: "The image is rolled out to the target environment." },
      { label: "Verified", text: "The release is checked in place before it's considered done." },
    ],
  },
  {
    icon: "◉",
    eyebrow: "Node.js & Next.js",
    title: "Real-time device tracking dashboard",
    body: "A laptop and a phone exchange location and status through a lightweight backend, shown live on a Next.js and TypeScript dashboard.",
    tags: ["Next.js", "TypeScript", "WebSockets"],
    slug: "realtime-device-tracking",
    details: {
      summary:
        "A device-tracking system where a laptop and a phone continuously exchange location and status, coordinated through a lightweight backend and a live Next.js dashboard.",
      responsibilities: [
        "Built the live dashboard in Next.js and TypeScript",
        "Relayed device updates in real time over WebSockets",
        "Handled reconnects so tracking resumes without losing state",
      ],
      stack: ["Next.js", "TypeScript", "Go", "Spring Boot", "WebSockets"],
    },
    steps: [
      { label: "Devices register", text: "The laptop and phone each register with the backend using a unique device ID." },
      { label: "Location sent", text: "Each device continuously sends its location and status over a lightweight connection." },
      { label: "Backend relays", text: "The backend receives updates and relays them to the other paired device." },
      { label: "Dashboard updates", text: "The Next.js dashboard shows both devices moving live, with no manual refresh needed." },
      { label: "Reconnects automatically", text: "If a connection drops, the device reconnects and picks up tracking without losing state." },
    ],
  },
  {
    icon: "▤",
    eyebrow: "Full stack",
    title: "Node.js services and Next.js dashboards",
    body: "Node.js services and web dashboards in Next.js and TypeScript, built on top of the banking backend APIs.",
    tags: ["Next.js", "TypeScript", "Node.js"],
    slug: "nextjs-banking-dashboards",
    details: {
      summary:
        "The web side of the same banking platforms: Node.js services and Next.js dashboards that let bank teams see and work with what the backend services do.",
      responsibilities: [
        "Built services in Node.js on top of the backend APIs",
        "Built web dashboards in Next.js and TypeScript",
        "Worked across the stack, from the Go and Java services to the screens that use them",
      ],
      stack: ["Next.js", "TypeScript", "React", "Node.js", "REST APIs"],
    },
    steps: [
      { label: "API defined", text: "The backend service exposes the data and actions the team needs." },
      { label: "Service layer", text: "A Node.js service shapes backend responses for the screen." },
      { label: "Dashboard built", text: "Next.js and TypeScript pages present the data and actions." },
      { label: "Reviewed with users", text: "Bank teams try it and the rough edges are fixed." },
      { label: "Shipped", text: "The dashboard goes live alongside the services it reads from." },
    ],
    caseStudy: {
      context: "Banking backends are only useful when the people running them can see and act on what they do.",
      problem: "Teams needed web tools on top of the Go and Java services, not just APIs.",
      role: "Built the Node.js services and Next.js / TypeScript dashboards on top of the backend APIs.",
      decisions: [
        "Next.js and TypeScript so types flow from API responses to the screen",
        "A thin Node.js layer to shape backend data for the UI instead of changing core services",
        "Reused the same authenticated APIs as the other channels",
      ],
      result: "One engineer across the stack: the same person who builds the service builds the screen that uses it.",
    },
  },
  {
    featured: 4,
    icon: "✦",
    eyebrow: "AI agent",
    title: "An AI twin that answers for me",
    body: "A chat on this portfolio that answers recruiters' questions about my work in my voice, streamed live from Claude and grounded only in my real profile data.",
    tags: ["Claude API", "Next.js", "TypeScript"],
    slug: "portfolio-ai-twin",
    details: {
      summary:
        "Recruiters can ask about my systems, stack and availability and get an answer in seconds. The assistant is built from the same data the site renders, so it can't drift from the page or invent experience.",
      responsibilities: [
        "Built a streaming chat API route in Next.js on the Claude API",
        "Generated the system prompt from the site's own typed data, so the chat and the page never disagree",
        "Added guardrails: answers only from the profile, no commitments on my behalf, hand-off to email for anything else",
        "Hardened the endpoint: input validation, message and length limits, per-IP rate limiting, typed error handling",
        "Enabled server-side model fallback and prompt caching to keep it reliable and cheap",
      ],
      stack: ["Claude API", "Next.js", "TypeScript", "React", "Streaming"],
    },
    steps: [
      { label: "Visitor asks", text: "A recruiter opens the chat and asks a question, or taps a suggested topic." },
      { label: "Request checked", text: "The API route validates the conversation, trims it, and applies a rate limit." },
      { label: "Grounded prompt", text: "The question goes to Claude with a cached profile built from the site's own data." },
      { label: "Answer streams", text: "The reply streams back word by word, so the visitor sees it start at once." },
      { label: "Hand-off", text: "Anything the profile can't answer is routed to my email instead of guessed." },
    ],
    caseStudy: {
      context: "A recruiter spends seconds on a portfolio. Most leave with questions they never ask.",
      problem:
        "Let visitors ask about my work and get a fast, accurate answer, without the assistant ever inventing experience or promising things for me.",
      role: "Designed and built it end to end: the chat UI, the streaming API, the prompt and the guardrails.",
      decisions: [
        "Generate the prompt from the same typed data the page renders, so there's one source of truth",
        "Stream responses so the first words appear immediately",
        "Strict scope: profile-only answers, and anything uncertain goes to email",
        "Validation, length limits and per-IP rate limiting before any model call",
      ],
      result: "Visitors get answers about my work in seconds, and every answer traces back to what's on the page.",
    },
  },
  {
    icon: "◫",
    eyebrow: "Web & mobile",
    title: "Custom DTF printing e-commerce site",
    body: "A customizable DTF printing store built with React, plus React Native mobile work, from my early years at Atlas.",
    tags: ["React", "React Native", "TypeScript"],
    slug: "dtf-printing-ecommerce",
    details: {
      summary: "An e-commerce site where customers customize DTF (direct-to-film) prints before ordering, built with React, alongside React Native mobile apps.",
      responsibilities: [
        "Built web and mobile apps with React and React Native",
        "Built the product customization flow for DTF printing orders",
      ],
      stack: ["React", "React Native", "TypeScript"],
    },
    steps: [
      { label: "Pick a product", text: "The customer chooses what to print on." },
      { label: "Customize", text: "They upload a design and adjust it on the product." },
      { label: "Preview", text: "The site shows how the print will look." },
      { label: "Order", text: "The customized order goes into checkout." },
      { label: "Produce", text: "The print shop receives the order with the exact design." },
    ],
  },
];

/** Featured case studies first (by `featured`), then the rest in list order, numbered 01, 02 … */
export const PROJECTS = [
  ...SYSTEMS.filter((p) => p.featured).sort((a, b) => a.featured! - b.featured!),
  ...SYSTEMS.filter((p) => !p.featured),
].map((p, i) => ({ ...p, number: String(i + 1).padStart(2, "0") }));

/* ---------- building next ---------- */

export type RoadmapItem = {
  title: string;
  body: string;
  /** What the project proves to a hiring team. */
  shows: string[];
  stack: string[];
  /** Change to "In progress" when you start, and move it into SYSTEMS once it ships. */
  status: "Planned" | "In progress";
};

/** Projects I'm planning to build in public. Shown with a status badge, never as finished work. */
export const ROADMAP: RoadmapItem[] = [
  {
    title: "Payment ledger service in Go",
    body: "A double-entry ledger with idempotent transfers, a Kafka outbox for events, and load tests that publish real throughput and latency numbers.",
    shows: ["Distributed systems", "Database performance", "Payment correctness"],
    stack: ["Go", "PostgreSQL", "Kafka", "Redis"],
    status: "Planned",
  },
  {
    title: "Running the ledger in production",
    body: "The same service deployed the way a bank would run it: containers, Kubernetes, infrastructure as code, CI/CD, and dashboards and alerts on the metrics that matter.",
    shows: ["Cloud infrastructure", "DevOps", "Observability"],
    stack: ["Docker", "Kubernetes", "Terraform", "Prometheus", "Grafana"],
    status: "Planned",
  },
  {
    title: "AI banking support agent",
    body: "A Claude agent that answers account questions through tools on the ledger's API, with read-only access, audit logs, and hard limits on what it may do.",
    shows: ["AI agents", "Security", "Fintech integration"],
    stack: ["Claude API", "Go", "TypeScript"],
    status: "Planned",
  },
];

/* ---------- stack ---------- */

export const STACK_GROUPS: StackGroup[] = [
  { label: "Backend", values: ["Go (Gin)", "Java", "Spring Boot", "Jakarta EE (WildFly)", "Node.js", "REST APIs", "Microservices"] },
  { label: "Messaging & workflow", values: ["Kafka", "ActiveMQ", "Apache Camel", "Camunda BPMN"] },
  { label: "Data", values: ["PostgreSQL", "MySQL", "Redis", "Cassandra"] },
  { label: "Infrastructure & security", values: ["Docker", "Jenkins CI/CD", "Git", "Keycloak"] },
  { label: "Frontend", values: ["Next.js", "React", "TypeScript", "React Native"] },
  { label: "Domain", values: ["USSD banking", "Payment workflows", "SOAP/XML core banking"] },
];

export const PRINCIPLES = [
  { icon: "▣", title: "Keep boundaries clear", text: "Separate business logic, integrations, and persistence." },
  { icon: "◈", title: "Design for failure", text: "Validation, errors, and recovery belong in the design." },
  { icon: "✓", title: "Prove it side by side", text: "A migration is done when old and new behave the same." },
];

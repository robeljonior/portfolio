// lib/data.ts

export type Tech = string;

export type Social = {
  label: string;
  href: string;
  iconKey: "github" | "linkedin" | "instagram";
};

export type SystemItem = {
  number: string;
  icon: string;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  slug: string;
  github: string;
  details: {
    summary: string;
    responsibilities: string[];
    stack: string[];
  };
  steps: { label: string; text: string }[];
};

export type StackGroup = {
  label: string;
  values: string[];
};

/* ---------- nav ---------- */

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const;

/* ---------- hero ---------- */

export const TECH: Tech[] = ["Java", "Spring Boot", "Go", ".NET", "REST APIs"];

export const SOCIALS: Social[] = [
  { label: "GitHub", href: "https://github.com/robeljonior", iconKey: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/robel-mamoshet-90990b287/", iconKey: "linkedin" },
];

/* ---------- about ---------- */

export const ABOUT_STATS = [
  { value: "04", label: "years shipping" },
  { value: "24/7", label: "systems mindset" },
  { value: "01", label: "source of truth" },
];

/* ---------- work ---------- */

export const SYSTEMS: SystemItem[] = [
  {
    number: "01",
    icon: "⇄",
    eyebrow: "Enterprise payment system",
    title: "Reliable payment transaction flows",
    body: "Backend services and REST APIs supporting core payment workflows, with validation, exception handling, and production debugging across distributed components.",
    tags: ["Java", "Spring Boot", "REST APIs"],
    slug: "payment-transaction-flows",
    github: "https://github.com/robeljonior",
    details: {
      summary:
        "Core payment services powering transaction processing across the platform, built for correctness under failure and full traceability in production.",
      responsibilities: [
        "Designed and implemented REST APIs for payment initiation, validation, and settlement flows",
        "Built exception handling paths for partial failures across distributed components",
        "Investigated and resolved production incidents involving transaction state inconsistencies",
      ],
      stack: ["Java", "Spring Boot", "REST APIs", "SQL"],
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
    number: "02",
    icon: "⛓",
    eyebrow: "Distributed system integration",
    title: "Services that connect across systems",
    body: "Integrated internal and external services within multi-service enterprise architectures, keeping business logic, data validation, and failure handling explicit.",
    tags: ["JEE", "System Integration", "SQL"],
    slug: "distributed-system-integration",
    github: "https://github.com/robeljonior",
    details: {
      summary:
        "Connective layer linking multiple internal and external systems together, so information stays accurate and consistent no matter which system it started in.",
      responsibilities: [
        "Built integration logic connecting internal enterprise systems with external partner services",
        "Enforced data validation rules so bad or incomplete data never crosses system boundaries",
        "Handled failure scenarios explicitly, so one system going down doesn't silently corrupt another",
      ],
      stack: ["JEE", "System Integration", "SQL"],
    },
    steps: [
      { label: "Data originates", text: "Information is created or updated in one system — internal or a partner's." },
      { label: "Rules applied", text: "The data is checked against business rules before it's allowed to move anywhere." },
      { label: "Systems sync", text: "The relevant systems are updated so everyone is working from the same information." },
      { label: "Failures contained", text: "If one system is unavailable, the process fails safely instead of leaving things half-done." },
      { label: "Consistency verified", text: "The data is confirmed accurate and matching across every system involved." },
    ],
  },
  {
    number: "03",
    icon: "◈",
    eyebrow: "Go backend services",
    title: "Porting core banking services to Go",
    body: "Built Go services and internal APIs that integrate with existing enterprise applications, with hands-on debugging and performance optimization for production systems.",
    tags: ["Go", "Gin", "Performance"],
    slug: "go-backend-services",
    github: "https://github.com/robeljonior",
    details: {
      summary:
        "Core banking functionality rebuilt in Go for speed and reliability, replacing slower legacy components without disrupting the systems that depend on them.",
      responsibilities: [
        "Rebuilt existing banking service logic as new Go services with internal APIs",
        "Profiled and optimized performance bottlenecks in high-traffic production paths",
        "Debugged and resolved issues surfaced during the transition from legacy systems",
      ],
      stack: ["Go", "Gin", "Performance Optimization"],
    },
    steps: [
      { label: "Legacy reviewed", text: "The existing service's behavior is studied in detail so nothing is lost in translation." },
      { label: "Service rebuilt", text: "The same functionality is rewritten in Go, designed to run faster and use fewer resources." },
      { label: "Performance tuned", text: "The new service is tested under real load and optimized until it's measurably faster." },
      { label: "Safely switched over", text: "Traffic is moved to the new service carefully, with the old one ready as a fallback." },
      { label: "Monitored in production", text: "The service is watched closely after launch to catch and fix any edge cases." },
    ],
  },
  {
    number: "04",
    icon: "▣",
    eyebrow: "Quality and release confidence",
    title: "Testing that protects enterprise releases",
    body: "Executed manual and regression testing, designed unit tests, tracked defects, and verified fixes in close collaboration with development teams.",
    tags: ["JUnit", "Regression Testing", "Manual QA"],
    slug: "quality-release-confidence",
    github: "https://github.com/robeljonior",
    details: {
      summary:
        "A testing process that catches problems before customers do, giving the team confidence that every release actually works as intended.",
      responsibilities: [
        "Designed and wrote unit tests covering critical application logic",
        "Ran manual and regression testing ahead of releases to catch issues early",
        "Tracked defects to resolution, working directly with developers to verify fixes",
      ],
      stack: ["JUnit", "Regression Testing", "Manual QA"],
    },
    steps: [
      { label: "Changes reviewed", text: "New code or features are examined to understand what could break." },
      { label: "Tests written", text: "Automated tests are built to check the logic works correctly, every time." },
      { label: "Full sweep run", text: "The wider application is retested to make sure nothing else was affected." },
      { label: "Issues logged", text: "Anything that doesn't work as expected is documented clearly for the team." },
      { label: "Fixes verified", text: "Once a fix is made, it's tested again to confirm the problem is actually resolved." },
    ],
  },
  {
    number: "05",
    icon: "◎",
    eyebrow: ".NET enterprise applications",
    title: "Maintainable backend modules in .NET",
    body: "Developed backend modules and REST APIs for enterprise applications, resolving defects and improving the performance and maintainability of existing systems.",
    tags: ["C#", ".NET", "REST APIs"],
    slug: "dotnet-enterprise-applications",
    github: "https://github.com/robeljonior",
    details: {
      summary:
        "Backend modules built and maintained for enterprise applications, keeping the codebase healthy so future changes stay fast and low-risk.",
      responsibilities: [
        "Developed backend modules and REST APIs supporting enterprise application features",
        "Diagnosed and resolved defects reported from production and QA",
        "Refactored existing code to improve performance and long-term maintainability",
      ],
      stack: ["C#", ".NET", "REST APIs"],
    },
    steps: [
      { label: "Need identified", text: "A new feature is requested, or a defect is reported by the team or users." },
      { label: "Module built", text: "Backend logic and APIs are developed to meet the requirement cleanly." },
      { label: "Defects resolved", text: "Any related bugs are tracked down and fixed at the root cause." },
      { label: "Code refactored", text: "Existing code is cleaned up so it stays easy to maintain going forward." },
      { label: "Shipped and stable", text: "The change goes live and is confirmed stable in production." },
    ],
  },
  {
    number: "06",
    icon: "☎",
    eyebrow: "USSD & mobile gateway",
    title: "USSD banking sessions through a Spring mobile gateway",
    body: "A USSD session service built in Spring Boot, paired with a Go-based mobile gateway that routes carrier requests through Spring Cloud Gateway into core banking services.",
    tags: ["Java", "Spring Boot", "Go", "Spring Cloud Gateway"],
    slug: "ussd-mobile-gateway",
    github: "https://github.com/robeljonior",
    details: {
      summary:
        "A USSD session service and a lightweight Go mobile gateway that connect feature-phone banking to the same core services used by the app and web channels.",
      responsibilities: [
        "Built a Spring Boot USSD service handling session state, menu navigation, and input validation for feature-phone banking",
        "Developed a Go-based mobile gateway that authenticates and routes carrier USSD requests to backend services",
        "Integrated the gateway with Spring Cloud Gateway for centralized routing, rate limiting, and service discovery",
        "Ensured session timeouts, retries, and error messages behave predictably across unreliable mobile networks",
      ],
      stack: ["Java", "Spring Boot", "Go", "Spring Cloud Gateway", "USSD"],
    },
    steps: [
      { label: "Customer dials", text: "A customer dials a short code like *123# from any phone — no internet needed." },
      { label: "Gateway receives", text: "The mobile gateway, built in Go, receives the request from the carrier and identifies the session." },
      { label: "Routed to service", text: "Spring Cloud Gateway routes the session to the Spring Boot USSD service handling the menu." },
      { label: "Menu responds", text: "The USSD service tracks where the customer is in the menu and sends back the next screen." },
      { label: "Session completes", text: "Once the customer confirms an action, the result is processed and the session closes cleanly." },
    ],
  },
  {
    number: "07",
    icon: "◉",
    eyebrow: "Distributed device tracking",
    title: "Real-time tracking system for laptops and phones",
    body: "A personal tracking platform built with Spring Boot, Go, and Next.js that lets a laptop and a phone continuously report their location and status to each other.",
    tags: ["Go", "Spring Boot", "Next.js", "WebSockets"],
    slug: "realtime-device-tracking",
    github: "https://github.com/robeljonior",
    details: {
      summary:
        "A device-tracking system where a laptop and a phone continuously exchange location and status, coordinated through a lightweight backend and a live Next.js dashboard.",
      responsibilities: [
        "Built a Go daemon running on the laptop that continuously reports location and status",
        "Built a companion Android app that does the same from the phone",
        "Designed a Spring Boot signaling backend that pairs devices and relays their updates",
        "Built a Next.js dashboard that shows both devices' live position and connection state",
      ],
      stack: ["Go", "Spring Boot", "Next.js", "WebSockets"],
    },
    steps: [
      { label: "Devices register", text: "The laptop and phone each register with the backend using a unique device ID." },
      { label: "Location sent", text: "Each device continuously sends its location and status over a lightweight connection." },
      { label: "Backend relays", text: "The Spring Boot backend receives updates and relays them to the other paired device." },
      { label: "Dashboard updates", text: "The Next.js dashboard shows both devices moving live, with no manual refresh needed." },
      { label: "Reconnects automatically", text: "If a connection drops, the device reconnects and picks up tracking without losing state." },
    ],
  },
];

/* ---------- stack ---------- */

export const STACK_GROUPS: StackGroup[] = [
  { label: "Languages", values: ["Java", "Go", "C#", "SQL"] },
  { label: "Frameworks", values: ["Spring Boot", "JEE", "ASP.NET / .NET", "Gin"] },
  { label: "Integration", values: ["REST APIs", "Distributed Systems", "Payment Processing", "USSD", "Spring Cloud Gateway", "WebSockets"] },
  { label: "Quality & tools", values: ["JUnit", "Git", "Maven", "Jenkins", "Postman"] },
];

export const PRINCIPLES = [
  { icon: "▣", title: "Think in states", text: "Model the transitions. Name the impossible ones." },
  { icon: "◈", title: "Make it observable", text: "Logs are not a strategy. Context is." },
  { icon: "✓", title: "Leave a clean trail", text: "The next engineer is part of the design." },
];
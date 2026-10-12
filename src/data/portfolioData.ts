export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  responsibilities: string[];
  impactStatement?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  category: "recognition" | "speaking" | "creative" | "community" | "advisory";
  dateOrYear?: string;
  headline: string;
  body: string;
  caption: string;
  imageKey: "times_square" | "tedx" | "fashion" | "ruhaniyat";
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  specialization?: string;
  period: string;
  grade?: string;
}

export interface CertificationItem {
  name: string;
  issuer?: string;
}

export const PORTFOLIO_DATA = {
  meta: {
    name: "Sohail Khan",
    monogram: "SK",
    title: "AI Product Manager & Growth Consultant",
    editionLabel: "THE SOHAIL KHAN EDITION",
    subDescriptor: "PRODUCT · STRATEGY · AI",
    location: "Gurgaon, India",
    mobile: "+91 81449 75778",
    email: "certainlysohail@gmail.com",
    linkedin: "https://www.linkedin.com/in/certainlysohail",
    resumePath: "/Sohail_Khan_Resume.pdf",
    resumeFilename: "Sohail_Khan_Resume.pdf",
  },
  hero: {
    kicker: "INDEPENDENT PROFESSIONAL PROFILE",
    subKicker: "PRODUCT / AI / STRATEGY",
    headline: "Turning complex problems into intelligent products and scalable systems.",
    intro:
      "I’m Sohail Khan — an AI Product Manager and growth consultant working at the intersection of product strategy, generative AI, business operations, and founder advisory.",
    supportingLine:
      "From discovering the real problem to designing the right system, I focus on making ideas actionable.",
  },
  facts: [
    { number: "75+", label: "Founders Advised", note: "Product validation & business model design" },
    { number: "250+", label: "Consulting Engagements", note: "Across Europe & Middle East" },
    { number: "₹65L+", label: "Monthly Revenue Generated", note: "In a single month (Topmate experience)" },
    { number: "2022", label: "TEDx Speaker", note: "Delivered talk on Leadership & Consistency" },
    { number: "NYC", label: "Times Square Billboard", note: "Featured on iconic media landscape" },
  ],
  principles: {
    core: "Understand the problem. Redesign the process. Then make it intelligent.",
    automation: "Don’t automate a broken process. Understand it first, redesign it, and then automate it.",
  },
  storiesPreview: [
    {
      id: "product-discovery",
      title: "Product Discovery & Strategy",
      route: "/product-thinking",
      summary:
        "Translating ambiguous customer pain points into prioritized roadmaps, clear PRDs, and validated product decisions.",
      tag: "STRATEGY",
    },
    {
      id: "genai-workflows",
      title: "GenAI & Intelligent Workflows",
      route: "/product-thinking",
      summary:
        "Evaluating real-world AI use cases, prompt engineering, and human-in-the-loop workflows that augment operational efficiency.",
      tag: "INTELLIGENCE",
    },
    {
      id: "founder-advisory",
      title: "Founder Advisory & Growth",
      route: "/experience",
      summary:
        "Guiding early-stage founders through business validation, acquisition levers, unit economics, and scalable operational models.",
      tag: "GROWTH",
    },
    {
      id: "business-automation",
      title: "Business Intelligence & Automation",
      route: "/product-thinking",
      summary:
        "Connecting SQL, Power BI data pipelines, and n8n integrations to remove human bottlenecks and provide high-fidelity visibility.",
      tag: "SYSTEMS",
    },
  ],
  experiences: [
    {
      id: "masters-union",
      role: "Growth Consultant",
      company: "Masters' Union",
      location: "Gurugram, India",
      period: "",
      summary:
        "Work with early-stage founders on business research, product validation, growth opportunities, and scalable business model design.",
      responsibilities: [
        "Advise 75+ founders on product validation, product-market fit, and business model design.",
        "Facilitate AI-enabled business brainstorming workshops with founders, operators, and domain experts.",
        "Analyse business models, customer segments, competitive positioning, and growth opportunities.",
        "Evaluate operational bottlenecks, founder dependencies, and execution constraints.",
        "Identify opportunities across acquisition, conversion, retention, pricing, and expansion.",
        "Connect founder challenges with relevant frameworks and execution-oriented learning.",
      ],
    },
    {
      id: "topmate-senior",
      role: "Senior Consultant",
      company: "Topmate.io",
      location: "Bengaluru, India",
      period: "",
      summary:
        "Managed 250+ consultative engagements for professionals and corporate leaders across international territories.",
      impactStatement: "Generated ₹65 lakh+ in revenue in one month, according to the supplied resume.",
      responsibilities: [
        "Managed 250+ consulting engagements for professionals and executives across Europe and the Middle East.",
        "Conducted market analysis, segmentation, and opportunity assessments.",
        "Built decision frameworks aligning client capabilities with industry demand and growth opportunities.",
        "Advised clients on positioning, personal branding, and value proposition design.",
        "Collaborated with leadership and cross-functional teams to improve consulting workflows and customer journeys.",
        "Contributed to business growth through consultative advisory.",
      ],
    },
    {
      id: "topmate-intern",
      role: "Product Management Intern",
      company: "Topmate.io",
      location: "Bengaluru, India",
      period: "",
      summary:
        "Drove customer research, feature requirement definitions, and evaluated workflow automation opportunities.",
      responsibilities: [
        "Conducted customer research, market analysis, and competitor benchmarking.",
        "Analysed user feedback and operational pain points to support product decisions.",
        "Assisted in defining product requirements (PRDs) and documenting stakeholder input.",
        "Evaluated customer journeys and identified opportunities for automation and AI-enabled improvements.",
        "Supported KPI tracking and internal process documentation.",
      ],
    },
    {
      id: "leap-scholar",
      role: "Product Management",
      company: "Leap Scholar",
      location: "Bengaluru, India",
      period: "",
      summary:
        "Supported customer onboarding and lifecycle strategy for international education products serving MENA markets.",
      responsibilities: [
        "Supported customer onboarding and lifecycle strategy for international education products serving MENA markets.",
        "Analysed customer feedback and support trends to recommend product experience enhancements.",
        "Identified operational bottlenecks and collaborated with stakeholders to improve workflows.",
        "Contributed to customer success and service-delivery improvement initiatives.",
      ],
    },
    {
      id: "process360",
      role: "Business Data Analyst",
      company: "Process360 Ltd.",
      location: "Hyderabad, India",
      period: "",
      summary:
        "Supported business consulting and proposal development through structured analysis, datasets, and workflow mapping.",
      responsibilities: [
        "Supported business consulting and proposal development through structured analysis and documentation.",
        "Assisted with process mapping, workflow optimisation, and operational improvement.",
        "Conducted quality assurance, policy compliance analysis, and operational risk assessments.",
        "Analysed operational datasets and business requirements to support decision-making.",
      ],
    },
  ] as ExperienceItem[],
  achievements: [
    {
      id: "times-square",
      title: "Times Square Billboard Feature",
      subtitle: "New York City, USA",
      category: "recognition",
      headline: "A moment on the world's most recognisable media landscape.",
      body:
        "Sohail Khan was featured on an iconic Times Square billboard in New York. A standout visual milestone reflecting international visibility.",
      caption: "Times Square, New York City · Media Feature",
      imageKey: "times_square",
    },
    {
      id: "tedx",
      title: "TEDx Speaker",
      subtitle: "Theme: Leadership & Consistency",
      category: "speaking",
      dateOrYear: "2022",
      headline: "Leadership and consistency, on the TEDx stage.",
      body:
        "In 2022, Sohail took the TEDx stage to deliver a talk exploring how discipline, consistency, and early intentionality define enduring leadership.",
      caption: "TEDx · Leadership & Consistency · 2022",
      imageKey: "tedx",
    },
    {
      id: "fashion-society",
      title: "Head of Fashion Society",
      subtitle: "Bennett University",
      category: "creative",
      headline: "Where creative direction meets team leadership.",
      body:
        "Served as Head of the Fashion Society at Bennett University, leading creative direction, coordinating student showcases, and fostering visual expression across the university community.",
      caption: "Fashion Society · Bennett University · Creative Direction",
      imageKey: "fashion",
    },
    {
      id: "ruhaniyat",
      title: "Head of Ruhaniyat",
      subtitle: "Mental Health Club, Bennett University",
      category: "community",
      headline: "Making space for conversations that matter.",
      body:
        "Served as Head of Ruhaniyat, the student-led mental health club at Bennett University. Spearheaded peer dialogue, community support forums, and awareness campaigns around mental wellness.",
      caption: "Ruhaniyat · Bennett University · Empathy & Community",
      imageKey: "ruhaniyat",
    },
  ] as AchievementItem[],
  productThinking: {
    pillars: [
      {
        number: "01",
        title: "Product Strategy & Discovery",
        summary: "Connecting customer pain to commercially viable, prioritized solutions.",
        items: [
          "Product discovery & root cause mapping",
          "Customer research & interview synthesis",
          "Problem definition & hypothesis validation",
          "Product-Market Fit (PMF) exploration",
          "PRDs & functional specifications",
          "Roadmapping & strategic trade-offs",
          "Prioritisation matrices (RICE / MoSCoW)",
          "Competitive benchmarking & positioning",
          "Stakeholder alignment & leadership syncs",
        ],
      },
      {
        number: "02",
        title: "GenAI & LLM Applications",
        summary: "Pragmatic application of large models to augment operational capacity.",
        items: [
          "Generative AI & foundation model capabilities",
          "Large language models in business contexts",
          "Prompt engineering & context structuring",
          "AI-assisted workflow design & augmentation",
          "Agentic workflow concepts & autonomous loops",
          "Human-in-the-loop validation & guardrails",
          "AI use-case ROI & feasibility evaluation",
        ],
      },
      {
        number: "03",
        title: "Business Intelligence & Automation",
        summary: "Empowering decisions with structured data pipelines and automated handoffs.",
        items: [
          "SQL data extraction & querying",
          "Power BI dashboard design & reporting",
          "Advanced Excel financial & operational models",
          "KPI tracking, cohorts & retention metrics",
          "n8n automation & webhook orchestration",
          "API & CRM integrations (HubSpot, Airtable)",
          "Process documentation & SOP engineering",
          "Workflow bottleneck elimination",
        ],
      },
      {
        number: "04",
        title: "Growth & Founder Advisory",
        summary: "Structured guidance helping early-stage ventures unlock repeatable momentum.",
        items: [
          "Business model canvas & unit economics",
          "Customer segmentation & ICP definition",
          "Market opportunity & TAM/SAM sizing",
          "Go-to-Market (GTM) strategy execution",
          "Acquisition & conversion funnel optimization",
          "Retention loops & churn mitigation",
          "Pricing strategy & packaging experiments",
          "Operational scalability & founder de-risking",
        ],
      },
    ],
    frameworkSteps: [
      { step: "01", title: "Business Problem", desc: "Isolating the root friction rather than superficial symptoms." },
      { step: "02", title: "Customer Discovery", desc: "Rigorous research with users, operators, and stakeholders." },
      { step: "03", title: "Product Definition", desc: "Drafting specs, success metrics, and crisp boundaries." },
      { step: "04", title: "Workflow Design", desc: "Mapping human-in-the-loop and automated touchpoints." },
      { step: "05", title: "Implementation", desc: "Iterative rollouts with continuous telemetry." },
      { step: "06", title: "Measurement & Growth", desc: "Tracking KPIs, retention, and compounding business value." },
    ],
  },
  education: [
    {
      id: "bennett",
      institution: "Bennett University",
      degree: "Bachelor of Technology (B.Tech)",
      specialization: "Computer Science (Specialisation: Blockchain)",
      period: "September 2022 – October 2026",
    },
    {
      id: "masters-union-edu",
      institution: "Masters' Union",
      degree: "Strategic Business Management",
      specialization: "Business Administration and Management, General",
      period: "December 2025 – December 2026",
    },
    {
      id: "dav-12",
      institution: "DAV Public School, Bhubaneswar",
      degree: "AISSCE, Class XII, CBSE (Science)",
      period: "Completed",
      grade: "94.20%",
    },
    {
      id: "dav-10",
      institution: "DAV Public School, Bhubaneswar",
      degree: "AISSE, Class X, CBSE",
      period: "Completed",
      grade: "97.60%",
    },
  ] as EducationItem[],
  certifications: [
    { name: "Overview of Agile & DevOps" },
    { name: "Software Development Processes and Methodologies" },
    { name: "Software Engineering" },
    { name: "The Bits and Bytes of Computer Networking" },
  ] as CertificationItem[],
};

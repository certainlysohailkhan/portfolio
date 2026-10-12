import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

// Ensure public directory exists
const publicDir = path.resolve("./public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const doc = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: "a4",
});

// A4 dimensions: 210 x 297 mm
const pageWidth = 210;
const pageHeight = 297;
const margin = 18;
const contentWidth = pageWidth - margin * 2;
let y = margin;

// Colors
const ink = [23, 23, 23];
const muted = [90, 86, 80];
const crimson = [179, 38, 45];
const ruleColor = [216, 211, 201];

// Helper to draw horizontal rule
function drawRule(yPos) {
  doc.setDrawColor(...ruleColor);
  doc.setLineWidth(0.3);
  doc.line(margin, yPos, pageWidth - margin, yPos);
}

// Header
doc.setFont("helvetica", "bold");
doc.setFontSize(22);
doc.setTextColor(...ink);
doc.text("SOHAIL KHAN", margin, y);
y += 6;

doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.setTextColor(...crimson);
doc.text("AI PRODUCT MANAGER  |  PRODUCT STRATEGIST  |  GROWTH CONSULTANT", margin, y);
y += 5;

doc.setFontSize(8.5);
doc.setTextColor(...muted);
doc.text("Gurgaon, India  ·  +91 81449 75778  ·  certainlysohail@gmail.com  ·  linkedin.com/in/certainlysohail", margin, y);
y += 6;

drawRule(y);
y += 6;

// Executive Summary / Profile
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(...ink);
doc.text("EXECUTIVE PROFILE", margin, y);
y += 5;

doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.setTextColor(...ink);
const summary = 
  "AI Product Manager and Growth Consultant working at the intersection of product strategy, generative AI, business operations, and founder advisory. Experience advising 75+ early-stage founders and leading 250+ consultative engagements across Europe and the Middle East. Focused on customer problem discovery, systems design, workflow automation, and commercial impact.";
const splitSummary = doc.splitTextToSize(summary, contentWidth);
doc.text(splitSummary, margin, y);
y += splitSummary.length * 4.2 + 3;

drawRule(y);
y += 6;

// Experience
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(...ink);
doc.text("PROFESSIONAL EXPERIENCE", margin, y);
y += 6;

const experiences = [
  {
    role: "Growth Consultant",
    company: "Masters' Union",
    location: "Gurugram, India",
    bullets: [
      "Advise 75+ founders on product validation, product-market fit, and scalable business model design.",
      "Facilitate AI-enabled business brainstorming workshops with founders, operators, and industry domain experts.",
      "Analyse business models, customer segments, competitive positioning, and growth opportunities across acquisition, conversion, and retention.",
      "Evaluate operational bottlenecks, founder dependencies, and execution constraints to create actionable roadmaps."
    ]
  },
  {
    role: "Senior Consultant",
    company: "Topmate.io",
    location: "Bengaluru, India",
    bullets: [
      "Managed 250+ consulting engagements for professionals and executives across Europe and the Middle East.",
      "Generated INR 65 lakh+ revenue in a single month through structured consultative advisory and decision frameworks.",
      "Built market analysis and positioning frameworks aligning client capabilities with industry demand.",
      "Collaborated with leadership and cross-functional teams to improve consulting workflows and user journeys."
    ]
  },
  {
    role: "Product Management Intern",
    company: "Topmate.io",
    location: "Bengaluru, India",
    bullets: [
      "Conducted customer research, user pain point mapping, and competitive benchmarking to inform feature definition.",
      "Assisted in defining PRDs, documenting stakeholder input, and evaluating customer journeys for automation.",
      "Supported KPI tracking, onboarding optimization, and internal process documentation."
    ]
  },
  {
    role: "Product Management",
    company: "Leap Scholar",
    location: "Bengaluru, India",
    bullets: [
      "Supported customer onboarding and lifecycle strategy for international education products serving MENA markets.",
      "Analysed customer support trends and feedback loops to recommend product experience enhancements."
    ]
  },
  {
    role: "Business Data Analyst",
    company: "Process360 Ltd.",
    location: "Hyderabad, India",
    bullets: [
      "Assisted with process mapping, workflow optimization, quality assurance, and operational risk assessments.",
      "Analysed operational datasets and business requirements to support data-driven decision-making."
    ]
  }
];

experiences.forEach((exp) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...ink);
  doc.text(`${exp.role} — ${exp.company}`, margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...muted);
  doc.text(exp.location, pageWidth - margin, y, { align: "right" });
  y += 4.5;

  doc.setTextColor(...ink);
  exp.bullets.forEach((bullet) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.2);
    const bulletText = `•  ${bullet}`;
    const splitBullet = doc.splitTextToSize(bulletText, contentWidth - 4);
    doc.text(splitBullet, margin + 2, y);
    y += splitBullet.length * 3.8;
  });
  y += 2.5;
});

drawRule(y);
y += 5;

// Key Skills & Practice Areas
doc.setFont("helvetica", "bold");
doc.setFontSize(10.5);
doc.setTextColor(...ink);
doc.text("CORE EXPERTISE & COMPETENCIES", margin, y);
y += 5;

const skills = [
  "Product Strategy: Product Discovery, Customer Research, PRDs, Roadmapping, PMF, Prioritisation",
  "GenAI & Systems: LLM Applications, Prompt Engineering, AI Workflows, Human-in-the-Loop, Use-Case Evaluation",
  "Business & Analytics: SQL, Power BI, Advanced Excel, KPI Analysis, n8n Automation, Workflow Mapping",
  "Growth Advisory: Business Model Design, Market Sizing, Go-To-Market (GTM), Pricing, Retention Strategy"
];

skills.forEach((skill) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.2);
  doc.setTextColor(...ink);
  doc.text(`•  ${skill}`, margin + 2, y);
  y += 4;
});
y += 2;

drawRule(y);
y += 5;

// Leadership & Highlights
doc.setFont("helvetica", "bold");
doc.setFontSize(10.5);
doc.setTextColor(...ink);
doc.text("LEADERSHIP & NOTABLE HIGHLIGHTS", margin, y);
y += 5;

const highlights = [
  "TEDx Speaker (2022): Delivered talk on 'Leadership and Consistency' addressing student and youth audiences.",
  "Times Square Billboard Feature: Featured on the prominent Times Square billboard media landscape in New York.",
  "Head of Fashion Society: Bennett University — Creative leadership, event curation, visual direction, and team coordination.",
  "Head of Ruhaniyat: Bennett University — Student leadership for university mental health and empathetic community dialogues."
];

highlights.forEach((h) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.2);
  doc.setTextColor(...ink);
  const splitH = doc.splitTextToSize(`•  ${h}`, contentWidth - 4);
  doc.text(splitH, margin + 2, y);
  y += splitH.length * 3.8;
});
y += 2;

drawRule(y);
y += 5;

// Education & Certifications
doc.setFont("helvetica", "bold");
doc.setFontSize(10.5);
doc.setTextColor(...ink);
doc.text("EDUCATION & CERTIFICATIONS", margin, y);
y += 5;

doc.setFont("helvetica", "bold");
doc.setFontSize(8.5);
doc.text("Bennett University", margin + 2, y);
doc.setFont("helvetica", "normal");
doc.text("B.Tech in Computer Science (Specialisation: Blockchain) | 2022 – 2026", margin + 35, y);
y += 4;

doc.setFont("helvetica", "bold");
doc.text("Masters' Union", margin + 2, y);
doc.setFont("helvetica", "normal");
doc.text("Strategic Business Management (Enrolled/Supplied: Dec 2025 – Dec 2026)", margin + 35, y);
y += 4;

doc.setFont("helvetica", "bold");
doc.text("DAV Public School", margin + 2, y);
doc.setFont("helvetica", "normal");
doc.text("Class XII (CBSE Science): 94.20%  |  Class X (CBSE): 97.60%", margin + 35, y);
y += 4.5;

doc.setFont("helvetica", "bold");
doc.text("Certifications:", margin + 2, y);
doc.setFont("helvetica", "normal");
doc.text("Overview of Agile & DevOps · Software Development Processes · Software Engineering · Bits & Bytes Networking", margin + 25, y);

// Save file
const filePath = path.join(publicDir, "Sohail_Khan_Resume.pdf");
const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
fs.writeFileSync(filePath, pdfBuffer);
console.log(`Generated resume at: ${filePath} (${pdfBuffer.length} bytes)`);

// Update base64 in src/utils/resumeData.ts
const resumeDataPath = path.resolve("./src/utils/resumeData.ts");
if (fs.existsSync(resumeDataPath)) {
  const base64Str = pdfBuffer.toString("base64");
  let content = fs.readFileSync(resumeDataPath, "utf8");
  content = content.replace(/export const RESUME_BASE64 = "[^"]*";/, `export const RESUME_BASE64 = "${base64Str}";`);
  fs.writeFileSync(resumeDataPath, content);
  console.log("Updated RESUME_BASE64 in src/utils/resumeData.ts");
}

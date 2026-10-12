import React from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { PageHeader } from "../components/common/PageHeader";
import { EditorialImageFrame } from "../components/media/EditorialImageFrame";
import { PullQuote } from "../components/common/PullQuote";
import { useResume } from "../context/ResumeContext";

export const AboutPage: React.FC = () => {
  const { triggerDownload } = useResume();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <PageHeader
        kicker="BIOGRAPHICAL RECORD"
        issueLabel="THE SOHAIL KHAN EDITION"
        headline="A product mindset. A systems perspective. A creative instinct."
        subheadline="Operating across product discovery, AI workflow augmentation, operational bottlenecks, and founder advisory."
      />

      {/* Main Narrative Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left column: Long-form editorial bio */}
        <div className="lg:col-span-7 space-y-6 text-[#0C1829] font-serif-body text-lg sm:text-xl leading-relaxed">
          <p className="first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3.5 first-letter:leading-none first-letter:font-serif-title first-letter:text-[#0C1829]">
            Sohail Khan approaches technology not as isolated code, but as living, connected business systems. His work is situated precisely where strategic intent meets day-to-day execution: working alongside founders, untangling operational friction, evaluating generative AI capabilities, and designing validated product solutions.
          </p>

          <p className="text-[#4E5D73]">
            Rather than jumping prematurely to automation, Sohail emphasizes radical clarity. Across more than 250 consulting engagements and advisory sessions with 75+ early-stage founders, his core focus has remained consistent: uncover the root customer challenge, reconstruct the workflow cleanly, and only then deploy intelligent technology.
          </p>

          {/* Pull quote callout */}
          <PullQuote
            quote={PORTFOLIO_DATA.principles.automation}
            attribution="Sohail Khan · Systems Principle"
            subtext="Guiding approach to generative AI and workflow orchestration"
          />

          <h3 className="font-serif-title text-3xl font-bold text-[#0C1829] pt-4">
            The Intersection of Focus
          </h3>
          <p className="text-[#4E5D73]">
            Sohail’s professional practice spans six core competencies developed through rigorous academic foundations and hands-on advisory:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 not-italic font-sans text-xs">
            {[
              {
                title: "Product Discovery & Strategy",
                desc: "Uncovering latent user needs, framing problem statements, and authoring rigorous specifications.",
              },
              {
                title: "Founder Advisory",
                desc: "Stress-testing business models, pricing architecture, and customer segmentation for early ventures.",
              },
              {
                title: "AI-Enabled Workflows",
                desc: "Evaluating LLM capabilities, context pipelines, and human-in-the-loop operational augmentations.",
              },
              {
                title: "Business Operations",
                desc: "Identifying process bottlenecks, mapping dependencies, and eliminating manual overhead.",
              },
              {
                title: "Customer & Market Research",
                desc: "Synthesizing qualitative feedback, cohort analyses, and competitive market dynamics.",
              },
              {
                title: "Growth Strategy & Execution",
                desc: "Designing repeatable acquisition loops, lifecycle retention strategies, and commercial growth.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#F3F5F9] border border-[#D5DCE6] flex flex-col justify-between shadow-xs"
              >
                <div>
                  <span className="font-mono text-xs text-[#0C1829] font-bold block mb-1">
                    0{idx + 1}
                  </span>
                  <h4 className="font-bold text-sm text-[#0C1829] mb-1 font-serif-title">
                    {item.title}
                  </h4>
                  <p className="text-[#4E5D73] leading-relaxed font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-serif-title text-3xl font-bold text-[#0C1829] pt-6">
            Creative Expression & Community Leadership
          </h3>
          <p className="text-[#4E5D73]">
            Beyond software and metrics, Sohail brings an innate creative discipline. Having served as Head of the Fashion Society at Bennett University and Head of Ruhaniyat—the university’s mental health initiative—he considers visual direction, empathy, and active listening foundational to modern product leadership.
          </p>
        </div>

        {/* Right column: Sticky Portrait & Career Snapshot */}
        <div className="lg:col-span-5 space-y-8">
          {/* Portrait Container */}
          <div className="bg-[#F3F5F9] p-4 border border-[#D5DCE6] shadow-xs">
            <EditorialImageFrame
              slotId="portrait"
              aspectRatioClass="aspect-[3/4]"
              altText="Sohail Khan Editorial Portrait"
              defaultCaption="Sohail Khan · Profile Photography"
              sideLabel="INDEPENDENT MONOGRAPH"
            />
          </div>

          {/* Compact Career Snapshot */}
          <div className="p-6 bg-[#F3F5F9] border border-[#D5DCE6] space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#D5DCE6]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold">
                Chronological Snapshot
              </span>
              <span className="font-mono text-[10px] text-[#4E5D73] font-semibold">
                VERIFIED ROLES
              </span>
            </div>

            <ol className="space-y-4 divide-y divide-[#D5DCE6] text-xs">
              {PORTFOLIO_DATA.experiences.map((exp) => (
                <li key={exp.id} className="pt-3 first:pt-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-base text-[#0C1829] font-serif-title">
                        {exp.role}
                      </h4>
                      <p className="text-[#4E5D73] font-medium">{exp.company}</p>
                    </div>
                    {exp.period ? (
                      <span className="font-mono text-xs text-[#0C1829] font-bold text-right whitespace-nowrap">
                        {exp.period}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="pt-4 border-t border-[#D5DCE6] flex flex-col gap-2.5">
              <Link
                to="/experience"
                className="w-full text-center py-2.5 bg-[#0C1829] hover:bg-[#162E51] text-white text-xs font-mono uppercase tracking-wider transition-colors shadow-xs"
              >
                View Full Detailed Experience →
              </Link>
              <button
                type="button"
                onClick={triggerDownload}
                className="w-full text-center py-2 border border-[#0C1829] hover:bg-white text-[#0C1829] text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                title="Download verified resume PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#0C1829]" />
                <span>Download Resume (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

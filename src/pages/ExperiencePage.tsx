import React, { useState } from "react";
import { Download, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { PageHeader } from "../components/common/PageHeader";
import { CompanyLogoStrip } from "../components/experience/CompanyLogoStrip";
import { useResume } from "../context/ResumeContext";

export const ExperiencePage: React.FC = () => {
  const { triggerDownload } = useResume();

  // State for expanded/collapsed entries
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({
    "masters-union": true,
    "topmate-senior": true,
    "topmate-intern": true,
    "leap-scholar": true,
    "process360": true,
  });

  const toggleRole = (id: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    PORTFOLIO_DATA.experiences.forEach((exp) => (all[exp.id] = true));
    setExpandedRoles(all);
  };

  const collapseAll = () => {
    const all: Record<string, boolean> = {};
    PORTFOLIO_DATA.experiences.forEach((exp) => (all[exp.id] = false));
    setExpandedRoles(all);
  };

  const scrollToRole = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <PageHeader
        kicker="EMPLOYMENT & CONSULTING RECORD"
        issueLabel="THE SOHAIL KHAN EDITION"
        headline="Experience, founder advisory, and strategic problem-solving."
        subheadline="A chronological record of consultative leadership, product discovery, and commercial momentum."
      />

      {/* Editorial Index & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 bg-[#F3F5F9] border border-[#D5DCE6] mb-12 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold">
            Timeline Index
          </span>
          <span className="text-[#CBD5E1] text-xs">/</span>
          <div className="hidden md:flex items-center gap-4 text-xs font-mono">
            {PORTFOLIO_DATA.experiences.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => scrollToRole(exp.id)}
                className="hover:text-[#162E51] transition-colors text-[#0C1829] font-medium cursor-pointer"
              >
                0{idx + 1}. {exp.company.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={expandAll}
            className="hover:text-[#0C1829] text-[#4E5D73] transition-colors font-medium cursor-pointer"
          >
            Expand All
          </button>
          <span>·</span>
          <button
            onClick={collapseAll}
            className="hover:text-[#0C1829] text-[#4E5D73] transition-colors font-medium cursor-pointer"
          >
            Collapse All
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={triggerDownload}
            className="inline-flex items-center gap-1.5 text-[#0C1829] hover:text-[#162E51] font-bold cursor-pointer"
            title="Download verified resume PDF"
          >
            <Download className="w-3.5 h-3.5 text-[#0C1829]" />
            <span>PDF Resume</span>
          </button>
        </div>
      </div>

      {/* Main Reverse-Chronological Two-Column Editorial Grid */}
      <div className="space-y-12">
        {PORTFOLIO_DATA.experiences.map((exp, index) => {
          const isExpanded = !!expandedRoles[exp.id];

          return (
            <article
              key={exp.id}
              id={exp.id}
              className="p-8 sm:p-10 bg-[#F3F5F9] border border-[#D5DCE6] transition-all scroll-mt-24 relative shadow-xs"
            >
              {/* Top metadata strip */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline pb-6 border-b border-[#D5DCE6]">
                {/* Column A: Timeline Metadata */}
                <div className="lg:col-span-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#0C1829] font-bold">
                      ENTRY 0{index + 1}
                    </span>
                    {exp.period ? (
                      <>
                        <span className="text-[#CBD5E1]">·</span>
                        <span className="font-mono text-xs text-[#0C1829] font-bold">
                          {exp.period}
                        </span>
                      </>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#4E5D73] font-mono pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0C1829]" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Column B: Role and Organisation in Deep Blue */}
                <div className="lg:col-span-7">
                  <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0C1829]">
                    {exp.role}
                  </h2>
                  <p className="font-serif-title text-xl sm:text-2xl text-[#0C1829] font-bold mt-0.5">
                    {exp.company}
                  </p>
                </div>

                {/* Column C: Accordion trigger */}
                <div className="lg:col-span-1 flex justify-end">
                  <button
                    onClick={() => toggleRole(exp.id)}
                    className="p-2 border border-[#D5DCE6] hover:bg-white transition-colors cursor-pointer"
                    aria-label={isExpanded ? "Collapse role details" : "Expand role details"}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#0C1829]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#0C1829]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Summary & Notes */}
                  <div className="lg:col-span-4 space-y-4">
                    <p className="text-base font-serif-body text-[#0C1829] leading-relaxed font-medium">
                      {exp.summary}
                    </p>

                    {/* Single-month verified impact statement if present */}
                    {exp.impactStatement && (
                      <div className="p-4 bg-[#071120] text-[#FAF9F5] border-l-2 border-[#38BDF8] space-y-1 shadow-xs">
                        <span className="font-mono text-[10px] uppercase text-[#38BDF8] font-bold block">
                          VERIFIED MILESTONE
                        </span>
                        <p className="font-serif-title text-lg font-bold leading-snug text-white">
                          {exp.impactStatement}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Key Responsibilities and Actions */}
                  <div className="lg:col-span-8 space-y-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold block">
                      Core Responsibilities & Deliverables
                    </span>
                    <ul className="space-y-3 font-serif-body text-base text-[#0C1829]">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-3">
                          <span className="font-mono text-xs text-[#0C1829] mt-1 font-bold">
                            —
                          </span>
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Horizontally Animated Company Logo Strip at the Bottom of Experience */}
      <CompanyLogoStrip />

      {/* Bottom Action Section */}
      <div className="mt-14 p-8 bg-[#F3F5F9] border border-[#D5DCE6] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div>
          <h3 className="font-serif-title text-2xl font-bold text-[#0C1829]">
            Interested in consulting, product advisory, or growth strategy?
          </h3>
          <p className="text-xs text-[#4E5D73] mt-1 font-serif-body">
            Available for founder advisory, generative AI application evaluation, and full-time product leadership.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={triggerDownload}
            className="px-5 py-2.5 bg-[#0C1829] hover:bg-[#162E51] text-white text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
            title="Download verified resume PDF"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};

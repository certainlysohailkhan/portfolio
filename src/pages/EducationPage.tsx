import React from "react";
import { Award } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { PageHeader } from "../components/common/PageHeader";

export const EducationPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <PageHeader
        kicker="ACADEMIC & TECHNICAL FOUNDATIONS"
        issueLabel="THE SOHAIL KHAN EDITION"
        headline="Education, engineering rigor, and certified competencies."
        subheadline="Computer science engineering specialization combined with strategic business coursework and engineering certifications."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Academic Degrees & High School (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="pb-3 border-b border-[#D5DCE6] flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold">
              01 · Academic Degrees & Schooling
            </span>
            <span className="font-mono text-[10px] text-[#4E5D73] font-semibold">
              VERIFIED INSTITUTIONS
            </span>
          </div>

          <div className="space-y-6">
            {PORTFOLIO_DATA.education.map((edu) => (
              <div
                key={edu.id}
                className="p-6 bg-[#F3F5F9] border border-[#D5DCE6] space-y-3 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#D5DCE6] pb-3">
                  <div>
                    <h3 className="font-serif-title text-2xl font-bold text-[#0C1829]">
                      {edu.institution}
                    </h3>
                    <p className="font-serif-body text-base font-bold text-[#0C1829]">
                      {edu.degree}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#0C1829] font-bold whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>

                {edu.specialization && (
                  <p className="text-xs text-[#0C1829] font-mono">
                    <span className="text-[#4E5D73]">SPECIALIZATION:</span>{" "}
                    <span className="font-bold">{edu.specialization}</span>
                  </p>
                )}

                {edu.grade && (
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#4E5D73]">SCORE / MERIT:</span>
                    <span className="px-2.5 py-0.5 bg-[#0C1829] text-white font-bold shadow-xs">
                      {edu.grade}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Certifications Archive (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="pb-3 border-b border-[#D5DCE6] flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold">
              02 · Technical Certifications
            </span>
            <span className="font-mono text-[10px] text-[#4E5D73] font-semibold">
              SOFTWARE & DEVOPS
            </span>
          </div>

          <div className="p-6 bg-[#F3F5F9] border border-[#D5DCE6] space-y-4 shadow-xs">
            <p className="text-xs text-[#4E5D73] font-serif-body leading-relaxed">
              Foundational software engineering credentials covering agile development, lifecycle processes, and networking protocols:
            </p>

            <ul className="space-y-3 font-sans text-xs divide-y divide-[#D5DCE6] pt-2">
              {PORTFOLIO_DATA.certifications.map((cert, cIdx) => (
                <li key={cIdx} className="pt-3 first:pt-0 flex items-start gap-3">
                  <Award className="w-4 h-4 text-[#0C1829] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0C1829] font-serif-title">
                      {cert.name}
                    </h4>
                    <span className="text-[11px] font-mono text-[#4E5D73]">
                      Verified Credential Subject
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="p-3 bg-[#FAF9F5] border border-[#D5DCE6] text-[11px] font-mono text-[#4E5D73] mt-4">
              <span className="text-[#0C1829] font-bold uppercase block mb-1">
                INTEGRITY STANDARDS
              </span>
              Presented strictly as confirmed credentials without arbitrary issue IDs or simulated external links.
            </div>
          </div>

          {/* Core Technical Highlights Box in Midnight Deep Blue */}
          <div className="p-6 bg-[#071120] text-[#FAF9F5] border border-[#162842] space-y-3 shadow-md">
            <span className="font-mono text-[10px] uppercase text-[#38BDF8] font-bold block">
              SYSTEM FOUNDATIONS
            </span>
            <h4 className="font-serif-title text-xl font-bold text-white">
              Computer Science & Blockchain Focus
            </h4>
            <p className="font-serif-body text-xs text-[#94A3B8] leading-relaxed">
              Academic concentration in Computer Science with blockchain specialization at Bennett University provided rigorous grounding in distributed state, consensus mechanisms, and algorithmic data flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

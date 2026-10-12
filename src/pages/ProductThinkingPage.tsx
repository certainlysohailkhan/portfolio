import React, { useState } from "react";
import { Layers, Cpu, Database, TrendingUp } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { PageHeader } from "../components/common/PageHeader";
import { PullQuote } from "../components/common/PullQuote";

export const ProductThinkingPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const icons = [Layers, Cpu, Database, TrendingUp];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <PageHeader
        kicker="DISCIPLINE & FRAMEWORKS"
        issueLabel="THE SOHAIL KHAN EDITION"
        headline="From ambiguous problems to structured products and intelligent systems."
        subheadline="An integrated methodology spanning product discovery, generative AI workflows, systems orchestration, and founder advisory."
      />

      {/* Interactive Editorial Framework Diagram */}
      <section className="mb-20 p-8 sm:p-10 bg-[#F3F5F9] border border-[#D5DCE6] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#D5DCE6] mb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#0C1829] font-bold block mb-1">
              Methodological Continuum
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#0C1829]">
              The Systems Problem-Solving Framework
            </h2>
          </div>
          <p className="text-xs text-[#4E5D73] font-mono font-semibold">
            SELECT STEP TO EXAMINE OPERATIONAL FOCUS
          </p>
        </div>

        {/* Steps Ribbon / Flow Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {PORTFOLIO_DATA.productThinking.frameworkSteps.map((item, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 text-left border transition-all ${
                  isSelected
                    ? "bg-[#0C1829] text-white border-[#0C1829] shadow-sm"
                    : "bg-white text-[#4E5D73] border-[#D5DCE6] hover:border-[#0C1829] hover:text-[#0C1829]"
                }`}
              >
                <span
                  className={`font-mono text-xs block font-bold ${
                    isSelected ? "text-white" : "text-[#4E5D73]"
                  }`}
                >
                  {item.step}
                </span>
                <span className="font-serif-title text-base font-bold block mt-1 leading-snug">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Focused Step Explanation */}
        <div className="p-6 bg-white border border-[#D5DCE6] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase px-2.5 py-1 bg-[#0C1829] text-white font-bold">
                PHASE {PORTFOLIO_DATA.productThinking.frameworkSteps[activeStep].step}
              </span>
              <h3 className="font-serif-title text-2xl font-bold text-[#0C1829]">
                {PORTFOLIO_DATA.productThinking.frameworkSteps[activeStep].title}
              </h3>
            </div>
            <p className="font-serif-body text-base text-[#4E5D73] font-medium">
              {PORTFOLIO_DATA.productThinking.frameworkSteps[activeStep].desc}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() =>
                setActiveStep((prev) =>
                  prev === 0 ? PORTFOLIO_DATA.productThinking.frameworkSteps.length - 1 : prev - 1
                )
              }
              className="px-3.5 py-2 border border-[#D5DCE6] bg-white text-xs font-mono text-[#0C1829] hover:bg-[#F3F5F9] font-bold cursor-pointer"
            >
              ← Prev
            </button>
            <button
              onClick={() =>
                setActiveStep((prev) =>
                  prev === PORTFOLIO_DATA.productThinking.frameworkSteps.length - 1 ? 0 : prev + 1
                )
              }
              className="px-3.5 py-2 border border-[#0C1829] bg-[#0C1829] text-white text-xs font-mono hover:bg-[#162E51] font-bold transition-colors cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Pull Quote */}
      <PullQuote
        quote={PORTFOLIO_DATA.principles.automation}
        attribution="Sohail Khan · Core Philosophy"
        subtext="Guiding principle across product discovery, AI integration, and systems design"
      />

      {/* The 4 Editorial Pillars */}
      <section className="mt-16 space-y-12">
        <div className="pb-4 border-b border-[#D5DCE6]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#0C1829] font-bold block mb-1">
            CORE DOMAINS OF PRACTICE
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0C1829]">
            Four Pillars of Product & System Craft
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PORTFOLIO_DATA.productThinking.pillars.map((pillar, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={pillar.number}
                className="p-8 bg-[#F3F5F9] border border-[#D5DCE6] flex flex-col justify-between hover:border-[#0C1829] transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#D5DCE6] mb-6">
                    <span className="font-mono text-xs font-bold text-[#0C1829]">
                      PILLAR {pillar.number}
                    </span>
                    <Icon className="w-5 h-5 text-[#0C1829]" />
                  </div>

                  <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0C1829] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-serif-body text-base text-[#4E5D73] mb-6 leading-relaxed">
                    {pillar.summary}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <span className="font-mono text-[11px] text-[#0C1829] uppercase tracking-wider font-bold block">
                      Specific Competencies
                    </span>
                    <ul className="space-y-2 text-xs font-sans text-[#0C1829]">
                      {pillar.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5">
                          <span className="text-[#0C1829] font-bold">—</span>
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How I Approach Problems section in Midnight Deep Blue */}
      <section className="mt-20 p-8 sm:p-12 bg-[#071120] text-[#FAF9F5] border border-[#162842] shadow-xl">
        <div className="max-w-3xl space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-bold block">
            HOW I APPROACH PROBLEMS
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Understand the system before automating it.
          </h2>
          <p className="font-serif-body text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            In an era where generative AI models and automation scripts are readily accessible, the differentiator is rarely the code itself—it is the precision of problem framing. Before introducing algorithms or automations, I rigorously dissect the underlying business incentives, human bottlenecks, and failure modes.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#CBD5E1]">
            <span className="text-white font-bold">SYSTEM OBSERVATION FIRST</span>
            <span className="text-[#38BDF8]">·</span>
            <span className="text-white font-bold">HUMAN-IN-THE-LOOP GUARDRAILS</span>
            <span className="text-[#38BDF8]">·</span>
            <span className="text-white font-bold">COMMERCIAL IMPACT</span>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { EditorialImageFrame } from "../components/media/EditorialImageFrame";

export const AchievementsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Newspaper Broadsheet Header in Deep Blue */}
      <div className="pt-8 sm:pt-12 pb-6 border-b-2 border-[#0C1829] mb-8">
        <div className="flex items-center justify-between text-xs font-mono text-[#4E5D73] pb-2 border-b border-[#D5DCE6] mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#0C1829] font-bold">SECTION III</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#0C1829] font-semibold">PUBLIC RECORD & RECOGNITION</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[#4E5D73]">
            <span>CURATED ARCHIVE</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#0C1829] font-bold">VERIFIED PUBLIC RECORD</span>
          </div>
        </div>

        <h1 className="font-serif-title text-5xl sm:text-7xl md:text-8xl font-black text-[#0C1829] tracking-tight text-center uppercase py-3">
          The Personal Edition
        </h1>

        <div className="flex items-center justify-between border-t border-b border-[#D5DCE6] py-2 text-xs font-serif-body italic text-[#4E5D73] text-center px-4">
          <span className="hidden sm:inline font-mono not-italic text-[#0C1829] font-semibold">Gurgaon, India</span>
          <span className="mx-auto sm:mx-0">
            Leadership, recognition, ideas, and the moments that shaped the journey.
          </span>
          <span className="hidden sm:inline font-mono not-italic text-[#0C1829] font-bold">Authentic Records Only</span>
        </div>
      </div>

      {/* Broadsheet Multi-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left & Center: Lead Stories (8 cols) */}
        <div className="lg:col-span-8 space-y-12">
          {/* LEAD STORY: Times Square Billboard Feature */}
          <article className="p-8 bg-[#F3F5F9] border border-[#D5DCE6] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#D5DCE6] mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0C1829] font-bold">
                Lead Story · Media Feature
              </span>
              <span className="font-mono text-xs text-[#0C1829] font-bold">NEW YORK CITY, USA</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0C1829] leading-[1.08] mb-4">
              A moment on the world&apos;s most recognisable media landscape.
            </h2>

            <p className="font-serif-body text-base sm:text-lg text-[#0C1829] leading-relaxed mb-6 font-medium">
              Sohail Khan was featured on an iconic Times Square billboard in New York. A standout visual and public-facing milestone showcasing international resonance.
            </p>

            {/* Media Container with slotId="times_square" */}
            <div>
              <EditorialImageFrame
                slotId="times_square"
                aspectRatioClass="aspect-[16/9] sm:aspect-[16/10]"
                altText="Times Square Billboard Feature — Sohail Khan"
                defaultCaption="Times Square, New York City · Media Feature"
              />
            </div>
          </article>

          {/* TWO SUPPORTING STORIES SIDE-BY-SIDE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Supporting Story 1: TEDx */}
            <article className="p-6 bg-[#F3F5F9] border border-[#D5DCE6] flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#D5DCE6] mb-4">
                  <span className="font-mono text-xs text-[#0C1829] font-bold uppercase">
                    Keynote Stage
                  </span>
                  <span className="font-mono text-xs text-[#0C1829] font-bold">2022</span>
                </div>
                <h3 className="font-serif-title text-2xl font-bold text-[#0C1829] mb-3 leading-snug">
                  Leadership and consistency, on the TEDx stage.
                </h3>
                <p className="font-serif-body text-sm text-[#4E5D73] leading-relaxed mb-4">
                  Sohail delivered a TEDx talk in 2022 on &ldquo;Leadership and Consistency&rdquo;, articulating how small, deliberate habits construct long-term creative clarity.
                </p>
                <div className="mb-4">
                  <EditorialImageFrame
                    slotId="tedx"
                    aspectRatioClass="aspect-[4/3]"
                    altText="TEDx Stage Talk 2022 — Sohail Khan"
                    defaultCaption="TEDx · Leadership & Consistency · 2022"
                  />
                </div>
              </div>
              <div className="pt-3 border-t border-[#D5DCE6] text-xs font-mono text-[#4E5D73]">
                Audience engagement & live presentation
              </div>
            </article>

            {/* Supporting Story 2: Fashion Society Leadership */}
            <article className="p-6 bg-[#F3F5F9] border border-[#D5DCE6] flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#D5DCE6] mb-4">
                  <span className="font-mono text-xs text-[#0C1829] font-bold uppercase">
                    Creative Leadership
                  </span>
                  <span className="font-mono text-xs text-[#0C1829] font-bold">BENNETT UNIV</span>
                </div>
                <h3 className="font-serif-title text-2xl font-bold text-[#0C1829] mb-3 leading-snug">
                  Where creative direction meets team leadership.
                </h3>
                <p className="font-serif-body text-sm text-[#4E5D73] leading-relaxed mb-4">
                  Sohail served as Head of the Fashion Society at Bennett University, leading aesthetic direction, coordinating student showcases, and championing creative community culture.
                </p>
                <div className="mb-4">
                  <EditorialImageFrame
                    slotId="fashion"
                    aspectRatioClass="aspect-[4/3]"
                    altText="Bennett University Fashion Society Creative Leadership"
                    defaultCaption="Fashion Society · Creative Direction"
                  />
                </div>
              </div>
              <div className="pt-3 border-t border-[#D5DCE6] text-xs font-mono text-[#4E5D73]">
                Student community creative direction
              </div>
            </article>
          </div>

          {/* Ruhaniyat Story: Mental Health Advocacy */}
          <article className="p-8 bg-[#F3F5F9] border border-[#D5DCE6] shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#D5DCE6] mb-4">
              <span className="font-mono text-xs text-[#0C1829] font-bold uppercase">
                Community & Empathy
              </span>
              <span className="font-mono text-xs text-[#0C1829] font-bold">MENTAL HEALTH INITIATIVE</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0C1829]">
                  Making space for conversations that matter.
                </h3>
                <p className="font-serif-body text-sm sm:text-base text-[#4E5D73] leading-relaxed">
                  Sohail served as Head of Ruhaniyat, the student-led mental health club at Bennett University. The initiative focused on breaking stigma, creating compassionate listening circles, and normalizing peer support discussions across the university.
                </p>
                <p className="font-mono text-xs text-[#4E5D73]">
                  *Framed strictly around student leadership and peer awareness; does not imply clinical practice.
                </p>
              </div>
              <div className="md:col-span-5">
                <EditorialImageFrame
                  slotId="ruhaniyat"
                  aspectRatioClass="aspect-[4/3]"
                  altText="Head of Ruhaniyat Mental Health Club"
                  defaultCaption="Ruhaniyat · Community Wellness"
                />
              </div>
            </div>
          </article>
        </div>

        {/* Right: Vertical Archive & Highlights Column (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Curated Editorial Highlights Box */}
          <div className="p-6 bg-[#F3F5F9] border border-[#D5DCE6] space-y-6 shadow-xs">
            <div className="pb-3 border-b border-[#D5DCE6] flex justify-between items-center">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold">
                Archival Record Index
              </span>
              <ShieldCheck className="w-4 h-4 text-[#0C1829]" />
            </div>

            <div className="space-y-6 text-xs">
              {/* Metric 1 */}
              <div className="border-b border-[#D5DCE6] pb-4">
                <span className="font-mono text-[10px] text-[#4E5D73] uppercase font-bold block">
                  ADVISORY FOOTPRINT
                </span>
                <span className="font-serif-title text-3xl font-bold text-[#0C1829] block my-1">
                  75+ Founders
                </span>
                <p className="text-[#4E5D73] font-serif-body leading-relaxed">
                  Advised on early product validation, customer feedback synthesis, and business model design.
                </p>
              </div>

              {/* Metric 2 */}
              <div className="border-b border-[#D5DCE6] pb-4">
                <span className="font-mono text-[10px] text-[#4E5D73] uppercase font-bold block">
                  CONSULTING SCALE
                </span>
                <span className="font-serif-title text-3xl font-bold text-[#0C1829] block my-1">
                  250+ Engagements
                </span>
                <p className="text-[#4E5D73] font-serif-body leading-relaxed">
                  Conducted across European and Middle Eastern executives, focusing on positioning and market demand.
                </p>
              </div>

              {/* Metric 3 */}
              <div className="border-b border-[#D5DCE6] pb-4">
                <span className="font-mono text-[10px] text-[#4E5D73] uppercase font-bold block">
                  SINGLE-MONTH REVENUE
                </span>
                <span className="font-serif-title text-3xl font-bold text-[#0C1829] block my-1">
                  ₹65 Lakh+
                </span>
                <p className="text-[#4E5D73] font-serif-body leading-relaxed">
                  Generated in a single month via consultative advisory services (Topmate tenure). Preserved as a single-month milestone.
                </p>
              </div>

              {/* Metric 4 */}
              <div>
                <span className="font-mono text-[10px] text-[#4E5D73] uppercase font-bold block">
                  STAGE KEYNOTE
                </span>
                <span className="font-serif-title text-2xl font-bold text-[#0C1829] block my-1">
                  TEDx Speaker · 2022
                </span>
                <p className="text-[#4E5D73] font-serif-body leading-relaxed">
                  Delivered keynote on &ldquo;Leadership & Consistency&rdquo; to student and young professional cohorts.
                </p>
              </div>
            </div>
          </div>

          {/* Quick links to leadership & education */}
          <div className="p-6 bg-[#FAF9F5] border border-[#D5DCE6] space-y-4 shadow-xs">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold block">
              Related Editorial Chapters
            </span>
            <ul className="space-y-3 text-xs font-mono">
              <li>
                <Link
                  to="/leadership"
                  className="hover:text-[#162E51] flex items-center justify-between group text-[#0C1829] font-medium"
                >
                  <span>Leadership & Speaking Chapter</span>
                  <span className="group-hover:translate-x-1 transition-transform text-[#0C1829]">→</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/product-thinking"
                  className="hover:text-[#162E51] flex items-center justify-between group text-[#0C1829] font-medium"
                >
                  <span>Product Strategy & GenAI Pillars</span>
                  <span className="group-hover:translate-x-1 transition-transform text-[#0C1829]">→</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/education"
                  className="hover:text-[#162E51] flex items-center justify-between group text-[#0C1829] font-medium"
                >
                  <span>Education & Certifications Record</span>
                  <span className="group-hover:translate-x-1 transition-transform text-[#0C1829]">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

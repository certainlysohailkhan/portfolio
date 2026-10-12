import React from "react";
import { PageHeader } from "../components/common/PageHeader";
import { EditorialImageFrame } from "../components/media/EditorialImageFrame";

export const LeadershipPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <PageHeader
        kicker="CREATIVE & PUBLIC ENGAGEMENT"
        issueLabel="THE SOHAIL KHAN EDITION"
        headline="Leadership is also how you create space for others."
        subheadline="An intimate look at public speaking, creative community leadership, and mental health advocacy."
      />

      {/* The 3 Editorial Chapters */}
      <div className="space-y-16 mt-8">
        {/* CHAPTER 01: TEDx */}
        <section className="p-8 sm:p-12 bg-[#F3F5F9] border border-[#D5DCE6] space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#D5DCE6]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0C1829] font-bold">
                CHAPTER 01
              </span>
              <span className="text-[#CBD5E1]">/</span>
              <span className="font-mono text-xs text-[#0C1829] font-bold">
                PUBLIC SPEAKING & KEYNOTE
              </span>
            </div>
            <span className="font-mono text-xs text-[#0C1829] font-bold">YEAR 2022</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0C1829]">
                TEDx Speaker: Leadership and Consistency
              </h2>
              <p className="font-serif-body text-lg sm:text-xl text-[#0C1829] leading-relaxed font-medium">
                In 2022, Sohail took the TEDx stage to deliver a talk exploring how early personal consistency, resilient habit formation, and intentional daily choices shape enduring leadership.
              </p>
              <p className="font-serif-body text-base text-[#4E5D73] leading-relaxed">
                Rather than treating leadership as an abstract title or external authority, the keynote focused on internal discipline: showing up when motivation wanes and maintaining alignment with personal core principles.
              </p>
            </div>

            <div className="lg:col-span-5">
              <EditorialImageFrame
                slotId="tedx"
                aspectRatioClass="aspect-[16/10]"
                altText="Sohail Khan TEDx Keynote Stage 2022"
                defaultCaption="TEDx · Leadership & Consistency · 2022"
              />
            </div>
          </div>
        </section>

        {/* CHAPTER 02: Fashion Society */}
        <section className="p-8 sm:p-12 bg-[#F3F5F9] border border-[#D5DCE6] space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#D5DCE6]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0C1829] font-bold">
                CHAPTER 02
              </span>
              <span className="text-[#CBD5E1]">/</span>
              <span className="font-mono text-xs text-[#0C1829] font-bold">
                CREATIVE DIRECTION & COMMUNITY
              </span>
            </div>
            <span className="font-mono text-xs text-[#0C1829] font-bold">BENNETT UNIVERSITY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <EditorialImageFrame
                slotId="fashion"
                aspectRatioClass="aspect-[4/3]"
                altText="Fashion Society Creative Leadership at Bennett University"
                defaultCaption="Bennett University Fashion Society · Creative Leadership"
              />
            </div>

            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0C1829]">
                Head of Fashion Society
              </h2>
              <p className="font-serif-body text-lg sm:text-xl text-[#0C1829] leading-relaxed font-medium">
                As Head of the Fashion Society at Bennett University, Sohail directed visual themes, coordinated student creative showcases, and cultivated a platform for individual artistic expression.
              </p>
              <p className="font-serif-body text-base text-[#4E5D73] leading-relaxed">
                This chapter honed his sensibilities for aesthetic harmony, spatial staging, event curation, and cross-functional team coordination—creative instincts that directly influence his approach to product design and digital publishing.
              </p>
            </div>
          </div>
        </section>

        {/* CHAPTER 03: Ruhaniyat */}
        <section className="p-8 sm:p-12 bg-[#F3F5F9] border border-[#D5DCE6] space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#D5DCE6]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0C1829] font-bold">
                CHAPTER 03
              </span>
              <span className="text-[#CBD5E1]">/</span>
              <span className="font-mono text-xs text-[#0C1829] font-bold">
                MENTAL HEALTH & EMPATHY
              </span>
            </div>
            <span className="font-mono text-xs text-[#0C1829] font-bold">BENNETT UNIVERSITY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0C1829]">
                Head of Ruhaniyat
              </h2>
              <p className="font-serif-body text-lg sm:text-xl text-[#0C1829] leading-relaxed font-medium">
                Serving as Head of Ruhaniyat, the student-led mental health club at Bennett University, Sohail championed vulnerable dialogue, peer community circles, and destigmatization of mental wellness conversations.
              </p>
              <p className="font-serif-body text-base text-[#4E5D73] leading-relaxed">
                The initiative was grounded in active listening, empathy, and providing students with accessible, supportive forums. This experience deepened his focus on human psychological safety in team dynamics.
              </p>
            </div>

            <div className="lg:col-span-5">
              <EditorialImageFrame
                slotId="ruhaniyat"
                aspectRatioClass="aspect-[4/3]"
                altText="Head of Ruhaniyat Mental Health Club at Bennett University"
                defaultCaption="Ruhaniyat · Mental Wellness Club"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

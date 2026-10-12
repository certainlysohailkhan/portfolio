import React from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Plane,
  Download,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Radio,
  Sliders,
  Cpu,
  MapPin,
  CheckCircle2,
  Navigation,
  Wind,
} from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { EditorialImageFrame } from "../components/media/EditorialImageFrame";
import { useResume } from "../context/ResumeContext";

export const HomePage: React.FC = () => {
  const { triggerDownload } = useResume();

  // Career flight path waypoints
  const flightWaypoints = [
    {
      code: "WP-01",
      altitude: "TAKEOFF · 2022",
      role: "B.Tech Computer Science (Blockchain)",
      organization: "Bennett University",
      notes: "Systems engineering, algorithmic foundations & blockchain architecture.",
      coordinates: "28.4595° N, 77.0266° E",
    },
    {
      code: "WP-02",
      altitude: "CLIMB",
      role: "Business Data Analyst",
      organization: "Process360 Ltd.",
      notes: "Process mapping, operational QA, risk assessment & structured dataset analysis.",
      coordinates: "HYDERABAD, IN",
    },
    {
      code: "WP-03",
      altitude: "VECTOR",
      role: "Product Management (Lifecycle)",
      organization: "Leap Scholar",
      notes: "Customer onboarding, lifecycle strategy & international education products for MENA.",
      coordinates: "BENGALURU, IN",
    },
    {
      code: "WP-04",
      altitude: "ASCENT",
      role: "Senior Consultant & PM Intern",
      organization: "Topmate.io",
      notes: "250+ consultative engagements across EU & Middle East; ₹65L+ monthly revenue record.",
      coordinates: "BENGALURU, IN",
    },
    {
      code: "WP-05",
      altitude: "CRUISING",
      role: "Growth Consultant",
      organization: "Masters' Union",
      notes: "Advising 75+ founders on product validation, PMF exploration & business model design.",
      coordinates: "GURUGRAM, IN",
    },
  ];

  // In-flight safety briefing cards
  const safetyCards = [
    {
      code: "FIG. 1",
      title: "In Case of Ambiguity",
      subtitle: "Secure Problem Definition First",
      instruction:
        "Before implementing features or building prototypes, isolate the true root friction. Customer interviews and hypothesis validation form the emergency oxygen mask.",
      tag: "DISCOVERY PROTOCOL",
    },
    {
      code: "FIG. 2",
      title: "Workflow Pressurization",
      subtitle: "Understand · Redesign · Automate",
      instruction:
        "Never automate a flawed manual workflow. Map human-in-the-loop checkpoints first, eliminate bottlenecks, and only then deploy AI and foundation models.",
      tag: "INTELLIGENT SYSTEMS",
    },
    {
      code: "FIG. 3",
      title: "Cruising Altitude Levers",
      subtitle: "Founder Advisory & PMF",
      instruction:
        "Guide pre-seed to growth ventures on unit economics, retention loops, and go-to-market mechanics to maintain sustainable altitude and positive cash flow.",
      tag: "COMMERCIAL ADVISORY",
    },
    {
      code: "FIG. 4",
      title: "System Redundancy",
      subtitle: "Data Telemetry & Dashboards",
      instruction:
        "Connect SQL data layers, Power BI executive dashboards, and webhook orchestrations so business decisions rely on real instruments rather than guesswork.",
      tag: "TELEMETRY & RADAR",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. Aviation Boarding Pass Micro-Header Bar */}
      <div className="bg-[#0C1829] text-white py-2 px-4 sm:px-6 lg:px-8 border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-[11px] font-mono gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5 text-[#38BDF8] font-bold tracking-widest uppercase">
              <Plane className="w-3.5 h-3.5 text-[#38BDF8]" />
              FLIGHT SK-2026
            </span>
            <span className="text-[#334155]">|</span>
            <span className="text-[#CBD5E1]">SEAT 01A · FIRST CLASS</span>
            <span className="text-[#334155] hidden sm:inline">|</span>
            <span className="text-[#94A3B8] hidden sm:inline">GATE: GURGAON (DEL)</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5 text-[#BAE6FD]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
              FLIGHT PATH: CLEAR FOR CRUISE
            </span>
            <span className="text-[#334155]">|</span>
            <span className="text-[#38BDF8] font-bold">ALTITUDE 38,000 FT</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Section: Welcome Aboard — Aircraft Cabin & Cloud Window View */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#F3F6FA] to-[#FAF9F5] pt-10 sm:pt-14 pb-16 sm:pb-20 border-b border-[#D5DCE6]">
        {/* Subtle aviation background navigation grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#0C1829 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Aircraft Safety Guide Kicker Ribbon */}
          <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-[#D5DCE6] mb-8 sm:mb-12">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-2 py-0.5 bg-[#0C1829] text-[#38BDF8] font-bold tracking-widest uppercase text-[10px]">
                WELCOME ABOARD
              </span>
              <span className="text-[#CBD5E1]">·</span>
              <span className="font-semibold text-[#0C1829] tracking-wider uppercase">
                YOUR GUIDE TO MY FLIGHT PATH
              </span>
            </div>
            <div className="hidden md:flex items-center gap-3 text-[#4E5D73]">
              <span>TYPE: PM-AI</span>
              <span className="text-[#CBD5E1]">·</span>
              <span className="font-bold text-[#0C1829]">EDITION 2026</span>
            </div>
          </div>

          {/* 2-Column Split: Editorial Cockpit / Cabin Window & Flight Path Copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column (7 cols): Welcome Aboard Storytelling */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#0284C7] font-bold uppercase tracking-widest mb-3">
                  <Compass className="w-4 h-4 text-[#0284C7]" />
                  <span>PASSENGER BRIEFING · CAREER FLIGHT MANUAL</span>
                </div>

                <h1 className="font-serif-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0C1829] tracking-tight leading-[1.05] text-balance">
                  Every Career Has a Flight Path.{" "}
                  <span className="text-[#0C1829] underline decoration-[#38BDF8] decoration-2 underline-offset-6">
                    Here&apos;s Mine.
                  </span>
                </h1>
              </div>

              {/* Verified Editorial Quote */}
              <blockquote className="font-serif-body text-xl sm:text-2xl lg:text-3xl text-[#0C1829] italic leading-relaxed font-medium pl-4 sm:pl-6 border-l-3 border-[#0C1829]">
                &ldquo;An exploration of the products I&apos;ve built, the problems I&apos;ve solved, and the future I&apos;m working towards.&rdquo;
              </blockquote>

              {/* Supporting Executive Synopsis */}
              <p className="font-serif-body text-base sm:text-lg text-[#4E5D73] leading-relaxed max-w-2xl">
                I’m <strong className="text-[#0C1829] font-bold">Sohail Khan</strong> — an AI Product Manager and growth consultant working at the intersection of product strategy, generative AI, business operations, and founder advisory. From discovering the real problem to designing the right system, I focus on making ideas actionable.
              </p>

              {/* Primary Call-to-Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#flight-path"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0C1829] hover:bg-[#162E51] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md group cursor-pointer border border-[#0C1829]"
                >
                  <Navigation className="w-4 h-4 text-[#38BDF8] transition-transform group-hover:rotate-45" />
                  <span>Explore My Flight Path</span>
                </a>

                <Link
                  to="/product-thinking"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-[#0C1829] hover:bg-[#F3F5F9] text-[#0C1829] text-xs font-semibold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
                >
                  <span>View My Projects</span>
                  <ArrowRight className="w-4 h-4 text-[#0C1829]" />
                </Link>

                <button
                  type="button"
                  onClick={triggerDownload}
                  className="inline-flex items-center gap-2 px-4 py-3.5 border border-[#D5DCE6] hover:border-[#0C1829] hover:bg-white text-[#4E5D73] hover:text-[#0C1829] text-xs font-mono font-medium tracking-wider uppercase transition-colors cursor-pointer"
                  title="Download verified resume PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Flight Manifest (Resume)</span>
                </button>
              </div>

              {/* Micro In-Flight Notice */}
              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
                  VERIFIED PUBLIC RECORD
                </span>
                <span className="text-[#CBD5E1]">·</span>
                <span>GURGAON, INDIA</span>
                <span className="text-[#CBD5E1]">·</span>
                <span className="text-[#0C1829] font-semibold">2026 PORTFOLIO</span>
              </div>
            </div>

            {/* Right Column (5 cols): Airplane Cabin Window Frame with Executive Portrait */}
            <div className="lg:col-span-5 relative">
              {/* Outer Aircraft Fuselage / Window Bezel */}
              <div className="relative p-3 sm:p-4 bg-gradient-to-br from-[#E2E8F0] via-[#FAF9F5] to-[#CBD5E1] border-2 border-[#94A3B8] shadow-2xl rounded-3xl">
                {/* Aircraft Window Oval Bezel */}
                <div className="relative overflow-hidden rounded-2xl border-4 border-[#0C1829] bg-[#071120]">
                  {/* Top Window Sun-Glare Reflection */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/15 to-transparent pointer-events-none z-10" />

                  {/* High-Resolution Clickable Editorial Image Frame */}
                  <EditorialImageFrame
                    slotId="portrait"
                    aspectRatioClass="aspect-[4/5]"
                    altText="Sohail Khan — AI Product Manager & Growth Consultant"
                    defaultCaption="Captain Sohail Khan · Gurugram, India · Executive Portrait"
                    sideLabel="FLIGHT DECK · AI & STRATEGY"
                  />

                  {/* Bottom Window Altitude Indicator Plaque */}
                  <div className="p-3 bg-[#0C1829] border-t border-[#1E3A5F] flex items-center justify-between text-[11px] font-mono text-[#BAE6FD]">
                    <div className="flex items-center gap-2">
                      <Radio className="w-3 h-3 text-[#38BDF8] animate-pulse" />
                      <span className="font-bold text-white">RADAR FIX: ACTIVE</span>
                    </div>
                    <span className="text-[#38BDF8] font-bold">FL 380 · 28.45° N</span>
                  </div>
                </div>

                {/* Decorative Window Fastener Screws */}
                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#64748B] border border-white/60" />
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#64748B] border border-white/60" />
                <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#64748B] border border-white/60" />
                <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#64748B] border border-white/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Flight Telemetry & Cruising Instruments (Verified Metrics Strip) */}
      <section className="bg-[#0C1829] text-white py-12 px-4 sm:px-6 lg:px-8 border-y-2 border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between pb-4 border-b border-[#1E3A5F] mb-8 text-xs font-mono">
            <span className="text-[#38BDF8] font-bold tracking-widest uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#38BDF8]" />
              CRUISING TELEMETRY · PERFORMANCE INSTRUMENTS
            </span>
            <span className="text-[#94A3B8] hidden sm:inline">
              CALIBRATED PUBLIC ENGAGEMENTS
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
            {PORTFOLIO_DATA.facts.map((fact, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 bg-[#071120] border border-[#1E3A5F] hover:border-[#38BDF8] transition-colors"
              >
                <div className="font-mono text-[10px] text-[#38BDF8] font-bold tracking-widest uppercase mb-1">
                  METRIC 0{idx + 1}
                </div>
                <div className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight tabular-nums">
                  {fact.number}
                </div>
                <div className="font-mono text-xs font-bold text-[#BAE6FD] uppercase tracking-wider mt-2">
                  {fact.label}
                </div>
                <div className="text-[11px] text-[#94A3B8] font-serif-body italic mt-1 leading-snug">
                  {fact.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. In-Flight Passenger Safety Information Card (The Product Playbook) */}
      <section className="py-16 sm:py-20 bg-[#FAF9F5] border-b border-[#D5DCE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 bg-[#FAF9F5] border-2 border-[#0C1829] shadow-xl relative">
            {/* Laminated Card Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-[#0C1829] mb-8">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#0C1829] font-bold tracking-widest uppercase mb-1">
                  <Wind className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>SEAT POCKET MANUAL · DO NOT REMOVE FROM AIRCRAFT</span>
                </div>
                <h2 className="font-serif-title text-2xl sm:text-4xl font-black text-[#0C1829] tracking-tight uppercase">
                  Safety Information Card · Type PM-AI
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-3 py-1 bg-[#0C1829] text-white font-bold tracking-wider uppercase">
                  INSTRUCTIONS FOR OPERATIONAL STABILITY
                </span>
              </div>
            </div>

            {/* 4 Pictographic Safety Diagrams */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyCards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-[#0C1829] flex flex-col justify-between hover:shadow-md transition-shadow relative"
                >
                  {/* Top Schematic Number */}
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4 text-xs font-mono">
                      <span className="font-bold text-[#0C1829]">{card.code}</span>
                      <span className="text-[10px] text-[#0284C7] font-bold tracking-wider">
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="font-serif-title text-xl font-bold text-[#0C1829] leading-snug mb-1">
                      {card.title}
                    </h3>
                    <h4 className="font-mono text-[11px] text-[#4E5D73] font-semibold uppercase mb-3">
                      {card.subtitle}
                    </h4>

                    <p className="font-serif-body text-xs text-[#4E5D73] leading-relaxed">
                      {card.instruction}
                    </p>
                  </div>

                  {/* Micro Checklist Footer */}
                  <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono text-[#0C1829]">
                    <span className="flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3 h-3 text-[#0284C7]" />
                      PROTOCOL VERIFIED
                    </span>
                    <span className="text-[#94A3B8]">0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Caution Banner */}
            <div className="mt-8 pt-4 border-t border-[#D5DCE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#4E5D73]">
              <span className="font-semibold text-[#0C1829]">
                NOTICE: Applicable during all phases of product incubation, market entry, and system automation.
              </span>
              <Link
                to="/product-thinking"
                className="font-bold text-[#0C1829] hover:underline flex items-center gap-1 uppercase shrink-0"
              >
                <span>Read Complete PM Playbook</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Flight Path Waypoints (Career Route Map) */}
      <section id="flight-path" className="py-16 sm:py-20 bg-[#F3F6FA] border-b border-[#D5DCE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#D5DCE6] mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#0C1829] font-bold block mb-1">
                NAVIGATIONAL LOG · RADAR TRAJECTORY
              </span>
              <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0C1829]">
                Career Flight Path &amp; Waypoints
              </h2>
            </div>
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0C1829] hover:text-[#162E51] font-bold transition-colors"
            >
              <span>Explore Complete Logbook</span>
              <ArrowRight className="w-4 h-4 text-[#0C1829]" />
            </Link>
          </div>

          {/* Sequential Waypoint Route Cards */}
          <div className="space-y-4">
            {flightWaypoints.map((wp, idx) => (
              <div
                key={wp.code}
                className="p-5 sm:p-6 bg-white border border-[#D5DCE6] hover:border-[#0C1829] transition-all group shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Left: Waypoint code & altitude */}
                <div className="flex items-center gap-4 lg:w-64 shrink-0">
                  <div className="w-10 h-10 bg-[#0C1829] text-[#38BDF8] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {wp.code}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#0284C7] font-bold tracking-widest uppercase block">
                      {wp.altitude}
                    </span>
                    <span className="font-mono text-xs text-[#4E5D73] font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#64748B]" />
                      {wp.coordinates}
                    </span>
                  </div>
                </div>

                {/* Center: Role & Organization */}
                <div className="flex-1 lg:px-6 border-l lg:border-[#E2E8F0]">
                  <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#0C1829] group-hover:text-[#162E51] transition-colors">
                    {wp.role}
                  </h3>
                  <div className="font-mono text-xs text-[#0C1829] font-semibold mt-0.5">
                    {wp.organization}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4E5D73] font-serif-body mt-1">
                    {wp.notes}
                  </p>
                </div>

                {/* Right: Waypoint Action */}
                <div className="lg:w-40 flex lg:justify-end shrink-0 pt-2 lg:pt-0">
                  <Link
                    to="/experience"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0C1829] hover:text-[#0284C7] uppercase transition-colors"
                  >
                    <span>View Waypoint</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Navigation Systems & Cabin Equipment (The 4 Practice Pillars) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#D5DCE6] mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#0C1829] font-bold block mb-1">
              AVIONICS &amp; CORE SYSTEMS
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0C1829]">
              Cabin Equipment &amp; Practice Areas
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4E5D73] max-w-md font-serif-body">
            Four specialized disciplines spanning discovery, algorithmic foundations, founder advisory, and execution.
          </p>
        </div>

        {/* 4 Practice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.storiesPreview.map((story, idx) => (
            <article
              key={story.id}
              className="p-8 bg-[#F3F5F9] border border-[#D5DCE6] flex flex-col justify-between hover:border-[#0C1829] transition-all group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#D5DCE6] mb-6">
                  <span className="font-mono text-xs text-[#0C1829] font-bold uppercase tracking-wider">
                    SYSTEM 0{idx + 1} · {story.tag}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#4E5D73] group-hover:text-[#0C1829] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0C1829] group-hover:text-[#162E51] transition-colors mb-3">
                  {story.title}
                </h3>
                <p className="text-sm text-[#4E5D73] font-serif-body leading-relaxed mb-6">
                  {story.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D5DCE6] flex items-center justify-between text-xs font-mono">
                <Link
                  to={story.route}
                  className="font-bold text-[#0C1829] group-hover:text-[#162E51] flex items-center gap-1 transition-colors uppercase"
                >
                  <span>Explore Practice Specs</span>
                  <span>→</span>
                </Link>
                <span className="text-[#4E5D73] font-semibold">CHAPTER {idx + 1}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Public Milestones & Recognition Showcase (Times Square & TEDx) */}
      <section className="py-16 sm:py-20 bg-[#F1F4F9] border-t border-[#D5DCE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#D5DCE6] mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#0C1829] font-bold block mb-1">
                RADAR FIXES · VISIBLE MILESTONES
              </span>
              <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0C1829]">
                Public Recognition &amp; Stages
              </h2>
            </div>
            <Link
              to="/achievements"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0C1829] hover:text-[#162E51] font-bold transition-colors"
            >
              <span>View All Records</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0C1829]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Times Square */}
            <div className="bg-[#FAF9F5] p-6 border border-[#D5DCE6] flex flex-col justify-between shadow-xs">
              <div>
                <span className="font-mono text-[11px] text-[#0C1829] font-bold uppercase tracking-wider block mb-2">
                  01 · Global Media Landmark
                </span>
                <h3 className="font-serif-title text-2xl font-bold text-[#0C1829] mb-2">
                  Times Square Billboard
                </h3>
                <p className="text-xs text-[#4E5D73] font-serif-body leading-relaxed mb-4">
                  New York City, USA — Featured on the iconic Times Square digital media landscape.
                </p>
                <div className="mb-4">
                  <EditorialImageFrame
                    slotId="times_square"
                    aspectRatioClass="aspect-[16/10]"
                    altText="Times Square Billboard Feature — Sohail Khan"
                    defaultCaption="Times Square, New York City · Media Feature"
                  />
                </div>
              </div>
              <Link
                to="/achievements"
                className="text-xs font-mono uppercase font-bold text-[#0C1829] hover:text-[#162E51] inline-flex items-center gap-1"
              >
                <span>Read Story</span>
                <span>→</span>
              </Link>
            </div>

            {/* TEDx */}
            <div className="bg-[#FAF9F5] p-6 border border-[#D5DCE6] flex flex-col justify-between shadow-xs">
              <div>
                <span className="font-mono text-[11px] text-[#0C1829] font-bold uppercase tracking-wider block mb-2">
                  02 · Keynote Presentation
                </span>
                <h3 className="font-serif-title text-2xl font-bold text-[#0C1829] mb-2">
                  TEDx Speaker (2022)
                </h3>
                <p className="text-xs text-[#4E5D73] font-serif-body leading-relaxed mb-4">
                  Keynote address on &ldquo;Leadership &amp; Consistency&rdquo;, exploring intentional habits and endurance.
                </p>
                <div className="mb-4">
                  <EditorialImageFrame
                    slotId="tedx"
                    aspectRatioClass="aspect-[16/10]"
                    altText="Sohail Khan TEDx Keynote 2022"
                    defaultCaption="TEDx · Leadership & Consistency · 2022"
                  />
                </div>
              </div>
              <Link
                to="/leadership"
                className="text-xs font-mono uppercase font-bold text-[#0C1829] hover:text-[#162E51] inline-flex items-center gap-1"
              >
                <span>Read Story</span>
                <span>→</span>
              </Link>
            </div>

            {/* Fashion Society */}
            <div className="bg-[#FAF9F5] p-6 border border-[#D5DCE6] flex flex-col justify-between shadow-xs">
              <div>
                <span className="font-mono text-[11px] text-[#0C1829] font-bold uppercase tracking-wider block mb-2">
                  03 · Creative Direction
                </span>
                <h3 className="font-serif-title text-2xl font-bold text-[#0C1829] mb-2">
                  Head of Fashion Society
                </h3>
                <p className="text-xs text-[#4E5D73] font-serif-body leading-relaxed mb-4">
                  Bennett University — Leading visual expression, student showcases, and runway collaboration.
                </p>
                <div className="mb-4">
                  <EditorialImageFrame
                    slotId="fashion"
                    aspectRatioClass="aspect-[16/10]"
                    altText="Bennett University Fashion Society Leadership"
                    defaultCaption="Fashion Society · Creative Direction"
                  />
                </div>
              </div>
              <Link
                to="/leadership"
                className="text-xs font-mono uppercase font-bold text-[#0C1829] hover:text-[#162E51] inline-flex items-center gap-1"
              >
                <span>Read Story</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Captain's Log / Operating Ethos — Midnight Navy First-Class Climax */}
      <section className="bg-[#071120] text-[#FAF9F5] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#162842]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-bold block">
            CAPTAIN&apos;S LOG · CORE OPERATING PRINCIPLE
          </span>
          <blockquote className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
            &ldquo;{PORTFOLIO_DATA.principles.core}&rdquo;
          </blockquote>
          <p className="font-serif-body text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto">
            Ready for collaborative venture advisory, AI product leadership, and ambitious problems worth solving.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0C1829] border border-[#38BDF8]/40 hover:bg-[#162E51] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-md"
            >
              <span>Connect with Sohail</span>
              <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
            </Link>
            <button
              type="button"
              onClick={triggerDownload}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#1E3A5F] hover:border-white text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              title="Download verified resume PDF"
            >
              <Download className="w-4 h-4 text-[#38BDF8]" />
              <span>Download Flight Manifest</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

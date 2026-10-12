import React from "react";

interface CompanyLogo {
  name: string;
  role: string;
  period: string;
  svg: React.ReactNode;
}

const COMPANIES: CompanyLogo[] = [
  {
    name: "Masters' Union",
    role: "Growth Consultant",
    period: "",
    svg: (
      <svg
        className="h-8 w-auto max-w-[170px] transition-all duration-300 fill-current"
        viewBox="0 0 240 50"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Masters' Union Crest Emblem */}
        <g className="transition-colors group-hover:text-[#991B1B]">
          <path
            d="M 12 6 L 36 6 L 42 24 C 42 36 28 44 24 46 C 20 44 6 36 6 24 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <path
            d="M 14 14 L 20 28 L 24 18 L 28 28 L 34 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 18 33 Q 24 38 30 33"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        {/* Wordmark: MASTERS' UNION */}
        <text
          x="54"
          y="24"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="17"
          fontWeight="800"
          letterSpacing="0.08em"
          fill="currentColor"
        >
          MASTERS&apos;
        </text>
        <text
          x="54"
          y="41"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="0.16em"
          fill="currentColor"
          className="transition-colors group-hover:text-[#991B1B]"
        >
          UNION
        </text>
      </svg>
    ),
  },
  {
    name: "Topmate.io",
    role: "Senior Consultant & PM Intern",
    period: "",
    svg: (
      <svg
        className="h-8 w-auto max-w-[160px] transition-all duration-300 fill-current"
        viewBox="0 0 210 50"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Topmate distinctive smiling circular icon */}
        <g className="transition-colors group-hover:text-[#E84A27]">
          <circle cx="22" cy="25" r="16" fill="currentColor" fillOpacity="0.12" />
          <path
            d="M 13 22 Q 22 34 31 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="15" cy="16" r="2.2" fill="currentColor" />
          <circle cx="29" cy="16" r="2.2" fill="currentColor" />
        </g>
        {/* Wordmark: topmate.io */}
        <text
          x="48"
          y="33"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="24"
          fontWeight="800"
          letterSpacing="-0.03em"
          fill="currentColor"
        >
          topmate
        </text>
        <text
          x="152"
          y="33"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="18"
          fontWeight="700"
          letterSpacing="-0.02em"
          fill="currentColor"
          className="transition-colors group-hover:text-[#E84A27]"
        >
          .io
        </text>
      </svg>
    ),
  },
  {
    name: "Leap Scholar",
    role: "Product Management",
    period: "",
    svg: (
      <svg
        className="h-8 w-auto max-w-[170px] transition-all duration-300 fill-current"
        viewBox="0 0 230 50"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Leap dynamic geometric winged "L" icon */}
        <g className="transition-colors group-hover:text-[#059669]">
          <path
            d="M 10 38 L 10 12 L 22 24 L 38 24 L 20 38 Z"
            fill="currentColor"
          />
          <circle cx="32" cy="14" r="4" fill="currentColor" />
        </g>
        {/* Wordmark: LEAP SCHOLAR */}
        <text
          x="48"
          y="26"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="19"
          fontWeight="900"
          letterSpacing="0.04em"
          fill="currentColor"
        >
          LEAP
        </text>
        <text
          x="48"
          y="41"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.12em"
          fill="currentColor"
          className="transition-colors group-hover:text-[#059669]"
        >
          SCHOLAR
        </text>
      </svg>
    ),
  },
  {
    name: "Process360 Ltd.",
    role: "Business Data Analyst",
    period: "",
    svg: (
      <svg
        className="h-8 w-auto max-w-[180px] transition-all duration-300 fill-current"
        viewBox="0 0 240 50"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Process360 orbital node ring */}
        <g className="transition-colors group-hover:text-[#2563EB]">
          <circle cx="22" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="18 6" />
          <circle cx="22" cy="10" r="3" fill="currentColor" />
          <circle cx="34" cy="32" r="3" fill="currentColor" />
          <circle cx="10" cy="32" r="3" fill="currentColor" />
          <circle cx="22" cy="25" r="4.5" fill="currentColor" />
        </g>
        {/* Wordmark: Process 360 */}
        <text
          x="48"
          y="28"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="18"
          fontWeight="800"
          letterSpacing="-0.02em"
          fill="currentColor"
        >
          Process
        </text>
        <text
          x="122"
          y="28"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="18"
          fontWeight="800"
          fill="currentColor"
          className="transition-colors group-hover:text-[#2563EB]"
        >
          360
        </text>
        <text
          x="48"
          y="42"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="10"
          fontWeight="600"
          letterSpacing="0.18em"
          fill="currentColor"
          opacity="0.75"
        >
          LIMITED
        </text>
      </svg>
    ),
  },
];

export const CompanyLogoStrip: React.FC = () => {
  return (
    <div className="w-full pt-16 pb-10 border-t border-[#D5DCE6] mt-16 overflow-hidden select-none">
      {/* Editorial Section Kicker */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#0C1829] font-bold block mb-1">
            VERIFIED INDUSTRY TENURES
          </span>
          <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0C1829]">
            Organisations & Ventures Represented
          </h3>
        </div>
        <p className="text-xs text-[#4E5D73] font-mono">
          MASTERS&apos; UNION · TOPMATE.IO · LEAP SCHOLAR · PROCESS360
        </p>
      </div>

      {/* Marquee Wrapper with horizontal gradient masks */}
      <div
        className="relative w-full overflow-hidden py-6 bg-[#F3F5F9] border border-[#D5DCE6] shadow-xs group"
        role="region"
        aria-label="Companies represented in experience section"
      >
        {/* Left & Right gradient edge fades */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F3F5F9] to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F3F5F9] to-transparent z-10"
          aria-hidden="true"
        />

        {/* Animated Marquee Strip */}
        <div className="flex items-center gap-14 sm:gap-20 w-max animate-logo-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {/* Primary Set */}
          {COMPANIES.map((company, idx) => (
            <div
              key={`logo-primary-${idx}`}
              className="flex items-center gap-4 text-[#0C1829]/70 hover:text-[#0C1829] opacity-75 hover:opacity-100 transition-all duration-300 shrink-0 cursor-default px-2"
              title={`${company.name} — ${company.role}`}
            >
              {company.svg}
            </div>
          ))}

          {/* Clones Set 1 for seamless infinite loop (hidden from screen readers) */}
          {COMPANIES.map((company, idx) => (
            <div
              key={`logo-clone1-${idx}`}
              aria-hidden="true"
              className="flex items-center gap-4 text-[#0C1829]/70 hover:text-[#0C1829] opacity-75 hover:opacity-100 transition-all duration-300 shrink-0 cursor-default px-2"
            >
              {company.svg}
            </div>
          ))}

          {/* Clones Set 2 to guarantee seamless wide desktop loop */}
          {COMPANIES.map((company, idx) => (
            <div
              key={`logo-clone2-${idx}`}
              aria-hidden="true"
              className="flex items-center gap-4 text-[#0C1829]/70 hover:text-[#0C1829] opacity-75 hover:opacity-100 transition-all duration-300 shrink-0 cursor-default px-2"
            >
              {company.svg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

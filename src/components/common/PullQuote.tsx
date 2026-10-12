import React from "react";

interface PullQuoteProps {
  quote: string;
  attribution?: string;
  subtext?: string;
  theme?: "light" | "dark";
}

export const PullQuote: React.FC<PullQuoteProps> = ({
  quote,
  attribution = "Sohail Khan · Core Operating Principle",
  subtext,
  theme = "light",
}) => {
  const isDark = theme === "dark";

  return (
    <figure
      className={`relative my-12 sm:my-16 p-8 sm:p-12 border ${
        isDark
          ? "bg-[#071120] text-[#F8FAFC] border-[#162842]"
          : "bg-[#F3F5F9] text-[#0C1829] border-[#D5DCE6]"
      } overflow-hidden`}
    >
      <div className="absolute top-2 right-6 font-serif-title text-7xl sm:text-9xl opacity-15 select-none pointer-events-none text-[#0C1829]">
        &ldquo;
      </div>
      <blockquote className="relative z-10 font-serif-title text-2xl sm:text-3xl md:text-4xl leading-snug font-bold">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 pt-4 border-t border-[#D5DCE6] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#0C1829]">
          {attribution}
        </span>
        {subtext && (
          <span className="text-xs text-[#4E5D73] font-serif-body italic">
            {subtext}
          </span>
        )}
      </figcaption>
    </figure>
  );
};

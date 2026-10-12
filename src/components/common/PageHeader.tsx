import React from "react";

interface PageHeaderProps {
  kicker: string;
  issueLabel?: string;
  headline: string;
  subheadline?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  kicker,
  issueLabel = "THE PERSONAL EDITION",
  headline,
  subheadline,
}) => {
  return (
    <div className="pt-8 sm:pt-12 pb-8 border-b border-[#D5DCE6] mb-10 sm:mb-12">
      {/* Top micro metadata */}
      <div className="flex items-center justify-between text-xs font-mono text-[#4E5D73] pb-3 border-b border-[#E2E8F0] mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[#0C1829] font-bold tracking-wider">{issueLabel}</span>
          <span className="text-[#CBD5E1]">/</span>
          <span className="uppercase tracking-wider font-semibold text-[#0C1829]">{kicker}</span>
        </div>
        <div className="hidden sm:block text-[11px] uppercase tracking-widest text-[#4E5D73] font-semibold">
          FOLIO ARCHIVE
        </div>
      </div>

      {/* Main Headline in Deep Blue */}
      <h1 className="font-serif-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0C1829] tracking-tight leading-[1.08] max-w-5xl text-balance">
        {headline}
      </h1>

      {subheadline && (
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[#4E5D73] max-w-3xl font-serif-body leading-relaxed">
          {subheadline}
        </p>
      )}
    </div>
  );
};

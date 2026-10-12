import React from "react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export const FactStrip: React.FC = () => {
  return (
    <section className="w-full border-y border-[#D5DCE6] bg-[#F3F5F9] py-7 my-12 overflow-hidden shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-start divide-y md:divide-y-0 md:divide-x divide-[#D5DCE6]">
          {PORTFOLIO_DATA.facts.map((fact, index) => (
            <div
              key={index}
              className={`pt-4 md:pt-0 ${
                index > 0 ? "md:pl-6 lg:pl-8" : ""
              } flex flex-col`}
            >
              <div className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0C1829] tracking-tight tabular-nums">
                {fact.number}
              </div>
              <div className="font-mono text-xs uppercase tracking-wider font-bold text-[#0C1829] mt-1.5">
                {fact.label}
              </div>
              <p className="text-xs text-[#4E5D73] mt-1 leading-snug font-serif-body">
                {fact.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

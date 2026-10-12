import React from "react";
import { Link } from "react-router-dom";
import { Download, ArrowUp, Mail, Phone, Linkedin } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { useResume } from "../../context/ResumeContext";

export const EditorialFooter: React.FC = () => {
  const { triggerDownload } = useResume();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#071120] text-[#FAF9F5] border-t border-[#162842] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newspaper Rule & Pull Quote */}
        <div className="border-b border-[#162842] pb-12 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-bold block mb-3">
                FOUNDATIONAL PRINCIPLE · SOHAIL KHAN
              </span>
              <p className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-white leading-tight font-bold">
                &ldquo;{PORTFOLIO_DATA.principles.core}&rdquo;
              </p>
            </div>
            <button
              onClick={scrollToTop}
              className="self-start lg:self-end flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CBD5E1] hover:text-[#38BDF8] transition-colors border border-[#1E3A5F] px-4 py-2 hover:border-[#38BDF8] font-bold cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#38BDF8]" />
            </button>
          </div>
        </div>

        {/* 4-Column Editorial Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#162842] text-xs">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0C1829] border border-[#38BDF8] text-[#38BDF8] flex items-center justify-center font-serif-title font-bold text-sm shadow-xs">
                {PORTFOLIO_DATA.meta.monogram}
              </div>
              <span className="font-serif-title text-xl font-bold text-white tracking-wide">
                {PORTFOLIO_DATA.meta.name.toUpperCase()}
              </span>
            </div>
            <p className="text-[#94A3B8] leading-relaxed font-serif-body">
              The Personal Edition — Independent digital flight manual and portfolio of an AI Product Manager, Product Strategist, and Growth Consultant.
            </p>
            <div className="font-mono text-[11px] text-[#CBD5E1]">
              {PORTFOLIO_DATA.meta.location}
            </div>
          </div>

          {/* Col 2: Navigation Index */}
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#38BDF8] font-bold block">
              Pages &amp; Archive
            </span>
            <ul className="space-y-2 text-[#CBD5E1] font-medium">
              <li>
                <Link to="/" className="hover:text-[#38BDF8] transition-colors">
                  Front Page (Home)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#38BDF8] transition-colors">
                  About Sohail
                </Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-[#38BDF8] transition-colors">
                  Experience &amp; Consulting
                </Link>
              </li>
              <li>
                <Link to="/product-thinking" className="hover:text-[#38BDF8] transition-colors">
                  Product Strategy &amp; AI
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-[#38BDF8] transition-colors">
                  The Editorial Archive
                </Link>
              </li>
              <li>
                <Link to="/leadership" className="hover:text-[#38BDF8] transition-colors">
                  Leadership &amp; Speaking
                </Link>
              </li>
              <li>
                <Link to="/education" className="hover:text-[#38BDF8] transition-colors">
                  Education &amp; Credentials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#38BDF8] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Actions */}
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#38BDF8] font-bold block">
              Direct Action
            </span>
            <ul className="space-y-3">
              <li>
                <button
                  type="button"
                  onClick={triggerDownload}
                  className="inline-flex items-center gap-2 text-white hover:text-[#38BDF8] font-semibold transition-colors bg-[#112240] border border-[#1E3A5F] px-4 py-2 hover:border-[#38BDF8] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Download Resume (PDF)</span>
                </button>
              </li>
              <li className="text-[11px] text-[#94A3B8] font-serif-body leading-relaxed pt-1">
                Verified flight manifest document containing full career background, metrics, and advisory achievements.
              </li>
            </ul>
          </div>

          {/* Col 4: Reach & Verified Channels */}
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#38BDF8] font-bold block">
              Direct Contact
            </span>
            <div className="space-y-2.5 text-[#CBD5E1]">
              <a
                href={`mailto:${PORTFOLIO_DATA.meta.email}`}
                className="flex items-center gap-2 hover:text-[#38BDF8] transition-colors font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{PORTFOLIO_DATA.meta.email}</span>
              </a>
              <a
                href={`tel:${PORTFOLIO_DATA.meta.mobile.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-[#38BDF8] transition-colors font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{PORTFOLIO_DATA.meta.mobile}</span>
              </a>
              <a
                href={PORTFOLIO_DATA.meta.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#38BDF8] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Imprint */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#64748B]">
          <div>
            © {new Date().getFullYear()} Sohail Khan. All rights reserved. The Personal Edition.
          </div>
          <div className="flex items-center gap-4 text-[#94A3B8]">
            <span>PRODUCT STRATEGY</span>
            <span className="text-[#38BDF8]">·</span>
            <span>GENERATIVE AI</span>
            <span className="text-[#38BDF8]">·</span>
            <span>GROWTH ADVISORY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

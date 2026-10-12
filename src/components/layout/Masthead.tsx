import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Compass,
  User,
  Briefcase,
  Layers,
  Award,
  Users,
  GraduationCap,
  Mail,
  Download,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";
import { useResume } from "../../context/ResumeContext";

export const Masthead: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { triggerDownload } = useResume();

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: Compass,
      desc: "Flight Path & Front Page",
    },
    {
      label: "About",
      path: "/about",
      icon: User,
      desc: "Biographical Record & Ethos",
    },
    {
      label: "Experience",
      path: "/experience",
      icon: Briefcase,
      desc: "Timeline & Advisory Waypoints",
    },
    {
      label: "Product & AI",
      path: "/product-thinking",
      icon: Layers,
      desc: "Systems Framework & Architecture",
    },
    {
      label: "Achievements",
      path: "/achievements",
      icon: Award,
      desc: "Times Square & Public Records",
    },
    {
      label: "Leadership",
      path: "/leadership",
      icon: Users,
      desc: "TEDx Keynote & Community",
    },
    {
      label: "Education",
      path: "/education",
      icon: GraduationCap,
      desc: "Degrees & Certifications",
    },
    {
      label: "Contact",
      path: "/contact",
      icon: Mail,
      desc: "Direct Channels & Inquiries",
    },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#D5DCE6] transition-all duration-200">
      {/* Top Newspaper Micro-Bar / Aviation Dispatch Line */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 border-b border-[#E2E8F0] text-[11px] font-mono text-[#4E5D73]">
        <div className="flex items-center gap-4">
          <span className="text-[#0C1829] font-bold tracking-wider">
            {PORTFOLIO_DATA.meta.editionLabel}
          </span>
          <span className="text-[#CBD5E1]">·</span>
          <span className="text-[#0C1829] font-medium">{PORTFOLIO_DATA.meta.location}</span>
          <span className="text-[#CBD5E1]">·</span>
          <span className="flex items-center gap-1.5 text-[#0284C7] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
            FLIGHT STATUS: AIRBORNE · ON TIME
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${PORTFOLIO_DATA.meta.email}`}
            className="hover:text-[#0C1829] transition-colors text-[#0C1829] font-mono font-medium"
          >
            {PORTFOLIO_DATA.meta.email}
          </a>
          <span className="text-[#CBD5E1]">·</span>
          <span className="text-[#4E5D73] font-semibold">{PORTFOLIO_DATA.meta.mobile}</span>
        </div>
      </div>

      {/* Main Masthead Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Left: Brand & Monogram Seal */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0 focus-visible:outline-none"
            aria-label="Sohail Khan - Front Page"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#0C1829] text-[#FAF9F5] flex items-center justify-center font-serif-title text-base sm:text-lg font-bold group-hover:bg-[#162E51] transition-colors shadow-xs border border-[#1E3A5F]">
              {PORTFOLIO_DATA.meta.monogram}
            </div>
            <div className="flex flex-col">
              <span className="font-serif-title text-lg sm:text-xl font-bold tracking-tight text-[#0C1829] leading-none group-hover:text-[#162E51] transition-colors">
                {PORTFOLIO_DATA.meta.name.toUpperCase()}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-[#0C1829] font-bold mt-1 leading-none">
                {PORTFOLIO_DATA.meta.subDescriptor}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation: Direct Horizontal Links with Individual Recognizable Icons */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 overflow-x-auto py-1"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-1.5 px-2.5 xl:px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                      isActive
                        ? "text-[#0C1829] font-bold"
                        : "text-[#4E5D73] hover:text-[#0C1829] hover:bg-[#F3F5F9]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 shrink-0 ${
                          isActive
                            ? "text-[#0C1829]"
                            : "text-[#64748B] group-hover:text-[#0C1829]"
                        }`}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                      {/* Active Indicator Underline */}
                      {isActive && (
                        <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#0C1829] animate-fade-in" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action: Download Resume & Mobile Menu Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Primary Download Resume CTA */}
            <button
              type="button"
              onClick={triggerDownload}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#0C1829] hover:bg-[#162E51] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs group cursor-pointer border border-[#0C1829]"
              title="Download verified PDF resume"
            >
              <Download className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-y-0.5" />
              <span className="hidden sm:inline">Resume (PDF)</span>
              <span className="sm:hidden">PDF</span>
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 border border-[#D5DCE6] text-[#0C1829] hover:bg-[#F1EFE9] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b-2 border-[#0C1829] px-4 sm:px-6 py-6 animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D5DCE6]">
            <div>
              <span className="font-mono text-[10px] text-[#0C1829] font-bold uppercase tracking-widest block">
                FLIGHT CONTROL DIRECTORY
              </span>
              <h3 className="font-serif-title text-base font-bold text-[#0C1829]">
                All Portfolio Chapters
              </h3>
            </div>
            <span className="font-mono text-[10px] text-[#64748B]">
              8 DESTINATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3 border transition-all flex items-center justify-between ${
                    isActive
                      ? "border-[#0C1829] bg-[#0C1829] text-white font-bold"
                      : "border-[#D5DCE6] bg-white text-[#0C1829] hover:border-[#0C1829] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 flex items-center justify-center ${
                        isActive ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#0C1829]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-serif-title font-bold leading-tight">
                        {item.label}
                      </span>
                      <span
                        className={`block text-[11px] font-mono ${
                          isActive ? "text-[#CBD5E1]" : "text-[#64748B]"
                        }`}
                      >
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-[#94A3B8]"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 mt-4 border-t border-[#D5DCE6] flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={(e) => {
                setMobileMenuOpen(false);
                triggerDownload(e);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0C1829] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#162E51] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Resume (PDF)</span>
            </button>
            <a
              href={`mailto:${PORTFOLIO_DATA.meta.email}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#0C1829] text-[#0C1829] text-xs font-semibold tracking-wider uppercase hover:bg-[#F1EFE9] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Direct Email</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from "react";
import { Phone, Linkedin, Download, Copy, Check, ArrowUpRight, Send, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { PageHeader } from "../components/common/PageHeader";
import { useResume } from "../context/ResumeContext";

export const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [inquiryType, setInquiryType] = useState("AI Product Strategy");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { triggerDownload } = useResume();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.meta.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.meta.email}?subject=${encodeURIComponent(
      `[${inquiryType}] ${subject || "Inquiry from Portfolio"}`
    )}&body=${encodeURIComponent(
      `Hi Sohail,\n\n${message}\n\nSent via Sohail Khan Portfolio - The Personal Edition`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <PageHeader
        kicker="COMMUNICATIONS & INQUIRIES"
        issueLabel="THE SOHAIL KHAN EDITION"
        headline="Good ideas begin with a conversation."
        subheadline="For conversations around AI product strategy, founder advisory, product innovation, growth, and intelligent business systems."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Direct Verified Channels (6 cols) */}
        <div className="lg:col-span-6 space-y-8">
          <div className="p-8 bg-[#F3F5F9] border border-[#D5DCE6] space-y-6 shadow-xs">
            <div className="pb-3 border-b border-[#D5DCE6] flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold">
                Direct Channels
              </span>
              <span className="font-mono text-[10px] text-[#4E5D73] font-semibold">
                CONFIRMED INFORMATION
              </span>
            </div>

            {/* Email item */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#0C1829] uppercase font-bold block">
                ELECTRONIC MAIL
              </span>
              <div className="flex items-center justify-between gap-4 p-3.5 bg-white border border-[#D5DCE6] shadow-2xs">
                <a
                  href={`mailto:${PORTFOLIO_DATA.meta.email}`}
                  className="font-mono text-sm sm:text-base font-bold text-[#0C1829] hover:text-[#162E51] transition-colors truncate"
                >
                  {PORTFOLIO_DATA.meta.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 text-[#4E5D73] hover:text-[#0C1829] hover:bg-[#F3F5F9] transition-colors shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Phone item */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#0C1829] uppercase font-bold block">
                TELEPHONE / DIRECT CALL
              </span>
              <div className="flex items-center justify-between gap-4 p-3.5 bg-white border border-[#D5DCE6] shadow-2xs">
                <a
                  href={`tel:${PORTFOLIO_DATA.meta.mobile.replace(/\s+/g, "")}`}
                  className="font-mono text-sm sm:text-base font-bold text-[#0C1829] hover:text-[#162E51] transition-colors"
                >
                  {PORTFOLIO_DATA.meta.mobile}
                </a>
                <a
                  href={`tel:${PORTFOLIO_DATA.meta.mobile.replace(/\s+/g, "")}`}
                  className="p-1.5 text-[#0C1829] hover:text-[#162E51] hover:bg-[#F3F5F9] transition-colors shrink-0 text-xs font-mono font-bold"
                >
                  CALL →
                </a>
              </div>
            </div>

            {/* Location item */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#0C1829] uppercase font-bold block">
                PRIMARY RESIDENCE & BASE
              </span>
              <div className="p-3.5 bg-white border border-[#D5DCE6] flex items-center gap-3 shadow-2xs">
                <MapPin className="w-4 h-4 text-[#0C1829] shrink-0" />
                <span className="font-serif-title text-lg font-bold text-[#0C1829]">
                  {PORTFOLIO_DATA.meta.location}
                </span>
              </div>
            </div>

            {/* LinkedIn link */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#0C1829] uppercase font-bold block">
                PROFESSIONAL NETWORK
              </span>
              <a
                href={PORTFOLIO_DATA.meta.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 bg-white border border-[#D5DCE6] hover:border-[#0C1829] flex items-center justify-between text-sm font-bold text-[#0C1829] group transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  <span>linkedin.com/in/certainlysohail</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#4E5D73] group-hover:text-[#0C1829] transition-colors" />
              </a>
            </div>

            {/* Download Resume Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={triggerDownload}
                className="w-full py-3.5 bg-[#0C1829] hover:bg-[#162E51] text-white text-xs font-mono uppercase tracking-wider font-bold transition-colors inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-[#0C1829]"
              >
                <Download className="w-4 h-4 text-[#38BDF8]" />
                <span>Download Verified Resume (PDF)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Email Composer (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-8 bg-[#F3F5F9] border border-[#D5DCE6] space-y-6 shadow-xs">
            <div className="pb-3 border-b border-[#D5DCE6] flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold">
                Direct Inquiry Composer
              </span>
              <span className="font-mono text-[10px] text-[#0C1829] font-bold">
                LAUNCHES REAL EMAIL
              </span>
            </div>

            <p className="text-xs text-[#4E5D73] font-serif-body leading-relaxed">
              Compose a message below. Clicking &ldquo;Launch Email Application&rdquo; prepares an authentic draft directly addressed to Sohail Khan with no fake intermediaries or mock databases.
            </p>

            <form onSubmit={handleSendDraft} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#0C1829] mb-1.5 font-bold">
                  Nature of Inquiry
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#D5DCE6] focus:outline-none focus:border-[#0C1829] font-sans font-medium text-[#0C1829]"
                >
                  <option>AI Product Strategy</option>
                  <option>Founder Advisory & Growth</option>
                  <option>Consulting Engagement</option>
                  <option>Keynote or Speaking Invitation</option>
                  <option>Full-Time Product Role</option>
                  <option>General Strategic Dialogue</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#0C1829] mb-1.5 font-bold">
                  Subject or Project Topic
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Founder Advisory for Series A AI SaaS"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#D5DCE6] focus:outline-none focus:border-[#0C1829] font-sans text-xs font-medium text-[#0C1829]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#0C1829] mb-1.5 font-bold">
                  Brief Overview / Message
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Share a brief outline of the business challenge, timeline, or context..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#D5DCE6] focus:outline-none focus:border-[#0C1829] font-sans text-xs font-medium text-[#0C1829]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0C1829] hover:bg-[#162E51] text-white text-xs font-mono uppercase tracking-wider font-bold transition-colors inline-flex items-center justify-center gap-2 shadow-md cursor-pointer border border-[#0C1829]"
              >
                <Send className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Launch Email Application →</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { X, Download, ExternalLink, Printer, CheckCircle, FileText, Eye } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { downloadResumeFile, RESUME_FILENAME, RESUME_PATH } from "../../utils/resumeData";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export const ResumeModal: React.FC = () => {
  const { isModalOpen, closeResumeModal } = useResume();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"viewer" | "transcript">("viewer");

  useEffect(() => {
    if (isModalOpen) {
      setDownloadSuccess(true);
      const timer = setTimeout(() => setDownloadSuccess(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeResumeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeResumeModal]);

  if (!isModalOpen) return null;

  const handleDownloadAgain = async () => {
    setDownloadSuccess(true);
    await downloadResumeFile();
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const handleOpenNewTab = () => {
    window.open(RESUME_PATH, "_blank", "noopener,noreferrer");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0C1829]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF9F5] border-2 border-[#0C1829] shadow-2xl my-auto overflow-hidden">
        {/* Newspaper Micro Top Bar */}
        <div className="bg-[#0C1829] text-white px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="font-serif-title font-bold text-sm">SK</span>
            <span className="text-[#94A3B8]">/</span>
            <span className="uppercase tracking-wider font-semibold">
              OFFICIAL VERIFIED CURRICULUM VITAE
            </span>
          </div>
          <button
            onClick={closeResumeModal}
            className="p-1 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close resume viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Header & Download Trigger Status */}
        <div className="p-4 sm:p-6 border-b border-[#D5DCE6] bg-[#F3F5F9]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] text-[#0C1829] font-bold uppercase tracking-widest block mb-1">
                DOCUMENT DISPATCH · VERIFIED PUBLIC RECORD
              </span>
              <h2
                id="resume-modal-title"
                className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0C1829]"
              >
                {RESUME_FILENAME}
              </h2>
              <p className="text-xs text-[#4E5D73] font-mono mt-0.5">
                Format: PDF 1.3 · Size: 12.5 KB · Verified Career Record
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadAgain}
                className="px-4 py-2 bg-[#0C1829] hover:bg-[#162E51] text-white text-xs font-mono uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Download PDF to your computer"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Download PDF ↓</span>
              </button>

              <button
                onClick={handleOpenNewTab}
                className="px-3.5 py-2 border border-[#0C1829] hover:bg-white text-[#0C1829] text-xs font-mono uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                title="Open PDF in new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#0C1829]" />
                <span>Open in Tab ↗</span>
              </button>

              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex px-3.5 py-2 border border-[#D5DCE6] hover:bg-white text-[#4E5D73] hover:text-[#0C1829] text-xs font-mono uppercase tracking-wider font-bold transition-colors items-center gap-1.5 cursor-pointer"
                title="Print resume document"
              >
                <Printer className="w-3.5 h-3.5 text-[#0C1829]" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Download Notification Banner */}
          {downloadSuccess && (
            <div className="mt-3.5 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans flex items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Download initiated:</strong> Check your browser downloads folder for{" "}
                  <code>{RESUME_FILENAME}</code>. If your browser restricts automated downloads inside this preview, use <strong>Open in Tab ↗</strong> or view below.
                </span>
              </div>
              <button
                onClick={() => setDownloadSuccess(false)}
                className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Tab Controls: Embedded PDF vs Clean Monograph Transcript */}
        <div className="px-4 sm:px-6 pt-3 bg-[#FAF9F5] border-b border-[#D5DCE6] flex items-center gap-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab("viewer")}
            className={`pb-2.5 border-b-2 font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "viewer"
                ? "border-[#0C1829] text-[#0C1829]"
                : "border-transparent text-[#4E5D73] hover:text-[#0C1829]"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive PDF Viewer</span>
          </button>
          <button
            onClick={() => setActiveTab("transcript")}
            className={`pb-2.5 border-b-2 font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "transcript"
                ? "border-[#0C1829] text-[#0C1829]"
                : "border-transparent text-[#4E5D73] hover:text-[#0C1829]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Document Transcript</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto bg-white">
          {activeTab === "viewer" ? (
            <div className="space-y-4">
              <div className="w-full h-[500px] sm:h-[580px] bg-[#F3F5F9] border border-[#D5DCE6] overflow-hidden relative">
                <iframe
                  src={`${RESUME_PATH}#toolbar=1&navpanes=0&scrollbar=1`}
                  title="Sohail Khan Verified Resume PDF"
                  className="w-full h-full border-none"
                />
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-[#4E5D73] pt-1">
                <span>Direct PDF binary stream verified</span>
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0C1829] font-bold hover:underline"
                >
                  Click here if PDF does not load in your browser frame →
                </a>
              </div>
            </div>
          ) : (
            /* Document Transcript (Clean editorial representation of the PDF content) */
            <div className="max-w-3xl mx-auto p-6 sm:p-8 border border-[#D5DCE6] bg-[#FAF9F5] shadow-xs text-[#0C1829]">
              {/* Header */}
              <div className="border-b-2 border-[#0C1829] pb-4 mb-6">
                <h1 className="font-serif-title text-3xl sm:text-4xl font-bold tracking-tight text-[#0C1829]">
                  {PORTFOLIO_DATA.meta.name.toUpperCase()}
                </h1>
                <p className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold mt-1">
                  AI PRODUCT MANAGER | PRODUCT STRATEGIST | GROWTH CONSULTANT
                </p>
                <p className="text-xs font-mono text-[#4E5D73] mt-2">
                  {PORTFOLIO_DATA.meta.location} · {PORTFOLIO_DATA.meta.mobile} · {PORTFOLIO_DATA.meta.email} · {PORTFOLIO_DATA.meta.linkedin}
                </p>
              </div>

              {/* Executive Profile */}
              <div className="mb-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold pb-1 border-b border-[#D5DCE6] mb-2">
                  EXECUTIVE PROFILE
                </h3>
                <p className="text-sm font-serif-body leading-relaxed text-[#0C1829]">
                  AI Product Manager and Growth Consultant working at the intersection of product strategy, generative AI, business operations, and founder advisory. Experience advising 75+ early-stage founders and leading 250+ consultative engagements across Europe and the Middle East. Focused on customer problem discovery, systems design, workflow automation, and commercial impact.
                </p>
              </div>

              {/* Professional Experience */}
              <div className="mb-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold pb-1 border-b border-[#D5DCE6] mb-3">
                  PROFESSIONAL EXPERIENCE
                </h3>
                <div className="space-y-4">
                  {PORTFOLIO_DATA.experiences.map((exp) => (
                    <div key={exp.id} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-sm text-[#0C1829]">
                        <span>{exp.role} — {exp.company}</span>
                        {exp.period ? <span className="font-mono text-xs">{exp.period}</span> : null}
                      </div>
                      <p className="text-[#4E5D73] font-serif-body italic mb-1.5">{exp.location}</p>
                      <ul className="list-disc list-inside space-y-1 text-[#0C1829] font-serif-body">
                        {exp.responsibilities.map((r, ri) => (
                          <li key={ri}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership & Education */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#D5DCE6]">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold pb-1 border-b border-[#D5DCE6] mb-2">
                    EDUCATION
                  </h3>
                  <div className="space-y-2 text-xs">
                    {PORTFOLIO_DATA.education.map((e) => (
                      <div key={e.id}>
                        <p className="font-bold text-[#0C1829]">{e.institution}</p>
                        <p className="text-[#4E5D73]">{e.degree} ({e.period})</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#0C1829] font-bold pb-1 border-b border-[#D5DCE6] mb-2">
                    RECOGNITION & STAGE
                  </h3>
                  <ul className="text-xs space-y-1.5 list-disc list-inside text-[#0C1829] font-serif-body">
                    <li>TEDx Speaker (2022) — &ldquo;Leadership & Consistency&rdquo;</li>
                    <li>Times Square Billboard Media Feature (New York)</li>
                    <li>Head of Fashion Society (Bennett University)</li>
                    <li>Head of Ruhaniyat Mental Health Club</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF9F5] border-t border-[#D5DCE6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[#4E5D73]">
            Verified PDF document authentic to Sohail Khan.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadAgain}
              className="px-4 py-2 bg-[#0C1829] hover:bg-[#162E51] text-white font-bold uppercase transition-colors cursor-pointer"
            >
              Download PDF ({RESUME_FILENAME})
            </button>
            <button
              onClick={closeResumeModal}
              className="px-3 py-2 border border-[#D5DCE6] hover:bg-[#F3F5F9] text-[#0C1829] uppercase font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

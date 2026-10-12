import React, { useEffect, useState } from "react";

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setIsVisible(scrollTop > 40);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      aria-hidden="true"
    >
      {/* Hairline Progress Track */}
      <div className="w-full h-[2.5px] bg-[#E2E8F0]/40 backdrop-blur-xs">
        <div
          className="h-full bg-gradient-to-r from-[#0C1829] via-[#0284C7] to-[#38BDF8] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Subtle Right-Aligned Altitude / Reading Telemetry */}
      {isVisible && (
        <div className="hidden lg:flex absolute top-2 right-4 items-center gap-1.5 px-2 py-0.5 bg-[#0C1829]/90 text-white font-mono text-[9px] font-semibold tracking-widest uppercase border border-[#38BDF8]/30 shadow-xs animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
          <span>FLIGHT LEVEL</span>
          <span className="text-[#38BDF8]">{Math.round(scrollProgress)}%</span>
        </div>
      )}
    </div>
  );
};

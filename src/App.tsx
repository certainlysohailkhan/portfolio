import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { MediaProvider } from "./context/MediaContext";
import { ResumeProvider } from "./context/ResumeContext";
import { Masthead } from "./components/layout/Masthead";
import { EditorialFooter } from "./components/layout/EditorialFooter";
import { ResumeModal } from "./components/common/ResumeModal";
import { ImageLightboxModal } from "./components/media/ImageLightboxModal";
import { ScrollProgress } from "./components/common/ScrollProgress";

// Pages
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { AchievementsPage } from "./pages/AchievementsPage";
import { ProductThinkingPage } from "./pages/ProductThinkingPage";
import { LeadershipPage } from "./pages/LeadershipPage";
import { EducationPage } from "./pages/EducationPage";
import { ContactPage } from "./pages/ContactPage";

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Animated route transitions
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/product-thinking" element={<ProductThinkingPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Catch-all redirect to Front Page */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export function App() {
  return (
    <MediaProvider>
      <ResumeProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          {/* Subtle Viewport Scroll Progress Indicator */}
          <ScrollProgress />
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#0C1829] selection:bg-[#0C1829] selection:text-white">
            <Masthead />
            <main className="flex-1 flex flex-col">
              <AnimatedRoutes />
            </main>
            <EditorialFooter />
            {/* Global Verified Resume Modal */}
            <ResumeModal />
            {/* Global Lightbox / Image Viewer Modal */}
            <ImageLightboxModal />
          </div>
        </BrowserRouter>
      </ResumeProvider>
    </MediaProvider>
  );
}

export default App;

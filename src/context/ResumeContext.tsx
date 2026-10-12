import React, { createContext, useContext, useState, useCallback } from "react";
import { downloadResumeFile } from "../utils/resumeData";

interface ResumeContextType {
  isModalOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
  triggerDownload: (e?: React.MouseEvent) => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openResumeModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeResumeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const triggerDownload = useCallback(async (e?: React.MouseEvent) => {
    if (e) {
      // Prevent default navigation so it doesn't break iframe routing
      e.preventDefault();
    }
    // Automatically open viewer/download confirmation modal
    setIsModalOpen(true);
    // Execute direct browser download
    await downloadResumeFile();
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        isModalOpen,
        openResumeModal,
        closeResumeModal,
        triggerDownload,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

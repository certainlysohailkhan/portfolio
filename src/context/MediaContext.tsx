import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  StoredImageData,
  DEFAULT_MEDIA_ASSETS,
  loadMasterMedia,
  persistUserPhoto,
  getPermanentImageUrl,
  getFallbackDataUri,
  normalizeSlotId,
} from "../utils/imageStorage";

interface MediaContextType {
  images: Record<string, StoredImageData>;
  isLoaded: boolean;
  hasUserUploads: boolean;
  lightboxImage: StoredImageData | null;
  openLightbox: (slotIdOrData: string | StoredImageData) => void;
  closeLightbox: () => void;
  getImage: (id: string) => StoredImageData;
  uploadPhoto: (slotId: string, file: File | Blob) => Promise<StoredImageData>;
  refreshMedia: () => Promise<void>;
}

const MediaContext = createContext<MediaContextType | null>(null);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<Record<string, StoredImageData>>(DEFAULT_MEDIA_ASSETS);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasUserUploads, setHasUserUploads] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<StoredImageData | null>(null);

  const loadAll = useCallback(async () => {
    try {
      const result = await loadMasterMedia();
      setImages(result.images);
      setHasUserUploads(result.hasUserUploads);
    } catch (err) {
      console.warn("Failed to load master media:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const getImage = useCallback((id: string): StoredImageData => {
    const canonical = normalizeSlotId(id) || id;
    if (images[canonical]) return images[canonical];
    if (DEFAULT_MEDIA_ASSETS[canonical]) return DEFAULT_MEDIA_ASSETS[canonical];

    const permUrl = getPermanentImageUrl(canonical) || getFallbackDataUri(canonical);
    return {
      id: canonical,
      dataUrl: permUrl || `${import.meta.env.BASE_URL || "/"}images/${canonical}.svg`,
      mimeType: "image/svg+xml",
      fileName: `${canonical}.svg`,
      fileSize: 1024,
      uploadedAt: new Date().toISOString(),
      caption: canonical,
      isUserUploaded: false,
    };
  }, [images]);

  const uploadPhoto = useCallback(
    async (slotId: string, file: File | Blob): Promise<StoredImageData> => {
      const canonical = normalizeSlotId(slotId) || slotId;
      const updated = await persistUserPhoto(canonical, file);
      setImages((prev) => ({
        ...prev,
        [canonical]: updated,
      }));
      setHasUserUploads(true);
      return updated;
    },
    []
  );

  const openLightbox = useCallback(
    (slotIdOrData: string | StoredImageData) => {
      if (typeof slotIdOrData === "string") {
        const canonical = normalizeSlotId(slotIdOrData) || slotIdOrData;
        const img = images[canonical] || DEFAULT_MEDIA_ASSETS[canonical] || getImage(canonical);
        if (img) {
          setLightboxImage(img);
        }
      } else {
        setLightboxImage(slotIdOrData);
      }
    },
    [images, getImage]
  );

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  return (
    <MediaContext.Provider
      value={{
        images,
        isLoaded,
        hasUserUploads,
        lightboxImage,
        openLightbox,
        closeLightbox,
        getImage,
        uploadPhoto,
        refreshMedia: loadAll,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export function useMedia() {
  const ctx = useContext(MediaContext);
  if (!ctx) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return ctx;
}

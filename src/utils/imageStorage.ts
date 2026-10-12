/**
 * Enterprise Image Persistence Architecture for Sohail Khan Portfolio.
 * Provides unified multi-tier persistence across:
 * 1. Backend Server Storage (/api/media, /public/images/uploaded/)
 * 2. Client IndexedDB ("sohail_portfolio_media" and any legacy DBs)
 * 3. Client LocalStorage & SessionStorage deep scanner
 * 4. Automatic background synchronization to permanent server disk
 */

import {
  PERMANENT_ASSET_URLS,
  PERMANENT_DATA_URIS,
  getPermanentImageUrl,
  getFallbackDataUri,
} from "../assets/images/permanentImages";

export { PERMANENT_ASSET_URLS, PERMANENT_DATA_URIS, getPermanentImageUrl, getFallbackDataUri };

const DB_NAME = "sohail_portfolio_media";
const DB_VERSION = 1;
const STORE_NAME = "images";

export interface StoredImageData {
  id: string; // "portrait", "times_square", "tedx", "fashion", "ruhaniyat"
  dataUrl: string;
  url?: string;
  videoUrl?: string;
  audioUrl?: string;
  audioFileName?: string;
  hasAudio?: boolean;
  mediaType?: "image" | "video" | "audio";
  mimeType: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  caption?: string;
  date?: string;
  title?: string;
  location?: string;
  isUserUploaded?: boolean;
}

export const DEFAULT_MEDIA_ASSETS: Record<string, StoredImageData> = {
  portrait: {
    id: "portrait",
    dataUrl: PERMANENT_ASSET_URLS.portrait || PERMANENT_DATA_URIS.portrait,
    mimeType: "image/svg+xml",
    fileName: "sohail_khan_portrait.svg",
    fileSize: 7211,
    uploadedAt: "2026-10-09T00:00:00Z",
    caption: "Captain Sohail Khan · Gurugram, India · Executive Portrait",
    date: "Gurugram, India",
    title: "Executive Portrait — Sohail Khan",
    location: "Gurugram, India",
    isUserUploaded: false,
  },
  times_square: {
    id: "times_square",
    dataUrl: PERMANENT_ASSET_URLS.times_square || PERMANENT_DATA_URIS.times_square,
    url: "/images/times_square.svg",
    audioUrl: "/audio/times_square.mp3",
    hasAudio: true,
    mimeType: "image/svg+xml",
    fileName: "times_square_billboard.svg",
    fileSize: 6424,
    uploadedAt: "2026-10-09T00:00:00Z",
    caption: "Times Square, New York City · Global Media Billboard Feature & Audio Archive",
    date: "New York City",
    title: "Times Square Billboard Feature",
    location: "Times Square, New York City, USA",
    isUserUploaded: false,
  },
  tedx: {
    id: "tedx",
    dataUrl: PERMANENT_ASSET_URLS.tedx || PERMANENT_DATA_URIS.tedx,
    mimeType: "image/svg+xml",
    fileName: "tedx_speaker_stage.svg",
    fileSize: 5154,
    uploadedAt: "2026-10-09T00:00:00Z",
    caption: "TEDx · Leadership & Consistency · Keynote",
    date: "Bennett University",
    title: "TEDx Keynote Speaker",
    location: "TEDx Stage",
    isUserUploaded: false,
  },
  fashion: {
    id: "fashion",
    dataUrl: PERMANENT_ASSET_URLS.fashion || PERMANENT_DATA_URIS.fashion,
    mimeType: "image/svg+xml",
    fileName: "fashion_society_leadership.svg",
    fileSize: 4572,
    uploadedAt: "2026-10-09T00:00:00Z",
    caption: "Fashion Society · Bennett University · Creative Direction & Runway",
    date: "Bennett University",
    title: "Head of Fashion Society",
    location: "Greater Noida, India",
    isUserUploaded: false,
  },
  ruhaniyat: {
    id: "ruhaniyat",
    dataUrl: PERMANENT_ASSET_URLS.ruhaniyat || PERMANENT_DATA_URIS.ruhaniyat,
    mimeType: "image/svg+xml",
    fileName: "ruhaniyat_mental_health.svg",
    fileSize: 4386,
    uploadedAt: "2026-10-09T00:00:00Z",
    caption: "Ruhaniyat · Bennett University · Empathy & Community Dialogue",
    date: "Bennett University",
    title: "Head of Ruhaniyat",
    location: "Greater Noida, India",
    isUserUploaded: false,
  },
};

// Key normalizer to map any variations to canonical slot IDs
export function normalizeSlotId(key: string): string | null {
  const k = key.toLowerCase().trim();
  if (k === "portrait" || k === "profile" || k === "photo" || k === "avatar" || k === "hero_image" || k === "sohail_portrait") {
    return "portrait";
  }
  if (k === "times_square" || k === "timessquare" || k === "times-square" || k === "times_square_billboard" || k === "billboard") {
    return "times_square";
  }
  if (k === "tedx" || k === "ted_x" || k === "ted-x" || k === "tedx_stage" || k === "tedx_speaker") {
    return "tedx";
  }
  if (k === "fashion" || k === "fashion_society" || k === "fashionsociety" || k === "runway") {
    return "fashion";
  }
  if (k === "ruhaniyat" || k === "ruhaniyat_society" || k === "mental_health") {
    return "ruhaniyat";
  }
  return null;
}

// IndexedDB Helper
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB is not supported"));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => {
      console.warn("IndexedDB open was blocked");
    };
  });
}

// Save image to IndexedDB
export async function saveImageToDB(data: StoredImageData): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Could not save to IndexedDB:", err);
  }
}

// Get all images from primary IndexedDB
export async function getAllImagesFromDB(): Promise<Record<string, StoredImageData>> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const result: Record<string, StoredImageData> = {};
        (req.result || []).forEach((item: StoredImageData) => {
          const canonical = normalizeSlotId(item.id) || item.id;
          if (item.dataUrl && !item.dataUrl.includes("image/svg+xml")) {
            result[canonical] = {
              ...item,
              id: canonical,
              isUserUploaded: true,
            };
          } else if (item.dataUrl) {
            result[canonical] = { ...item, id: canonical };
          }
        });
        resolve(result);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Could not read from primary IndexedDB:", err);
    return {};
  }
}

// Deep scan other legacy IndexedDB databases in the origin
async function scanAllIndexedDBs(): Promise<Record<string, StoredImageData>> {
  const result: Record<string, StoredImageData> = {};
  if (typeof window === "undefined" || !window.indexedDB || !window.indexedDB.databases) {
    return result;
  }

  try {
    const databases = await window.indexedDB.databases();
    for (const dbInfo of databases) {
      if (!dbInfo.name || dbInfo.name === DB_NAME) continue;
      try {
        await new Promise<void>((resolve) => {
          const req = window.indexedDB.open(dbInfo.name!);
          req.onsuccess = () => {
            const db = req.result;
            const storeNames = Array.from(db.objectStoreNames);
            let pendingStores = storeNames.length;
            if (pendingStores === 0) {
              db.close();
              return resolve();
            }

            storeNames.forEach((sName) => {
              try {
                const tx = db.transaction(sName, "readonly");
                const store = tx.objectStore(sName);
                const allReq = store.getAll();
                allReq.onsuccess = () => {
                  (allReq.result || []).forEach((item: any) => {
                    const candidateId = item.id || item.slotId || item.key || item.name;
                    const canonical = candidateId ? normalizeSlotId(String(candidateId)) : null;
                    const dataUrl = item.dataUrl || item.url || item.base64 || item.src;
                    if (canonical && dataUrl && typeof dataUrl === "string" && !dataUrl.includes("image/svg+xml")) {
                      result[canonical] = {
                        id: canonical,
                        dataUrl,
                        mimeType: item.mimeType || "image/jpeg",
                        fileName: item.fileName || `${canonical}.jpg`,
                        fileSize: item.fileSize || 0,
                        uploadedAt: item.uploadedAt || new Date().toISOString(),
                        caption: item.caption,
                        date: item.date,
                        title: item.title,
                        location: item.location,
                        isUserUploaded: true,
                      };
                    }
                  });
                  pendingStores--;
                  if (pendingStores <= 0) {
                    db.close();
                    resolve();
                  }
                };
                allReq.onerror = () => {
                  pendingStores--;
                  if (pendingStores <= 0) {
                    db.close();
                    resolve();
                  }
                };
              } catch {
                pendingStores--;
                if (pendingStores <= 0) {
                  db.close();
                  resolve();
                }
              }
            });
          };
          req.onerror = () => resolve();
        });
      } catch {
        // Continue scanning next DB
      }
    }
  } catch (err) {
    console.warn("Error scanning secondary IndexedDBs:", err);
  }

  return result;
}

// Deep scan localStorage for any stored image data
function scanLocalStorage(): Record<string, StoredImageData> {
  const result: Record<string, StoredImageData> = {};
  if (typeof window === "undefined" || !window.localStorage) {
    return result;
  }

  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key) continue;

      const val = window.localStorage.getItem(key);
      if (!val) continue;

      // 1. Check if value is a JSON object or array
      if (val.startsWith("{") || val.startsWith("[")) {
        try {
          const parsed = JSON.parse(val);
          if (typeof parsed === "object" && parsed !== null) {
            // If it's a map of images
            Object.entries(parsed).forEach(([subKey, subVal]: [string, any]) => {
              const canonical = normalizeSlotId(subKey) || (subVal?.id ? normalizeSlotId(subVal.id) : null);
              const dataUrl = subVal?.dataUrl || subVal?.url || (typeof subVal === "string" && subVal.startsWith("data:image/") ? subVal : null);
              if (canonical && dataUrl && typeof dataUrl === "string" && !dataUrl.includes("image/svg+xml")) {
                result[canonical] = {
                  id: canonical,
                  dataUrl,
                  mimeType: subVal.mimeType || "image/jpeg",
                  fileName: subVal.fileName || `${canonical}.jpg`,
                  fileSize: subVal.fileSize || 0,
                  uploadedAt: subVal.uploadedAt || new Date().toISOString(),
                  caption: subVal.caption,
                  date: subVal.date,
                  title: subVal.title,
                  location: subVal.location,
                  isUserUploaded: true,
                };
              }
            });
          }
        } catch {
          // not JSON
        }
      }

      // 2. Check if key itself matches a slot and value is a base64 DataURL
      const canonical = normalizeSlotId(key);
      if (canonical && val.startsWith("data:image/") && !val.includes("image/svg+xml")) {
        result[canonical] = {
          id: canonical,
          dataUrl: val,
          mimeType: val.split(";")[0].replace("data:", "") || "image/jpeg",
          fileName: `${canonical}.jpg`,
          fileSize: val.length,
          uploadedAt: new Date().toISOString(),
          isUserUploaded: true,
        };
      }
    }
  } catch (err) {
    console.warn("Error scanning localStorage:", err);
  }

  return result;
}

// Fetch persisted images from full-stack server backend (/api/media)
async function fetchServerMedia(): Promise<Record<string, StoredImageData>> {
  if (typeof window === "undefined") return {};

  try {
    const res = await fetch("/api/media");
    if (!res.ok) return {};
    const data = await res.json();
    if (data && data.success && data.images) {
      const result: Record<string, StoredImageData> = {};
      Object.entries(data.images).forEach(([key, item]: [string, any]) => {
        const canonical = normalizeSlotId(key) || key;
        result[canonical] = {
          ...item,
          id: canonical,
          dataUrl: item.dataUrl || item.url,
          isUserUploaded: true,
        };
      });
      return result;
    }
  } catch {
    // Backend API might not be reachable if running static build without Node
  }
  return {};
}

// Background sync to backend server
export async function syncImagesToServer(images: Record<string, StoredImageData>): Promise<void> {
  if (typeof window === "undefined" || !images || Object.keys(images).length === 0) return;

  const realPhotos: Record<string, StoredImageData> = {};
  Object.entries(images).forEach(([key, item]) => {
    if (item && item.dataUrl && !item.dataUrl.includes("image/svg+xml")) {
      realPhotos[key] = item;
    }
  });

  if (Object.keys(realPhotos).length === 0) return;

  try {
    await fetch("/api/media/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images: realPhotos }),
    });
  } catch (err) {
    console.warn("Could not sync media to server:", err);
  }
}

// Master aggregator: loads images with strict priority for REAL user uploads
export async function loadMasterMedia(): Promise<{
  images: Record<string, StoredImageData>;
  hasUserUploads: boolean;
}> {
  // 1. Start with defaults
  const merged: Record<string, StoredImageData> = { ...DEFAULT_MEDIA_ASSETS };
  let foundUserPhotos = false;

  // 2. Query Server Media
  const serverMedia = await fetchServerMedia();
  Object.entries(serverMedia).forEach(([k, item]) => {
    if (item && item.dataUrl) {
      merged[k] = { ...merged[k], ...item, isUserUploaded: true };
      foundUserPhotos = true;
    }
  });

  // 3. Query Primary IndexedDB
  const primaryIDB = await getAllImagesFromDB();
  Object.entries(primaryIDB).forEach(([k, item]) => {
    if (item && item.dataUrl && !item.dataUrl.includes("image/svg+xml")) {
      merged[k] = { ...merged[k], ...item, isUserUploaded: true };
      foundUserPhotos = true;
    }
  });

  // 4. Query any other IndexedDBs
  const secondaryIDB = await scanAllIndexedDBs();
  Object.entries(secondaryIDB).forEach(([k, item]) => {
    if (item && item.dataUrl && !item.dataUrl.includes("image/svg+xml")) {
      merged[k] = { ...merged[k], ...item, isUserUploaded: true };
      foundUserPhotos = true;
    }
  });

  // 5. Query LocalStorage
  const localMedia = scanLocalStorage();
  Object.entries(localMedia).forEach(([k, item]) => {
    if (item && item.dataUrl && !item.dataUrl.includes("image/svg+xml")) {
      merged[k] = { ...merged[k], ...item, isUserUploaded: true };
      foundUserPhotos = true;
    }
  });

  // 6. If any client-found user photographs exist, push to server & IndexedDB
  if (foundUserPhotos) {
    const userOnly: Record<string, StoredImageData> = {};
    Object.entries(merged).forEach(([k, item]) => {
      if (item.isUserUploaded) {
        userOnly[k] = item;
        // Also ensure it is safely in primary IndexedDB and localStorage
        saveImageToDB(item);
        try {
          window.localStorage.setItem(`sohail_photo_${k}`, item.dataUrl);
        } catch {}
      }
    });
    syncImagesToServer(userOnly);
  }

  return { images: merged, hasUserUploads: foundUserPhotos };
}

// Save a single user photograph across all persistence tiers
export async function persistUserPhoto(
  slotId: string,
  file: File | Blob,
  metadata?: Partial<StoredImageData>
): Promise<StoredImageData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const canonical = normalizeSlotId(slotId) || slotId;

      const isVideo = Boolean(file.type?.startsWith("video/"));
      const isAudio = Boolean(
        file.type?.startsWith("audio/") ||
          (file as File).name?.toLowerCase().endsWith(".mp3") ||
          (file as File).name?.toLowerCase().endsWith(".wav") ||
          (file as File).name?.toLowerCase().endsWith(".m4a")
      );
      let videoExt = "mp4";
      if (file.type?.includes("webm")) videoExt = "webm";
      else if (file.type?.includes("quicktime")) videoExt = "mov";

      const record: StoredImageData = {
        id: canonical,
        dataUrl,
        mimeType: file.type || (isAudio ? "audio/mpeg" : isVideo ? "video/mp4" : "image/jpeg"),
        fileName: (file as File).name || `${canonical}.${isAudio ? "mp3" : isVideo ? videoExt : "jpg"}`,
        fileSize: file.size || dataUrl.length,
        uploadedAt: new Date().toISOString(),
        caption: metadata?.caption || DEFAULT_MEDIA_ASSETS[canonical]?.caption || "",
        date: metadata?.date || DEFAULT_MEDIA_ASSETS[canonical]?.date || "",
        title: metadata?.title || DEFAULT_MEDIA_ASSETS[canonical]?.title || "",
        location: metadata?.location || DEFAULT_MEDIA_ASSETS[canonical]?.location || "",
        isUserUploaded: true,
        ...(isVideo ? { mediaType: "video", videoUrl: `/videos/${canonical}.${videoExt}` } : {}),
        ...(isAudio ? { mediaType: "audio", audioUrl: `/audio/${canonical}.mp3`, hasAudio: true } : {}),
      };

      // 1. Save to primary IndexedDB
      await saveImageToDB(record);

      // 2. Save to localStorage
      try {
        window.localStorage.setItem(`sohail_photo_${canonical}`, dataUrl);
      } catch {}

      // 3. Upload to server
      try {
        const res = await fetch("/api/media/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });
        if (res.ok) {
          const resData = await res.json();
          if (resData.image?.url) {
            record.url = resData.image.url;
          }
          if (resData.image?.videoUrl) {
            record.videoUrl = resData.image.videoUrl;
            record.mediaType = "video";
          }
          if (resData.image?.audioUrl) {
            record.audioUrl = resData.image.audioUrl;
            record.hasAudio = true;
          }
        }
      } catch (err) {
        console.warn("Backend upload failed, cached locally:", err);
      }

      resolve(record);
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

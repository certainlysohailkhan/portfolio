import express from "express";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = Number(process.env.DEFAULT_APP_PORT) || 3000;
const isProd = process.env.NODE_ENV === "production";

// Enable high body limit for high-resolution photography uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Persistent uploaded media directories
const publicUploadedDir = path.resolve("./public/images/uploaded");
const distUploadedDir = path.resolve("./dist/images/uploaded");
const publicVideosDir = path.resolve("./public/videos");
const distVideosDir = path.resolve("./dist/videos");
const publicAudioDir = path.resolve("./public/audio");
const distAudioDir = path.resolve("./dist/audio");
const manifestPath = path.resolve("./public/images/uploaded/manifest.json");

if (!fs.existsSync(publicUploadedDir)) {
  fs.mkdirSync(publicUploadedDir, { recursive: true });
}
if (!fs.existsSync(publicVideosDir)) {
  fs.mkdirSync(publicVideosDir, { recursive: true });
}
if (!fs.existsSync(publicAudioDir)) {
  fs.mkdirSync(publicAudioDir, { recursive: true });
}

// Read current manifest
function getManifest(): Record<string, any> {
  try {
    if (fs.existsSync(manifestPath)) {
      const raw = fs.readFileSync(manifestPath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Failed to read media manifest:", err);
  }
  return {};
}

// Write manifest
function saveManifest(data: Record<string, any>) {
  try {
    fs.writeFileSync(manifestPath, JSON.stringify(data, null, 2), "utf-8");
    if (fs.existsSync(distUploadedDir)) {
      const distManifestPath = path.resolve("./dist/images/uploaded/manifest.json");
      fs.writeFileSync(distManifestPath, JSON.stringify(data, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to save media manifest:", err);
  }
}

// Helper to save base64 media (image, video, or audio) data to disk permanently
function saveImageFile(slotId: string, dataUrl: string, mimeType: string = "image/jpeg"): { url: string; videoUrl?: string; audioUrl?: string; isVideo: boolean; isAudio: boolean } {
  const commaIdx = dataUrl.indexOf(",");
  const base64Data = commaIdx !== -1 ? dataUrl.slice(commaIdx + 1) : dataUrl;
  const header = commaIdx !== -1 ? dataUrl.slice(0, commaIdx) : "";

  let ext = "jpg";
  let isVideo = false;
  let isAudio = false;

  const typeCheck = (mimeType + " " + header).toLowerCase();
  if (typeCheck.includes("audio") || typeCheck.includes("mp3") || typeCheck.includes("mpeg") || typeCheck.includes("wav") || typeCheck.includes("ogg") || typeCheck.includes("m4a")) {
    ext = "mp3";
    isAudio = true;
  } else if (typeCheck.includes("mp4") || typeCheck.includes("video/mp4")) {
    ext = "mp4";
    isVideo = true;
  } else if (typeCheck.includes("webm") || typeCheck.includes("video/webm")) {
    ext = "webm";
    isVideo = true;
  } else if (typeCheck.includes("quicktime") || typeCheck.includes("video/quicktime") || typeCheck.includes(".mov")) {
    ext = "mov";
    isVideo = true;
  } else if (typeCheck.includes("png") || typeCheck.includes("image/png")) {
    ext = "png";
  } else if (typeCheck.includes("webp") || typeCheck.includes("image/webp")) {
    ext = "webp";
  } else if (typeCheck.includes("svg") || typeCheck.includes("image/svg")) {
    ext = "svg";
  }

  const filename = `${slotId}.${ext}`;

  if (isAudio) {
    let buffer = Buffer.from(base64Data, "base64");
    // Check if buffer starts with bzip2 magic bytes 'BZh' (0x42, 0x5a, 0x68)
    if (buffer.length > 3 && buffer[0] === 0x42 && buffer[1] === 0x5a && buffer[2] === 0x68) {
      const tmpBz = `/tmp/tmp_${Date.now()}_in.bz2`;
      const tmpOut = `/tmp/tmp_${Date.now()}_out.bin`;
      try {
        fs.writeFileSync(tmpBz, buffer);
        execSync(`python3 -c "import bz2; open('${tmpOut}', 'wb').write(bz2.decompress(open('${tmpBz}', 'rb').read()))"`);
        if (fs.existsSync(tmpOut)) {
          buffer = fs.readFileSync(tmpOut);
        }
      } catch (e) {
        console.error("Failed to decompress bz2 audio:", e);
      } finally {
        if (fs.existsSync(tmpBz)) fs.unlinkSync(tmpBz);
        if (fs.existsSync(tmpOut)) fs.unlinkSync(tmpOut);
      }
    }
    const audioPublicPath = path.join(publicAudioDir, filename);
    fs.writeFileSync(audioPublicPath, buffer);
    if (fs.existsSync(distAudioDir)) {
      fs.writeFileSync(path.join(distAudioDir, filename), buffer);
    }
    return {
      url: `/audio/${filename}`,
      audioUrl: `/audio/${filename}`,
      isVideo: false,
      isAudio: true,
    };
  }

  if (isVideo) {
    const videoPublicPath = path.join(publicVideosDir, filename);
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(videoPublicPath, buffer);
    if (fs.existsSync(distVideosDir)) {
      fs.writeFileSync(path.join(distVideosDir, filename), buffer);
    }
    return {
      url: `/videos/${filename}`,
      videoUrl: `/videos/${filename}`,
      isVideo: true,
      isAudio: false,
    };
  }

  const publicFilePath = path.join(publicUploadedDir, filename);
  const buffer = Buffer.from(base64Data, "base64");
  fs.writeFileSync(publicFilePath, buffer);
  if (fs.existsSync(distUploadedDir)) {
    fs.writeFileSync(path.join(distUploadedDir, filename), buffer);
  }

  return {
    url: `/images/uploaded/${filename}`,
    isVideo: false,
    isAudio: false,
  };
}

// API Routes
app.get("/api/media", (req, res) => {
  const manifest = getManifest();
  res.json({ success: true, images: manifest });
});

app.get("/api/media/:slotId", (req, res) => {
  const manifest = getManifest();
  const img = manifest[req.params.slotId];
  if (!img) {
    return res.status(404).json({ success: false, message: "Media not found" });
  }
  res.json({ success: true, image: img });
});

// Single image upload endpoint
app.post("/api/media/upload", (req, res) => {
  try {
    const { slotId, dataUrl, mimeType, fileName, fileSize, caption, date, title, location } = req.body;
    if (!slotId || !dataUrl) {
      return res.status(400).json({ success: false, message: "slotId and dataUrl are required" });
    }

    const savedMedia = saveImageFile(slotId, dataUrl, mimeType || "image/jpeg");
    const manifest = getManifest();

    const existingRecord = manifest[slotId] || {};
    const updatedRecord: any = {
      ...existingRecord,
      id: slotId,
      uploadedAt: new Date().toISOString(),
      caption: caption || existingRecord.caption || "",
      date: date || existingRecord.date || "",
      title: title || existingRecord.title || "",
      location: location || existingRecord.location || "",
      isUserUploaded: true,
    };

    if (savedMedia.isAudio && savedMedia.audioUrl) {
      updatedRecord.audioUrl = savedMedia.audioUrl;
      updatedRecord.audioFileName = fileName || `${slotId}.mp3`;
      updatedRecord.audioFileSize = fileSize || 0;
      updatedRecord.hasAudio = true;
      // Keep existing visual image url and dataUrl intact, or default to permanent SVG
      if (!updatedRecord.url || updatedRecord.url.startsWith("/audio/")) {
        updatedRecord.url = `/images/${slotId}.svg`;
      }
      if (updatedRecord.dataUrl && updatedRecord.dataUrl.startsWith("data:audio/")) {
        delete updatedRecord.dataUrl;
      }
    } else if (savedMedia.isVideo && savedMedia.videoUrl) {
      updatedRecord.url = savedMedia.url;
      updatedRecord.dataUrl = dataUrl;
      updatedRecord.videoUrl = savedMedia.videoUrl;
      updatedRecord.mediaType = "video";
      updatedRecord.mimeType = mimeType || "video/mp4";
      updatedRecord.fileName = fileName || `${slotId}.mp4`;
      updatedRecord.fileSize = fileSize || 0;
    } else {
      updatedRecord.url = savedMedia.url;
      updatedRecord.dataUrl = dataUrl;
      updatedRecord.mimeType = mimeType || "image/jpeg";
      updatedRecord.fileName = fileName || `${slotId}.jpg`;
      updatedRecord.fileSize = fileSize || 0;
      delete updatedRecord.videoUrl;
      if (updatedRecord.mediaType === "video") delete updatedRecord.mediaType;
    }

    manifest[slotId] = updatedRecord;

    saveManifest(manifest);

    res.json({ success: true, image: manifest[slotId] });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: "Failed to persist image" });
  }
});

// Batch sync endpoint: seamlessly accepts any user images recovered from browser storage
app.post("/api/media/sync", (req, res) => {
  try {
    const { images } = req.body;
    if (!images || typeof images !== "object") {
      return res.status(400).json({ success: false, message: "images object required" });
    }

    const manifest = getManifest();
    let updatedCount = 0;

    for (const [slotId, item] of Object.entries(images as Record<string, any>)) {
      if (item && item.dataUrl && typeof item.dataUrl === "string") {
        // Skip default SVGs if already present unless it's a real user photograph
        const isSvg = item.dataUrl.includes("image/svg+xml") || item.mimeType === "image/svg+xml";
        const hasExistingReal = manifest[slotId] && !manifest[slotId].mimeType?.includes("svg");

        if (isSvg && hasExistingReal) {
          continue;
        }

        const savedMedia = saveImageFile(slotId, item.dataUrl, item.mimeType);
        manifest[slotId] = {
          ...item,
          id: slotId,
          url: savedMedia.url,
          ...(savedMedia.videoUrl ? { videoUrl: savedMedia.videoUrl, mediaType: "video" } : {}),
          ...(savedMedia.audioUrl ? { audioUrl: savedMedia.audioUrl, hasAudio: true } : {}),
          isUserUploaded: true,
          uploadedAt: item.uploadedAt || new Date().toISOString(),
        };
        updatedCount++;
      }
    }

    if (updatedCount > 0) {
      saveManifest(manifest);
    }

    res.json({ success: true, count: updatedCount, images: manifest });
  } catch (err) {
    console.error("Sync error:", err);
    res.status(500).json({ success: false, message: "Failed to sync media" });
  }
});

// Serve audio statically
app.use("/audio", express.static(publicAudioDir));
if (fs.existsSync(distAudioDir)) {
  app.use("/audio", express.static(distAudioDir));
}

// Serve public directory
app.use(express.static(path.resolve("./public")));

// Vite middleware in development vs static dist in production
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve("./dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("./dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${isProd ? "production" : "development"} mode`);
  });
}

startServer();

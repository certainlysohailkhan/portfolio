import React, { useEffect, useState, useRef } from "react";
import {
  X,
  ZoomIn,
  ZoomOut,
  Download,
  Compass,
  CheckCircle2,
  Camera,
  Upload,
  AlertCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
} from "lucide-react";
import { useMedia } from "../../context/MediaContext";
import { getFallbackDataUri, getPermanentImageUrl } from "../../utils/imageStorage";

function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs}:${remMins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export const ImageLightboxModal: React.FC = () => {
  const { lightboxImage, closeLightbox, uploadPhoto } = useMedia();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isTimesSquare = lightboxImage?.id === "times_square";
  const audioSrc = lightboxImage?.audioUrl || (isTimesSquare ? "/audio/times_square.mp3" : undefined);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Reset state on image change
  useEffect(() => {
    setZoomLevel(1);
    setUploadNotice(null);
    setVideoError(false);
    setIsPlayingAudio(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [lightboxImage]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        closeLightbox();
      }
    };
    if (lightboxImage) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage, closeLightbox]);

  if (!lightboxImage) return null;

  const handleZoomToggle = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.6 : 1));
  };

  const togglePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingAudio(true))
        .catch((err) => console.warn("Audio playback failed:", err));
    }
  };

  const toggleAudioMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isAudioMuted;
    setIsAudioMuted(!isAudioMuted);
  };

  const handleAudioSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = Number(e.target.value);
    setAudioCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && lightboxImage) {
      const file = e.target.files[0];
      const isAudio = file.type.startsWith("audio/") || file.name.toLowerCase().endsWith(".mp3");
      try {
        await uploadPhoto(lightboxImage.id, file);
        setVideoError(false);
        setUploadNotice(
          isAudio
            ? "MP3 Audio uploaded & persisted permanently to server"
            : file.type.startsWith("video/")
            ? "Video uploaded & persisted permanently to server"
            : "Photograph uploaded & persisted permanently to server"
        );
        setTimeout(() => setUploadNotice(null), 4000);
      } catch (err) {
        console.error("Failed to upload media:", err);
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0] && lightboxImage) {
      const file = e.dataTransfer.files[0];
      const isAudio = file.type.startsWith("audio/") || file.name.toLowerCase().endsWith(".mp3");
      const isMedia = file.type.startsWith("image/") || file.type.startsWith("video/") || isAudio;
      if (isMedia) {
        try {
          await uploadPhoto(lightboxImage.id, file);
          setVideoError(false);
          setUploadNotice(
            isAudio
              ? "MP3 Audio uploaded & persisted permanently"
              : file.type.startsWith("video/")
              ? "Video uploaded & persisted permanently"
              : "Photograph uploaded & persisted permanently"
          );
          setTimeout(() => setUploadNotice(null), 4000);
        } catch (err) {
          console.error("Failed to upload dropped media:", err);
        }
      }
    }
  };

  const isUserPhoto = Boolean(
    lightboxImage.isUserUploaded && !lightboxImage.dataUrl?.includes("image/svg+xml")
  );

  const isVideo = lightboxImage.mediaType === "video" && Boolean(lightboxImage.videoUrl);
  const isAudioData = Boolean(
    lightboxImage.dataUrl?.includes("audio/") ||
    lightboxImage.dataUrl?.startsWith("data:audio/") ||
    lightboxImage.mimeType?.startsWith("audio/")
  );
  const posterUrl =
    (!isAudioData && lightboxImage.dataUrl) ||
    (lightboxImage.url && !lightboxImage.url.includes("audio") ? lightboxImage.url : null) ||
    getPermanentImageUrl(lightboxImage.id) ||
    getFallbackDataUri(lightboxImage.id);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#071120]/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 overflow-hidden animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={lightboxImage.title || lightboxImage.caption || "Media viewer"}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*,audio/*,.mp3,.wav,.m4a"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Embedded HTML5 Audio element */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onTimeUpdate={() => {
            if (audioRef.current) setAudioCurrentTime(audioRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) setAudioDuration(audioRef.current.duration);
          }}
          onEnded={() => setIsPlayingAudio(false)}
        />
      )}

      {/* Top Aircraft Instrument Control Bar */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-[#0C1829] border border-[#1E3A5F] text-xs font-mono text-[#94A3B8] shadow-lg shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#38BDF8] text-[#071120] font-bold flex items-center justify-center font-serif-title text-xs">
            SK
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#F8FAFC] font-semibold">
              {lightboxImage.title || lightboxImage.id.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Center info */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-[#94A3B8]">
          <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>{lightboxImage.location || "SOHAIL KHAN ARCHIVE"}</span>
          {lightboxImage.date && (
            <>
              <span className="text-[#475569]">·</span>
              <span className="text-[#38BDF8] font-bold">{lightboxImage.date}</span>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Direct Upload / Replace Action */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 bg-[#1E3A5F]/60 hover:bg-[#1E3A5F] text-[#38BDF8] hover:text-white transition-colors rounded-none flex items-center gap-1.5 cursor-pointer px-2.5 border border-[#38BDF8]/40"
            title="Upload photo or MP3 audio file"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold tracking-wider uppercase">
              Upload Media
            </span>
          </button>

          <button
            type="button"
            onClick={handleZoomToggle}
            className="p-1.5 hover:bg-[#1E3A5F] text-[#F8FAFC] hover:text-[#38BDF8] transition-colors rounded-none flex items-center gap-1 cursor-pointer"
            title={zoomLevel === 1 ? "Zoom in" : "Reset zoom"}
          >
            {zoomLevel === 1 ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
            <span className="hidden sm:inline text-[11px]">
              {zoomLevel === 1 ? "Zoom" : "Reset"}
            </span>
          </button>

          <a
            href={audioSrc || lightboxImage.videoUrl || lightboxImage.dataUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={audioSrc ? "WhatsApp_Audio_Times_Square.mp3" : lightboxImage.fileName || `${lightboxImage.id}.${isVideo ? "mp4" : "jpg"}`}
            className="p-1.5 hover:bg-[#1E3A5F] text-[#F8FAFC] hover:text-[#38BDF8] transition-colors rounded-none flex items-center gap-1 cursor-pointer"
            title={audioSrc ? "Download MP3 Audio" : "Download media"}
          >
            <Download className="w-4 h-4" />
          </a>

          <div className="h-4 w-px bg-[#1E3A5F] mx-1" />

          <button
            type="button"
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              closeLightbox();
            }}
            className="p-1.5 bg-[#1E3A5F] hover:bg-[#E11D48] text-white transition-colors cursor-pointer flex items-center gap-1.5 px-3"
            aria-label="Close viewer"
          >
            <X className="w-4 h-4" />
            <span className="text-[11px] font-bold tracking-wider uppercase">Close</span>
          </button>
        </div>
      </div>

      {/* Main Center Image / Video Viewport */}
      <div
        className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 overflow-hidden relative cursor-zoom-out"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            if (audioRef.current) audioRef.current.pause();
            closeLightbox();
          }
        }}
      >
        {isDragging && (
          <div className="absolute inset-0 bg-[#071120]/90 flex flex-col items-center justify-center z-30 pointer-events-none">
            <Camera className="w-12 h-12 text-[#38BDF8] animate-bounce mb-3" />
            <span className="text-white font-mono text-sm tracking-wider uppercase font-bold">
              Drop Photo or MP3 Audio to Persist
            </span>
          </div>
        )}

        <div
          className="relative max-w-5xl max-h-[68vh] flex items-center justify-center transition-transform duration-300 ease-out select-none shadow-2xl border border-[#1E3A5F] bg-[#071120]"
          style={{ transform: `scale(${zoomLevel})` }}
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo && !videoError ? (
            <video
              src={lightboxImage.videoUrl}
              poster={posterUrl}
              autoPlay
              loop
              controls
              playsInline
              onError={() => setVideoError(true)}
              className="max-h-[65vh] max-w-full w-auto object-contain block mx-auto transition-opacity duration-300"
            >
              <source src={lightboxImage.videoUrl} />
              <img
                src={posterUrl}
                alt={lightboxImage.title || lightboxImage.caption || lightboxImage.id}
                className="max-h-[65vh] max-w-full w-auto object-contain block mx-auto"
              />
            </video>
          ) : isVideo && videoError ? (
            <div className="relative max-h-[65vh] w-full flex flex-col items-center justify-center p-8 bg-[#071120]">
              <img
                src={posterUrl}
                alt={lightboxImage.title || lightboxImage.caption || lightboxImage.id}
                className="max-h-[45vh] max-w-full w-auto object-contain opacity-50 block mx-auto"
              />
              <div className="absolute inset-0 bg-[#071120]/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 gap-3 z-10">
                <AlertCircle className="w-10 h-10 text-[#F59E0B]" />
                <div className="text-white font-serif-title text-lg font-bold">
                  Video File Pending Upload
                </div>
                <div className="text-xs font-mono text-[#94A3B8] max-w-md">
                  Target source: <code className="text-[#38BDF8]">{lightboxImage.videoUrl}</code>
                  <br />
                  The video asset has not been uploaded to permanent storage yet.
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 px-4 py-2 bg-[#38BDF8] hover:bg-[#0284C7] text-[#071120] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Original File</span>
                </button>
              </div>
            </div>
          ) : (
            <img
              src={posterUrl}
              alt={lightboxImage.title || lightboxImage.caption || lightboxImage.id}
              className="max-h-[65vh] max-w-full w-auto object-contain block mx-auto"
              onError={(e) => {
                if (isUserPhoto) return;
                const fallback =
                  getFallbackDataUri(lightboxImage.id) ||
                  `${import.meta.env.BASE_URL || "/"}images/${lightboxImage.id}.svg`;
                (e.currentTarget as HTMLImageElement).src = fallback;
              }}
            />
          )}
        </div>

        {/* Dedicated Modal Audio Player Deck */}
        {audioSrc && (
          <div
            className="w-full max-w-2xl mt-4 bg-[#0C1829]/95 border border-[#38BDF8]/40 p-3 shadow-2xl flex flex-col gap-2 z-20 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlayAudio}
                  className="w-9 h-9 rounded-full bg-[#38BDF8] text-[#071120] flex items-center justify-center hover:bg-[#7DD3FC] transition-transform hover:scale-105 cursor-pointer shadow-lg"
                  title={isPlayingAudio ? "Pause MP3" : "Play MP3"}
                  aria-label={isPlayingAudio ? "Pause audio" : "Play audio"}
                >
                  {isPlayingAudio ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>
                <div>
                  <div className="text-xs font-mono font-bold text-[#38BDF8] flex items-center gap-2">
                    <Radio className={`w-3.5 h-3.5 ${isPlayingAudio ? "text-[#10B981] animate-pulse" : ""}`} />
                    <span>AUTHENTIC AUDIO RECORDING</span>
                  </div>
                  <div className="text-xs font-serif-body text-[#F8FAFC]">
                    WhatsApp Audio Recording · 32 Minutes · 48 kHz
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-[#94A3B8]">
                <span>{formatDuration(audioCurrentTime)} / {formatDuration(audioDuration || 1932)}</span>
                <button
                  type="button"
                  onClick={toggleAudioMute}
                  className="p-1 hover:text-[#38BDF8] transition-colors cursor-pointer"
                  title={isAudioMuted ? "Unmute" : "Mute"}
                >
                  {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <a
                  href={audioSrc}
                  download="WhatsApp_Audio_Times_Square.mp3"
                  className="p-1 text-[#38BDF8] hover:text-white transition-colors cursor-pointer"
                  title="Download MP3"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Seek Bar */}
            <input
              type="range"
              min={0}
              max={audioDuration || 1932}
              step={1}
              value={audioCurrentTime}
              onChange={handleAudioSeek}
              className="w-full h-1.5 bg-[#1E3A5F] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
              aria-label="Seek audio position"
            />
          </div>
        )}
      </div>

      {/* Bottom Telemetry Caption Bar */}
      <div className="px-4 py-3 bg-[#0C1829] border border-[#1E3A5F] text-xs shadow-lg shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-serif-title text-base sm:text-lg font-bold text-white leading-tight">
            {lightboxImage.title || lightboxImage.caption || "Publication Plate"}
          </h4>
          <p className="text-xs text-[#94A3B8] font-serif-body italic mt-0.5">
            {lightboxImage.caption}
          </p>
          {uploadNotice && (
            <div className="mt-1 text-[11px] font-mono text-[#10B981] flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{uploadNotice}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-[#94A3B8] shrink-0">
          <span>{lightboxImage.location || "PORTFOLIO ARCHIVE"}</span>
          {lightboxImage.date && (
            <>
              <span className="text-[#475569]">·</span>
              <span>{lightboxImage.date}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

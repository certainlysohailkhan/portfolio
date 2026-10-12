import React, { useState, useEffect, useRef } from "react";
import { Maximize2, Camera, CheckCircle2, Upload, Play, Pause, Volume2, VolumeX, Radio } from "lucide-react";
import { useMedia } from "../../context/MediaContext";
import { getFallbackDataUri, getPermanentImageUrl } from "../../utils/imageStorage";

interface EditorialImageFrameProps {
  slotId: "portrait" | "times_square" | "tedx" | "fashion" | "ruhaniyat";
  aspectRatioClass?: string;
  altText: string;
  defaultCaption?: string;
  className?: string;
  sideLabel?: string;
}

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

export const EditorialImageFrame: React.FC<EditorialImageFrameProps> = ({
  slotId,
  aspectRatioClass = "aspect-[3/4]",
  altText,
  defaultCaption,
  className = "",
  sideLabel,
}) => {
  const { images, openLightbox, getImage, uploadPhoto } = useMedia();
  const image = images[slotId] || getImage(slotId);
  const isAudioData = Boolean(
    image?.dataUrl?.includes("audio/") ||
    image?.dataUrl?.startsWith("data:audio/") ||
    image?.mimeType?.startsWith("audio/")
  );
  const targetUrl =
    (!isAudioData && image?.dataUrl) ||
    (image?.url && !image.url.includes("audio") ? image.url : null) ||
    getPermanentImageUrl(slotId) ||
    getFallbackDataUri(slotId);

  const [imgSrc, setImgSrc] = useState<string>(targetUrl);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isTimesSquare = slotId === "times_square";
  const audioSrc = image?.audioUrl || (isTimesSquare ? "/audio/times_square.mp3" : undefined);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sync state if context image dataUrl updates
  useEffect(() => {
    if (targetUrl) {
      setImgSrc(targetUrl);
    }
  }, [targetUrl]);

  const handleOpen = () => {
    openLightbox(image || slotId);
  };

  const handleImgError = () => {
    // If the image was uploaded by the user, do not clobber it with AI SVG unless strictly necessary
    if (image?.isUserUploaded && image?.dataUrl && !image.dataUrl.includes("audio/")) {
      if (imgSrc !== image.dataUrl) {
        setImgSrc(image.dataUrl);
        return;
      }
    }

    const fallbackDataUri = getFallbackDataUri(slotId);
    if (fallbackDataUri && imgSrc !== fallbackDataUri) {
      setImgSrc(fallbackDataUri);
      return;
    }
    const publicUrl = `${import.meta.env.BASE_URL || "/"}images/${slotId}.svg`;
    if (imgSrc !== publicUrl) {
      setImgSrc(publicUrl);
    }
  };

  const togglePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio playback failed:", err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const isAudio = file.type.startsWith("audio/") || file.name.toLowerCase().endsWith(".mp3");
      const isMedia = file.type.startsWith("image/") || file.type.startsWith("video/") || isAudio;
      if (isMedia) {
        try {
          const updated = await uploadPhoto(slotId, file);
          if (!isAudio) setImgSrc(updated.dataUrl);
          setUploadNotice(isAudio ? "MP3 Audio Saved & Persisted" : file.type.startsWith("video/") ? "Video Saved & Persisted" : "Photograph Saved & Persisted");
          setTimeout(() => setUploadNotice(null), 3000);
        } catch (err) {
          console.error("Failed to upload dropped file:", err);
        }
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isAudio = file.type.startsWith("audio/") || file.name.toLowerCase().endsWith(".mp3");
      try {
        const updated = await uploadPhoto(slotId, file);
        if (!isAudio) setImgSrc(updated.dataUrl);
        setUploadNotice(isAudio ? "MP3 Audio Saved & Persisted" : file.type.startsWith("video/") ? "Video Saved & Persisted" : "Photograph Saved & Persisted");
        setTimeout(() => setUploadNotice(null), 3000);
      } catch (err) {
        console.error("Failed to upload file:", err);
      }
    }
  };

  return (
    <figure
      className={`relative group ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden file input for direct media updating */}
      <input
        ref={fileInputRef}
        type="file"
        accept={isTimesSquare ? "image/*,video/*,audio/*,.mp3,.wav,.m4a" : "image/*,audio/*,.mp3"}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* HTML5 Audio element */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onTimeUpdate={() => {
            if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) setDuration(audioRef.current.duration);
          }}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Side Label if specified */}
      {sideLabel && (
        <div className="hidden lg:block absolute -left-7 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] font-mono tracking-widest text-[#4E5D73] uppercase select-none pointer-events-none font-semibold">
          {sideLabel}
        </div>
      )}

      {/* Main Image/Video Frame - Clickable to open Full Lightbox */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
        className={`relative w-full ${aspectRatioClass} bg-[#0A182F] border ${
          isDragging
            ? "border-[#38BDF8] ring-2 ring-[#38BDF8]/50"
            : "border-[#D5DCE6] hover:border-[#0C1829]"
        } overflow-hidden shadow-sm cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-[#0C1829]`}
        aria-label={`View full resolution media: ${altText}`}
        title="Click to view full-resolution plate. Drag and drop any photograph or audio to update."
      >
        <img
          src={imgSrc}
          alt={altText}
          onLoad={() => setIsLoaded(true)}
          onError={handleImgError}
          className={`w-full h-full object-cover object-center select-none transition-all duration-300 group-hover:scale-[1.02] ${
            isLoaded ? "opacity-100" : "opacity-90"
          }`}
          loading="lazy"
          decoding="async"
        />

        {/* Audio Active Indicator Badge */}
        {audioSrc && (
          <div className="absolute top-2.5 left-2.5 bg-[#0C1829]/90 border border-[#38BDF8]/40 px-2 py-1 flex items-center gap-1.5 z-20 text-[10px] font-mono text-[#38BDF8] shadow-md pointer-events-none">
            <Radio className={`w-3 h-3 ${isPlaying ? "text-[#10B981] animate-pulse" : "text-[#38BDF8]"}`} />
            <span className="font-bold tracking-wider uppercase">
              {isPlaying ? "AUDIO BROADCASTING" : "AUDIO ARCHIVE READY"}
            </span>
          </div>
        )}

        {/* Drag Over Active Overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-[#0C1829]/80 backdrop-blur-xs flex flex-col items-center justify-center text-white z-30 pointer-events-none">
            <Camera className="w-8 h-8 text-[#38BDF8] animate-bounce mb-2" />
            <span className="font-mono text-xs tracking-wider uppercase font-bold text-[#38BDF8]">
              Drop Photograph or MP3 Audio
            </span>
            <span className="text-[10px] text-[#94A3B8] font-sans mt-1">
              Saves permanently to disk & production
            </span>
          </div>
        )}

        {/* Subtle Upload Notification Toast */}
        {uploadNotice && (
          <div className="absolute top-10 left-2 right-2 bg-[#0C1829]/95 border border-[#38BDF8] text-[#38BDF8] py-1 px-2 text-[10px] font-mono tracking-wider flex items-center justify-center gap-1.5 z-30 shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{uploadNotice}</span>
          </div>
        )}

        {/* Subtle Aviation/Editorial Inspect Overlay Badge on Hover */}
        <div className="absolute inset-0 bg-[#0C1829]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-auto">
          <div className="px-3 py-1.5 bg-[#0C1829]/90 text-white font-mono text-[10px] tracking-wider uppercase flex items-center gap-1.5 shadow-md border border-[#38BDF8]/40 hover:bg-[#1E3A5F] transition-colors">
            <Maximize2 className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>View Full Plate</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="px-3 py-1.5 bg-[#38BDF8] text-[#071120] font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md hover:bg-[#7DD3FC] transition-colors cursor-pointer"
            title="Upload original image or audio file directly to permanent storage"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload File</span>
          </button>
        </div>

        {/* Integrated Docked Audio Player Console */}
        {audioSrc && (
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#0C1829]/95 backdrop-blur-md border-t border-[#1E3A5F] p-2.5 z-20 flex flex-col gap-1.5 shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlayAudio}
                  className="w-7 h-7 rounded-full bg-[#38BDF8] text-[#071120] flex items-center justify-center hover:bg-[#7DD3FC] transition-transform hover:scale-105 cursor-pointer shadow-md"
                  title={isPlaying ? "Pause audio recording" : "Play audio recording"}
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-[#38BDF8] uppercase flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-[#10B981] animate-ping" : "bg-[#94A3B8]"}`} />
                    <span>Times Square Dispatch</span>
                  </span>
                  <span className="text-[11px] font-serif-body text-white font-medium truncate max-w-[140px] sm:max-w-[200px]">
                    {image?.audioFileName || "WhatsApp Audio · 32 mins"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-[#94A3B8]">
                <span>{formatDuration(currentTime)} / {formatDuration(duration || 1932)}</span>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 text-[#94A3B8] hover:text-[#38BDF8] transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Audio timeline seek slider */}
            <div className="w-full flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 1932}
                step={1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-[#1E3A5F] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
                aria-label="Seek audio timeline"
              />
            </div>
          </div>
        )}
      </div>

      {/* Editorial Caption beneath image */}
      <figcaption className="mt-2.5 flex items-baseline justify-between text-xs text-[#4E5D73] font-serif-body italic">
        <span>{image?.caption || defaultCaption || altText}</span>
        {image?.date && (
          <span className="font-mono text-[11px] not-italic text-[#0C1829] font-bold ml-2 shrink-0">
            {image.date}
          </span>
        )}
      </figcaption>
    </figure>
  );
};

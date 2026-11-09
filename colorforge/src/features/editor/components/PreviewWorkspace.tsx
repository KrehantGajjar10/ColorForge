import { useEffect, useRef, useState } from "react";
import { Eye, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";

import CardsPreview from "./CardsPreview";
import type { Palette } from "../../../types";
import { previewModes, type PreviewMode } from "../editor.types";
import DashboardPreview from "./DashboardPreview";
import ApplicationPreview from "./ApplicationPreview";
import MarketingPreview from "./MarketingPreview";

interface PreviewWorkspaceProps {
  palette: Palette;
  previewMode: PreviewMode;
  onPreviewModeChange: (mode: PreviewMode) => void;
}

export default function PreviewWorkspace({
  palette,
  previewMode,
  onPreviewModeChange,
}: PreviewWorkspaceProps) {
  const previewRef = useRef<HTMLElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activePreview = previewModes.find((mode) => mode.id === previewMode);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === previewRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    const previewElement = previewRef.current;

    if (!previewElement) return;

    try {
      if (document.fullscreenElement === previewElement) {
        await document.exitFullscreen();
        return;
      }

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      await previewElement.requestFullscreen();
    } catch {
      toast.error("Unable to enter fullscreen mode.");
    }
  };

  return (
    <section
      ref={previewRef}
      className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden [&:fullscreen]:h-dvh [&:fullscreen]:w-screen [&:fullscreen]:overflow-hidden"
      style={{ backgroundColor: "var(--cf-secondary)" }}
    >
      {/* Preview toolbar */}
      <div
        className={`flex min-h-14 shrink-0 items-center justify-between gap-3 overflow-x-auto border-b px-3 sm:px-5 ${
          isFullscreen ? "sm:px-7 lg:px-10" : ""
        }`}
        style={{ borderColor: "var(--cf-border)" }}
      >
        <nav
          className="flex min-w-0 items-center gap-1"
          aria-label="Preview modes"
        >
          {previewModes.map((mode) => {
            const active = previewMode === mode.id;

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onPreviewModeChange(mode.id)}
                aria-pressed={active}
                className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: active ? "var(--cf-primary)" : "transparent",
                  color: active
                    ? "var(--cf-primary-foreground)"
                    : "var(--cf-muted-foreground)",
                }}
              >
                {mode.label}
              </button>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <div
            className="hidden items-center gap-2 text-xs md:flex"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            <Eye size={14} aria-hidden="true" />
            Live preview
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            aria-pressed={isFullscreen}
            title={isFullscreen ? "Exit fullscreen (Esc)" : "Fullscreen"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors hover:opacity-75 focus-visible:outline-2"
            style={{
              borderColor: "var(--cf-border)",
              color: "var(--cf-foreground)",
              backgroundColor: isFullscreen
                ? "var(--cf-background)"
                : "transparent",
            }}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* Scrollable preview area */}
      <div
        className={`min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-5 lg:p-6 ${
          isFullscreen ? "xl:p-8 2xl:p-10" : ""
        }`}
        style={{ backgroundColor: "var(--cf-secondary)" }}
      >
        <div
          className={`mx-auto w-full ${
            isFullscreen ? "max-w-450" : "max-w-350"
          }`}
        >
          {/* Preview information */}
          <div
            className={`mb-4 flex flex-wrap items-center justify-between gap-2 ${
              isFullscreen ? "mb-6" : ""
            }`}
          >
            <div>
              <h2 className="text-sm font-semibold">{activePreview?.label}</h2>
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                Preview using {palette.name}
              </p>
            </div>

            <div
              className="flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[10px]"
              style={{
                borderColor: "var(--cf-border)",
                backgroundColor: "var(--cf-background)",
                color: "var(--cf-muted-foreground)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--cf-primary)" }}
              />
              Theme connected
            </div>
          </div>

          {/* Preview content */}
          <div
            className={`min-h-0 w-full rounded-xl border p-3 sm:p-5 ${
              isFullscreen ? "sm:p-7 lg:p-8" : ""
            }`}
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-background)",
            }}
          >
            {previewMode === "cards" ? (
              <CardsPreview palette={palette} />
            ) : previewMode === "dashboard" ? (
              <DashboardPreview />
            ) : previewMode === "application" ? (
              <ApplicationPreview />
            ) : (
              <MarketingPreview />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

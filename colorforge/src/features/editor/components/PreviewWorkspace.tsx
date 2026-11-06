import { Eye } from "lucide-react";

import PalettePreview from "../../../components/palette/PalettePreview";
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
  const activePreview = previewModes.find((mode) => mode.id === previewMode);

  return (
    <section className="flex min-h-140 min-w-0 flex-1 flex-col lg:h-[calc(100dvh-3.5rem)]">
      <div
        className="flex min-h-14 items-center justify-between gap-3 overflow-x-auto border-b px-3 sm:px-5"
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

        <div
          className="hidden shrink-0 items-center gap-2 text-xs md:flex"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          <Eye size={14} aria-hidden="true" />
          Live preview
        </div>
      </div>

      <div
        className="min-h-0 flex-1 overflow-auto p-3 sm:p-5 lg:p-6"
        style={{ backgroundColor: "var(--cf-secondary)" }}
      >
        <div className="mx-auto max-w-350">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
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

          <div
            className="min-h-120 rounded-xl border p-3 sm:p-5"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-background)",
            }}
          >
            {previewMode === "cards" ? (
              <PalettePreview palette={palette} />
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

import {
  Code2,
  Download,
  Link2,
  Moon,
  RotateCcw,
  Save,
  Sun,
} from "lucide-react";
import type { ColorMode } from "../../../context/theme-context";

interface HeaderActionsProps {
  colorMode: ColorMode;
  onReset: () => void;
  onToggleColorMode: () => void;
  onSave: () => void;
  onShare: () => void;
  onExport: () => void;
}

export default function HeaderActions({
  colorMode,
  onReset,
  onToggleColorMode,
  onSave,
  onShare,
  onExport,
}: HeaderActionsProps) {
  const iconButtonStyle = {
    borderColor: "var(--cf-border)",
    color: "var(--cf-foreground)",
  };

  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
      <button
        type="button"
        onClick={onReset}
        className="hidden h-9 items-center gap-2 rounded-lg px-2.5 text-xs font-medium transition-opacity hover:opacity-70 sm:inline-flex"
        title="Reset current palette"
      >
        <RotateCcw size={14} aria-hidden="true" />
        <span>Reset</span>
      </button>

      <button
        type="button"
        onClick={onToggleColorMode}
        aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
        title={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
        className="flex h-9 w-9 items-center justify-center rounded-lg border transition-opacity hover:opacity-70"
        style={iconButtonStyle}
      >
        {colorMode === "light" ? (
          <Moon size={15} aria-hidden="true" />
        ) : (
          <Sun size={15} aria-hidden="true" />
        )}
      </button>

      <span
        className="mx-0.5 hidden h-6 w-px sm:block"
        style={{ backgroundColor: "var(--cf-border)" }}
      />

      <button
        type="button"
        onClick={onSave}
        className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-medium transition-opacity hover:opacity-70 sm:px-3"
        title="Save palette"
      >
        <Save size={14} aria-hidden="true" />
        <span className="hidden md:inline">Save</span>
      </button>

      <button
        type="button"
        onClick={onShare}
        className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-medium transition-opacity hover:opacity-70 sm:px-3"
        title="Copy share link"
      >
        <Link2 size={14} aria-hidden="true" />
        <span className="hidden md:inline">Share</span>
      </button>

      <button
        type="button"
        onClick={onExport}
        className="flex h-9 w-9 items-center justify-center rounded-lg border transition-opacity hover:opacity-70"
        style={iconButtonStyle}
        title="Export palette as JSON"
        aria-label="Export palette as JSON"
      >
        <Download size={15} aria-hidden="true" />
      </button>

      <button
        type="button"
        disabled
        title="Code export is planned for a later chapter"
        className="hidden h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium opacity-40 lg:inline-flex"
        style={iconButtonStyle}
      >
        <Code2 size={14} aria-hidden="true" />
        Code
      </button>
    </div>
  );
}

import {
  ArrowLeft,
  Code2,
  Download,
  Moon,
  Palette,
  RotateCcw,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/useTheme";

export default function AppHeader() {
  const { palette, colorMode, toggleColorMode, resetPalette } = useTheme();

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--cf-background)",
        borderColor: "var(--cf-border)",
        color: "var(--cf-foreground)",
      }}
    >
      <div className="flex h-14 items-center justify-between gap-3 px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/"
            aria-label="Back to ColorForge home"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-opacity hover:opacity-70"
            style={{ backgroundColor: "var(--cf-secondary)" }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </Link>

          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: "var(--cf-primary)",
              color: "var(--cf-primary-foreground)",
            }}
          >
            <Palette size={17} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight">ColorForge</p>
            <p
              className="hidden max-w-40 truncate text-[11px] sm:block"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              {palette.name}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={resetPalette}
            className="inline-flex h-9 items-center gap-2 rounded-lg px-2.5 text-xs font-medium transition-colors hover:opacity-70 sm:px-3"
            title="Reset current palette"
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <span
            className="mx-1 hidden h-6 w-px sm:block"
            style={{ backgroundColor: "var(--cf-border)" }}
          />

          <button
            type="button"
            onClick={toggleColorMode}
            aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:opacity-70"
            style={{ borderColor: "var(--cf-border)" }}
          >
            {colorMode === "light" ? (
              <Moon size={16} aria-hidden="true" />
            ) : (
              <Sun size={16} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            disabled
            title="Code export will be implemented in a later chapter"
            className="hidden h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium opacity-50 md:inline-flex"
            style={{ borderColor: "var(--cf-border)" }}
          >
            <Code2 size={14} aria-hidden="true" />
            Code
          </button>

          <button
            type="button"
            disabled
            title="Export actions will be implemented in a later chapter"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border opacity-50 lg:flex"
            style={{ borderColor: "var(--cf-border)" }}
          >
            <Download size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

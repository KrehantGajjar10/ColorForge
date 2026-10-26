import { ArrowLeft, Moon, Palette, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/useTheme";

export default function AppHeader() {
  const { colorMode, toggleColorMode, palette } = useTheme();

  return (
    <header
      className="sticky top-0 z-40 border-b transition-colors duration-300"
      style={{
        backgroundColor: "var(--cf-background)",
        borderColor: "var(--cf-border)",
        color: "var(--cf-foreground)",
      }}
    >
      <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/"
            aria-label="Back to ColorForge home"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-opacity hover:opacity-70"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
              color: "var(--cf-foreground)",
            }}
          >
            <ArrowLeft size={17} aria-hidden="true" />
          </Link>

          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "var(--cf-primary)",
              color: "var(--cf-primary-foreground)",
            }}
          >
            <Palette size={19} strokeWidth={2} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold tracking-tight">
              ColorForge
            </h1>
            <p
              className="hidden text-xs sm:block"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Theme editor
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <div
            className="hidden max-w-40 items-center gap-2 rounded-lg border px-3 py-2 md:flex"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
            }}
          >
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: palette.tokens.primary }}
            />
            <span className="truncate text-xs font-medium">{palette.name}</span>
          </div>

          <button
            type="button"
            onClick={toggleColorMode}
            aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
              color: "var(--cf-foreground)",
            }}
          >
            {colorMode === "light" ? (
              <Moon size={17} aria-hidden="true" />
            ) : (
              <Sun size={17} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

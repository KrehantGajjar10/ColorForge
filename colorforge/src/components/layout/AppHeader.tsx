import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Code2,
  Download,
  Link2,
  Moon,
  Palette as PaletteIcon,
  RotateCcw,
  Save,
  Search,
  Sun,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "../../context/useTheme";
import { palettes } from "../../data/palettes";
import type { Palette } from "../../types";
import SavePaletteDialog from "../palette/SavePaletteDialog";
import { createPaletteShareUrl } from "../../utils/createPaletteShareUrl";
import { exportPaletteAsJson } from "../../utils/exportPalette";
import {
  getSavedPalettes,
  savePaletteSnapshot,
} from "../../utils/savedPalettes";

export default function AppHeader() {
  const { palette, colorMode, toggleColorMode, selectPalette, resetPalette } =
    useTheme();

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [themeSearch, setThemeSearch] = useState("");
  const [savedPalettes, setSavedPalettes] = useState<Palette[]>([]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsThemeMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const availablePalettes = useMemo(() => {
    const combined = [...palettes, ...savedPalettes];
    const unique = new Map<string, Palette>();

    for (const item of combined) {
      unique.set(item.id, item);
    }

    return [...unique.values()].filter((item) =>
      item.name.toLowerCase().includes(themeSearch.trim().toLowerCase()),
    );
  }, [savedPalettes, themeSearch]);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(createPaletteShareUrl(palette));

      toast.success("Share link copied", {
        description: "Your current palette is ready to share.",
      });
    } catch {
      toast.error("Couldn't copy the share link", {
        description: "Clipboard access was blocked by your browser.",
      });
    }
  }

  function handleSave(name: string) {
    try {
      savePaletteSnapshot(palette, name);
      setSavedPalettes(getSavedPalettes());
      setIsSaveDialogOpen(false);

      toast.success("Palette saved", {
        description: `${name.trim()} was added to your saved palettes.`,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Couldn't save this palette.",
      );
    }
  }

  function handleSelectPalette(nextPalette: Palette) {
    selectPalette(nextPalette);
    setIsThemeMenuOpen(false);
    setThemeSearch("");

    toast.success(`Theme changed to ${nextPalette.name}`);
  }

  function handleThemeMenuToggle() {
    if (!isThemeMenuOpen) {
      try {
        setSavedPalettes(getSavedPalettes());
      } catch {
        toast.error("Couldn't load saved palettes");
      }
    }

    setIsThemeMenuOpen((open) => !open);
  }

  const iconButtonStyle = {
    borderColor: "var(--cf-border)",
    color: "var(--cf-foreground)",
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: "var(--cf-background)",
          borderColor: "var(--cf-border)",
          color: "var(--cf-foreground)",
        }}
      >
        <div className="flex h-14 items-center justify-between gap-2 px-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              to="/"
              aria-label="Back to ColorForge home"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-opacity hover:opacity-70"
              style={{ backgroundColor: "var(--cf-secondary)" }}
            >
              <X size={15} aria-hidden="true" />
            </Link>

            <Link
              to="/editor"
              className="flex shrink-0 items-center gap-2"
              aria-label="ColorForge editor"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: "var(--cf-primary)",
                  color: "var(--cf-primary-foreground)",
                }}
              >
                <PaletteIcon size={17} aria-hidden="true" />
              </span>

              <span className="hidden text-sm font-semibold sm:inline">
                ColorForge
              </span>
            </Link>

            <span
              className="hidden h-6 w-px sm:block"
              style={{ backgroundColor: "var(--cf-border)" }}
            />

            <div className="relative min-w-0">
              <button
                type="button"
                onClick={handleThemeMenuToggle}
                aria-expanded={isThemeMenuOpen}
                aria-haspopup="dialog"
                className="flex max-w-45 items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium transition-colors hover:opacity-75 sm:max-w-62.5"
                title="Select theme"
              >
                <span className="flex shrink-0 gap-0.5" aria-hidden="true">
                  {[
                    palette.tokens.primary,
                    palette.tokens.secondary,
                    palette.tokens.accent,
                    palette.tokens.background,
                  ].map((color, index) => (
                    <span
                      key={`${color}-${index}`}
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </span>

                <span className="truncate">{palette.name}</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>

              {isThemeMenuOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-40 cursor-default"
                    aria-label="Close theme menu"
                    onClick={() => setIsThemeMenuOpen(false)}
                  />

                  <section
                    role="dialog"
                    aria-label="Select a theme"
                    className="absolute left-0 top-full z-50 mt-2 w-[min(340px,calc(100vw-24px))] overflow-hidden rounded-xl border shadow-2xl"
                    style={{
                      backgroundColor: "var(--cf-background)",
                      borderColor: "var(--cf-border)",
                    }}
                  >
                    <div
                      className="border-b p-3"
                      style={{ borderColor: "var(--cf-border)" }}
                    >
                      <p className="mb-2 text-sm font-semibold">
                        Choose a theme
                      </p>

                      <label
                        className="flex items-center gap-2 rounded-lg border px-3 py-2"
                        style={{
                          borderColor: "var(--cf-border)",
                          backgroundColor: "var(--cf-secondary)",
                        }}
                      >
                        <Search
                          size={14}
                          style={{ color: "var(--cf-muted-foreground)" }}
                          aria-hidden="true"
                        />

                        <input
                          autoFocus
                          value={themeSearch}
                          onChange={(event) =>
                            setThemeSearch(event.target.value)
                          }
                          placeholder="Search themes..."
                          aria-label="Search themes"
                          className="min-w-0 flex-1 bg-transparent text-xs outline-none"
                        />
                      </label>
                    </div>

                    <div className="max-h-72 overflow-y-auto p-2">
                      {availablePalettes.length === 0 ? (
                        <p
                          className="px-3 py-6 text-center text-xs"
                          style={{ color: "var(--cf-muted-foreground)" }}
                        >
                          No matching themes found.
                        </p>
                      ) : (
                        availablePalettes.map((item) => {
                          const selected = item.id === palette.id;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelectPalette(item)}
                              className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors"
                              style={{
                                backgroundColor: selected
                                  ? "var(--cf-muted)"
                                  : "transparent",
                              }}
                            >
                              <span className="flex h-8 w-12 shrink-0 overflow-hidden rounded-md">
                                {[
                                  item.tokens.primary,
                                  item.tokens.secondary,
                                  item.tokens.accent,
                                  item.tokens.background,
                                ].map((color, index) => (
                                  <span
                                    key={`${item.id}-${index}`}
                                    className="min-w-0 flex-1"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-xs font-medium">
                                  {item.name}
                                </span>

                                <span
                                  className="mt-0.5 block text-[10px]"
                                  style={{
                                    color: "var(--cf-muted-foreground)",
                                  }}
                                >
                                  {item.id.startsWith("custom-")
                                    ? "Saved palette"
                                    : "ColorForge theme"}
                                </span>
                              </span>

                              {selected && (
                                <Check
                                  size={15}
                                  style={{ color: "var(--cf-primary)" }}
                                  aria-label="Current theme"
                                />
                              )}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </section>
                </>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={resetPalette}
              className="hidden h-9 items-center gap-2 rounded-lg px-2.5 text-xs font-medium transition-opacity hover:opacity-70 sm:inline-flex"
              title="Reset current palette"
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={toggleColorMode}
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
              onClick={() => setIsSaveDialogOpen(true)}
              className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-medium transition-opacity hover:opacity-70 sm:px-3"
              title="Save palette"
            >
              <Save size={14} aria-hidden="true" />
              <span className="hidden md:inline">Save</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-medium transition-opacity hover:opacity-70 sm:px-3"
              title="Copy share link"
            >
              <Link2 size={14} aria-hidden="true" />
              <span className="hidden md:inline">Share</span>
            </button>

            <button
              type="button"
              onClick={() => exportPaletteAsJson(palette)}
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
        </div>
      </header>

      {isSaveDialogOpen && (
        <SavePaletteDialog
          defaultName={palette.name}
          onSave={handleSave}
          onClose={() => setIsSaveDialogOpen(false)}
        />
      )}
    </>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Palette as PaletteIcon, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "../../context/useTheme";
import { palettes } from "../../data/palettes";
import type { Palette } from "../../types";
import {
  getSavedPalettes,
  savePaletteSnapshot,
} from "../../utils/savedPalettes";
import { createPaletteShareUrl } from "../../utils/createPaletteShareUrl";
import { exportPaletteAsJson } from "../../utils/exportPalette";
import SavePaletteDialog from "../palette/SavePaletteDialog";
import HeaderActions from "./header/HeaderActions";
import ThemeSelector from "./header/ThemeSelector";

export default function AppHeader() {
  const { palette, colorMode, toggleColorMode, selectPalette, resetPalette } =
    useTheme();

  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [savedPalettes, setSavedPalettes] =
    useState<Palette[]>(getSavedPalettes);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSaveDialogOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const availablePalettes = useMemo(() => {
    const unique = new Map<string, Palette>();

    for (const item of [...palettes, ...savedPalettes]) {
      unique.set(item.id, item);
    }

    return [...unique.values()];
  }, [savedPalettes]);

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
    toast.success(`Theme changed to ${nextPalette.name}`);
  }

  function handleOpenSaveDialog() {
    setSavedPalettes(getSavedPalettes());
    setIsSaveDialogOpen(true);
  }

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

            <ThemeSelector
              palette={palette}
              palettes={availablePalettes}
              onSelect={handleSelectPalette}
            />
          </div>

          <HeaderActions
            colorMode={colorMode}
            onReset={resetPalette}
            onToggleColorMode={toggleColorMode}
            onSave={handleOpenSaveDialog}
            onShare={handleShare}
            onExport={() => exportPaletteAsJson(palette)}
          />
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

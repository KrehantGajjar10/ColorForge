import { useState } from "react";
import {
  ArrowUpRight,
  BookmarkPlus,
  Check,
  Link2,
  Palette,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import PaletteEditor from "../components/palette/PaletteEditor";
import PaletteGallery from "../components/palette/PaletteGallery";
import PalettePreview from "../components/palette/PalettePreview";
import SavePaletteDialog from "../components/palette/SavePaletteDialog";
import SavedPaletteGallery from "../components/palette/SavedPaletteGallery";
import { useTheme } from "../context/useTheme";
import { palettes } from "../data/palettes";
import { createPaletteShareUrl } from "../utils/createPaletteShareUrl";
import { getSavedPalettes, savePaletteSnapshot } from "../utils/savedPalettes";
import type { Palette as PaletteType } from "../types";

export default function HomePage() {
  const { palette, selectPalette, updatePalette, resetPalette } = useTheme();
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [savedPalettes, setSavedPalettes] =
    useState<PaletteType[]>(getSavedPalettes);

  const displayPalettes = palettes.map((item) =>
    item.id === palette.id ? palette : item,
  );

  async function handleSharePalette() {
    const shareUrl = createPaletteShareUrl(palette);

    try {
      await navigator.clipboard.writeText(shareUrl);

      toast.success("Share link copied", {
        description: "Your customized palette is ready to share.",
        icon: <Check size={16} />,
      });
    } catch {
      toast.error("Couldn't copy the share link", {
        description:
          "Clipboard access was blocked. Try using ColorForge in a secure browser context.",
      });
    }
  }

  function handleSavePalette(name: string) {
    try {
      savePaletteSnapshot(palette, name);
      setSavedPalettes(getSavedPalettes());
      setIsSaveDialogOpen(false);

      toast.success("Palette saved", {
        description: `"${name.trim()}" is saved in this browser.`,
        icon: <Check size={16} />,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Couldn't save this palette.",
      );
    }
  }

  function handleLoadPalette(savedPalette: PaletteType) {
    selectPalette(savedPalette);
    toast.success("Palette loaded", {
      description: `"${savedPalette.name}" is now active in the editor.`,
    });
  }

  function handleDeletePalette(savedPalette: PaletteType) {
    const confirmed = window.confirm(
      `Delete "${savedPalette.name}" from your saved palettes? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      const remaining = getSavedPalettes().filter(
        (item) => item.id !== savedPalette.id,
      );

      localStorage.setItem(
        "colorforge-saved-palettes",
        JSON.stringify(remaining),
      );

      setSavedPalettes(remaining);

      toast.success("Saved palette deleted", {
        description: `"${savedPalette.name}" was removed from your collection.`,
      });
    } catch {
      toast.error("Couldn't delete this palette", {
        description: "Your browser couldn't update saved palette storage.",
      });
    }
  }

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--cf-background)",
        color: "var(--cf-foreground)",
      }}
    >
      <div className="mx-auto w-full max-w-360 px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
        <header
          className="mb-8 border-b pb-7 sm:mb-10 sm:pb-8"
          style={{ borderColor: "var(--cf-border)" }}
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <Palette size={15} style={{ color: "var(--cf-primary)" }} />
            <span style={{ color: "var(--cf-muted-foreground)" }}>
              COLORFORGE
            </span>
            <span style={{ color: "var(--cf-border)" }}>/</span>
            <span>Palette studio</span>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Your colors, your system.
              </h2>
              <p
                className="mt-3 max-w-xl text-sm leading-6 sm:text-base"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                Explore curated palettes, refine your design tokens, and see
                every change in a live preview.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSaveDialogOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: "var(--cf-border)",
                  backgroundColor: "var(--cf-primary)",
                  color: "var(--cf-primary-foreground)",
                }}
              >
                <BookmarkPlus size={14} aria-hidden="true" />
                Save palette
              </button>

              <button
                type="button"
                onClick={handleSharePalette}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: "var(--cf-border)",
                  backgroundColor: "var(--cf-background)",
                  color: "var(--cf-foreground)",
                }}
              >
                <Link2 size={14} aria-hidden="true" />
                Share palette
              </button>

              <div
                className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium"
                style={{
                  borderColor: "var(--cf-border)",
                  backgroundColor: "var(--cf-secondary)",
                  color: "var(--cf-secondary-foreground)",
                }}
              >
                <Sparkles size={14} style={{ color: "var(--cf-primary)" }} />
                Live editing
              </div>
            </div>
          </div>
        </header>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-8">
          <div className="min-w-0 space-y-6">
            <section
              className="min-w-0 rounded-2xl border p-4 transition-[background-color,border-color,box-shadow] duration-300 sm:p-6"
              style={{
                borderColor: "var(--cf-border)",
                backgroundColor: "var(--cf-secondary)",
              }}
            >
              <PaletteGallery
                palettes={displayPalettes}
                selectedId={palette.id}
                onSelect={selectPalette}
              />
            </section>

            <section
              className="min-w-0 rounded-2xl border p-4 transition-[background-color,border-color,box-shadow] duration-300 sm:p-6"
              style={{
                borderColor: "var(--cf-border)",
                backgroundColor: "var(--cf-secondary)",
              }}
            >
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    Customize
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    Design tokens
                  </h3>
                  <p
                    className="mt-1 text-sm leading-5"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    Fine-tune the colors behind your theme.
                  </p>
                </div>

                <div
                  className="hidden rounded-xl border p-2.5 sm:block"
                  style={{
                    borderColor: "var(--cf-border)",
                    color: "var(--cf-primary)",
                  }}
                >
                  <Palette size={19} />
                </div>
              </div>

              <PaletteEditor
                palette={palette}
                onChange={updatePalette}
                onReset={resetPalette}
              />
            </section>

            <section
              className="min-w-0 rounded-2xl border p-4 transition-[background-color,border-color,box-shadow] duration-300 sm:p-6"
              style={{
                borderColor: "var(--cf-border)",
                backgroundColor: "var(--cf-secondary)",
              }}
            >
              <SavedPaletteGallery
                palettes={savedPalettes}
                selectedId={palette.id}
                onLoad={handleLoadPalette}
                onDelete={handleDeletePalette}
              />
            </section>
          </div>

          <aside
            className="min-w-0 xl:sticky xl:top-6"
            aria-label="Live palette preview"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">Live preview</h3>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  See your current theme in context.
                </p>
              </div>

              <ArrowUpRight
                size={17}
                style={{ color: "var(--cf-muted-foreground)" }}
                aria-hidden="true"
              />
            </div>

            <PalettePreview palette={palette} />
          </aside>
        </div>

        <footer
          className="mt-10 flex flex-col gap-2 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: "var(--cf-border)",
            color: "var(--cf-muted-foreground)",
          }}
        >
          <span>ColorForge Palette Studio</span>
          <span>Changes update your theme in real time.</span>
        </footer>
      </div>

      {isSaveDialogOpen && (
        <SavePaletteDialog
          defaultName={palette.name}
          onSave={handleSavePalette}
          onClose={() => setIsSaveDialogOpen(false)}
        />
      )}
    </main>
  );
}

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookmarkPlus,
  Check,
  Layers3,
  Link2,
  Palette,
  SlidersHorizontal,
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

type EditorSection = "colors" | "saved";

export default function HomePage() {
  const { palette, selectPalette, updatePalette, resetPalette } = useTheme();
  const location = useLocation();
const navigate = useNavigate();

const requestedTab = new URLSearchParams(location.search).get("tab");

const activeSection: EditorSection =
  requestedTab === "saved" ? "saved" : "colors";

function handleSectionChange(section: EditorSection) {
  const searchParams = new URLSearchParams(location.search);
  searchParams.set("tab", section);

  navigate(
    {
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
      hash: location.hash,
    },
    { replace: true },
  );
}
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
        description: "Clipboard access was blocked by your browser.",
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
    handleSectionChange("colors");
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
      toast.success("Saved palette deleted");
    } catch {
      toast.error("Couldn't delete this palette", {
        description: "Your browser couldn't update saved palette storage.",
      });
    }
  }

  const navigationItems = [
    {
      id: "colors" as const,
      label: "Colors",
      description: "Palette and color tokens",
      icon: Palette,
    },
    {
      id: "saved" as const,
      label: "Saved palettes",
      description: "Your personal collection",
      icon: BookmarkPlus,
    },
  ];

  return (
    <main
      className="min-h-[calc(100vh-4rem)] transition-colors duration-300"
      style={{
        backgroundColor: "var(--cf-background)",
        color: "var(--cf-foreground)",
      }}
    >
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1800px] lg:grid-cols-[270px_minmax(0,1fr)]">
        <aside
          className="border-b p-4 sm:p-5 lg:border-r lg:border-b-0"
          style={{ borderColor: "var(--cf-border)" }}
          aria-label="Theme editor settings"
        >
          <div className="mb-5">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Workspace
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              Theme settings
            </h2>
            <p
              className="mt-1 text-sm leading-5"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Customize the design system for your interface.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const selected = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSectionChange(item.id)}
                  aria-current={selected ? "page" : undefined}
                  className="flex min-w-0 items-center gap-3 rounded-xl border p-3 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderColor: selected
                      ? "var(--cf-primary)"
                      : "var(--cf-border)",
                    backgroundColor: selected
                      ? "var(--cf-muted)"
                      : "transparent",
                  }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: selected
                        ? "var(--cf-primary)"
                        : "var(--cf-secondary)",
                      color: selected
                        ? "var(--cf-primary-foreground)"
                        : "var(--cf-foreground)",
                    }}
                  >
                    <Icon size={17} aria-hidden="true" />
                  </span>

                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">
                      {item.label}
                    </span>
                    <span
                      className="mt-0.5 hidden text-xs lg:block"
                      style={{ color: "var(--cf-muted-foreground)" }}
                    >
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div
            className="mt-5 hidden rounded-xl border p-3 lg:block"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--cf-primary)" }}
              />
              <span className="text-xs font-medium">Active theme</span>
            </div>
            <p className="mt-2 truncate text-sm font-semibold">
              {palette.name}
            </p>
            <p
              className="mt-1 text-xs"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Changes are saved in this browser automatically.
            </p>
          </div>
        </aside>

        <section className="min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div
                className="mb-2 flex items-center gap-2 text-xs"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                <Layers3 size={14} aria-hidden="true" />
                <span>Theme editor</span>
                <span>/</span>
                <span>
                  {activeSection === "colors" ? "Colors" : "Saved palettes"}
                </span>
              </div>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {activeSection === "colors"
                  ? "Customize your theme"
                  : "Your saved palettes"}
              </h2>

              <p
                className="mt-2 max-w-2xl text-sm leading-6"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                {activeSection === "colors"
                  ? "Choose a palette, adjust its semantic colors, and see your changes live."
                  : "Load a saved palette or manage your personal collection."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSaveDialogOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                  borderColor: "var(--cf-border)",
                  backgroundColor: "var(--cf-secondary)",
                }}
              >
                <BookmarkPlus size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Save palette</span>
                <span className="sm:hidden">Save</span>
              </button>

              <button
                type="button"
                onClick={handleSharePalette}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85"
                style={{
                  backgroundColor: "var(--cf-primary)",
                  color: "var(--cf-primary-foreground)",
                }}
              >
                <Link2 size={15} aria-hidden="true" />
                Share
              </button>
            </div>
          </div>

          {activeSection === "colors" ? (
            <div className="grid min-w-0 items-start gap-5 2xl:grid-cols-[minmax(0,1fr)_minmax(300px,0.85fr)]">
              <div className="min-w-0 space-y-5">
                <section
                  className="min-w-0 rounded-2xl border p-4 sm:p-5"
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
                  className="min-w-0 rounded-2xl border p-4 sm:p-5"
                  style={{
                    borderColor: "var(--cf-border)",
                    backgroundColor: "var(--cf-secondary)",
                  }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: "var(--cf-muted)",
                        color: "var(--cf-primary)",
                      }}
                    >
                      <SlidersHorizontal size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">
                        Semantic color tokens
                      </h3>
                      <p
                        className="mt-1 text-xs"
                        style={{ color: "var(--cf-muted-foreground)" }}
                      >
                        Fine-tune each color used by your theme.
                      </p>
                    </div>
                  </div>

                  <PaletteEditor
                    palette={palette}
                    onChange={updatePalette}
                    onReset={resetPalette}
                  />
                </section>
              </div>

              <aside
                className="min-w-0 2xl:sticky 2xl:top-24"
                aria-label="Live theme preview"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">Live preview</h3>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--cf-muted-foreground)" }}
                    >
                      Updates as you edit your colors.
                    </p>
                  </div>

                  <span
                    className="rounded-full border px-2.5 py-1 text-xs"
                    style={{
                      borderColor: "var(--cf-border)",
                      backgroundColor: "var(--cf-secondary)",
                    }}
                  >
                    Live
                  </span>
                </div>

                <PalettePreview palette={palette} />
              </aside>
            </div>
          ) : (
            <section
              className="min-w-0 rounded-2xl border p-4 sm:p-6"
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
          )}

          <footer
            className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-xs"
            style={{
              borderColor: "var(--cf-border)",
              color: "var(--cf-muted-foreground)",
            }}
          >
            <span>ColorForge · Theme workspace</span>
            <span>Palette changes sync automatically.</span>
          </footer>
        </section>
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

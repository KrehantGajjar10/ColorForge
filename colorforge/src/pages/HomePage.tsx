import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  LayoutDashboard,
  PanelsTopLeft,
  Search,
  Sparkles,
  Type,
  WandSparkles,
} from "lucide-react";
import PaletteEditor from "../components/palette/PaletteEditor";
import PaletteGallery from "../components/palette/PaletteGallery";
import PalettePreview from "../components/palette/PalettePreview";
import { useTheme } from "../context/useTheme";
import { palettes } from "../data/palettes";

type SettingsTab = "colors" | "typography" | "other";
type PreviewMode = "cards" | "dashboard" | "application" | "marketing";

const settingTabs: {
  id: SettingsTab;
  label: string;
  icon: typeof PanelsTopLeft;
}[] = [
  { id: "colors", label: "Colors", icon: PanelsTopLeft },
  { id: "typography", label: "Typography", icon: Type },
  { id: "other", label: "Other", icon: WandSparkles },
];

const previewModes: { id: PreviewMode; label: string }[] = [
  { id: "cards", label: "Cards" },
  { id: "dashboard", label: "Dashboard" },
  { id: "application", label: "Application" },
  { id: "marketing", label: "Marketing" },
];

const fontFamilies = [
  {
    label: "Inter",
    value: "Inter, ui-sans-serif, system-ui, sans-serif",
  },
  {
    label: "Geist",
    value: "Geist, ui-sans-serif, system-ui, sans-serif",
  },
  {
    label: "System",
    value: "ui-sans-serif, system-ui, sans-serif",
  },
  {
    label: "Arial",
    value: "Arial, Helvetica, sans-serif",
  },
  {
    label: "Georgia",
    value: "Georgia, serif",
  },
  {
    label: "Monospace",
    value: "ui-monospace, SFMono-Regular, Consolas, monospace",
  },
];

const FONT_STORAGE_KEY = "colorforge-font-family";

function getInitialFontFamily(): string {
  try {
    const savedFont = localStorage.getItem(FONT_STORAGE_KEY);

    if (fontFamilies.some((font) => font.value === savedFont)) {
      return savedFont!;
    }
  } catch {
    // Use the default font when browser storage is unavailable.
  }

  return fontFamilies[0].value;
}

export default function HomePage() {
  const { palette, selectPalette, updatePalette, resetPalette } = useTheme();

  const [settingsTab, setSettingsTab] = useState<SettingsTab>("colors");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("cards");
  const [search, setSearch] = useState("");
  const [paletteListOpen, setPaletteListOpen] = useState(true);
  const [fontFamily, setFontFamily] = useState<string>(getInitialFontFamily);

  useEffect(() => {
    try {
      localStorage.setItem(FONT_STORAGE_KEY, fontFamily);
    } catch {
      // Keep the selected font working for the current session.
    }
  }, [fontFamily]);

  const displayPalettes = palettes.map((item) =>
    item.id === palette.id ? palette : item,
  );

  const filteredPalettes = displayPalettes.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main
      className="flex min-h-[calc(100dvh-3.5rem)] flex-col overflow-hidden lg:flex-row"
      style={{
        backgroundColor: "var(--cf-background)",
        color: "var(--cf-foreground)",
        fontFamily,
      }}
    >
      <aside
        className="flex w-full shrink-0 flex-col border-b lg:h-[calc(100dvh-3.5rem)] lg:w-90 lg:border-b-0 lg:border-r xl:w-100"
        style={{
          borderColor: "var(--cf-border)",
          backgroundColor: "var(--cf-background)",
        }}
        aria-label="Theme settings"
      >
        <div
          className="grid grid-cols-3 gap-1 border-b p-2.5"
          style={{ borderColor: "var(--cf-border)" }}
          role="tablist"
          aria-label="Theme settings sections"
        >
          {settingTabs.map((tab) => {
            const Icon = tab.icon;
            const active = settingsTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSettingsTab(tab.id)}
                className="flex h-10 items-center justify-center gap-2 rounded-lg px-2 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: active ? "var(--cf-primary)" : "transparent",
                  color: active
                    ? "var(--cf-primary-foreground)"
                    : "var(--cf-muted-foreground)",
                }}
              >
                <Icon size={15} aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4">
          {settingsTab === "colors" && (
            <div className="space-y-5">
              <section>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-semibold">Color system</h2>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--cf-muted-foreground)" }}
                    >
                      Customize your theme tokens.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetPalette}
                    className="rounded-md px-2 py-1.5 text-xs transition-opacity hover:opacity-70"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    Reset
                  </button>
                </div>

                <div
                  className="mb-4 flex items-center gap-2 rounded-lg border px-3 py-2"
                  style={{
                    borderColor: "var(--cf-border)",
                    backgroundColor: "var(--cf-secondary)",
                  }}
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--cf-primary)" }}
                  />
                  <span className="min-w-0 flex-1 truncate text-xs font-medium">
                    {palette.name}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    Active
                  </span>
                </div>

                <label
                  className="mb-4 flex h-10 items-center gap-2 rounded-lg border px-3"
                  style={{ borderColor: "var(--cf-border)" }}
                >
                  <Search
                    size={15}
                    aria-hidden="true"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search palettes..."
                    className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:opacity-60"
                    aria-label="Search palettes"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setPaletteListOpen((open) => !open)}
                  aria-expanded={paletteListOpen}
                  className="mb-3 flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em]"
                  style={{
                    backgroundColor: "var(--cf-muted)",
                    color: "var(--cf-muted-foreground)",
                  }}
                >
                  <span>Theme palettes</span>
                  {paletteListOpen ? (
                    <ChevronDown size={14} aria-hidden="true" />
                  ) : (
                    <ChevronRight size={14} aria-hidden="true" />
                  )}
                </button>

                {paletteListOpen && (
                  <PaletteGallery
                    palettes={filteredPalettes}
                    selectedId={palette.id}
                    onSelect={selectPalette}
                  />
                )}
              </section>

              <div
                className="border-t pt-5"
                style={{ borderColor: "var(--cf-border)" }}
              >
                <PaletteEditor
                  palette={palette}
                  onChange={updatePalette}
                  onReset={resetPalette}
                />
              </div>
            </div>
          )}

          {settingsTab === "typography" && (
            <section className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">Typography</h2>
                <p
                  className="mt-1 text-xs leading-5"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  Choose a font family and preview how it looks with your theme.
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="font-family"
                  className="block text-xs font-medium"
                >
                  Font family
                </label>

                <select
                  id="font-family"
                  value={fontFamily}
                  onChange={(event) => setFontFamily(event.target.value)}
                  className="h-10 w-full rounded-lg border px-3 text-sm outline-none focus-visible:ring-1"
                  style={{
                    borderColor: "var(--cf-border)",
                    backgroundColor: "var(--cf-background)",
                    color: "var(--cf-foreground)",
                  }}
                >
                  {fontFamilies.map((font) => (
                    <option key={font.label} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>

                <p
                  className="text-[11px] leading-5"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  Some fonts may fall back to a system font if they are not
                  installed.
                </p>
              </div>

              <div
                className="rounded-xl border p-4"
                style={{
                  borderColor: "var(--cf-border)",
                  backgroundColor: "var(--cf-secondary)",
                  fontFamily,
                }}
              >
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  Typography preview
                </span>

                <p className="mt-4 text-3xl font-semibold tracking-tight">
                  Aa Bb Cc
                </p>

                <p className="mt-2 text-sm leading-6">
                  The quick brown fox jumps over the lazy dog.
                </p>

                <div
                  className="mt-4 border-t pt-3"
                  style={{ borderColor: "var(--cf-border)" }}
                >
                  <p className="text-lg font-medium">Heading example</p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    Body text example for your selected theme.
                  </p>
                </div>
              </div>
            </section>
          )}

          {settingsTab === "other" && (
            <section className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">Other settings</h2>
                <p
                  className="mt-1 text-xs leading-5"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  Radius and additional design settings will be introduced in
                  Chapter 18.
                </p>
              </div>

              <div
                className="rounded-xl border p-4"
                style={{
                  borderColor: "var(--cf-border)",
                  backgroundColor: "var(--cf-secondary)",
                }}
              >
                <Sparkles
                  size={18}
                  style={{ color: "var(--cf-primary)" }}
                  aria-hidden="true"
                />
                <p className="mt-3 text-sm font-medium">More theme controls</p>
                <p
                  className="mt-1 text-xs leading-5"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  This panel is reserved for the next settings chapter.
                </p>
              </div>
            </section>
          )}
        </div>

        <div
          className="hidden items-center justify-between border-t px-4 py-3 text-[11px] lg:flex"
          style={{
            borderColor: "var(--cf-border)",
            color: "var(--cf-muted-foreground)",
          }}
        >
          <span>ColorForge Theme Editor</span>
          <span>Chapter 15</span>
        </div>
      </aside>

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
                  onClick={() => setPreviewMode(mode.id)}
                  aria-pressed={active}
                  className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: active
                      ? "var(--cf-primary)"
                      : "transparent",
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
                <h2 className="text-sm font-semibold">
                  {previewModes.find((mode) => mode.id === previewMode)?.label}
                </h2>
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
              ) : (
                <div className="flex min-h-107.5 flex-col items-center justify-center px-5 py-12 text-center">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "var(--cf-muted)",
                      color: "var(--cf-primary)",
                    }}
                  >
                    {previewMode === "dashboard" ? (
                      <LayoutDashboard size={22} aria-hidden="true" />
                    ) : previewMode === "application" ? (
                      <PanelsTopLeft size={22} aria-hidden="true" />
                    ) : (
                      <Sparkles size={22} aria-hidden="true" />
                    )}
                  </span>

                  <h3 className="mt-4 text-lg font-semibold">
                    {previewMode === "dashboard"
                      ? "Dashboard preview"
                      : previewMode === "application"
                        ? "Application preview"
                        : "Marketing preview"}
                  </h3>

                  <p
                    className="mt-2 max-w-sm text-sm leading-6"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    This preview will become a fully styled, theme-aware
                    interface in a later chapter. Your selected palette is
                    already connected to the editor.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

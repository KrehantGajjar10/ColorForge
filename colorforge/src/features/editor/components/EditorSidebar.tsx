import { useState } from "react";
import { ChevronDown, ChevronRight, Search, Sparkles } from "lucide-react";

import PaletteEditor from "../../../components/palette/PaletteEditor";
import PaletteGallery from "../../../components/palette/PaletteGallery";
import TypographySettings from "./TypographySettings";

import type { Palette } from "../../../types";
import type { FontFamily } from "../../../context/theme-context";
import { settingTabs, type SettingsTab } from "../editor.types";

interface EditorSidebarProps {
  palette: Palette;
  palettes: Palette[];
  fontFamily: FontFamily;
  onSelectPalette: (palette: Palette) => void;
  onUpdatePalette: (palette: Palette) => void;
  onResetPalette: () => void;
  onFontFamilyChange: (fontFamily: FontFamily) => void;
}

export default function EditorSidebar({
  palette,
  palettes,
  fontFamily,
  onSelectPalette,
  onUpdatePalette,
  onResetPalette,
  onFontFamilyChange,
}: EditorSidebarProps) {
  const [settingsTab, setSettingsTab] = useState<SettingsTab>("colors");
  const [search, setSearch] = useState("");
  const [paletteListOpen, setPaletteListOpen] = useState(true);

  const filteredPalettes = palettes.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <aside
      className="flex max-h-[42%] min-h-0 w-full shrink-0 flex-col border-b lg:h-full lg:max-h-none lg:w-90 lg:border-b-0 lg:border-r xl:w-100"
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

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
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
                  onClick={onResetPalette}
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
                  onSelect={onSelectPalette}
                />
              )}
            </section>

            <div
              className="border-t pt-5"
              style={{ borderColor: "var(--cf-border)" }}
            >
              <PaletteEditor
                palette={palette}
                onChange={onUpdatePalette}
                onReset={onResetPalette}
              />
            </div>
          </div>
        )}

        {settingsTab === "typography" && (
          <TypographySettings
            fontFamily={fontFamily}
            onFontFamilyChange={onFontFamilyChange}
          />
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
  );
}

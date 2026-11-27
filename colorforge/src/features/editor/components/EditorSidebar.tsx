import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ChevronDown, ChevronRight, Palette, Search, X } from "lucide-react";

import PaletteEditor from "../../../components/palette/PaletteEditor";
import PaletteGallery from "../../../components/palette/PaletteGallery";
import SavedPaletteSection from "../../../components/palette/SavedPaletteSection";
import TypographySettings from "./TypographySettings";
import OtherSettings from "./OtherSettings";
import AccessibilitySettings from "./accessibility/AccessibilitySettings";

import type { Palette as PaletteType } from "../../../types";
import type { FontFamily } from "../../../context/theme-context";
import { settingTabs, type SettingsTab } from "../editor.types";

interface EditorSidebarProps {
  palette: PaletteType;
  palettes: PaletteType[];
  savedPalettes: PaletteType[];
  fontFamily: FontFamily;
  onSelectPalette: (palette: PaletteType) => void;
  onUpdatePalette: (palette: PaletteType) => void;
  onResetPalette: () => void;
  onFontFamilyChange: (fontFamily: FontFamily) => void;
}

export default function EditorSidebar({
  palette,
  palettes,
  savedPalettes,
  fontFamily,
  onSelectPalette,
  onUpdatePalette,
  onResetPalette,
  onFontFamilyChange,
}: EditorSidebarProps) {
  const [settingsTab, setSettingsTab] = useState<SettingsTab>("colors");
  const [search, setSearch] = useState("");
  const [paletteListOpen, setPaletteListOpen] = useState(true);

  const tablistId = useId();
  const tabRefs = useRef<Record<SettingsTab, HTMLButtonElement | null>>({
    colors: null,
    typography: null,
    other: null,
    accessibility: null,
  });

  const normalizedSearch = search.trim().toLowerCase();

  const filteredPalettes = palettes.filter((item) =>
    item.name.toLowerCase().includes(normalizedSearch),
  );

  const filteredSavedPalettes = savedPalettes.filter((item) =>
    item.name.toLowerCase().includes(normalizedSearch),
  );

  const hasNoSearchResults =
    normalizedSearch.length > 0 &&
    filteredSavedPalettes.length === 0 &&
    filteredPalettes.length === 0;

  const getTabId = (tab: SettingsTab) => `${tablistId}-tab-${tab}`;
  const panelId = `${tablistId}-panel`;

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentTab: SettingsTab,
  ) => {
    const currentIndex = settingTabs.findIndex((tab) => tab.id === currentTab);

    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % settingTabs.length;
        break;

      case "ArrowLeft":
        nextIndex =
          (currentIndex - 1 + settingTabs.length) % settingTabs.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = settingTabs.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();

    const nextTab = settingTabs[nextIndex];

    setSettingsTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  };

  return (
    <aside
      className="flex h-[44%] min-h-0 w-full shrink-0 flex-col border-b lg:h-full lg:max-h-none lg:w-90 lg:border-b-0 lg:border-r xl:w-100"
      style={{
        borderColor: "var(--cf-border)",
        backgroundColor: "var(--cf-background)",
      }}
      aria-label="Theme settings"
    >
      <div
        className="shrink-0 border-b px-3 pb-3 pt-3 sm:px-5 sm:pt-4"
        style={{ borderColor: "var(--cf-border)" }}
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-xl border"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
              color: "var(--cf-foreground)",
            }}
          >
            <Palette size={17} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold tracking-tight">
              Theme editor
            </h2>
            <p
              className="mt-0.5 text-xs"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Customize your design system
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-4 gap-1 rounded-xl border p-1"
          style={{
            borderColor: "var(--cf-border)",
            backgroundColor: "var(--cf-muted)",
          }}
          role="tablist"
          aria-label="Theme settings sections"
        >
          {settingTabs.map((tab) => {
            const Icon = tab.icon;
            const active = settingsTab === tab.id;

            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[tab.id] = element;
                }}
                id={getTabId(tab.id)}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={panelId}
                tabIndex={active ? 0 : -1}
                onClick={() => setSettingsTab(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
                className="flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg px-1.5 text-xs font-medium transition-all duration-200 sm:gap-2 sm:px-2"
                style={{
                  backgroundColor: active
                    ? "var(--cf-background)"
                    : "transparent",
                  color: active
                    ? "var(--cf-foreground)"
                    : "var(--cf-muted-foreground)",
                  boxShadow: active ? "0 1px 3px rgba(0, 0, 0, 0.08)" : "none",
                }}
              >
                <Icon size={14} aria-hidden="true" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={getTabId(settingsTab)}
        tabIndex={0}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--cf-primary) sm:p-5"
      >
        {settingsTab === "colors" && (
          <div className="space-y-6">
            <section>
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">
                    Color system
                  </h3>
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
                  className="rounded-md px-2 py-1.5 text-xs font-medium transition-colors hover:opacity-70"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  Reset
                </button>
              </div>

              <div
                className="mb-4 flex items-center gap-2 rounded-lg border px-3 py-2.5"
                style={{
                  borderColor: "var(--cf-border)",
                  backgroundColor: "var(--cf-secondary)",
                }}
              >
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--cf-primary)" }}
                />
                <span className="min-w-0 flex-1 truncate text-xs font-medium">
                  {palette.name}
                </span>
                <span
                  className="rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: "var(--cf-background)",
                    color: "var(--cf-muted-foreground)",
                  }}
                >
                  Active
                </span>
              </div>

              <div
                className="mb-5 flex h-10 items-center gap-2 rounded-lg border px-3 transition-colors focus-within:border-(--cf-primary)"
                style={{
                  borderColor: "var(--cf-border)",
                  backgroundColor: "var(--cf-background)",
                }}
              >
                <Search
                  size={15}
                  aria-hidden="true"
                  className="shrink-0"
                  style={{ color: "var(--cf-muted-foreground)" }}
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search all palettes..."
                  className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:opacity-60"
                  aria-label="Search saved and theme palettes"
                />

                {search.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear palette search"
                    title="Clear search"
                    className="flex size-6 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-(--cf-muted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--cf-primary)"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                )}
              </div>

              {hasNoSearchResults ? (
                <div
                  className="rounded-xl border border-dashed px-4 py-7 text-center"
                  style={{
                    borderColor: "var(--cf-border)",
                    backgroundColor: "var(--cf-secondary)",
                  }}
                >
                  <Search
                    size={19}
                    className="mx-auto mb-2"
                    aria-hidden="true"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  />

                  <p className="text-xs font-semibold">No palettes found</p>

                  <p
                    className="mt-1 text-[11px] leading-5"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    No saved or theme palettes match "{search.trim()}". Try a
                    different name or clear your search.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-3 rounded-lg px-3 py-2 text-xs font-medium transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--cf-primary)"
                    style={{
                      backgroundColor: "var(--cf-primary)",
                      color: "var(--cf-primary-foreground)",
                    }}
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <SavedPaletteSection
                    palettes={filteredSavedPalettes}
                    selectedId={palette.id}
                    fallbackPalette={palettes[0]}
                    onSelect={onSelectPalette}
                    hasSavedPalettes={savedPalettes.length > 0}
                  />

                  <section>
                    <button
                      type="button"
                      onClick={() => setPaletteListOpen((open) => !open)}
                      aria-expanded={paletteListOpen}
                      className="mb-3 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors"
                      style={{
                        backgroundColor: "var(--cf-muted)",
                        color: "var(--cf-muted-foreground)",
                      }}
                    >
                      <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em]">
                        Theme palettes
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[9px] normal-case tracking-normal"
                          style={{
                            backgroundColor: "var(--cf-secondary)",
                            color: "var(--cf-foreground)",
                          }}
                        >
                          {filteredPalettes.length}
                        </span>
                      </span>

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
                </div>
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

        {settingsTab === "other" && <OtherSettings />}

        {settingsTab === "accessibility" && (
          <AccessibilitySettings
            key={`${palette.id}-${palette.tokens.primary}-${palette.tokens.primaryForeground}`}
            palette={palette}
          />
        )}
      </div>

      <div
        className="hidden shrink-0 items-center justify-between border-t px-5 py-3 text-[11px] lg:flex"
        style={{
          borderColor: "var(--cf-border)",
          color: "var(--cf-muted-foreground)",
        }}
      >
        <span>ColorForge Theme Editor</span>
        <span className="flex items-center gap-1.5">
          <span
            className="size-1.5 rounded-full"
            style={{ backgroundColor: "var(--cf-primary)" }}
          />
          Live Preview
        </span>
      </div>
    </aside>
  );
}

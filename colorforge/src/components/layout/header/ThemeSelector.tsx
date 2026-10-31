import { Check, ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Palette } from "../../../types";

interface ThemeSelectorProps {
  palette: Palette;
  palettes: Palette[];
  onSelect: (palette: Palette) => void;
}

export default function ThemeSelector({
  palette,
  palettes,
  onSelect,
}: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredPalettes = useMemo(
    () =>
      palettes.filter((item) =>
        item.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [palettes, search],
  );

  function selectTheme(nextPalette: Palette) {
    onSelect(nextPalette);
    setIsOpen(false);
    setSearch("");
  }

  return (
    <div className="relative min-w-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="flex max-w-45 items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium transition-opacity hover:opacity-75 sm:max-w-62.5"
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

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close theme menu"
            onClick={() => setIsOpen(false)}
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
              <p className="mb-2 text-sm font-semibold">Choose a theme</p>
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
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search themes..."
                  aria-label="Search themes"
                  className="min-w-0 flex-1 bg-transparent text-xs outline-none"
                />
              </label>
            </div>

            <div className="max-h-72 overflow-y-auto p-2">
              {filteredPalettes.length === 0 ? (
                <p
                  className="px-3 py-6 text-center text-xs"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  No matching themes found.
                </p>
              ) : (
                filteredPalettes.map((item) => {
                  const selected = item.id === palette.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectTheme(item)}
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
                          style={{ color: "var(--cf-muted-foreground)" }}
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
  );
}

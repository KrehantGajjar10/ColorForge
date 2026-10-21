import { useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import type { Palette, ThemeTokens } from "../../types";
import { themeTokenDefinitions } from "../../data/themeTokens";
import { exportPaletteAsJson } from "../../utils/exportPalette";

interface PaletteEditorProps {
  palette: Palette;
  onChange: (palette: Palette) => void;
  onReset: () => void;
}

export default function PaletteEditor({
  palette,
  onChange,
  onReset,
}: PaletteEditorProps) {
  const [hexValues, setHexValues] = useState<
    Partial<Record<keyof ThemeTokens, string>>
  >({});

  function updateColor(key: keyof ThemeTokens, color: string) {
    onChange({
      ...palette,
      tokens: {
        ...palette.tokens,
        [key]: color,
      },
    });

    setHexValues((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function updateHex(key: keyof ThemeTokens, value: string) {
    setHexValues((current) => ({
      ...current,
      [key]: value,
    }));

    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      updateColor(key, value);
    }
  }

  function resetHex(key: keyof ThemeTokens) {
    setHexValues((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  return (
    <section style={{ color: "var(--cf-foreground)" }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold">Semantic Colors</h3>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Adjust individual theme colors for specific interface elements
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => exportPaletteAsJson(palette)}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition hover:opacity-80"
            style={{
              borderColor: "var(--cf-border)",
              color: "var(--cf-foreground)",
              backgroundColor: "var(--cf-background)",
            }}
          >
            <Download size={14} />
            Export JSON
          </button>

          <button
            type="button"
            onClick={() => {
              setHexValues({});
              onReset();
            }}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition hover:opacity-80"
            style={{
              borderColor: "var(--cf-border)",
              color: "var(--cf-foreground)",
              backgroundColor: "var(--cf-secondary)",
            }}
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {themeTokenDefinitions.map(({ key, label, description }) => {
          const color = palette.tokens[key];

          return (
            <div
              key={key}
              className="flex min-w-0 items-center gap-3 rounded-xl border p-3 transition-colors"
              style={{
                borderColor: "var(--cf-border)",
                backgroundColor: "var(--cf-secondary)",
                color: "var(--cf-secondary-foreground)",
              }}
            >
              <input
                type="color"
                aria-label={`Choose ${label} color`}
                value={color}
                onChange={(event) => updateColor(key, event.target.value)}
                className="h-10 w-11 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent"
              />

              <div className="min-w-0 flex-1">
                <label
                  htmlFor={`token-${key}`}
                  className="block truncate text-sm font-medium"
                >
                  {label}
                </label>

                <p
                  className="mb-1 truncate text-xs"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  {description}
                </p>

                <input
                  id={`token-${key}`}
                  value={hexValues[key] ?? color}
                  onChange={(event) => updateHex(key, event.target.value)}
                  onBlur={() => resetHex(key)}
                  maxLength={7}
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full rounded-md border px-2 py-1.5 font-mono text-xs uppercase outline-none"
                  style={{
                    backgroundColor: "var(--cf-background)",
                    color: "var(--cf-foreground)",
                    borderColor: "var(--cf-border)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

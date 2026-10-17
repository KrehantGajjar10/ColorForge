import { useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Palette, ThemeTokens } from "../../types";
import { themeTokenDefinitions } from "../../data/themeTokens";

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
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">Design tokens</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Customize each semantic color.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setHexValues({});
            onReset();
          }}
          className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-900"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {themeTokenDefinitions.map(({ key, label, description }) => {
          const color = palette.tokens[key];

          return (
            <div
              key={key}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3"
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
                  className="block truncate text-sm font-medium text-zinc-200"
                >
                  {label}
                </label>

                <p className="mb-1 truncate text-xs text-zinc-500">
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
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1.5 font-mono text-xs uppercase text-white outline-none focus:border-violet-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Palette } from "../../types";

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
  const [hexValues, setHexValues] = useState<Record<number, string>>({});

  function updateColor(index: number, color: string) {
    const colors = [...palette.colors];
    colors[index] = color;

    onChange({
      ...palette,
      colors,
      ...(index === 0 ? { background: color } : {}),
      ...(index === 2 ? { primary: color } : {}),
    });

    setHexValues((current) => {
      const next = { ...current };
      delete next[index];
      return next;
    });
  }

  function updateHex(index: number, value: string) {
    setHexValues((current) => ({
      ...current,
      [index]: value,
    }));

    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      updateColor(index, value);
    }
  }

  function resetHex(index: number) {
    setHexValues((current) => {
      const next = { ...current };
      delete next[index];
      return next;
    });
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">Color editor</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Customize each color in your palette.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setHexValues({});
            onReset();
          }}
          className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-xs text-zinc-300 transition hover:bg-zinc-900"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="space-y-3">
        {palette.colors.map((color, index) => (
          <div
            key={`${palette.id}-${index}`}
            className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3"
          >
            <input
              type="color"
              aria-label={`Choose color ${index + 1}`}
              value={color}
              onChange={(event) => updateColor(index, event.target.value)}
              className="h-10 w-11 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent"
            />

            <div className="min-w-0 flex-1">
              <label
                htmlFor={`hex-${palette.id}-${index}`}
                className="mb-1 block text-xs text-zinc-400"
              >
                Color {index + 1}
              </label>

              <input
                id={`hex-${palette.id}-${index}`}
                value={hexValues[index] ?? color}
                onChange={(event) => updateHex(index, event.target.value)}
                onBlur={() => resetHex(index)}
                maxLength={7}
                spellCheck={false}
                autoComplete="off"
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1.5 font-mono text-sm uppercase text-white outline-none focus:border-violet-500"
              />
            </div>

            <div
              className="h-9 w-9 shrink-0 rounded-lg border border-white/10"
              style={{ backgroundColor: color }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

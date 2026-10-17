import { Check } from "lucide-react";
import type { Palette } from "../../types";

interface PaletteCardProps {
  palette: Palette;
  selected: boolean;
  onSelect: (palette: Palette) => void;
}

export default function PaletteCard({
  palette,
  selected,
  onSelect,
}: PaletteCardProps) {
  const { background, secondary, primary, accent } = palette.tokens;

  return (
    <button
      type="button"
      onClick={() => onSelect(palette)}
      aria-pressed={selected}
      className={`rounded-xl border p-3 text-left transition hover:border-violet-400 ${
        selected
          ? "border-violet-500 bg-violet-500/5"
          : "border-zinc-800 bg-zinc-900"
      }`}
    >
      <div className="flex h-16 overflow-hidden rounded-lg">
        {[background, secondary, primary, accent].map((color) => (
          <div
            key={color}
            className="flex-1"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-zinc-100">
          {palette.name}
        </span>

        {selected && <Check size={16} className="text-violet-400" />}
      </div>

      <p className="mt-1 text-xs leading-5 text-zinc-400">
        {palette.description}
      </p>
    </button>
  );
}

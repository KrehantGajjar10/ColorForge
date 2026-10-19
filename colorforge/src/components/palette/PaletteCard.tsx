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
  const {
    background,
    foreground,
    secondary,
    primary,
    accent,
    border,
    mutedForeground,
  } = palette.tokens;

  return (
    <button
      type="button"
      onClick={() => onSelect(palette)}
      aria-pressed={selected}
      className="group min-w-0 rounded-xl border p-3 text-left transition duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: background,
        color: foreground,
        borderColor: selected ? primary : border,
        boxShadow: selected ? `0 0 0 1px ${primary}` : "none",
      }}
    >
      <div className="flex h-16 overflow-hidden rounded-lg">
        {[background, secondary, primary, accent].map((color) => (
          <div
            key={color}
            className="flex-1 transition-transform duration-200 group-hover:scale-[1.02]"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">{palette.name}</span>

        {selected && (
          <span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
            style={{
              backgroundColor: primary,
              color: palette.tokens.primaryForeground,
            }}
          >
            <Check size={14} />
          </span>
        )}
      </div>

      <p className="mt-1 text-xs leading-5" style={{ color: mutedForeground }}>
        {palette.description}
      </p>
    </button>
  );
}

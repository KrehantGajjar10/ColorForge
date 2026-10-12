import type { Palette } from "../../types";
import PaletteCard from "./PaletteCard";

interface PaletteGalleryProps {
  palettes: Palette[];
  selectedId: string;
  onSelect: (palette: Palette) => void;
}

export default function PaletteGallery({
  palettes,
  selectedId,
  onSelect,
}: PaletteGalleryProps) {
  return (
    <section>
      <div className="mb-4">
        <h3 className="font-semibold text-white">Explore palettes</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Choose a preset to explore its colors.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {palettes.map((palette) => (
          <PaletteCard
            key={palette.id}
            palette={palette}
            selected={selectedId === palette.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

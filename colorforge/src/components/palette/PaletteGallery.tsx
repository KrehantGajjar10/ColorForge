import { SearchX } from "lucide-react";

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
        <h3 className="text-sm font-semibold tracking-tight">
          Explore palettes
        </h3>

        <p
          className="mt-1 text-xs"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          Choose a preset to explore its colors.
        </p>
      </div>

      {palettes.length === 0 ? (
        <div
          className="rounded-xl border border-dashed px-4 py-7 text-center"
          style={{ borderColor: "var(--cf-border)" }}
        >
          <SearchX
            size={19}
            className="mx-auto mb-2"
            style={{ color: "var(--cf-muted-foreground)" }}
            aria-hidden="true"
          />
          <p className="text-xs font-medium">No matching palettes</p>
          <p
            className="mt-1 text-[11px] leading-5"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Try another search to find a theme.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {palettes.map((palette) => (
            <PaletteCard
              key={palette.id}
              palette={palette}
              selected={selectedId === palette.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </section>
  );
}

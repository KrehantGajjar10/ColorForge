import { useState } from "react";
import { palettes } from "../data/palettes";
import PaletteEditor from "../components/palette/PaletteEditor";
import PaletteGallery from "../components/palette/PaletteGallery";
import PalettePreview from "../components/palette/PalettePreview";
import type { Palette } from "../types";

export default function HomePage() {
  const [selectedPalette, setSelectedPalette] = useState<Palette>(palettes[0]);

  const originalPalette =
    palettes.find((item) => item.id === selectedPalette.id) ?? palettes[0];

  const displayPalettes = palettes.map((palette) =>
    palette.id === selectedPalette.id ? selectedPalette : palette,
  );

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-violet-400">
        COLOR EXPLORATION STUDIO
      </p>

      <h2 className="mt-3 text-3xl font-bold text-white">
        Find your perfect color palette.
      </h2>

      <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
        Explore curated combinations, customize every color, and preview your
        theme in real time.
      </p>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-10">
          <PaletteGallery
            palettes={displayPalettes}
            selectedId={selectedPalette.id}
            onSelect={setSelectedPalette}
          />

          <PaletteEditor
            palette={selectedPalette}
            onChange={setSelectedPalette}
            onReset={() => setSelectedPalette(originalPalette)}
          />
        </div>

        <div className="min-w-0 lg:sticky lg:top-6">
          <PalettePreview palette={selectedPalette} />
        </div>
      </div>
    </main>
  );
}

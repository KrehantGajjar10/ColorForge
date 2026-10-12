import { useState } from "react";
import { palettes } from "../data/palettes";
import PaletteGallery from "../components/palette/PaletteGallery";
import PalettePreview from "../components/palette/PalettePreview";

export default function HomePage() {
  const [selectedPalette, setSelectedPalette] = useState(palettes[0]);

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-violet-400">
        COLOR EXPLORATION STUDIO
      </p>

      <h2 className="mt-3 text-3xl font-bold text-white">
        Find your perfect color palette.
      </h2>

      <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
        Explore curated combinations and preview your selected colors before
        building a complete theme.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
        <PaletteGallery
          palettes={palettes}
          selectedId={selectedPalette.id}
          onSelect={setSelectedPalette}
        />

        <PalettePreview palette={selectedPalette} />
      </div>
    </main>
  );
}

import { palettes } from "../data/palettes";
import PaletteEditor from "../components/palette/PaletteEditor";
import PaletteGallery from "../components/palette/PaletteGallery";
import PalettePreview from "../components/palette/PalettePreview";
import { useTheme } from "../context/useTheme";

export default function HomePage() {
  const { palette, selectPalette, updatePalette, resetPalette } = useTheme();

  const displayPalettes = palettes.map((item) =>
    item.id === palette.id ? palette : item,
  );

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-sm font-medium" style={{ color: "var(--cf-primary)" }}>
        COLOR EXPLORATION STUDIO
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight">
        Find your perfect color palette.
      </h2>

      <p
        className="mt-3 max-w-xl text-sm leading-6"
        style={{ color: "var(--cf-muted-foreground)" }}
      >
        Explore curated combinations, customize every color, and preview your
        theme in real time.
      </p>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-10">
          <PaletteGallery
            palettes={displayPalettes}
            selectedId={palette.id}
            onSelect={selectPalette}
          />

          <PaletteEditor
            palette={palette}
            onChange={updatePalette}
            onReset={resetPalette}
          />
        </div>

        <div className="min-w-0 lg:sticky lg:top-6">
          <PalettePreview palette={palette} />
        </div>
      </div>
    </main>
  );
}

import { ArrowUpRight, Palette, Sparkles } from "lucide-react";
import PaletteEditor from "../components/palette/PaletteEditor";
import PaletteGallery from "../components/palette/PaletteGallery";
import PalettePreview from "../components/palette/PalettePreview";
import { palettes } from "../data/palettes";
import { useTheme } from "../context/useTheme";

export default function HomePage() {
  const { palette, selectPalette, updatePalette, resetPalette } = useTheme();

  const displayPalettes = palettes.map((item) =>
    item.id === palette.id ? palette : item,
  );

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "var(--cf-background)",
        color: "var(--cf-foreground)",
      }}
    >
      <div className="mx-auto w-full max-w-360 px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
        <header
          className="mb-8 border-b pb-7 sm:mb-10 sm:pb-8"
          style={{ borderColor: "var(--cf-border)" }}
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <Palette size={15} style={{ color: "var(--cf-primary)" }} />
            <span style={{ color: "var(--cf-muted-foreground)" }}>
              COLORFORGE
            </span>
            <span style={{ color: "var(--cf-border)" }}>/</span>
            <span>Palette studio</span>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Your colors, your system.
              </h2>
              <p
                className="mt-3 max-w-xl text-sm leading-6 sm:text-base"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                Explore curated palettes, refine your design tokens, and see
                every change in a live preview.
              </p>
            </div>

            <div
              className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium"
              style={{
                borderColor: "var(--cf-border)",
                backgroundColor: "var(--cf-secondary)",
                color: "var(--cf-secondary-foreground)",
              }}
            >
              <Sparkles size={14} style={{ color: "var(--cf-primary)" }} />
              Live editing
            </div>
          </div>
        </header>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-8">
          <div className="min-w-0 space-y-6">
            <section
              className="min-w-0 rounded-2xl border p-4 sm:p-6"
              style={{
                borderColor: "var(--cf-border)",
                backgroundColor: "var(--cf-secondary)",
              }}
            >
              <PaletteGallery
                palettes={displayPalettes}
                selectedId={palette.id}
                onSelect={selectPalette}
              />
            </section>

            <section
              className="min-w-0 rounded-2xl border p-4 sm:p-6"
              style={{
                borderColor: "var(--cf-border)",
                backgroundColor: "var(--cf-secondary)",
              }}
            >
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    Customize
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    Design tokens
                  </h3>
                  <p
                    className="mt-1 text-sm leading-5"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    Fine-tune the colors behind your theme.
                  </p>
                </div>
                <div
                  className="hidden rounded-xl border p-2.5 sm:block"
                  style={{
                    borderColor: "var(--cf-border)",
                    color: "var(--cf-primary)",
                  }}
                >
                  <Palette size={19} />
                </div>
              </div>

              <PaletteEditor
                palette={palette}
                onChange={updatePalette}
                onReset={resetPalette}
              />
            </section>
          </div>

          <aside
            className="min-w-0 xl:sticky xl:top-6"
            aria-label="Live palette preview"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">Live preview</h3>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  See your current theme in context.
                </p>
              </div>
              <ArrowUpRight
                size={17}
                style={{ color: "var(--cf-muted-foreground)" }}
                aria-hidden="true"
              />
            </div>

            <PalettePreview palette={palette} />
          </aside>
        </div>

        <footer
          className="mt-10 flex flex-col gap-2 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: "var(--cf-border)",
            color: "var(--cf-muted-foreground)",
          }}
        >
          <span>ColorForge Palette Studio</span>
          <span>Changes update your theme in real time.</span>
        </footer>
      </div>
    </main>
  );
}

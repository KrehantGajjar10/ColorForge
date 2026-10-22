import { Bookmark, Check, Palette, Trash2 } from "lucide-react";
import type { Palette as PaletteType } from "../../types";

interface SavedPaletteGalleryProps {
  palettes: PaletteType[];
  selectedId: string;
  onLoad: (palette: PaletteType) => void;
  onDelete: (palette: PaletteType) => void;
}

export default function SavedPaletteGallery({
  palettes,
  selectedId,
  onLoad,
  onDelete,
}: SavedPaletteGalleryProps) {
  return (
    <section>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark
              size={17}
              style={{ color: "var(--cf-primary)" }}
              aria-hidden="true"
            />
            <h3
              className="font-semibold"
              style={{ color: "var(--cf-foreground)" }}
            >
              My Saved Palettes
            </h3>
          </div>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Your personal collection, saved in this browser.
          </p>
        </div>

        <span
          className="rounded-full border px-2.5 py-1 text-xs font-medium"
          style={{
            borderColor: "var(--cf-border)",
            color: "var(--cf-muted-foreground)",
          }}
        >
          {palettes.length} saved
        </span>
      </div>

      {palettes.length === 0 ? (
        <div
          className="flex flex-col items-center rounded-xl border border-dashed px-4 py-8 text-center"
          style={{ borderColor: "var(--cf-border)" }}
        >
          <Palette
            size={23}
            style={{ color: "var(--cf-muted-foreground)" }}
            aria-hidden="true"
          />
          <p
            className="mt-3 text-sm font-medium"
            style={{ color: "var(--cf-foreground)" }}
          >
            Your collection starts here
          </p>
          <p
            className="mt-1 max-w-sm text-xs leading-5"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Customize a palette and use Save palette to keep it here for later.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {palettes.map((palette) => {
            const selected = selectedId === palette.id;

            return (
              <article
                key={palette.id}
                className="min-w-0 rounded-xl border p-3"
                style={{
                  borderColor: selected
                    ? "var(--cf-primary)"
                    : "var(--cf-border)",
                  backgroundColor: "var(--cf-background)",
                }}
              >
                <div
                  className="mb-3 flex h-12 overflow-hidden rounded-lg"
                  aria-label={`Color preview for ${palette.name}`}
                >
                  {Object.values(palette.tokens)
                    .slice(0, 6)
                    .map((color, index) => (
                      <div
                        key={`${palette.id}-${index}`}
                        className="min-w-0 flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4
                      className="truncate text-sm font-semibold"
                      style={{ color: "var(--cf-foreground)" }}
                      title={palette.name}
                    >
                      {palette.name}
                    </h4>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--cf-muted-foreground)" }}
                    >
                      Custom palette
                    </p>
                  </div>

                  {selected && (
                    <Check
                      size={16}
                      style={{ color: "var(--cf-primary)" }}
                      aria-label="Currently selected"
                    />
                  )}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onLoad(palette)}
                    className="flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition hover:opacity-80"
                    style={{
                      backgroundColor: "var(--cf-primary)",
                      color: "var(--cf-primary-foreground)",
                    }}
                  >
                    {selected ? "Selected" : "Load palette"}
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(palette)}
                    aria-label={`Delete ${palette.name}`}
                    title="Delete saved palette"
                    className="rounded-lg border p-2 transition hover:opacity-70 focus-visible:outline-2"
                    style={{
                      borderColor: "var(--cf-border)",
                      color: "var(--cf-muted-foreground)",
                    }}
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

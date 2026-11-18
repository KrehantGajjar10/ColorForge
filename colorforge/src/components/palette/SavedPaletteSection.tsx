import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Pencil, Star, Trash2 } from "lucide-react";
import type { Palette } from "../../types";
import {
  deleteSavedPalette,
  getFavoritePaletteIds,
  renameSavedPalette,
  toggleFavoritePalette,
} from "../../utils/savedPalettes";

type SortOption = "recent" | "name" | "favorites";

interface SavedPaletteSectionProps {
  palettes: Palette[];
  selectedId: string;
  fallbackPalette: Palette;
  hasSavedPalettes: boolean;
  onSelect: (palette: Palette) => void;
}

export default function SavedPaletteSection({
  palettes,
  selectedId,
  fallbackPalette,
  onSelect,
  hasSavedPalettes,
}: SavedPaletteSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [favorites, setFavorites] = useState<string[]>(getFavoritePaletteIds);

  const sortedPalettes = useMemo(() => {
    const items = [...palettes];

    if (sortBy === "name") {
      return items.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "favorites") {
      return items.sort(
        (a, b) =>
          Number(favorites.includes(b.id)) - Number(favorites.includes(a.id)),
      );
    }

    return items.reverse();
  }, [palettes, sortBy, favorites]);

  function handleFavorite(id: string) {
    setFavorites(toggleFavoritePalette(id));
  }

  function handleRename(palette: Palette) {
    const nextName = window.prompt(
      "Enter a new name for this palette:",
      palette.name,
    );

    if (nextName === null || !nextName.trim()) return;

    try {
      renameSavedPalette(palette.id, nextName);

      if (selectedId === palette.id) {
        onSelect({
          ...palette,
          name: nextName.trim(),
        });
      }
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Couldn't rename palette.",
      );
    }
  }

  function handleDelete(palette: Palette) {
    const confirmed = window.confirm(
      `Delete "${palette.name}" from your saved palettes?`,
    );

    if (!confirmed) return;

    try {
      deleteSavedPalette(palette.id);

      if (selectedId === palette.id) {
        onSelect(fallbackPalette);
      }
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Couldn't delete palette.",
      );
    }
  }

  return (
    <section className="mt-5">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="mb-3 flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em]"
        style={{
          backgroundColor: "var(--cf-muted)",
          color: "var(--cf-muted-foreground)",
        }}
      >
        <span className="flex items-center gap-2">
          Saved palettes
          <span
            className="rounded-full px-1.5 py-0.5 text-[9px] normal-case tracking-normal"
            style={{
              backgroundColor: "var(--cf-secondary)",
              color: "var(--cf-foreground)",
            }}
          >
            {palettes.length}
          </span>
        </span>

        {isOpen ? (
          <ChevronDown size={14} aria-hidden="true" />
        ) : (
          <ChevronRight size={14} aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div>
          {palettes.length > 0 && (
            <div className="mb-3 flex items-center justify-between gap-2">
              <span
                className="text-[11px]"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                Organize your palettes
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                aria-label="Sort saved palettes"
                className="max-w-36 rounded-lg border px-2 py-1.5 text-[11px] outline-none"
                style={{
                  backgroundColor: "var(--cf-secondary)",
                  borderColor: "var(--cf-border)",
                  color: "var(--cf-foreground)",
                }}
              >
                <option value="recent">Recently added</option>
                <option value="name">Name A–Z</option>
                <option value="favorites">Favorites first</option>
              </select>
            </div>
          )}

          {sortedPalettes.length === 0 ? (
            <div
              className="rounded-xl border border-dashed px-4 py-6 text-center"
              style={{ borderColor: "var(--cf-border)" }}
            >
              <Star
                size={18}
                className="mx-auto mb-2"
                style={{ color: "var(--cf-muted-foreground)" }}
              />
              <p className="text-xs font-medium">
                {hasSavedPalettes
                  ? "No matching saved palettes"
                  : "No saved palettes yet"}
              </p>

              <p
                className="mt-1 text-[11px] leading-5"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                {hasSavedPalettes
                  ? "Try another search to find a saved palette."
                  : "Save or import a palette to see it here."}
              </p>
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {sortedPalettes.map((item) => {
                const selected = selectedId === item.id;
                const favorite = favorites.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="min-w-0 rounded-xl border p-2.5 transition-colors"
                    style={{
                      backgroundColor: "var(--cf-secondary)",
                      borderColor: selected
                        ? "var(--cf-primary)"
                        : "var(--cf-border)",
                      boxShadow: selected
                        ? "0 0 0 1px var(--cf-primary)"
                        : "none",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(item)}
                      aria-pressed={selected}
                      className="w-full min-w-0 text-left"
                    >
                      <div className="flex h-10 overflow-hidden rounded-lg">
                        {[
                          item.tokens.background,
                          item.tokens.secondary,
                          item.tokens.primary,
                          item.tokens.accent,
                        ].map((color, index) => (
                          <span
                            key={`${item.id}-${index}`}
                            className="min-w-0 flex-1"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      <span className="mt-2 block truncate text-xs font-semibold">
                        {item.name}
                      </span>

                      <span
                        className="mt-0.5 block truncate text-[10px]"
                        style={{ color: "var(--cf-muted-foreground)" }}
                      >
                        {item.description}
                      </span>
                    </button>

                    <div
                      className="mt-2 flex items-center justify-between border-t pt-2"
                      style={{ borderColor: "var(--cf-border)" }}
                    >
                      <button
                        type="button"
                        onClick={() => handleFavorite(item.id)}
                        aria-label={
                          favorite
                            ? `Remove ${item.name} from favorites`
                            : `Add ${item.name} to favorites`
                        }
                        title={favorite ? "Remove favorite" : "Add favorite"}
                        className="rounded-md p-1.5 transition-opacity hover:opacity-70"
                        style={{
                          color: favorite
                            ? "var(--cf-primary)"
                            : "var(--cf-muted-foreground)",
                        }}
                      >
                        <Star
                          size={14}
                          fill={favorite ? "currentColor" : "none"}
                        />
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleRename(item)}
                          aria-label={`Rename ${item.name}`}
                          title="Rename palette"
                          className="rounded-md p-1.5 transition-opacity hover:opacity-70"
                          style={{ color: "var(--cf-muted-foreground)" }}
                        >
                          <Pencil size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          aria-label={`Delete ${item.name}`}
                          title="Delete palette"
                          className="rounded-md p-1.5 transition-opacity hover:opacity-70"
                          style={{ color: "var(--cf-muted-foreground)" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

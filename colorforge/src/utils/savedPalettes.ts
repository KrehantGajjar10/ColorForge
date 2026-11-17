import type { Palette } from "../types";
import {
  isRecord,
  isValidPalette,
  isValidThemeTokens,
} from "./themeValidation";

const STORAGE_KEY = "colorforge-saved-palettes";
const FAVORITES_STORAGE_KEY = "colorforge-favorite-palettes";

export const SAVED_PALETTES_CHANGE_EVENT = "colorforge-saved-palettes-change";

export type ImportedPalette = Omit<Palette, "id">;

export function notifySavedPalettesChanged(): void {
  window.dispatchEvent(new Event(SAVED_PALETTES_CHANGE_EVENT));
}

export function getSavedPalettes(): Palette[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidPalette);
  } catch {
    return [];
  }
}

export function getFavoritePaletteIds(): string[] {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function toggleFavoritePalette(id: string): string[] {
  const favorites = getFavoritePaletteIds();
  const nextFavorites = favorites.includes(id)
    ? favorites.filter((favoriteId) => favoriteId !== id)
    : [...favorites, id];

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextFavorites));

  notifySavedPalettesChanged();

  return nextFavorites;
}

export function renameSavedPalette(id: string, name: string): void {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Enter a name for your palette.");
  }

  const palettes = getSavedPalettes();
  const paletteExists = palettes.some((palette) => palette.id === id);

  if (!paletteExists) {
    throw new Error("This saved palette could not be found.");
  }

  const updatedPalettes = palettes.map((palette) =>
    palette.id === id ? { ...palette, name: trimmedName } : palette,
  );

  storePalettes(updatedPalettes);
}

export function deleteSavedPalette(id: string): void {
  const palettes = getSavedPalettes();
  const updatedPalettes = palettes.filter((palette) => palette.id !== id);

  storePalettes(updatedPalettes);

  const favorites = getFavoritePaletteIds().filter(
    (favoriteId) => favoriteId !== id,
  );

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));

  notifySavedPalettesChanged();
}

export function savePaletteSnapshot(palette: Palette, name: string): Palette {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Enter a name for your palette.");
  }

  const savedPalette: Palette = {
    id: createCustomPaletteId(),
    name: trimmedName,
    description: "Custom palette saved from your current design tokens.",
    tokens: { ...palette.tokens },
  };

  storePalettes([...getSavedPalettes(), savedPalette]);

  return savedPalette;
}

export function parsePaletteJson(content: string): ImportedPalette {
  let parsed: unknown;

  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("This file doesn't contain valid JSON.");
  }

  if (!isRecord(parsed)) {
    throw new Error("Invalid palette file. Expected a palette object.");
  }

  if (
    typeof parsed.name !== "string" ||
    !parsed.name.trim() ||
    !isValidThemeTokens(parsed.tokens)
  ) {
    throw new Error(
      "Invalid palette file. Check the palette name and color tokens.",
    );
  }

  return {
    name: parsed.name.trim(),
    description:
      typeof parsed.description === "string" && parsed.description.trim()
        ? parsed.description.trim()
        : "Imported palette from ColorForge JSON.",
    tokens: { ...parsed.tokens },
  };
}

export function saveImportedPalette(importedPalette: ImportedPalette): Palette {
  const savedPalette: Palette = {
    id: createCustomPaletteId(),
    name: importedPalette.name,
    description: importedPalette.description,
    tokens: { ...importedPalette.tokens },
  };

  storePalettes([...getSavedPalettes(), savedPalette]);

  return savedPalette;
}

function createCustomPaletteId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function storePalettes(palettes: Palette[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(palettes));
  } catch {
    throw new Error(
      "Couldn't update your saved palettes. Check your browser's available storage.",
    );
  }

  notifySavedPalettesChanged();
}

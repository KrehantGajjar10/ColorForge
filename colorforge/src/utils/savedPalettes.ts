import type { Palette } from "../types";
import { isValidPalette } from "./themeValidation";

const STORAGE_KEY = "colorforge-saved-palettes";

export function getSavedPalettes(): Palette[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidPalette);
  } catch {
    return [];
  }
}

export function savePaletteSnapshot(palette: Palette, name: string): Palette {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Enter a name for your palette.");
  }

  const savedPalette: Palette = {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: trimmedName,
    description: "Custom palette saved from your current design tokens.",
    tokens: { ...palette.tokens },
  };

  const existingPalettes = getSavedPalettes();

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...existingPalettes, savedPalette]),
    );
  } catch {
    throw new Error(
      "Couldn't save this palette. Check your browser's available storage.",
    );
  }

  return savedPalette;
}

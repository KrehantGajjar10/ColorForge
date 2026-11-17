import type { Palette } from "../types";
import { isRecord, isValidThemeTokens } from "./themeValidation";

const STORAGE_KEY = "colorforge-saved-palettes";

export type ImportedPalette = Omit<Palette, "id">;

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
    id: createCustomPaletteId(),
    name: trimmedName,
    description: "Custom palette saved from your current design tokens.",
    tokens: { ...palette.tokens },
  };

  storePalette(savedPalette);

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

  storePalette(savedPalette);

  return savedPalette;
}

function createCustomPaletteId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function storePalette(palette: Palette): void {
  const existingPalettes = getSavedPalettes();

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...existingPalettes, palette]),
    );
  } catch {
    throw new Error(
      "Couldn't save this palette. Check your browser's available storage.",
    );
  }
}

function isValidPalette(value: unknown): value is Palette {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.description === "string" &&
    isValidThemeTokens(value.tokens)
  );
}

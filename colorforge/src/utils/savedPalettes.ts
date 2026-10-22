import type { Palette, ThemeTokens } from "../types";

const STORAGE_KEY = "colorforge-saved-palettes";

const TOKEN_KEYS: (keyof ThemeTokens)[] = [
  "background",
  "foreground",
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "accent",
  "accentForeground",
  "muted",
  "mutedForeground",
  "border",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidTokens(value: unknown): value is ThemeTokens {
  if (!isRecord(value)) return false;

  return TOKEN_KEYS.every(
    (key) =>
      typeof value[key] === "string" &&
      /^#[0-9a-fA-F]{6}$/.test(value[key] as string),
  );
}

function isValidPalette(value: unknown): value is Palette {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.description === "string" &&
    isValidTokens(value.tokens)
  );
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

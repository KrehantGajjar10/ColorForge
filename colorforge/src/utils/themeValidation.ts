import type { Palette, ThemeTokens } from "../types";

export const themeTokenKeys: (keyof ThemeTokens)[] = [
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

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isValidThemeTokens(value: unknown): value is ThemeTokens {
  if (!isRecord(value)) {
    return false;
  }

  return themeTokenKeys.every(
    (key) =>
      typeof value[key] === "string" &&
      /^#[0-9a-fA-F]{6}$/.test(value[key] as string),
  );
}

export function isValidPalette(value: unknown): value is Palette {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.description === "string" &&
    isValidThemeTokens(value.tokens)
  );
}

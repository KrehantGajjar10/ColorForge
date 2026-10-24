import { createContext } from "react";
import type { CSSProperties } from "react";
import type { Palette, ThemeTokens } from "../types";

export type ColorMode = "light" | "dark";

export interface ThemeContextValue {
  palette: Palette;
  colorMode: ColorMode;
  toggleColorMode: () => void;
  selectPalette: (palette: Palette) => void;
  selectPaletteById: (id: string) => void;
  updatePalette: (palette: Palette) => void;
  updateToken: (key: keyof ThemeTokens, value: string) => void;
  resetPalette: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function createThemeVariables(
  tokens: ThemeTokens,
  mode: ColorMode = "light",
): CSSProperties {
  const surfaceTokens =
    mode === "dark"
      ? {
          background: "#171714",
          foreground: "#f5f3ed",
          secondary: "#23231f",
          secondaryForeground: "#f5f3ed",
          muted: "#2d2c27",
          mutedForeground: "#b8b4a9",
          border: "#414038",
        }
      : {
          background: tokens.background,
          foreground: tokens.foreground,
          secondary: tokens.secondary,
          secondaryForeground: tokens.secondaryForeground,
          muted: tokens.muted,
          mutedForeground: tokens.mutedForeground,
          border: tokens.border,
        };

  return {
    colorScheme: mode,
    "--cf-background": surfaceTokens.background,
    "--cf-foreground": surfaceTokens.foreground,
    "--cf-primary": tokens.primary,
    "--cf-primary-foreground": tokens.primaryForeground,
    "--cf-secondary": surfaceTokens.secondary,
    "--cf-secondary-foreground": surfaceTokens.secondaryForeground,
    "--cf-accent": tokens.accent,
    "--cf-accent-foreground": tokens.accentForeground,
    "--cf-muted": surfaceTokens.muted,
    "--cf-muted-foreground": surfaceTokens.mutedForeground,
    "--cf-border": surfaceTokens.border,
  } as CSSProperties;
}

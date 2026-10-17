import { createContext } from "react";
import type { CSSProperties } from "react";
import type { Palette, ThemeTokens } from "../types";

export interface ThemeContextValue {
  palette: Palette;
  selectPalette: (palette: Palette) => void;
  updatePalette: (palette: Palette) => void;
  updateToken: (key: keyof ThemeTokens, value: string) => void;
  resetPalette: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function createThemeVariables(tokens: ThemeTokens): CSSProperties {
  return {
    "--cf-background": tokens.background,
    "--cf-foreground": tokens.foreground,
    "--cf-primary": tokens.primary,
    "--cf-primary-foreground": tokens.primaryForeground,
    "--cf-secondary": tokens.secondary,
    "--cf-secondary-foreground": tokens.secondaryForeground,
    "--cf-accent": tokens.accent,
    "--cf-accent-foreground": tokens.accentForeground,
    "--cf-muted": tokens.muted,
    "--cf-muted-foreground": tokens.mutedForeground,
    "--cf-border": tokens.border,
  } as CSSProperties;
}

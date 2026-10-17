import { useState, type ReactNode } from "react";
import { palettes } from "../data/palettes";
import type { Palette, ThemeTokens } from "../types";
import { ThemeContext, createThemeVariables } from "./theme-context";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [palette, setPalette] = useState<Palette>(palettes[0]);

  function selectPalette(nextPalette: Palette) {
    setPalette(nextPalette);
  }

  function updatePalette(nextPalette: Palette) {
    setPalette(nextPalette);
  }

  function updateToken(key: keyof ThemeTokens, value: string) {
    setPalette((current) => ({
      ...current,
      tokens: {
        ...current.tokens,
        [key]: value,
      },
    }));
  }

  function resetPalette() {
    const original = palettes.find((item) => item.id === palette.id);

    if (original) {
      setPalette(original);
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        palette,
        selectPalette,
        updatePalette,
        updateToken,
        resetPalette,
      }}
    >
      <div
        className="min-h-screen"
        style={createThemeVariables(palette.tokens)}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

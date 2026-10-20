import { useEffect, useState, type ReactNode } from "react";
import { palettes } from "../data/palettes";
import type { Palette, ThemeTokens } from "../types";
import { ThemeContext, createThemeVariables } from "./theme-context";

interface ThemeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "colorforge-palette";

function getInitialPalette(): Palette {
  if (typeof window === "undefined") {
    return palettes[0];
  }

  try {
    const savedPalette = localStorage.getItem(STORAGE_KEY);

    if (savedPalette) {
      const parsed = JSON.parse(savedPalette) as Palette;

      if (
        typeof parsed.id === "string" &&
        palettes.some((item) => item.id === parsed.id) &&
        parsed.tokens &&
        Object.keys(palettes[0].tokens).every(
          (key) => typeof parsed.tokens[key as keyof ThemeTokens] === "string",
        )
      ) {
        const original = palettes.find((item) => item.id === parsed.id)!;

        return {
          ...original,
          tokens: { ...original.tokens, ...parsed.tokens },
        };
      }
    }
  } catch {
    // Ignore invalid saved data and use the default palette.
  }

  return palettes[0];
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [palette, setPalette] = useState<Palette>(getInitialPalette);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(palette));
    } catch {
      // Keep the editor usable if storage is unavailable.
    }
  }, [palette]);

  function selectPalette(nextPalette: Palette) {
    setPalette(nextPalette);
  }

  function selectPaletteById(id: string) {
    const nextPalette = palettes.find((item) => item.id === id);

    if (nextPalette) {
      setPalette(nextPalette);
    }
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
        selectPaletteById,
        updatePalette,
        updateToken,
        resetPalette,
      }}
    >
      <div
        className="min-h-screen transition-colors duration-300"
        style={createThemeVariables(palette.tokens)}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

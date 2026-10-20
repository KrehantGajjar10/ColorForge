import { useEffect, useState, type ReactNode } from "react";
import { palettes } from "../data/palettes";
import type { Palette, ThemeTokens } from "../types";
import { ThemeContext, createThemeVariables } from "./theme-context";

interface ThemeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "colorforge-palette";
const TOKEN_KEYS = Object.keys(palettes[0].tokens) as (keyof ThemeTokens)[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidTokens(value: unknown): value is ThemeTokens {
  if (!isRecord(value)) {
    return false;
  }

  return TOKEN_KEYS.every(
    (key) =>
      typeof value[key] === "string" &&
      /^#[0-9a-fA-F]{6}$/.test(value[key] as string),
  );
}

function getInitialPalette(): Palette {
  try {
    const savedPalette = localStorage.getItem(STORAGE_KEY);

    if (!savedPalette) {
      return palettes[0];
    }

    const parsed: unknown = JSON.parse(savedPalette);

    if (!isRecord(parsed) || typeof parsed.id !== "string") {
      return palettes[0];
    }

    const original = palettes.find((item) => item.id === parsed.id);

    if (!original || !isValidTokens(parsed.tokens)) {
      return palettes[0];
    }

    return {
      ...original,
      tokens: { ...original.tokens, ...parsed.tokens },
    };
  } catch {
    return palettes[0];
  }
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

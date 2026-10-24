import { useEffect, useState, type ReactNode } from "react";
import { palettes } from "../data/palettes";
import type { Palette, ThemeTokens } from "../types";
import {
  ThemeContext,
  createThemeVariables,
  type ColorMode,
} from "./theme-context";

function getInitialColorMode(): ColorMode {
  try {
    const stored = localStorage.getItem(MODE_STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

interface ThemeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "colorforge-palette";
const MODE_STORAGE_KEY = "colorforge-color-mode";
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

function getPaletteFromUrl(): Palette | null {
  try {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const sharedValue = params.get("palette");

    if (!sharedValue) {
      return null;
    }

    const parsed: unknown = JSON.parse(sharedValue);

    if (
      !isRecord(parsed) ||
      typeof parsed.id !== "string" ||
      !isValidTokens(parsed.tokens)
    ) {
      return null;
    }

    const original = palettes.find((item) => item.id === parsed.id);

    if (!original) {
      return null;
    }

    return {
      ...original,
      tokens: {
        ...original.tokens,
        ...parsed.tokens,
      },
    };
  } catch {
    return null;
  }
}

function getInitialPalette(): Palette {
  const sharedPalette = getPaletteFromUrl();

  if (sharedPalette) {
    return sharedPalette;
  }

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
      tokens: {
        ...original.tokens,
        ...parsed.tokens,
      },
    };
  } catch {
    return palettes[0];
  }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [palette, setPalette] = useState<Palette>(getInitialPalette);
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialColorMode);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(palette));
    } catch {
      // Keep the editor usable if storage is unavailable.
    }
  }, [palette]);

  useEffect(() => {
    document.documentElement.style.colorScheme = colorMode;
    document.documentElement.dataset.colorMode = colorMode;

    try {
      localStorage.setItem(MODE_STORAGE_KEY, colorMode);
    } catch {
      // Keep the theme switch usable if storage is unavailable.
    }
  }, [colorMode]);

  function toggleColorMode() {
    setColorMode((current) => (current === "light" ? "dark" : "light"));
  }

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
        colorMode,
        toggleColorMode,
        selectPalette,
        selectPaletteById,
        updatePalette,
        updateToken,
        resetPalette,
      }}
    >
      <div
        className="min-h-screen transition-colors duration-300"
        style={createThemeVariables(palette.tokens, colorMode)}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

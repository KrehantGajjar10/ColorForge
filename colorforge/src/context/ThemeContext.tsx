import { useEffect, useState, type ReactNode } from "react";
import { palettes } from "../data/palettes";
import type { Palette, ThemeTokens } from "../types";
import {
  isRecord,
  isValidPalette,
  isValidThemeTokens,
} from "../utils/themeValidation";
import { getSavedPalettes } from "../utils/savedPalettes";
import {
  ThemeContext,
  createThemeVariables,
  fontFamilies,
  type ColorMode,
  type FontFamily,
} from "./theme-context";

interface ThemeProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "colorforge-palette";
const BASELINE_STORAGE_KEY = "colorforge-palette-baseline";
const MODE_STORAGE_KEY = "colorforge-color-mode";
const FONT_STORAGE_KEY = "colorforge-font-family";
const RADIUS_STORAGE_KEY = "colorforge-border-radius";

function getInitialColorMode(): ColorMode {
  try {
    return localStorage.getItem(MODE_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function getInitialFontFamily(): FontFamily {
  try {
    const stored = localStorage.getItem(FONT_STORAGE_KEY);
    const savedFont = fontFamilies.find((font) => font.value === stored);

    if (savedFont) {
      return savedFont.value;
    }
  } catch {
    // Use the default font when browser storage is unavailable.
  }

  return fontFamilies[0].value;
}

function getInitialBorderRadius(): number {
  try {
    const stored = localStorage.getItem(RADIUS_STORAGE_KEY);

    if (stored === null) {
      return 12;
    }

    const radius = Number(stored);

    if (
      Number.isInteger(radius) &&
      radius >= 0 &&
      radius <= 24 &&
      radius % 2 === 0
    ) {
      return radius;
    }
  } catch {
    // Use the default radius when browser storage is unavailable.
  }

  return 12;
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
      !parsed.id.trim() ||
      parsed.id.length > 100 ||
      !isValidThemeTokens(parsed.tokens)
    ) {
      return null;
    }

    const original = palettes.find((item) => item.id === parsed.id);

    const sharedName =
      typeof parsed.name === "string" ? parsed.name.trim() : "";

    const sharedDescription =
      typeof parsed.description === "string" ? parsed.description.trim() : null;

    const hasValidName = sharedName.length > 0 && sharedName.length <= 80;

    const hasValidDescription =
      sharedDescription !== null && sharedDescription.length <= 240;

    if (!original && (!hasValidName || !hasValidDescription)) {
      return null;
    }

    const name = hasValidName ? sharedName : original?.name;
    const description = hasValidDescription
      ? sharedDescription
      : original?.description;

    if (name === undefined || description === undefined) {
      return null;
    }

    return {
      id: parsed.id,
      name,
      description,
      tokens: { ...parsed.tokens },
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
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return palettes[0];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!isValidPalette(parsed)) {
      return palettes[0];
    }

    const original = palettes.find((item) => item.id === parsed.id);

    if (original) {
      return {
        ...original,
        tokens: {
          ...original.tokens,
          ...parsed.tokens,
        },
      };
    }

    const savedPalette = getSavedPalettes().find(
      (item) => item.id === parsed.id,
    );

    if (!savedPalette) {
      return palettes[0];
    }

    return parsed;
  } catch {
    return palettes[0];
  }
}

function getInitialPaletteBaseline(): Palette {
  const sharedPalette = getPaletteFromUrl();

  if (sharedPalette) {
    return {
      ...sharedPalette,
      tokens: { ...sharedPalette.tokens },
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return palettes[0];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!isValidPalette(parsed)) {
      return palettes[0];
    }

    const original = palettes.find((item) => item.id === parsed.id);

    if (original) {
      return original;
    }

    const savedPalette = getSavedPalettes().find(
      (item) => item.id === parsed.id,
    );

    if (savedPalette) {
      return savedPalette;
    }

    const storedBaseline = localStorage.getItem(BASELINE_STORAGE_KEY);

    if (storedBaseline) {
      const baseline: unknown = JSON.parse(storedBaseline);

      if (isValidPalette(baseline) && baseline.id === parsed.id) {
        return baseline;
      }
    }

    return parsed;
  } catch {
    return palettes[0];
  }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [palette, setPalette] = useState<Palette>(getInitialPalette);

  const [paletteBaseline, setPaletteBaseline] = useState<Palette>(
    getInitialPaletteBaseline,
  );

  const [colorMode, setColorMode] = useState<ColorMode>(getInitialColorMode);

  const [borderRadius, setBorderRadius] = useState<number>(
    getInitialBorderRadius,
  );

  const [fontFamily, setFontFamily] =
    useState<FontFamily>(getInitialFontFamily);

  useEffect(() => {
    try {
      localStorage.setItem(RADIUS_STORAGE_KEY, String(borderRadius));
    } catch {
      // Keep the selected radius working for the current session.
    }
  }, [borderRadius]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(palette));
    } catch {
      // Keep the editor usable if storage is unavailable.
    }
  }, [palette]);

  useEffect(() => {
    try {
      localStorage.setItem(
        BASELINE_STORAGE_KEY,
        JSON.stringify(paletteBaseline),
      );
    } catch {
      // Keep the reset baseline available for the current session.
    }
  }, [paletteBaseline]);

  useEffect(() => {
    document.documentElement.style.colorScheme = colorMode;
    document.documentElement.dataset.colorMode = colorMode;

    try {
      localStorage.setItem(MODE_STORAGE_KEY, colorMode);
    } catch {
      // Keep the theme switch usable if storage is unavailable.
    }
  }, [colorMode]);

  useEffect(() => {
    try {
      localStorage.setItem(FONT_STORAGE_KEY, fontFamily);
    } catch {
      // Keep the selected font working for the current session.
    }
  }, [fontFamily]);

  function toggleColorMode() {
    setColorMode((current) => (current === "light" ? "dark" : "light"));
  }

  function selectPalette(nextPalette: Palette) {
    const baseline = {
      ...nextPalette,
      tokens: { ...nextPalette.tokens },
    };

    setPaletteBaseline(baseline);
    setPalette({
      ...nextPalette,
      tokens: { ...nextPalette.tokens },
    });
  }

  function selectPaletteById(id: string) {
    const nextPalette =
      palettes.find((item) => item.id === id) ??
      getSavedPalettes().find((item) => item.id === id);

    if (nextPalette) {
      selectPalette(nextPalette);
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
    setPalette({
      ...paletteBaseline,
      tokens: { ...paletteBaseline.tokens },
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        palette,
        colorMode,
        fontFamily,
        borderRadius,
        setFontFamily,
        setBorderRadius,
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
        style={{
          ...createThemeVariables(palette.tokens, colorMode, borderRadius),
          fontFamily,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

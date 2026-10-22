import type { Palette } from "../types";

export function createPaletteShareUrl(palette: Palette): string {
  const url = new URL("/editor", window.location.origin);

  const sharedPalette = {
    id: palette.id,
    tokens: palette.tokens,
  };

  url.hash = new URLSearchParams({
    palette: JSON.stringify(sharedPalette),
  }).toString();

  return url.toString();
}

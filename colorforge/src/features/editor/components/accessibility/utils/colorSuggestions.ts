import { evaluateContrast } from "../../../../../utils/colorContrast";

import type { ColorSuggestion } from "../accessibility.types";

function normalizeHex(value: string): string {
  const trimmed = value.trim();

  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

function hexToRgb(hex: string): [number, number, number] {
  const value = normalizeHex(hex).slice(1);

  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

function rgbToHex(red: number, green: number, blue: number): string {
  return `#${[red, green, blue]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

function rgbToHsl(
  red: number,
  green: number,
  blue: number,
): [number, number, number] {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const difference = max - min;

  let hue = 0;
  let saturation = 0;

  const lightness = (max + min) / 2;

  if (difference !== 0) {
    saturation = difference / (1 - Math.abs(2 * lightness - 1));

    switch (max) {
      case r:
        hue = ((g - b) / difference) % 6;
        break;
      case g:
        hue = (b - r) / difference + 2;
        break;
      default:
        hue = (r - g) / difference + 4;
    }

    hue *= 60;

    if (hue < 0) hue += 360;
  }

  return [hue, saturation, lightness];
}

function hslToRgb(
  hue: number,
  saturation: number,
  lightness: number,
): [number, number, number] {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;

  const hueSection = hue / 60;
  const secondary = chroma * (1 - Math.abs((hueSection % 2) - 1));

  let red = 0;
  let green = 0;
  let blue = 0;

  if (hueSection < 1) {
    red = chroma;
    green = secondary;
  } else if (hueSection < 2) {
    red = secondary;
    green = chroma;
  } else if (hueSection < 3) {
    green = chroma;
    blue = secondary;
  } else if (hueSection < 4) {
    green = secondary;
    blue = chroma;
  } else if (hueSection < 5) {
    red = secondary;
    blue = chroma;
  } else {
    red = chroma;
    blue = secondary;
  }

  const match = lightness - chroma / 2;

  return [(red + match) * 255, (green + match) * 255, (blue + match) * 255];
}

export function findAccessibleSuggestion(
  foreground: string,
  background: string,
  threshold = 4.5,
): ColorSuggestion | null {
  const [fgHue, fgSaturation, fgLightness] = rgbToHsl(...hexToRgb(foreground));

  const [bgHue, bgSaturation, bgLightness] = rgbToHsl(...hexToRgb(background));

  const candidates: ColorSuggestion[] = [];

  for (let lightness = 0; lightness <= 100; lightness += 1) {
    const candidateForeground = rgbToHex(
      ...hslToRgb(fgHue, fgSaturation, lightness / 100),
    );

    const foregroundRatio = evaluateContrast(
      candidateForeground,
      background,
    ).ratio;

    if (foregroundRatio >= threshold) {
      candidates.push({
        foreground: candidateForeground,
        background,
        changed: "foreground",
        ratio: foregroundRatio,
      });
    }

    const candidateBackground = rgbToHex(
      ...hslToRgb(bgHue, bgSaturation, lightness / 100),
    );

    const backgroundRatio = evaluateContrast(
      foreground,
      candidateBackground,
    ).ratio;

    if (backgroundRatio >= threshold) {
      candidates.push({
        foreground,
        background: candidateBackground,
        changed: "background",
        ratio: backgroundRatio,
      });
    }
  }

  if (candidates.length === 0) return null;

  candidates.sort((first, second) => {
    const firstDistance =
      first.changed === "foreground"
        ? Math.abs(rgbToHsl(...hexToRgb(first.foreground))[2] - fgLightness)
        : Math.abs(rgbToHsl(...hexToRgb(first.background))[2] - bgLightness);

    const secondDistance =
      second.changed === "foreground"
        ? Math.abs(rgbToHsl(...hexToRgb(second.foreground))[2] - fgLightness)
        : Math.abs(rgbToHsl(...hexToRgb(second.background))[2] - bgLightness);

    return firstDistance - secondDistance;
  });

  return candidates[0];
}

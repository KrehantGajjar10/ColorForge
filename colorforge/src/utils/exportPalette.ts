import type { Palette } from "../types";
import type { FontFamily } from "../context/theme-context";

export function exportPaletteAsJson(palette: Palette): void {
  const content = JSON.stringify(
    {
      ...palette,
      exportedAt: new Date().toISOString(),
    },
    null,
    2,
  );

  const blob = new Blob([content], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = palette.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  link.href = url;
  link.download = `${safeName || "colorforge-palette"}.json`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export function generatePaletteCss(
  palette: Palette,
  borderRadius: number,
  fontFamily: FontFamily,
): string {
  const { tokens } = palette;

  const lightVariables = {
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
  };

  const darkVariables = {
    "--cf-background": "#171714",
    "--cf-foreground": "#f5f3ed",
    "--cf-primary": tokens.primary,
    "--cf-primary-foreground": tokens.primaryForeground,
    "--cf-secondary": "#23231f",
    "--cf-secondary-foreground": "#f5f3ed",
    "--cf-accent": tokens.accent,
    "--cf-accent-foreground": tokens.accentForeground,
    "--cf-muted": "#2d2c27",
    "--cf-muted-foreground": "#b8b4a9",
    "--cf-border": "#414038",
  };

  function formatVariables(variables: Record<string, string>): string {
    return Object.entries(variables)
      .map(([property, value]) => `  ${property}: ${value};`)
      .join("\n");
  }

  return `/*
 * ${palette.name} — ColorForge Theme
 * Generated with ColorForge
 */

:root {
  --cf-radius: ${borderRadius}px;
  --cf-font-family: ${fontFamily};
}

:root,
:root[data-color-mode="light"] {
${formatVariables(lightVariables)}
  color-scheme: light;
}

:root[data-color-mode="dark"] {
${formatVariables(darkVariables)}
  color-scheme: dark;
}

body {
  font-family: var(--cf-font-family);
}
`;
}

export function exportPaletteAsCss(css: string, paletteName: string): void {
  const safeName = paletteName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const blob = new Blob([css], {
    type: "text/css;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${safeName || "colorforge-theme"}.css`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

import type { Palette } from "../types";

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

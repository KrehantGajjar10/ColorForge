import { useState } from "react";

import EditorSidebar from "../features/editor/components/EditorSidebar";
import PreviewWorkspace from "../features/editor/components/PreviewWorkspace";

import { useTheme } from "../context/useTheme";
import { palettes } from "../data/palettes";

import type { PreviewMode } from "../features/editor/editor.types";

export default function HomePage() {
  const {
    palette,
    selectPalette,
    updatePalette,
    resetPalette,
    fontFamily,
    setFontFamily,
  } = useTheme();

  const [previewMode, setPreviewMode] = useState<PreviewMode>("cards");

  const displayPalettes = palettes.map((item) =>
    item.id === palette.id ? palette : item,
  );

  return (
    <main
      className="flex h-full min-h-0 flex-col overflow-hidden lg:flex-row"
      style={{
        backgroundColor: "var(--cf-background)",
        color: "var(--cf-foreground)",
      }}
    >
      <EditorSidebar
        palette={palette}
        palettes={displayPalettes}
        fontFamily={fontFamily}
        onSelectPalette={selectPalette}
        onUpdatePalette={updatePalette}
        onResetPalette={resetPalette}
        onFontFamilyChange={setFontFamily}
      />

      <PreviewWorkspace
        palette={palette}
        previewMode={previewMode}
        onPreviewModeChange={setPreviewMode}
      />
    </main>
  );
}

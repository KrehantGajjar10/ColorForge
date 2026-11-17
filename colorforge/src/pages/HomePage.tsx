import { useEffect, useState } from "react";

import EditorSidebar from "../features/editor/components/EditorSidebar";
import PreviewWorkspace from "../features/editor/components/PreviewWorkspace";

import { useTheme } from "../context/useTheme";
import { palettes } from "../data/palettes";
import {
  getSavedPalettes,
  SAVED_PALETTES_CHANGE_EVENT,
} from "../utils/savedPalettes";

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
  const [savedPalettes, setSavedPalettes] = useState(getSavedPalettes);

  useEffect(() => {
    function refreshSavedPalettes() {
      setSavedPalettes(getSavedPalettes());
    }

    window.addEventListener(SAVED_PALETTES_CHANGE_EVENT, refreshSavedPalettes);

    return () => {
      window.removeEventListener(
        SAVED_PALETTES_CHANGE_EVENT,
        refreshSavedPalettes,
      );
    };
  }, []);

  const displayPalettes = palettes.map((item) =>
    item.id === palette.id ? palette : item,
  );

  const displaySavedPalettes = savedPalettes.map((item) =>
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
        savedPalettes={displaySavedPalettes}
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

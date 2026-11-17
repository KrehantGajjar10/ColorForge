import { useEffect, useState, type ChangeEvent } from "react";
import { FileJson, Upload, X } from "lucide-react";
import type { ImportedPalette } from "../../utils/savedPalettes";
import { parsePaletteJson } from "../../utils/savedPalettes";

interface ImportPaletteDialogProps {
  onImport: (palette: ImportedPalette) => void;
  onClose: () => void;
}

export default function ImportPaletteDialog({
  onImport,
  onClose,
}: ImportPaletteDialogProps) {
  const [palette, setPalette] = useState<ImportedPalette | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setPalette(null);
    setError("");
    setFileName("");

    if (!file.name.toLowerCase().endsWith(".json")) {
      setError("Please select a JSON file.");
      event.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      setError("The file is too large. Maximum supported size is 1 MB.");
      event.target.value = "";
      return;
    }

    try {
      const content = await file.text();
      const importedPalette = parsePaletteJson(content);

      setPalette(importedPalette);
      setFileName(file.name);
    } catch (importError) {
      setError(
        importError instanceof Error
          ? importError.message
          : "Couldn't read this palette file.",
      );
    }

    event.target.value = "";
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/55 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-palette-title"
        className="w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl"
        style={{
          backgroundColor: "var(--cf-background)",
          color: "var(--cf-foreground)",
          borderColor: "var(--cf-border)",
        }}
      >
        <div
          className="flex items-start justify-between gap-4 border-b p-5"
          style={{ borderColor: "var(--cf-border)" }}
        >
          <div className="flex items-start gap-3">
            <div
              className="rounded-xl p-2.5"
              style={{
                backgroundColor: "var(--cf-secondary)",
                color: "var(--cf-primary)",
              }}
            >
              <FileJson size={20} aria-hidden="true" />
            </div>

            <div>
              <h2 id="import-palette-title" className="text-base font-semibold">
                Import palette
              </h2>
              <p
                className="mt-1 text-xs leading-5"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                Import a previously exported ColorForge JSON file.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close import dialog"
            className="rounded-lg p-2 transition-opacity hover:opacity-65"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <label
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-7 text-center transition-colors hover:opacity-75"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
            }}
          >
            <Upload
              size={22}
              style={{ color: "var(--cf-primary)" }}
              aria-hidden="true"
            />

            <span className="mt-3 text-sm font-medium">Choose a JSON file</span>

            <span
              className="mt-1 text-xs"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Maximum file size: 1 MB
            </span>

            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>

          {fileName && (
            <div
              className="flex items-center gap-2 rounded-lg border px-3 py-2.5 text-xs"
              style={{ borderColor: "var(--cf-border)" }}
            >
              <FileJson
                size={15}
                style={{ color: "var(--cf-primary)" }}
                aria-hidden="true"
              />
              <span className="truncate">{fileName}</span>
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="rounded-lg border px-3 py-2.5 text-xs"
              style={{
                color: "#ef4444",
                borderColor: "color-mix(in srgb, #ef4444 35%, transparent)",
                backgroundColor: "color-mix(in srgb, #ef4444 8%, transparent)",
              }}
            >
              {error}
            </p>
          )}

          {palette && (
            <div
              className="rounded-xl border p-4"
              style={{ borderColor: "var(--cf-border)" }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{palette.name}</p>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    {palette.description}
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-md px-2 py-1 text-[10px] font-medium"
                  style={{
                    backgroundColor: "var(--cf-secondary)",
                    color: "var(--cf-primary)",
                  }}
                >
                  Valid
                </span>
              </div>

              <div className="mt-4 flex h-9 overflow-hidden rounded-lg">
                {[
                  palette.tokens.primary,
                  palette.tokens.secondary,
                  palette.tokens.accent,
                  palette.tokens.background,
                  palette.tokens.foreground,
                  palette.tokens.muted,
                ].map((color, index) => (
                  <span
                    key={`${color}-${index}`}
                    className="min-w-0 flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <p
                className="mt-2 text-[10px]"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                11 color tokens ready to import
              </p>
            </div>
          )}
        </div>

        <div
          className="flex flex-col-reverse gap-2 border-t p-5 sm:flex-row sm:justify-end"
          style={{ borderColor: "var(--cf-border)" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--cf-border)" }}
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!palette}
            onClick={() => {
              if (palette) onImport(palette);
            }}
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundColor: "var(--cf-primary)",
              color: "var(--cf-primary-foreground)",
            }}
          >
            <Upload size={15} aria-hidden="true" />
            Import palette
          </button>
        </div>
      </section>
    </div>
  );
}

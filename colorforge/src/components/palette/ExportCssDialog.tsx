import { useEffect } from "react";
import { Code2, Copy, Download, X } from "lucide-react";
import { toast } from "sonner";
import { exportPaletteAsCss } from "../../utils/exportPalette";

interface ExportCssDialogProps {
  css: string;
  paletteName: string;
  onClose: () => void;
}

export default function ExportCssDialog({
  css,
  paletteName,
  onClose,
}: ExportCssDialogProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(css);
      toast.success("CSS copied to clipboard");
    } catch {
      toast.error("Couldn't copy CSS", {
        description: "Clipboard access was blocked by your browser.",
      });
    }
  }

  function handleDownload() {
    try {
      exportPaletteAsCss(css, paletteName);
      toast.success("CSS file downloaded");
    } catch {
      toast.error("Couldn't download CSS");
    }
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
        aria-labelledby="export-css-title"
        className="flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border shadow-2xl"
        style={{
          backgroundColor: "var(--cf-background)",
          color: "var(--cf-foreground)",
          borderColor: "var(--cf-border)",
        }}
      >
        <div
          className="flex items-start justify-between gap-4 border-b p-4 sm:p-5"
          style={{ borderColor: "var(--cf-border)" }}
        >
          <div className="flex min-w-0 items-start gap-3">
            <div
              className="rounded-xl p-2.5"
              style={{
                backgroundColor: "var(--cf-secondary)",
                color: "var(--cf-primary)",
              }}
            >
              <Code2 size={20} aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <h2 id="export-css-title" className="text-base font-semibold">
                Export CSS
              </h2>
              <p
                className="mt-1 text-xs leading-5 sm:text-sm"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                Your theme is ready to use in your project.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close CSS export dialog"
            className="rounded-lg p-2 transition-opacity hover:opacity-65"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--cf-primary)" }}
              />
              <span className="text-xs font-medium">{paletteName}.css</span>
            </div>

            <span
              className="text-[10px] sm:text-xs"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              CSS Variables
            </span>
          </div>

          <div
            className="overflow-hidden rounded-xl border"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
            }}
          >
            <div
              className="flex items-center gap-1.5 border-b px-3 py-2.5"
              style={{ borderColor: "var(--cf-border)" }}
            >
              <span className="h-2 w-2 rounded-full bg-red-400/80" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
              <span className="h-2 w-2 rounded-full bg-green-400/80" />
              <span
                className="ml-2 text-[10px]"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                CSS Preview
              </span>
            </div>

            <textarea
              readOnly
              value={css}
              aria-label="Generated CSS code"
              spellCheck={false}
              className="block h-[min(48dvh,420px)] w-full resize-none overflow-auto bg-transparent p-4 font-mono text-[11px] leading-5 outline-none sm:text-xs"
            />
          </div>

          <p
            className="mt-3 text-[11px] leading-5"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Includes light and dark mode variables, typography, and your
            selected global border radius.
          </p>
        </div>

        <div
          className="flex flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end sm:p-5"
          style={{ borderColor: "var(--cf-border)" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--cf-border)" }}
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-75"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
            }}
          >
            <Copy size={15} aria-hidden="true" />
            Copy CSS
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85"
            style={{
              backgroundColor: "var(--cf-primary)",
              color: "var(--cf-primary-foreground)",
            }}
          >
            <Download size={15} aria-hidden="true" />
            Download CSS
          </button>
        </div>
      </section>
    </div>
  );
}

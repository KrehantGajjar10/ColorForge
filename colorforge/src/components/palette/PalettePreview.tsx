import { useState } from "react";
import { Check, Copy, X } from "lucide-react";
import type { Palette } from "../../types";

interface PalettePreviewProps {
  palette: Palette;
}

export default function PalettePreview({ palette }: PalettePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  async function copyColor(color: string) {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
    } catch {
      setCopiedColor(null);
    }
  }

  return (
    <>
      <section
        className="rounded-xl border border-zinc-800 p-5"
        style={{ backgroundColor: palette.background }}
      >
        <p className="text-xs font-medium uppercase tracking-wider text-white/70">
          Selected palette
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">{palette.name}</h3>

        <div className="mt-5 space-y-3">
          {palette.colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => copyColor(color)}
              className="flex w-full items-center gap-3 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              title={`Copy ${color}`}
            >
              <span
                className="h-9 w-9 shrink-0 rounded-lg border border-white/15"
                style={{ backgroundColor: color }}
              />

              <span className="font-mono text-sm text-white">{color}</span>

              {copiedColor === color ? (
                <Check size={15} className="ml-auto text-white" />
              ) : (
                <Copy size={15} className="ml-auto text-white/50" />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-6 rounded-lg px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ backgroundColor: palette.primary }}
        >
          Preview action
        </button>
      </section>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="palette-dialog-title"
            className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-400">Palette preview</p>
                <h2
                  id="palette-dialog-title"
                  className="mt-1 text-xl font-bold text-white"
                >
                  {palette.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close preview"
                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-2">
              {palette.colors.map((color) => (
                <div key={color}>
                  <div
                    className="h-20 rounded-lg border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                  <p className="mt-2 text-center font-mono text-xs text-zinc-300">
                    {color}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-6 rounded-xl p-5"
              style={{ backgroundColor: palette.background }}
            >
              <h3 className="text-lg font-bold text-white">
                Your next project
              </h3>
              <p className="mt-2 text-sm text-white/75">
                A preview of how this palette can look in a UI.
              </p>
              <button
                type="button"
                className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: palette.primary }}
                onClick={() => setIsOpen(false)}
              >
                Looks good
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

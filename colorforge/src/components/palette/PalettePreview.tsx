import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { Palette } from "../../types";
import { themeTokenDefinitions } from "../../data/themeTokens";

interface PalettePreviewProps {
  palette: Palette;
}

export default function PalettePreview({ palette }: PalettePreviewProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const tokens = palette.tokens;

  async function copyColor(color: string) {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(color);
    } catch {
      setCopied(null);
    }
  }

  return (
    <section
      className="rounded-xl border p-5"
      style={{
        backgroundColor: tokens.background,
        borderColor: tokens.border,
        color: tokens.foreground,
      }}
    >
      <p className="text-xs font-medium uppercase tracking-wider opacity-70">
        Live theme preview
      </p>

      <h3 className="mt-2 text-xl font-bold">{palette.name}</h3>

      <div
        className="mt-5 rounded-xl border p-4"
        style={{
          backgroundColor: tokens.secondary,
          borderColor: tokens.border,
          color: tokens.secondaryForeground,
        }}
      >
        <p className="text-sm font-medium">Sample component</p>

        <p className="mt-1 text-sm opacity-80">
          Preview your semantic colors in context.
        </p>

        <button
          type="button"
          className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold"
          style={{
            backgroundColor: tokens.primary,
            color: tokens.primaryForeground,
          }}
        >
          Primary action
        </button>

        <div
          className="mt-3 rounded-lg p-3 text-sm"
          style={{
            backgroundColor: tokens.accent,
            color: tokens.accentForeground,
          }}
        >
          Accent message
        </div>

        <p className="mt-3 text-sm" style={{ color: tokens.mutedForeground }}>
          Secondary information
        </p>
      </div>

      <h4 className="mt-6 text-sm font-semibold">Theme tokens</h4>

      <div className="mt-3 space-y-2">
        {themeTokenDefinitions.map(({ key, label }) => {
          const color = tokens[key];

          return (
            <button
              key={key}
              type="button"
              onClick={() => copyColor(color)}
              title={`Copy ${color}`}
              className="flex w-full items-center gap-3 rounded-lg text-left"
            >
              <span
                className="h-7 w-7 shrink-0 rounded-md border border-white/10"
                style={{ backgroundColor: color }}
              />

              <span className="min-w-0 flex-1 truncate text-sm">{label}</span>

              <span className="font-mono text-xs opacity-70">{color}</span>

              {copied === color ? (
                <Check size={14} />
              ) : (
                <Copy size={14} className="opacity-50" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

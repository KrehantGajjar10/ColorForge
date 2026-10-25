import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { Palette } from "../../types";
import { themeTokenDefinitions } from "../../data/themeTokens";
import { useTheme } from "../../context/useTheme";

interface PalettePreviewProps {
  palette: Palette;
}

export default function PalettePreview({ palette }: PalettePreviewProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const { colorMode } = useTheme();
  const tokens = palette.tokens;
  const isDark = colorMode === "dark";

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
      className="rounded-xl border p-5 transition-colors duration-300"
      style={{
        backgroundColor: "var(--cf-background)",
        borderColor: "var(--cf-border)",
        color: "var(--cf-foreground)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wider opacity-70">
          Live theme preview
        </p>
        <span
          className="rounded-full border px-2 py-1 text-[10px] font-medium"
          style={{
            borderColor: "var(--cf-border)",
            color: "var(--cf-muted-foreground)",
          }}
        >
          {isDark ? "Dark mode" : "Light mode"}
        </span>
      </div>

      <h3 className="mt-2 text-xl font-bold">{palette.name}</h3>

      <div
        className="mt-5 rounded-xl border p-4 transition-colors duration-300"
        style={{
          backgroundColor: "var(--cf-secondary)",
          borderColor: "var(--cf-border)",
          color: "var(--cf-secondary-foreground)",
        }}
      >
        <p className="text-sm font-medium">Sample component</p>

        <p
          className="mt-1 text-sm"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          Preview your semantic colors in context.
        </p>

        <button
          type="button"
          className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-85"
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

        <p
          className="mt-3 text-sm"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
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
              aria-label={`Copy ${label} color ${color}`}
              className="flex w-full items-center gap-3 rounded-lg text-left transition-opacity hover:opacity-75"
            >
              <span
                className="h-7 w-7 shrink-0 rounded-md border"
                style={{
                  backgroundColor: color,
                  borderColor: "var(--cf-border)",
                }}
              />

              <span className="min-w-0 flex-1 truncate text-sm">{label}</span>

              <span className="font-mono text-xs opacity-70">{color}</span>

              {copied === color ? (
                <Check size={14} aria-hidden="true" />
              ) : (
                <Copy size={14} className="opacity-50" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

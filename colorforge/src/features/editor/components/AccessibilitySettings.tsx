import { useState } from "react";
import {
  Check,
  Copy,
  Info,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import type { Palette, ThemeTokens } from "../../../types";
import { evaluateContrast } from "../../../utils/colorContrast";

interface AccessibilitySettingsProps {
  palette: Palette;
}

type TokenKey = keyof ThemeTokens;

interface ContrastPair {
  id: string;
  label: string;
  foreground: TokenKey;
  background: TokenKey;
  kind: "text" | "nonText";
}

interface ColorSuggestion {
  foreground: string;
  background: string;
  changed: "foreground" | "background";
  ratio: number;
}

const contrastPairs: ContrastPair[] = [
  {
    id: "main-content",
    label: "Main text on background",
    foreground: "foreground",
    background: "background",
    kind: "text",
  },
  {
    id: "primary",
    label: "Primary button",
    foreground: "primaryForeground",
    background: "primary",
    kind: "text",
  },
  {
    id: "secondary",
    label: "Secondary surface",
    foreground: "secondaryForeground",
    background: "secondary",
    kind: "text",
  },
  {
    id: "accent",
    label: "Accent surface",
    foreground: "accentForeground",
    background: "accent",
    kind: "text",
  },
  {
    id: "muted",
    label: "Muted text on muted surface",
    foreground: "mutedForeground",
    background: "muted",
    kind: "text",
  },
  {
    id: "muted-main",
    label: "Muted text on main background",
    foreground: "mutedForeground",
    background: "background",
    kind: "text",
  },
  {
    id: "border",
    label: "Border against background",
    foreground: "border",
    background: "background",
    kind: "nonText",
  },
];

const tokenLabels: Record<TokenKey, string> = {
  background: "Background",
  foreground: "Foreground",
  primary: "Primary",
  primaryForeground: "Primary foreground",
  secondary: "Secondary",
  secondaryForeground: "Secondary foreground",
  accent: "Accent",
  accentForeground: "Accent foreground",
  muted: "Muted",
  mutedForeground: "Muted foreground",
  border: "Border",
};

function normalizeHex(value: string): string {
  const trimmed = value.trim();
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

function isValidHex(value: string): boolean {
  return /^#?[0-9a-fA-F]{6}$/.test(value.trim());
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

function findAccessibleSuggestion(
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

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const valid = isValidHex(value);
  const colorValue = valid ? normalizeHex(value) : "#000000";

  return (
    <div className="min-w-0 space-y-2">
      <label className="block text-xs font-medium">{label}</label>

      <div
        className="flex h-11 min-w-0 items-center gap-2 rounded-lg border p-1.5"
        style={{
          borderColor: "var(--cf-border)",
          backgroundColor: "var(--cf-background)",
        }}
      >
        <input
          type="color"
          value={colorValue}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          className="size-7 shrink-0 cursor-pointer rounded-md border-0 bg-transparent p-0"
          aria-label={`${label} color picker`}
        />

        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          autoComplete="off"
          maxLength={7}
          aria-label={`${label} HEX value`}
          aria-invalid={!valid}
          className="min-w-0 flex-1 bg-transparent font-mono text-xs uppercase outline-none"
        />
      </div>

      {!valid && (
        <p className="text-[11px] text-red-500">
          Enter a valid six-digit HEX color.
        </p>
      )}
    </div>
  );
}

function StatusLabel({ passed }: { passed: boolean }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold"
      style={{
        backgroundColor: passed
          ? "rgba(22, 163, 74, 0.10)"
          : "rgba(220, 38, 38, 0.10)",
        color: passed ? "#16a34a" : "#dc2626",
      }}
    >
      {passed ? (
        <Check size={11} aria-hidden="true" />
      ) : (
        <X size={11} aria-hidden="true" />
      )}
      {passed ? "Pass" : "Fail"}
    </span>
  );
}

function ResultRow({ label, passed }: { label: string; passed: boolean }) {
  return (
    <div
      className="flex items-center justify-between gap-3 border-b py-2.5 last:border-b-0"
      style={{ borderColor: "var(--cf-border)" }}
    >
      <span className="text-xs" style={{ color: "var(--cf-muted-foreground)" }}>
        {label}
      </span>
      <StatusLabel passed={passed} />
    </div>
  );
}

export default function AccessibilitySettings({
  palette,
}: AccessibilitySettingsProps) {
  const [foreground, setForeground] = useState(
    palette.tokens.primaryForeground,
  );
  const [background, setBackground] = useState(palette.tokens.primary);
  const [copiedValue, setCopiedValue] = useState("");

  const validColors = isValidHex(foreground) && isValidHex(background);

  const result = validColors ? evaluateContrast(foreground, background) : null;

  const paletteResults = contrastPairs.map((pair) => {
    const foregroundColor = palette.tokens[pair.foreground];
    const backgroundColor = palette.tokens[pair.background];

    const valid = isValidHex(foregroundColor) && isValidHex(backgroundColor);

    const evaluation = valid
      ? evaluateContrast(foregroundColor, backgroundColor)
      : null;

    const passed = evaluation
      ? pair.kind === "nonText"
        ? evaluation.nonText
        : evaluation.normalText.AA
      : false;

    return {
      ...pair,
      foregroundColor,
      backgroundColor,
      evaluation,
      passed,
    };
  });

  const passedCount = paletteResults.filter((item) => item.passed).length;

  const failedCount = paletteResults.length - passedCount;

  const suggestions = paletteResults
    .filter(
      (item) =>
        item.kind === "text" &&
        item.evaluation &&
        !item.evaluation.normalText.AA,
    )
    .map((item) => ({
      ...item,
      suggestion: findAccessibleSuggestion(
        item.foregroundColor,
        item.backgroundColor,
      ),
    }))
    .filter((item) => item.suggestion !== null);

  async function copyHex(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
    } catch {
      setCopiedValue("");
    }
  }

  function resetTester() {
    setForeground(palette.tokens.primaryForeground);
    setBackground(palette.tokens.primary);
  }

  return (
    <section className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <div
            className="flex size-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor: "var(--cf-secondary)",
              color: "var(--cf-foreground)",
            }}
          >
            <ShieldCheck size={16} aria-hidden="true" />
          </div>

          <h2 className="text-sm font-semibold">Accessibility</h2>
        </div>

        <p
          className="mt-2 text-xs leading-5"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          Analyze your palette, test custom colors, and improve contrast
          accessibility.
        </p>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-xs font-semibold">
              Palette accessibility report
            </h3>
            <p
              className="mt-1 text-[11px]"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              {palette.name} · {paletteResults.length} combinations
            </p>
          </div>

          <span
            className="rounded-md px-2 py-1 text-[10px] font-medium"
            style={{
              backgroundColor: "var(--cf-muted)",
              color: "var(--cf-muted-foreground)",
            }}
          >
            Live analysis
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div
            className="rounded-xl border p-3"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
            }}
          >
            <div className="flex items-center gap-1.5 text-xs text-green-600">
              <Check size={13} aria-hidden="true" />
              Passing
            </div>
            <p className="mt-2 text-2xl font-semibold tabular-nums">
              {passedCount}
            </p>
          </div>

          <div
            className="rounded-xl border p-3"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
            }}
          >
            <div className="flex items-center gap-1.5 text-xs text-red-600">
              <X size={13} aria-hidden="true" />
              Failing
            </div>
            <p className="mt-2 text-2xl font-semibold tabular-nums">
              {failedCount}
            </p>
          </div>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--cf-muted)" }}
          role="progressbar"
          aria-label="Palette contrast combinations passing"
          aria-valuemin={0}
          aria-valuemax={paletteResults.length}
          aria-valuenow={passedCount}
        >
          <div
            className="h-full rounded-full bg-green-600 transition-all duration-300"
            style={{
              width: `${(passedCount / paletteResults.length) * 100}%`,
            }}
          />
        </div>

        <div
          className="overflow-hidden rounded-xl border"
          style={{
            borderColor: "var(--cf-border)",
            backgroundColor: "var(--cf-background)",
          }}
        >
          {paletteResults.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 border-b p-3 last:border-b-0"
              style={{ borderColor: "var(--cf-border)" }}
            >
              <div className="flex shrink-0 -space-x-1.5">
                <span
                  className="size-7 rounded-lg border-2"
                  style={{
                    backgroundColor: item.backgroundColor,
                    borderColor: "var(--cf-background)",
                  }}
                  title={`${tokenLabels[item.background]}: ${item.backgroundColor}`}
                />
                <span
                  className="size-7 rounded-lg border-2"
                  style={{
                    backgroundColor: item.foregroundColor,
                    borderColor: "var(--cf-background)",
                  }}
                  title={`${tokenLabels[item.foreground]}: ${item.foregroundColor}`}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{item.label}</p>
                <p
                  className="mt-1 text-[10px]"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  {item.evaluation
                    ? `${item.evaluation.roundedRatio}:1 · ${
                        item.kind === "nonText"
                          ? "3:1 required"
                          : "4.5:1 required"
                      }`
                    : "Invalid palette color"}
                </p>
              </div>

              <StatusLabel passed={item.passed} />
            </div>
          ))}
        </div>

        <p
          className="text-[10px] leading-5"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          Text combinations are evaluated against normal-text AA (4.5:1). Border
          contrast uses the 3:1 non-text threshold. Large-text and AAA results
          are available in the custom tester.
        </p>
      </section>

      <div className="border-t" style={{ borderColor: "var(--cf-border)" }} />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-xs font-semibold">Custom contrast tester</h3>
            <p
              className="mt-1 text-[11px]"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Test any two HEX colors.
            </p>
          </div>

          <button
            type="button"
            onClick={resetTester}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-colors hover:opacity-70"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            <RefreshCw size={12} aria-hidden="true" />
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ColorControl
            label="Foreground"
            value={foreground}
            onChange={setForeground}
          />
          <ColorControl
            label="Background"
            value={background}
            onChange={setBackground}
          />
        </div>

        <div
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: "var(--cf-border)" }}
        >
          <div
            className="border-b px-3 py-2.5 text-xs font-semibold"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-muted)",
            }}
          >
            Live preview
          </div>

          <div
            className="space-y-3 p-4"
            style={{
              backgroundColor: isValidHex(background)
                ? normalizeHex(background)
                : "var(--cf-background)",
              color: isValidHex(foreground)
                ? normalizeHex(foreground)
                : "var(--cf-foreground)",
            }}
          >
            <p className="text-xl font-semibold tracking-tight">
              The quick brown fox
            </p>
            <p className="text-sm leading-6">
              Good contrast makes content easier to read and understand.
            </p>
            <p className="text-xs">Small text preview · 12px</p>
          </div>
        </div>

        <div
          className="rounded-xl border p-4"
          style={{
            borderColor: "var(--cf-border)",
            backgroundColor: "var(--cf-secondary)",
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-xs font-medium"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Contrast ratio
            </span>
            <span
              className="text-[10px] font-medium uppercase tracking-wider"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              WCAG 2.2
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold tracking-tight tabular-nums">
              {result ? `${result.roundedRatio}:1` : "--"}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              contrast ratio
            </span>
          </div>

          {result && (
            <div className="mt-2">
              <StatusLabel passed={result.normalText.AA} />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold">WCAG compliance</h3>

          {result ? (
            <div
              className="rounded-xl border px-3"
              style={{
                borderColor: "var(--cf-border)",
                backgroundColor: "var(--cf-background)",
              }}
            >
              <ResultRow
                label="Normal text · AA (4.5:1)"
                passed={result.normalText.AA}
              />
              <ResultRow
                label="Normal text · AAA (7:1)"
                passed={result.normalText.AAA}
              />
              <ResultRow
                label="Large text · AA (3:1)"
                passed={result.largeText.AA}
              />
              <ResultRow
                label="Large text · AAA (4.5:1)"
                passed={result.largeText.AAA}
              />
              <ResultRow label="UI components · 3:1" passed={result.nonText} />
            </div>
          ) : (
            <p className="text-xs text-red-500">
              Enter valid six-digit HEX colors to see the results.
            </p>
          )}
        </div>
      </section>

      <div className="border-t" style={{ borderColor: "var(--cf-border)" }} />

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles
            size={15}
            style={{ color: "var(--cf-primary)" }}
            aria-hidden="true"
          />
          <h3 className="text-xs font-semibold">
            Accessible color suggestions
          </h3>
        </div>

        <p
          className="text-[11px] leading-5"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          Suggestions preserve the original hue and saturation where possible,
          adjusting lightness to reach normal-text AA.
        </p>

        {suggestions.length > 0 ? (
          <div className="space-y-3">
            {suggestions.map((item) => {
              const suggestion = item.suggestion;

              if (!suggestion) return null;

              return (
                <div
                  key={item.id}
                  className="space-y-3 rounded-xl border p-3"
                  style={{
                    borderColor: "var(--cf-border)",
                    backgroundColor: "var(--cf-background)",
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="min-w-0 truncate text-xs font-medium">
                      {item.label}
                    </p>
                    <span className="shrink-0 text-[10px] font-medium text-green-600">
                      {suggestion.ratio.toFixed(2)}:1
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="min-w-0 space-y-1.5">
                      <span
                        className="text-[10px]"
                        style={{ color: "var(--cf-muted-foreground)" }}
                      >
                        Suggested foreground
                      </span>
                      <div className="flex min-w-0 items-center gap-1.5">
                        <span
                          className="size-6 shrink-0 rounded-md border"
                          style={{
                            backgroundColor: suggestion.foreground,
                            borderColor: "var(--cf-border)",
                          }}
                        />
                        <span className="truncate font-mono text-[10px]">
                          {suggestion.foreground}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyHex(suggestion.foreground)}
                          className="shrink-0 rounded p-1 hover:opacity-70"
                          aria-label="Copy suggested foreground HEX"
                          title="Copy HEX"
                        >
                          {copiedValue === suggestion.foreground ? (
                            <Check size={13} className="text-green-600" />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="min-w-0 space-y-1.5">
                      <span
                        className="text-[10px]"
                        style={{ color: "var(--cf-muted-foreground)" }}
                      >
                        Suggested background
                      </span>
                      <div className="flex min-w-0 items-center gap-1.5">
                        <span
                          className="size-6 shrink-0 rounded-md border"
                          style={{
                            backgroundColor: suggestion.background,
                            borderColor: "var(--cf-border)",
                          }}
                        />
                        <span className="truncate font-mono text-[10px]">
                          {suggestion.background}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyHex(suggestion.background)}
                          className="shrink-0 rounded p-1 hover:opacity-70"
                          aria-label="Copy suggested background HEX"
                          title="Copy HEX"
                        >
                          {copiedValue === suggestion.background ? (
                            <Check size={13} className="text-green-600" />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-[10px]"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    Adjusted {suggestion.changed} to meet normal-text AA.
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="rounded-xl border p-3"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
            }}
          >
            <p className="text-xs font-medium">No failing text combinations</p>
            <p
              className="mt-1 text-[11px] leading-5"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Your palette's analyzed text combinations meet normal-text AA, or
              there are no valid failing combinations to suggest.
            </p>
          </div>
        )}

        {copiedValue && (
          <p
            className="text-[11px] text-green-600"
            role="status"
            aria-live="polite"
          >
            Copied {copiedValue}
          </p>
        )}
      </section>

      <div
        className="flex gap-2 rounded-lg border p-3"
        style={{
          borderColor: "var(--cf-border)",
          backgroundColor: "var(--cf-muted)",
        }}
      >
        <Info
          size={15}
          className="mt-0.5 shrink-0"
          style={{ color: "var(--cf-muted-foreground)" }}
          aria-hidden="true"
        />
        <p
          className="text-[11px] leading-5"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          WCAG contrast thresholds depend on text size and usage. Large text
          generally means at least 18pt regular or 14pt bold. These suggestions
          are calculated alternatives, not a guarantee that every real-world
          design meets all accessibility requirements.
        </p>
      </div>
    </section>
  );
}

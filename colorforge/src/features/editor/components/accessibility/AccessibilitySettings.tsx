import { useState } from "react";
import { Check, Copy, Info, RefreshCw, Sparkles, X } from "lucide-react";

import type { Palette } from "../../../../types";
import { evaluateContrast } from "../../../../utils/colorContrast";

import { contrastPairs, tokenLabels } from "./accessibility.constants";

import { findAccessibleSuggestion } from "./utils/colorSuggestions";
import { isValidHex, normalizeHex } from "./utils/colorControl.utils";

import AccessibilityHeader from "./components/AccessibilityHeader";
import ColorControl from "./components/ColorControl";
import { ResultRow, StatusLabel } from "./components/ContrastStatus";

interface AccessibilitySettingsProps {
  palette: Palette;
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
      <AccessibilityHeader />

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

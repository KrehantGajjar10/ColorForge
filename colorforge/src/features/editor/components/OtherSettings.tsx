import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { useTheme } from "../../../context/useTheme";

export default function OtherSettings() {
  const { borderRadius, setBorderRadius } = useTheme();

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold">Other settings</h2>
        <p
          className="mt-1 text-xs leading-5"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          Fine-tune additional details of your theme.
        </p>
      </div>

      <div
        className="space-y-4 rounded-xl border p-4"
        style={{
          borderColor: "var(--cf-border)",
          backgroundColor: "var(--cf-secondary)",
        }}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={16}
            style={{ color: "var(--cf-primary)" }}
            aria-hidden="true"
          />
          <h3 className="text-xs font-semibold">Border radius</h3>
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="border-radius"
            className="text-xs"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Corner roundness
          </label>

          <div className="flex items-center gap-2">
            <span
              className="rounded-md border px-2 py-1 text-xs font-medium tabular-nums"
              style={{
                borderColor: "var(--cf-border)",
                color: "var(--cf-foreground)",
              }}
            >
              {borderRadius}px
            </span>

            {borderRadius !== 12 && (
              <button
                type="button"
                onClick={() => setBorderRadius(12)}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors hover:bg-(--cf-muted)"
                style={{ color: "var(--cf-muted-foreground)" }}
                aria-label="Reset border radius to 12 pixels"
                title="Reset to default"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            )}
          </div>
        </div>

        <input
          id="border-radius"
          type="range"
          min={0}
          max={24}
          step={2}
          value={borderRadius}
          onChange={(event) => setBorderRadius(Number(event.target.value))}
          className="h-2 w-full cursor-pointer accent-(--cf-primary)"
          aria-label="Border radius in pixels"
        />

        <div
          className="flex justify-between text-[10px]"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          <span>Sharp · 0px</span>
          <span>Rounded · 24px</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-xs font-semibold">Preview</h3>
          <p
            className="mt-1 text-[11px]"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            See how the selected corner style looks.
          </p>
        </div>

        <div
          className="space-y-3 rounded-xl border p-4"
          style={{
            borderColor: "var(--cf-border)",
            backgroundColor: "var(--cf-background)",
          }}
        >
          <div
            className="border p-3"
            style={{
              borderRadius: "var(--cf-radius)",
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
            }}
          >
            <div
              className="mb-2 h-2 w-20 rounded-full"
              style={{ backgroundColor: "var(--cf-primary)" }}
            />
            <p className="text-xs font-medium">Preview card</p>
            <p
              className="mt-1 text-[11px]"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              A simple example of your selected radius.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-2 text-xs font-medium"
              style={{
                borderRadius: "var(--cf-radius)",
                backgroundColor: "var(--cf-primary)",
                color: "var(--cf-primary-foreground)",
              }}
            >
              Button
            </button>

            <div
              className="flex-1 border px-3 py-2 text-xs"
              style={{
                borderRadius: "var(--cf-radius)",
                borderColor: "var(--cf-border)",
                color: "var(--cf-muted-foreground)",
              }}
            >
              Input field
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

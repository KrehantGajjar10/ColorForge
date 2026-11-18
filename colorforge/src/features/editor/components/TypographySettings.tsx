import { fontFamilies, type FontFamily } from "../../../context/theme-context";

interface TypographySettingsProps {
  fontFamily: FontFamily;
  onFontFamilyChange: (fontFamily: FontFamily) => void;
}

export default function TypographySettings({
  fontFamily,
  onFontFamilyChange,
}: TypographySettingsProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold">Typography</h2>
        <p
          className="mt-1 text-xs leading-5"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          Choose a font family and preview how it looks with your theme.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="font-family" className="block text-xs font-medium">
          Font family
        </label>

        <select
          id="font-family"
          value={fontFamily}
          onChange={(event) =>
            onFontFamilyChange(event.target.value as FontFamily)
          }
          className="h-10 w-full rounded-lg border px-3 text-sm outline-none focus-visible:ring-1"
          style={{
            borderColor: "var(--cf-border)",
            backgroundColor: "var(--cf-background)",
            color: "var(--cf-foreground)",
          }}
        >
          {fontFamilies.map((font) => (
            <option key={font.label} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>

        <p
          className="text-[11px] leading-5"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          Some fonts may fall back to a system font if they are not installed.
        </p>
      </div>

      <div
        className="rounded-xl border p-4"
        style={{
          borderColor: "var(--cf-border)",
          backgroundColor: "var(--cf-secondary)",
          fontFamily,
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Typography preview
          </span>

          <span
            className="rounded-md px-2 py-1 text-[10px] font-medium"
            style={{
              backgroundColor: "var(--cf-background)",
              color: "var(--cf-muted-foreground)",
            }}
          >
            Live preview
          </span>
        </div>

        <p className="mt-5 text-3xl font-semibold tracking-tight">Aa Bb Cc</p>

        <p className="mt-2 text-sm leading-6">
          The quick brown fox jumps over the lazy dog.
        </p>

        <div
          className="mt-5 border-t pt-4"
          style={{ borderColor: "var(--cf-border)" }}
        >
          <p className="text-lg font-semibold">Heading example</p>

          <p
            className="mt-1 text-sm leading-6"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Body text example using your selected font family.
          </p>

          <div className="mt-4 flex items-center gap-3 text-xs">
            <span className="font-semibold">Bold text</span>
            <span className="font-normal">Regular text</span>
            <span className="italic">Italic text</span>
          </div>
        </div>
      </div>
    </section>
  );
}

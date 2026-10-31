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
        }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          Typography preview
        </span>

        <p className="mt-4 text-3xl font-semibold tracking-tight">Aa Bb Cc</p>

        <p className="mt-2 text-sm leading-6">
          The quick brown fox jumps over the lazy dog.
        </p>

        <div
          className="mt-4 border-t pt-3"
          style={{ borderColor: "var(--cf-border)" }}
        >
          <p className="text-lg font-medium">Heading example</p>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Body text example for your selected theme.
          </p>
        </div>
      </div>
    </section>
  );
}

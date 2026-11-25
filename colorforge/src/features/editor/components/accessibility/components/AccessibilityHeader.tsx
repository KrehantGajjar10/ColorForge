import { ShieldCheck } from "lucide-react";

export default function AccessibilityHeader() {
  return (
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
  );
}

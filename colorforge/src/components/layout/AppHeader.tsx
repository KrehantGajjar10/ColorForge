import { Palette } from "lucide-react";

export default function AppHeader() {
  return (
    <header
      className="border-b transition-colors duration-300"
      style={{
        backgroundColor: "var(--cf-background)",
        borderColor: "var(--cf-border)",
        color: "var(--cf-foreground)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div
          className="rounded-xl border p-2 transition-colors duration-300"
          style={{
            backgroundColor: "var(--cf-secondary)",
            borderColor: "var(--cf-border)",
            color: "var(--cf-primary)",
          }}
        >
          <Palette size={22} strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-tight">ColorForge</h1>

          <p
            className="text-xs transition-colors duration-300"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Visual Theme Playground
          </p>
        </div>
      </div>
    </header>
  );
}

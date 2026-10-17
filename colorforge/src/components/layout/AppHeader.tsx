import { Palette } from "lucide-react";

export default function AppHeader() {
  return (
    <header
      className="border-b"
      style={{
        backgroundColor: "var(--cf-background)",
        borderColor: "var(--cf-border)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div
          className="rounded-xl p-2"
          style={{
            backgroundColor: "var(--cf-secondary)",
            color: "var(--cf-primary)",
          }}
        >
          <Palette size={22} />
        </div>

        <div>
          <h1
            className="text-lg font-bold"
            style={{ color: "var(--cf-foreground)" }}
          >
            ColorForge
          </h1>

          <p
            className="text-xs"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Visual Theme Playground
          </p>
        </div>
      </div>
    </header>
  );
}

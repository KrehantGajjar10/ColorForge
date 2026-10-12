import { Palette } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex  items-center gap-3 px-6 py-4">
        <div className="rounded-xl bg-violet-500/15 p-2">
          <Palette className="text-violet-400" size={22} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-white">ColorForge</h1>
          <p className="text-xs text-zinc-400">Visual Theme Playground</p>
        </div>
      </div>
    </header>
  );
}

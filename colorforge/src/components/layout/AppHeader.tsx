import { Palette } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex w-full max-w-[1600px] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
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

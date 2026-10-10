import { Palette } from "lucide-react";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex items-center gap-3 border-b bg-white px-6 py-4">
        <Palette className="text-violet-600" size={24} />
        <h1 className="text-xl font-bold">ColorForge</h1>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-4xl font-bold tracking-tight">
          Forge Your Perfect Palette
        </h2>
        <p className="mt-4 text-slate-500">
          Explore colors. Customize themes. Preview your UI.
        </p>

        <div className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-3">
          {["#8B5CF6", "#06B6D4", "#10B981", "#F43F5E"].map((color) => (
            <div
              key={color}
              className="h-16 w-16 rounded-2xl shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <button className="mt-8 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700">
          Start Creating
        </button>
      </section>
    </main>
  );
}

export default App;

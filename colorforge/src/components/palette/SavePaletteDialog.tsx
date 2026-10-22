import { useEffect, useState, type FormEvent } from "react";
import { BookmarkPlus, X } from "lucide-react";

interface SavePaletteDialogProps {
  defaultName: string;
  onSave: (name: string) => void;
  onClose: () => void;
}

export default function SavePaletteDialog({
  defaultName,
  onSave,
  onClose,
}: SavePaletteDialogProps) {
  const [name, setName] = useState(`${defaultName} Copy`);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    onSave(trimmedName);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-palette-title"
        className="w-full max-w-md rounded-2xl border p-5 shadow-2xl sm:p-6"
        style={{
          backgroundColor: "var(--cf-background)",
          color: "var(--cf-foreground)",
          borderColor: "var(--cf-border)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className="rounded-xl p-2.5"
              style={{
                backgroundColor: "var(--cf-secondary)",
                color: "var(--cf-primary)",
              }}
            >
              <BookmarkPlus size={20} aria-hidden="true" />
            </div>

            <div>
              <h2 id="save-palette-title" className="text-lg font-semibold">
                Save your palette
              </h2>
              <p
                className="mt-1 text-sm leading-5"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                Keep a copy of your current colors for later.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close save palette dialog"
            className="rounded-lg p-2 transition hover:opacity-70 focus-visible:outline-2"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <label
            htmlFor="saved-palette-name"
            className="mb-2 block text-sm font-medium"
          >
            Palette name
          </label>

          <input
            id="saved-palette-name"
            autoFocus
            required
            maxLength={40}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Warm Minimal"
            className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus-visible:ring-2"
            style={{
              backgroundColor: "var(--cf-secondary)",
              color: "var(--cf-foreground)",
              borderColor: "var(--cf-border)",
            }}
          />

          <p
            className="mt-2 text-xs"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Your saved copy won't change when you edit the current palette.
          </p>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:opacity-75"
              style={{ borderColor: "var(--cf-border)" }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: "var(--cf-primary)",
                color: "var(--cf-primary-foreground)",
              }}
            >
              Save palette
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

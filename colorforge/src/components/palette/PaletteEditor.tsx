import { useMemo, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import type { Palette } from "../../types";
import { themeTokenDefinitions } from "../../data/themeTokens";
import TokenGroup from "./palette-editor/TokenGroup";
import { tokenGroups, type TokenKey } from "./palette-editor/tokenGroups";

interface PaletteEditorProps {
  palette: Palette;
  onChange: (palette: Palette) => void;
  onReset: () => void;
}

export default function PaletteEditor({
  palette,
  onChange,
  onReset,
}: PaletteEditorProps) {
  const [search, setSearch] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);
  const [hexValues, setHexValues] = useState<Partial<Record<TokenKey, string>>>(
    {},
  );

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tokenGroups
      .map((group) => ({
        ...group,
        tokens: group.keys
          .map((key) => themeTokenDefinitions.find((item) => item.key === key))
          .filter(
            (item): item is (typeof themeTokenDefinitions)[number] =>
              item !== undefined &&
              (!query ||
                item.label.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.key.toLowerCase().includes(query)),
          ),
      }))
      .filter((group) => group.tokens.length > 0);
  }, [search]);

  function updateColor(key: TokenKey, color: string) {
    onChange({
      ...palette,
      tokens: {
        ...palette.tokens,
        [key]: color,
      },
    });

    setHexValues((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function updateHex(key: TokenKey, value: string) {
    setHexValues((current) => ({ ...current, [key]: value }));

    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      onChange({
        ...palette,
        tokens: {
          ...palette.tokens,
          [key]: value.toLowerCase(),
        },
      });
    }
  }

  function handleHexBlur(key: TokenKey) {
    setHexValues((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function copyColor(key: TokenKey, label: string) {
    try {
      await navigator.clipboard.writeText(palette.tokens[key]);
      toast.success(`${label} copied`, {
        description: palette.tokens[key].toUpperCase(),
      });
    } catch {
      toast.error("Couldn't copy color", {
        description: "Clipboard access was blocked by your browser.",
      });
    }
  }

  function toggleGroup(groupId: string) {
    setCollapsedGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId],
    );
  }

  function handleReset() {
    setHexValues({});
    onReset();
  }

  return (
    <section className="space-y-4" style={{ color: "var(--cf-foreground)" }}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <SlidersHorizontal
            size={15}
            aria-hidden="true"
            style={{ color: "var(--cf-muted-foreground)" }}
          />
          <h3 className="text-sm font-semibold">Colors</h3>
          <span
            className="rounded-md px-1.5 py-0.5 text-[10px] tabular-nums"
            style={{
              backgroundColor: "var(--cf-muted)",
              color: "var(--cf-muted-foreground)",
            }}
          >
            {themeTokenDefinitions.length}
          </span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-opacity hover:opacity-70"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          <RotateCcw size={12} aria-hidden="true" />
          Reset
        </button>
      </div>

      <label
        className="flex h-9 items-center gap-2 rounded-lg border px-3"
        style={{
          borderColor: "var(--cf-border)",
          backgroundColor: "var(--cf-secondary)",
        }}
      >
        <Search
          size={14}
          aria-hidden="true"
          style={{ color: "var(--cf-muted-foreground)" }}
        />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search color tokens..."
          aria-label="Search color tokens"
          className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:opacity-60"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-[10px]"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Clear
          </button>
        )}
      </label>

      <div className="space-y-2">
        {filteredGroups.map((group) => (
          <TokenGroup
            key={group.id}
            id={group.id}
            label={group.label}
            tokens={group.tokens}
            values={palette.tokens}
            collapsed={!search && collapsedGroups.includes(group.id)}
            drafts={hexValues}
            onToggle={toggleGroup}
            onColorChange={updateColor}
            onHexChange={updateHex}
            onHexBlur={handleHexBlur}
            onCopy={copyColor}
          />
        ))}

        {filteredGroups.length === 0 && (
          <div
            className="rounded-lg border px-4 py-8 text-center"
            style={{ borderColor: "var(--cf-border)" }}
          >
            <Search
              size={20}
              className="mx-auto mb-2"
              aria-hidden="true"
              style={{ color: "var(--cf-muted-foreground)" }}
            />
            <p className="text-xs font-medium">No color tokens found</p>
            <p
              className="mt-1 text-[11px]"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Try another name, such as primary or border.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import type { Palette, ThemeTokens } from "../../types";
import { themeTokenDefinitions } from "../../data/themeTokens";

type TokenKey = keyof ThemeTokens;

const tokenGroups: {
  id: string;
  label: string;
  keys: TokenKey[];
}[] = [
  {
    id: "base",
    label: "Base colors",
    keys: ["background", "foreground"],
  },
  {
    id: "primary",
    label: "Primary colors",
    keys: ["primary", "primaryForeground"],
  },
  {
    id: "secondary",
    label: "Secondary colors",
    keys: ["secondary", "secondaryForeground"],
  },
  {
    id: "accent",
    label: "Accent colors",
    keys: ["accent", "accentForeground"],
  },
  {
    id: "muted",
    label: "Muted colors",
    keys: ["muted", "mutedForeground"],
  },
  {
    id: "borders",
    label: "Borders",
    keys: ["border"],
  },
];

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
          .map((key) => {
            const definition = themeTokenDefinitions.find(
              (item) => item.key === key,
            );

            return definition ? { ...definition, key } : null;
          })
          .filter(
            (item): item is NonNullable<typeof item> =>
              item !== null &&
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
        {filteredGroups.map((group) => {
          const collapsed = !search && collapsedGroups.includes(group.id);

          return (
            <section
              key={group.id}
              className="overflow-hidden rounded-lg border"
              style={{ borderColor: "var(--cf-border)" }}
            >
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                aria-expanded={!collapsed}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left transition-colors hover:opacity-80"
                style={{ backgroundColor: "var(--cf-secondary)" }}
              >
                {collapsed ? (
                  <ChevronRight
                    size={14}
                    aria-hidden="true"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  />
                ) : (
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  />
                )}

                <span className="flex-1 text-xs font-medium">
                  {group.label}
                </span>

                <span
                  className="text-[10px] tabular-nums"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  {group.tokens.length}
                </span>
              </button>

              {!collapsed && (
                <div>
                  {group.tokens.map((token, index) => {
                    const color = palette.tokens[token.key];
                    const draft = hexValues[token.key];
                    const validHex = /^#[0-9a-fA-F]{6}$/.test(draft ?? "");
                    const invalidHex =
                      draft !== undefined && draft.length > 0 && !validHex;

                    return (
                      <div
                        key={token.key}
                        className="flex min-w-0 items-center gap-2.5 px-3 py-3"
                        style={{
                          borderTop: index
                            ? "1px solid var(--cf-border)"
                            : undefined,
                        }}
                      >
                        <label
                          className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-md border"
                          style={{ borderColor: "var(--cf-border)" }}
                          title={`Change ${token.label}`}
                        >
                          <span
                            className="absolute inset-0"
                            style={{ backgroundColor: color }}
                          />
                          <input
                            type="color"
                            value={color}
                            onChange={(event) =>
                              updateColor(token.key, event.target.value)
                            }
                            aria-label={`Choose ${token.label} color`}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          />
                        </label>

                        <div className="min-w-0 flex-1">
                          <label
                            htmlFor={`token-${token.key}`}
                            className="block truncate text-xs font-medium"
                          >
                            {token.label}
                          </label>
                          <p
                            className="mt-0.5 truncate text-[10px]"
                            style={{ color: "var(--cf-muted-foreground)" }}
                          >
                            {token.description}
                          </p>
                        </div>

                        <input
                          id={`token-${token.key}`}
                          value={draft ?? color}
                          onChange={(event) =>
                            updateHex(token.key, event.target.value)
                          }
                          onBlur={() => handleHexBlur(token.key)}
                          maxLength={7}
                          spellCheck={false}
                          autoComplete="off"
                          aria-label={`${token.label} hex value`}
                          aria-invalid={invalidHex}
                          className="w-22 shrink-0 rounded-md border px-2 py-2 font-mono text-[11px] uppercase outline-none focus-visible:ring-1"
                          style={{
                            borderColor: invalidHex
                              ? "#dc2626"
                              : "var(--cf-border)",
                            backgroundColor: "var(--cf-background)",
                            color: "var(--cf-foreground)",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}

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

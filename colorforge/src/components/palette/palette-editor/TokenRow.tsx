import { Copy } from "lucide-react";
import type { TokenKey } from "./tokenGroups";

interface TokenRowProps {
  token: {
    key: TokenKey;
    label: string;
    description: string;
  };
  color: string;
  draft?: string;
  isFirst: boolean;
  onColorChange: (key: TokenKey, color: string) => void;
  onHexChange: (key: TokenKey, value: string) => void;
  onHexBlur: (key: TokenKey) => void;
  onCopy: (key: TokenKey, label: string) => void;
}

export default function TokenRow({
  token,
  color,
  draft,
  isFirst,
  onColorChange,
  onHexChange,
  onHexBlur,
  onCopy,
}: TokenRowProps) {
  const validHex = /^#[0-9a-fA-F]{6}$/.test(draft ?? "");
  const invalidHex = draft !== undefined && draft.length > 0 && !validHex;

  return (
    <div
      className="flex min-w-0 items-center gap-2 px-3 py-3"
      style={{
        borderTop: isFirst ? undefined : "1px solid var(--cf-border)",
      }}
    >
      <label
        className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-md border"
        style={{ borderColor: "var(--cf-border)" }}
        title={`Change ${token.label}`}
      >
        <span className="absolute inset-0" style={{ backgroundColor: color }} />
        <input
          type="color"
          value={color}
          onChange={(event) => onColorChange(token.key, event.target.value)}
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
        onChange={(event) => onHexChange(token.key, event.target.value)}
        onBlur={() => onHexBlur(token.key)}
        maxLength={7}
        spellCheck={false}
        autoComplete="off"
        aria-label={`${token.label} hex value`}
        aria-invalid={invalidHex}
        className="w-20 shrink-0 rounded-md border px-2 py-2 font-mono text-[11px] uppercase outline-none focus-visible:ring-1"
        style={{
          borderColor: invalidHex ? "#dc2626" : "var(--cf-border)",
          backgroundColor: "var(--cf-background)",
          color: "var(--cf-foreground)",
        }}
      />

      <button
        type="button"
        onClick={() => onCopy(token.key, token.label)}
        aria-label={`Copy ${token.label} hex value`}
        title={`Copy ${token.label} hex value`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors hover:opacity-70"
        style={{
          borderColor: "var(--cf-border)",
          backgroundColor: "var(--cf-background)",
          color: "var(--cf-muted-foreground)",
        }}
      >
        <Copy size={13} aria-hidden="true" />
      </button>
    </div>
  );
}

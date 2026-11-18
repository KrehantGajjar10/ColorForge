import { ChevronDown, ChevronRight } from "lucide-react";

import type { ThemeTokens } from "../../../types";
import type { TokenKey } from "./tokenGroups";
import TokenRow from "./TokenRow";

interface TokenDefinition {
  key: TokenKey;
  label: string;
  description: string;
}

interface TokenGroupProps {
  id: string;
  label: string;
  tokens: TokenDefinition[];
  values: ThemeTokens;
  collapsed: boolean;
  drafts: Partial<Record<TokenKey, string>>;
  onToggle: (groupId: string) => void;
  onColorChange: (key: TokenKey, color: string) => void;
  onHexChange: (key: TokenKey, value: string) => void;
  onHexBlur: (key: TokenKey) => void;
  onCopy: (key: TokenKey, label: string) => void;
}

export default function TokenGroup({
  id,
  label,
  tokens,
  values,
  collapsed,
  drafts,
  onToggle,
  onColorChange,
  onHexChange,
  onHexBlur,
  onCopy,
}: TokenGroupProps) {
  return (
    <section
      className="overflow-hidden rounded-xl border transition-colors"
      style={{ borderColor: "var(--cf-border)" }}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={!collapsed}
        className="flex w-full items-center gap-2.5 px-3 py-3 text-left transition-colors hover:opacity-80"
        style={{ backgroundColor: "var(--cf-secondary)" }}
      >
        <span style={{ color: "var(--cf-muted-foreground)" }}>
          {collapsed ? (
            <ChevronRight size={15} aria-hidden="true" />
          ) : (
            <ChevronDown size={15} aria-hidden="true" />
          )}
        </span>

        <span className="min-w-0 flex-1 text-xs font-semibold">{label}</span>

        <span
          className="rounded-md px-2 py-1 text-[10px] font-medium tabular-nums"
          style={{
            backgroundColor: "var(--cf-background)",
            color: "var(--cf-muted-foreground)",
          }}
        >
          {tokens.length} {tokens.length === 1 ? "token" : "tokens"}
        </span>
      </button>

      {!collapsed && (
        <div>
          {tokens.map((token, index) => (
            <TokenRow
              key={token.key}
              token={token}
              color={values[token.key]}
              draft={drafts[token.key]}
              isFirst={index === 0}
              onColorChange={onColorChange}
              onHexChange={onHexChange}
              onHexBlur={onHexBlur}
              onCopy={onCopy}
            />
          ))}
        </div>
      )}
    </section>
  );
}

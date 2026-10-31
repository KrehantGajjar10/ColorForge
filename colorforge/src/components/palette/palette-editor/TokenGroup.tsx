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
      className="overflow-hidden rounded-lg border"
      style={{ borderColor: "var(--cf-border)" }}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
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

        <span className="flex-1 text-xs font-medium">{label}</span>
        <span
          className="text-[10px] tabular-nums"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          {tokens.length}
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

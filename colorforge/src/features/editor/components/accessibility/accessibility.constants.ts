import type { ContrastPair, TokenKey } from "./accessibility.types";

export const contrastPairs: ContrastPair[] = [
  {
    id: "main-content",
    label: "Main text on background",
    foreground: "foreground",
    background: "background",
    kind: "text",
  },
  {
    id: "primary",
    label: "Primary button",
    foreground: "primaryForeground",
    background: "primary",
    kind: "text",
  },
  {
    id: "secondary",
    label: "Secondary surface",
    foreground: "secondaryForeground",
    background: "secondary",
    kind: "text",
  },
  {
    id: "accent",
    label: "Accent surface",
    foreground: "accentForeground",
    background: "accent",
    kind: "text",
  },
  {
    id: "muted",
    label: "Muted text on muted surface",
    foreground: "mutedForeground",
    background: "muted",
    kind: "text",
  },
  {
    id: "muted-main",
    label: "Muted text on main background",
    foreground: "mutedForeground",
    background: "background",
    kind: "text",
  },
  {
    id: "border",
    label: "Border against background",
    foreground: "border",
    background: "background",
    kind: "nonText",
  },
];

export const tokenLabels: Record<TokenKey, string> = {
  background: "Background",
  foreground: "Foreground",
  primary: "Primary",
  primaryForeground: "Primary foreground",
  secondary: "Secondary",
  secondaryForeground: "Secondary foreground",
  accent: "Accent",
  accentForeground: "Accent foreground",
  muted: "Muted",
  mutedForeground: "Muted foreground",
  border: "Border",
};

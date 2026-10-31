import type { ThemeTokens } from "../../../types";

export type TokenKey = keyof ThemeTokens;

export interface TokenGroupDefinition {
  id: string;
  label: string;
  keys: TokenKey[];
}

export const tokenGroups: TokenGroupDefinition[] = [
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

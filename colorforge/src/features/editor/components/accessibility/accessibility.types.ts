import type { ThemeTokens } from "../../../../types";

export type TokenKey = keyof ThemeTokens;

export interface ContrastPair {
  id: string;
  label: string;
  foreground: TokenKey;
  background: TokenKey;
  kind: "text" | "nonText";
}

export interface ColorSuggestion {
  foreground: string;
  background: string;
  changed: "foreground" | "background";
  ratio: number;
}

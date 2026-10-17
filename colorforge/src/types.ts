export interface ThemeTokens {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
}

export interface Palette {
  id: string;
  name: string;
  description: string;
  tokens: ThemeTokens;
}

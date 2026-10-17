import type { ThemeTokens } from "../types";

export const themeTokenDefinitions: {
  key: keyof ThemeTokens;
  label: string;
  description: string;
}[] = [
  {
    key: "background",
    label: "Background",
    description: "Main application background",
  },
  {
    key: "foreground",
    label: "Foreground",
    description: "Main text color",
  },
  {
    key: "primary",
    label: "Primary",
    description: "Main actions and emphasis",
  },
  {
    key: "primaryForeground",
    label: "Primary foreground",
    description: "Text on primary elements",
  },
  {
    key: "secondary",
    label: "Secondary",
    description: "Secondary surfaces",
  },
  {
    key: "secondaryForeground",
    label: "Secondary foreground",
    description: "Text on secondary surfaces",
  },
  {
    key: "accent",
    label: "Accent",
    description: "Highlighted elements",
  },
  {
    key: "accentForeground",
    label: "Accent foreground",
    description: "Text on accent surfaces",
  },
  {
    key: "muted",
    label: "Muted",
    description: "Subtle backgrounds",
  },
  {
    key: "mutedForeground",
    label: "Muted foreground",
    description: "Secondary text",
  },
  {
    key: "border",
    label: "Border",
    description: "Dividers and outlines",
  },
];

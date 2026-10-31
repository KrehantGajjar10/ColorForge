import { PanelsTopLeft, Type, WandSparkles } from "lucide-react";

export type SettingsTab = "colors" | "typography" | "other";

export type PreviewMode = "cards" | "dashboard" | "application" | "marketing";

export const settingTabs = [
  { id: "colors", label: "Colors", icon: PanelsTopLeft },
  { id: "typography", label: "Typography", icon: Type },
  { id: "other", label: "Other", icon: WandSparkles },
] satisfies {
  id: SettingsTab;
  label: string;
  icon: typeof PanelsTopLeft;
}[];

export const previewModes = [
  { id: "cards", label: "Cards" },
  { id: "dashboard", label: "Dashboard" },
  { id: "application", label: "Application" },
  { id: "marketing", label: "Marketing" },
] satisfies {
  id: PreviewMode;
  label: string;
}[];

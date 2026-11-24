export type ContrastLevel = "AA" | "AAA";

export type ContrastEvaluation = {
  ratio: number;
  roundedRatio: number;
  normalText: {
    AA: boolean;
    AAA: boolean;
  };
  largeText: {
    AA: boolean;
    AAA: boolean;
  };
  nonText: boolean;
};

const WCAG_THRESHOLDS = {
  normalText: {
    AA: 4.5,
    AAA: 7,
  },
  largeText: {
    AA: 3,
    AAA: 4.5,
  },
  nonText: 3,
} as const;

function parseHexColor(hex: string): [number, number, number] {
  const normalized = hex.trim().replace(/^#/, "");

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    throw new Error(
      `Invalid HEX color: "${hex}". Expected a six-digit HEX value.`,
    );
  }

  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

function linearizeChannel(channel: number): number {
  const normalized = channel / 255;

  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

export function getRelativeLuminance(hex: string): number {
  const [red, green, blue] = parseHexColor(hex);

  const r = linearizeChannel(red);
  const g = linearizeChannel(green);
  const b = linearizeChannel(blue);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(
  foreground: string,
  background: string,
): number {
  const foregroundLuminance = getRelativeLuminance(foreground);
  const backgroundLuminance = getRelativeLuminance(background);

  const lighter = Math.max(foregroundLuminance, backgroundLuminance);

  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

export function evaluateContrast(
  foreground: string,
  background: string,
): ContrastEvaluation {
  const ratio = getContrastRatio(foreground, background);

  return {
    ratio,
    roundedRatio: Math.round(ratio * 100) / 100,

    normalText: {
      AA: ratio >= WCAG_THRESHOLDS.normalText.AA,
      AAA: ratio >= WCAG_THRESHOLDS.normalText.AAA,
    },

    largeText: {
      AA: ratio >= WCAG_THRESHOLDS.largeText.AA,
      AAA: ratio >= WCAG_THRESHOLDS.largeText.AAA,
    },

    nonText: ratio >= WCAG_THRESHOLDS.nonText,
  };
}

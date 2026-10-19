import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ExternalLink,
  Layers3,
  Palette,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { palettes } from "../data/palettes";
import { useTheme } from "../context/useTheme";
import type { Palette as PaletteType } from "../types";
import "./LandingPage.css";

const features = [
  {
    icon: WandSparkles,
    title: "Make it yours",
    description:
      "Explore colors, adjust semantic tokens, and shape a theme around your ideas.",
  },
  {
    icon: Layers3,
    title: "Preview as you go",
    description:
      "See your colors applied to interface components while you experiment.",
  },
  {
    icon: Palette,
    title: "Start with inspiration",
    description:
      "Choose a palette as your starting point and refine it to fit your design.",
  },
];

function Brand() {
  return (
    <Link to="/" className="cf-brand" aria-label="ColorForge home">
      <span className="cf-brand-mark">
        <Palette size={19} strokeWidth={2.2} />
      </span>
      <span>colorforge</span>
    </Link>
  );
}

function ThemeStrip({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...palettes].reverse() : palettes;
  const { palette, selectPalette } = useTheme();

  function chooseTheme(theme: PaletteType) {
    selectPalette(theme);
  }

  return (
    <div className="cf-theme-strip">
      {items.map((theme) => {
        const { background, secondary, primary, accent } = theme.tokens;
        const selected = palette.id === theme.id;

        return (
          <button
            type="button"
            className={`cf-theme-chip ${selected ? "cf-theme-chip-active" : ""}`}
            key={`${reverse ? "reverse-" : ""}${theme.id}`}
            onClick={() => chooseTheme(theme)}
            aria-pressed={selected}
            aria-label={`Apply the ${theme.name} theme`}
          >
            <span className="cf-chip-colors" aria-hidden="true">
              {[background, secondary, primary, accent].map((color) => (
                <span
                  key={color}
                  className="cf-chip-color"
                  style={{ backgroundColor: color }}
                />
              ))}
            </span>
            <span className="cf-chip-name">{theme.name}</span>
            {selected ? (
              <Check className="cf-chip-arrow" size={14} />
            ) : (
              <ArrowDownRight className="cf-chip-arrow" size={14} />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function LandingPage() {
  const { palette } = useTheme();

  return (
    <main
      className="cf-landing"
      style={
        {
          "--cf-page": "var(--cf-background)",
          "--cf-ink": "var(--cf-foreground)",
          "--cf-muted": "var(--cf-muted-foreground)",
          "--cf-border": "var(--cf-border)",
          "--cf-accent": "var(--cf-primary)",
          "--cf-accent-hover": "var(--cf-primary)",
          "--cf-surface": "var(--cf-secondary)",
          "--cf-surface-foreground": "var(--cf-secondary-foreground)",
          "--cf-soft-accent": "var(--cf-accent)",
          "--cf-soft-accent-foreground": "var(--cf-accent-foreground)",
        } as React.CSSProperties
      }
      data-theme={palette.id}
    >
      <header className="cf-nav">
        <div className="cf-nav-inner">
          <Brand />

          <nav className="cf-nav-links" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#themes">Themes</a>
            <a href="#about">About</a>
          </nav>

          <div className="cf-nav-actions">
            <a
              className="cf-github-link"
              href="https://github.com/KrehantGajjar10/ColorForge"
              target="_blank"
              rel="noreferrer"
              aria-label="View ColorForge on GitHub"
            >
              <ExternalLink size={17} />
              <span>GitHub</span>
            </a>

            <Link className="cf-button cf-button-small" to="/editor">
              Open editor <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      <section className="cf-hero" aria-labelledby="cf-hero-title">
        <div className="cf-hero-badge">
          <Sparkles size={14} />
          <span>A playground for your next great theme</span>
        </div>

        <h1 id="cf-hero-title">
          Craft Your
          <br />
          <span className="cf-hero-emphasis">Perfect</span> Color Theme
        </h1>

        <p className="cf-hero-description">
          Your interface deserves more than default colors. Discover palettes,
          fine-tune every detail, and turn your ideas into a cohesive design
          system.
        </p>

        <div className="cf-hero-actions">
          <Link className="cf-button cf-button-primary" to="/editor">
            Start creating <ArrowRight size={17} />
          </Link>
          <a className="cf-button cf-button-secondary" href="#themes">
            Explore themes <ArrowDownRight size={17} />
          </a>
        </div>

        <div className="cf-trust-points">
          <span>
            <Check size={15} /> Live color preview
          </span>
          <span>
            <Check size={15} /> Semantic color tokens
          </span>
          <span>
            <Check size={15} /> Your creative control
          </span>
        </div>

        <div className="cf-hero-decoration" aria-hidden="true">
          <span className="cf-decoration-orbit cf-orbit-one" />
          <span className="cf-decoration-orbit cf-orbit-two" />
          <span className="cf-decoration-dot cf-dot-one" />
          <span className="cf-decoration-dot cf-dot-two" />
        </div>
      </section>

      <section className="cf-themes-section" id="themes">
        <div className="cf-section-heading">
          <div>
            <span className="cf-eyebrow">A little inspiration</span>
            <h2>Find your next favorite color story.</h2>
          </div>
          <Link className="cf-text-link" to="/editor">
            Explore all themes <ArrowRight size={16} />
          </Link>
        </div>

        <div className="cf-theme-marquee">
          <ThemeStrip />
          <ThemeStrip reverse />
          <ThemeStrip />
        </div>

        <p className="cf-themes-note">
          {`Currently exploring ${palette.name}. Click any palette to apply it instantly.`}
        </p>
      </section>

      <section className="cf-features-section" id="features">
        <div className="cf-features-intro">
          <span className="cf-eyebrow">Designed for experimentation</span>
          <h2>Less guessing. More creating.</h2>
          <p>
            A focused workspace to explore color relationships and build
            palettes that feel right for your next project.
          </p>
        </div>

        <div className="cf-feature-grid">
          {features.map(({ icon: Icon, title, description }, index) => (
            <article className="cf-feature-card" key={title}>
              <div className={`cf-feature-icon cf-feature-icon-${index + 1}`}>
                <Icon size={21} strokeWidth={1.8} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cf-bottom-cta" id="about">
        <div className="cf-cta-sparkle" aria-hidden="true">
          <Sparkles size={24} />
        </div>
        <span className="cf-eyebrow">Your palette, your rules</span>
        <h2>Good design starts with a feeling.</h2>
        <p>Find the colors that bring your next idea to life.</p>
        <Link className="cf-button cf-button-primary" to="/editor">
          Build your theme <ArrowRight size={17} />
        </Link>
      </section>

      <footer className="cf-footer">
        <Brand />
        <p>Made for curious minds and colorful ideas.</p>
        <span>© {new Date().getFullYear()} ColorForge</span>
      </footer>
    </main>
  );
}

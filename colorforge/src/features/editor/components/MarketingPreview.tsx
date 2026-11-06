import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Layers3,
  LockKeyhole,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Layers3,
    title: "One workspace, everything",
    description:
      "Bring your team's projects, tasks, and resources together in one clear workspace.",
  },
  {
    icon: Zap,
    title: "Move faster, together",
    description:
      "Reduce busywork with streamlined workflows that keep everyone moving forward.",
  },
  {
    icon: LockKeyhole,
    title: "Your work stays secure",
    description:
      "Keep your team's information protected with thoughtful access controls.",
  },
];

const testimonials = [
  {
    quote:
      "We finally have a workspace that feels as organized as the way our team thinks.",
    name: "Sarah Chen",
    role: "Product Lead",
    initials: "SC",
  },
  {
    quote:
      "The clarity it brings to our projects has made collaboration so much easier.",
    name: "Marcus Lee",
    role: "Design Director",
    initials: "ML",
  },
  {
    quote:
      "Simple to use, thoughtfully designed, and genuinely useful every day.",
    name: "Emily Carter",
    role: "Founder",
    initials: "EC",
  },
];

const plans = [
  {
    name: "Starter",
    description: "For individuals and small teams getting started.",
    price: "$0",
    period: "forever",
    features: ["Up to 3 projects", "Basic collaboration", "Community support"],
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For teams ready to do their best work.",
    price: "$12",
    period: "per user / month",
    features: [
      "Unlimited projects",
      "Advanced workflows",
      "Priority support",
      "Team analytics",
    ],
    highlighted: true,
  },
];

export default function MarketingPreview() {
  return (
    <div
      className="overflow-hidden rounded-lg"
      style={{
        backgroundColor: "var(--cf-background)",
        color: "var(--cf-foreground)",
      }}
    >
      {/* Navigation */}
      <header
        className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-4 sm:px-7"
        style={{ borderColor: "var(--cf-border)" }}
      >
        <a href="#marketing-home" className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor: "var(--cf-primary)",
              color: "var(--cf-primary-foreground)",
            }}
          >
            <Layers3 size={16} />
          </span>
          <span className="text-sm font-bold tracking-tight">Nexus</span>
        </a>

        <nav
          className="hidden items-center gap-6 text-xs md:flex"
          style={{ color: "var(--cf-muted-foreground)" }}
          aria-label="Marketing navigation"
        >
          <a href="#features" className="transition-colors hover:opacity-70">
            Features
          </a>
          <a href="#stories" className="transition-colors hover:opacity-70">
            Stories
          </a>
          <a href="#pricing" className="transition-colors hover:opacity-70">
            Pricing
          </a>
        </nav>

        <a
          href="#pricing"
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold"
          style={{
            backgroundColor: "var(--cf-primary)",
            color: "var(--cf-primary-foreground)",
          }}
        >
          Get started
          <ArrowUpRight size={13} />
        </a>
      </header>

      {/* Hero */}
      <section
        id="marketing-home"
        className="relative overflow-hidden px-5 py-16 text-center sm:px-10 sm:py-20"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: "var(--cf-primary)" }}
        />

        <div className="relative mx-auto max-w-2xl">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-medium"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-secondary)",
              color: "var(--cf-muted-foreground)",
            }}
          >
            <Sparkles size={12} style={{ color: "var(--cf-primary)" }} />A
            better way to work together
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Make room for
            <span style={{ color: "var(--cf-primary)" }}> great work.</span>
          </h1>

          <p
            className="mx-auto mt-5 max-w-lg text-sm leading-7 sm:text-base"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            A thoughtfully designed workspace that brings your projects, people,
            and ideas together. Less busywork, more meaningful progress.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-semibold"
              style={{
                backgroundColor: "var(--cf-primary)",
                color: "var(--cf-primary-foreground)",
              }}
            >
              Start building
              <ArrowRight size={14} />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-xs font-semibold"
              style={{
                borderColor: "var(--cf-border)",
                backgroundColor: "var(--cf-background)",
              }}
            >
              Explore features
              <ChevronRight size={14} />
            </a>
          </div>

          <p
            className="mt-4 text-[10px]"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            No credit card required · Free plan available
          </p>
        </div>

        {/* Product preview */}
        <div
          className="relative mx-auto mt-12 max-w-2xl overflow-hidden rounded-xl border p-3 text-left shadow-xl sm:p-5"
          style={{
            borderColor: "var(--cf-border)",
            backgroundColor: "var(--cf-secondary)",
          }}
        >
          <div
            className="flex items-center justify-between border-b pb-3"
            style={{ borderColor: "var(--cf-border)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--cf-primary)" }}
              />
              <span className="text-[10px] font-semibold">
                Workspace overview
              </span>
            </div>
            <span
              className="text-[9px]"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Updated just now
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-4">
            {[
              { label: "Active projects", value: "12" },
              { label: "Tasks completed", value: "84%" },
              { label: "Team members", value: "08" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border p-2.5 sm:p-3"
                style={{
                  borderColor: "var(--cf-border)",
                  backgroundColor: "var(--cf-background)",
                }}
              >
                <p
                  className="text-[8px] sm:text-[10px]"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-bold sm:text-2xl">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-lg border p-3 sm:p-4"
            style={{
              borderColor: "var(--cf-border)",
              backgroundColor: "var(--cf-background)",
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold">Project progress</p>
                <p
                  className="mt-1 text-[9px]"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  Your team's weekly activity
                </p>
              </div>
              <span
                className="rounded-md px-2 py-1 text-[9px] font-medium"
                style={{
                  backgroundColor: "var(--cf-muted)",
                  color: "var(--cf-primary)",
                }}
              >
                This week
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { name: "Website redesign", progress: "82%" },
                { name: "Mobile experience", progress: "64%" },
                { name: "Brand identity", progress: "91%" },
              ].map((project) => (
                <div key={project.name}>
                  <div className="mb-1.5 flex justify-between text-[9px]">
                    <span>{project.name}</span>
                    <span style={{ color: "var(--cf-muted-foreground)" }}>
                      {project.progress}
                    </span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full"
                    style={{ backgroundColor: "var(--cf-muted)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: project.progress,
                        backgroundColor: "var(--cf-primary)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section
        id="features"
        className="border-y px-5 py-14 sm:px-8 sm:py-16"
        style={{
          borderColor: "var(--cf-border)",
          backgroundColor: "var(--cf-secondary)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto max-w-lg text-center">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--cf-primary)" }}
            >
              Built for better work
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Everything your team needs to move forward
            </h2>
            <p
              className="mt-3 text-xs leading-6"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Keep your work organized and your team focused with tools that
              make sense.
            </p>
          </div>

          <div className="mt-9 grid gap-3 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-xl border p-4"
                style={{
                  borderColor: "var(--cf-border)",
                  backgroundColor: "var(--cf-background)",
                }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: "var(--cf-muted)",
                    color: "var(--cf-primary)",
                  }}
                >
                  <Icon size={17} />
                </span>
                <h3 className="mt-4 text-xs font-semibold">{title}</h3>
                <p
                  className="mt-2 text-[10px] leading-5"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--cf-primary)" }}
            >
              From our community
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              Teams love working this way
            </h2>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="flex flex-col rounded-xl border p-4"
                style={{ borderColor: "var(--cf-border)" }}
              >
                <div
                  className="flex gap-1 text-xs"
                  style={{ color: "var(--cf-primary)" }}
                  aria-label="Five out of five stars"
                >
                  {"★★★★★"}
                </div>
                <p className="mt-3 flex-1 text-[11px] leading-6">
                  “{item.quote}”
                </p>
                <div
                  className="mt-5 flex items-center gap-2.5 border-t pt-3"
                  style={{ borderColor: "var(--cf-border)" }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-semibold"
                    style={{
                      backgroundColor: "var(--cf-accent)",
                      color: "var(--cf-accent-foreground)",
                    }}
                  >
                    {item.initials}
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold">{item.name}</p>
                    <p
                      className="mt-0.5 text-[9px]"
                      style={{ color: "var(--cf-muted-foreground)" }}
                    >
                      {item.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="border-y px-5 py-14 sm:px-8 sm:py-16"
        style={{
          borderColor: "var(--cf-border)",
          backgroundColor: "var(--cf-secondary)",
        }}
      >
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--cf-primary)" }}
            >
              Simple pricing
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              Start free. Grow at your pace.
            </h2>
            <p
              className="mt-3 text-xs"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Choose the plan that works for your team.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className="relative rounded-xl border p-5"
                style={{
                  borderColor: plan.highlighted
                    ? "var(--cf-primary)"
                    : "var(--cf-border)",
                  backgroundColor: "var(--cf-background)",
                }}
              >
                {plan.highlighted && (
                  <span
                    className="absolute right-4 top-4 rounded-full px-2 py-1 text-[8px] font-semibold"
                    style={{
                      backgroundColor: "var(--cf-primary)",
                      color: "var(--cf-primary-foreground)",
                    }}
                  >
                    Popular
                  </span>
                )}

                <h3 className="text-sm font-semibold">{plan.name}</h3>
                <p
                  className="mt-1 max-w-48 text-[10px] leading-5"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  {plan.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span
                    className="text-[9px]"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    {plan.period}
                  </span>
                </div>

                <div
                  className="mt-5 h-px"
                  style={{ backgroundColor: "var(--cf-border)" }}
                />

                <ul className="mt-5 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[10px]"
                    >
                      <Check size={13} style={{ color: "var(--cf-primary)" }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#marketing-home"
                  className="mt-6 flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[10px] font-semibold"
                  style={{
                    borderColor: plan.highlighted
                      ? "var(--cf-primary)"
                      : "var(--cf-border)",
                    backgroundColor: plan.highlighted
                      ? "var(--cf-primary)"
                      : "transparent",
                    color: plan.highlighted
                      ? "var(--cf-primary-foreground)"
                      : "var(--cf-foreground)",
                  }}
                >
                  Choose {plan.name}
                  <ArrowRight size={12} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 py-14 text-center sm:py-16">
        <div className="mx-auto max-w-xl">
          <span
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "var(--cf-muted)",
              color: "var(--cf-primary)",
            }}
          >
            <Palette size={19} />
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">
            Your next great idea starts here.
          </h2>
          <p
            className="mx-auto mt-3 max-w-md text-xs leading-6"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Bring your team together, find your flow, and make meaningful
            progress every day.
          </p>
          <a
            href="#marketing-home"
            className="mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-semibold"
            style={{
              backgroundColor: "var(--cf-primary)",
              color: "var(--cf-primary-foreground)",
            }}
          >
            Get started today
            <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="flex flex-wrap items-center justify-between gap-3 border-t px-5 py-5 sm:px-7"
        style={{
          borderColor: "var(--cf-border)",
          backgroundColor: "var(--cf-secondary)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-md"
            style={{
              backgroundColor: "var(--cf-primary)",
              color: "var(--cf-primary-foreground)",
            }}
          >
            <Layers3 size={12} />
          </span>
          <span className="text-xs font-bold">Nexus</span>
        </div>
        <p
          className="text-[9px]"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          © 2026 Nexus. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

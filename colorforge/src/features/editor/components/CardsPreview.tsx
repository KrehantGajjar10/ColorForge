import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Flame,
  Footprints,
  MoreHorizontal,
  Plus,
  Target,
} from "lucide-react";

import type { Palette } from "../../../types";

interface CardsPreviewProps {
  palette: Palette;
}

const calendarDays = [
  ...Array.from({ length: 6 }, (_, index) => ({
    day: 25 + index,
    muted: true,
  })),
  ...Array.from({ length: 30 }, (_, index) => ({
    day: index + 1,
    muted: false,
  })),
  ...Array.from({ length: 6 }, (_, index) => ({
    day: index + 1,
    muted: true,
  })),
];

const revenuePoints =
  "0,44 12,39 24,42 36,29 48,34 60,22 72,27 84,14 96,19 108,8 120,13 132,3";

const subscriptionPoints =
  "0,38 12,32 24,35 36,22 48,29 60,18 72,23 84,12 96,16 108,7 120,10 132,2";

function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`min-w-0 overflow-hidden rounded-xl border p-4 shadow-sm transition-colors duration-300 sm:p-5 ${className}`}
      style={{
        backgroundColor: "var(--cf-card)",
        borderColor: "var(--cf-border)",
        color: "var(--cf-card-foreground)",
      }}
    >
      {children}
    </article>
  );
}

function CardHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && (
          <p
            className="mt-1 text-xs leading-relaxed"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function MiniChart({
  points,
  color = "var(--cf-primary)",
}: {
  points: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 132 48"
      preserveAspectRatio="none"
      className="h-12 w-full overflow-visible"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function RevenueCard() {
  return (
    <CardShell>
      <CardHeading
        title="Total Revenue"
        action={
          <span
            className="rounded-md p-2"
            style={{
              backgroundColor: "var(--cf-secondary)",
              color: "var(--cf-muted-foreground)",
            }}
          >
            <MoreHorizontal size={17} />
          </span>
        }
      />

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold tracking-tight sm:text-3xl">
            $15,231.89
          </p>
          <p
            className="mt-2 flex items-center gap-1 text-xs font-medium"
            style={{ color: "var(--cf-chart-2)" }}
          >
            <ArrowUpRight size={14} />
            +20.1% from last month
          </p>
        </div>
        <div className="w-24 shrink-0 sm:w-28">
          <MiniChart points={revenuePoints} />
        </div>
      </div>

      <div
        className="mt-5 flex items-center justify-between border-t pt-3 text-xs"
        style={{
          borderColor: "var(--cf-border)",
          color: "var(--cf-muted-foreground)",
        }}
      >
        <span>Monthly revenue</span>
        <span>Last 30 days</span>
      </div>
    </CardShell>
  );
}

function SubscriptionsCard() {
  return (
    <CardShell>
      <CardHeading
        title="Subscriptions"
        action={
          <span
            className="rounded-md p-2"
            style={{
              backgroundColor: "var(--cf-secondary)",
              color: "var(--cf-muted-foreground)",
            }}
          >
            <MoreHorizontal size={17} />
          </span>
        }
      />

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-2xl font-bold tracking-tight sm:text-3xl">
            +2,350
          </p>
          <p
            className="mt-2 flex items-center gap-1 text-xs font-medium"
            style={{ color: "var(--cf-chart-2)" }}
          >
            <ArrowUpRight size={14} />
            +180.1% from last month
          </p>
        </div>
        <div className="w-24 shrink-0 sm:w-28">
          <MiniChart points={subscriptionPoints} color="var(--cf-chart-2)" />
        </div>
      </div>

      <div
        className="mt-5 flex items-center justify-between border-t pt-3 text-xs"
        style={{
          borderColor: "var(--cf-border)",
          color: "var(--cf-muted-foreground)",
        }}
      >
        <span>Active subscriptions</span>
        <span>Last 30 days</span>
      </div>
    </CardShell>
  );
}

function CalendarCard() {
  const [selectedDay, setSelectedDay] = useState(17);

  return (
    <CardShell>
      <CardHeading
        title="Calendar"
        action={
          <CalendarDays
            size={17}
            style={{ color: "var(--cf-muted-foreground)" }}
          />
        }
      />

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-semibold">June 2025</p>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Previous month"
            className="rounded-md px-2 py-1 text-xs transition-colors hover:bg-(--cf-secondary)"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next month"
            className="rounded-md px-2 py-1 text-xs transition-colors hover:bg-(--cf-secondary)"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-y-2 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <span
            key={day}
            className="pb-2 text-[10px] font-medium"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            {day}
          </span>
        ))}

        {calendarDays.map(({ day, muted }, index) => {
          const active = !muted && day === selectedDay;

          return (
            <button
              key={`${day}-${index}`}
              type="button"
              disabled={muted}
              onClick={() => setSelectedDay(day)}
              className="mx-auto flex aspect-square w-full max-w-8 items-center justify-center rounded-md text-xs transition-colors"
              style={{
                backgroundColor: active ? "var(--cf-primary)" : "transparent",
                color: active
                  ? "var(--cf-primary-foreground)"
                  : muted
                    ? "var(--cf-muted-foreground)"
                    : "var(--cf-foreground)",
                opacity: muted ? 0.35 : 1,
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </CardShell>
  );
}

function MoveGoalCard() {
  const [goal, setGoal] = useState(350);

  return (
    <CardShell>
      <CardHeading
        title="Move Goal"
        description="Set your daily activity goal."
        action={
          <span
            className="rounded-md p-2"
            style={{
              backgroundColor: "var(--cf-secondary)",
              color: "var(--cf-muted-foreground)",
            }}
          >
            <Target size={17} />
          </span>
        }
      />

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => setGoal((value) => Math.max(50, value - 50))}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors hover:bg-(--cf-secondary)"
          style={{ borderColor: "var(--cf-border)" }}
          aria-label="Decrease goal"
        >
          <ArrowDownRight size={16} />
        </button>

        <div className="text-center">
          <p className="text-4xl font-bold tracking-tight tabular-nums">
            {goal}
          </p>
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Calories/day
          </p>
        </div>

        <button
          type="button"
          onClick={() => setGoal((value) => Math.min(1000, value + 50))}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors hover:bg-(--cf-secondary)"
          style={{ borderColor: "var(--cf-border)" }}
          aria-label="Increase goal"
        >
          <Plus size={16} />
        </button>
      </div>

      <div
        className="mt-6 rounded-lg p-3"
        style={{ backgroundColor: "var(--cf-secondary)" }}
      >
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: "var(--cf-muted-foreground)" }}>
            Daily progress
          </span>
          <span className="font-semibold">72%</span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--cf-border)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: "72%",
              backgroundColor: "var(--cf-primary)",
            }}
          />
        </div>
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-lg px-4 py-2.5 text-xs font-semibold transition-opacity hover:opacity-85"
        style={{
          backgroundColor: "var(--cf-primary)",
          color: "var(--cf-primary-foreground)",
        }}
      >
        Set Goal
      </button>
    </CardShell>
  );
}

function ExerciseMinutesCard() {
  const bars = [34, 52, 42, 68, 48, 82, 61, 74, 55, 92, 68, 100];

  return (
    <CardShell>
      <CardHeading
        title="Exercise Minutes"
        description="Your exercise minutes are ahead of where you normally are."
        action={
          <span
            className="rounded-md p-2"
            style={{
              backgroundColor: "var(--cf-secondary)",
              color: "var(--cf-muted-foreground)",
            }}
          >
            <Footprints size={17} />
          </span>
        }
      />

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-3xl font-bold tracking-tight">128 min</p>
          <p
            className="mt-2 flex items-center gap-1 text-xs font-medium"
            style={{ color: "var(--cf-chart-2)" }}
          >
            <ArrowUpRight size={14} />
            +12.5% this week
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs"
          style={{
            backgroundColor: "var(--cf-secondary)",
            color: "var(--cf-muted-foreground)",
          }}
        >
          <Flame size={13} />
          Weekly activity
        </div>
      </div>

      <div className="mt-6 flex h-28 items-end gap-1.5 sm:gap-2">
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex h-full flex-1 items-end"
            title={`${height} minutes`}
          >
            <div
              className="w-full rounded-t-sm transition-all"
              style={{
                height: `${height}%`,
                backgroundColor:
                  index === bars.length - 1
                    ? "var(--cf-primary)"
                    : "var(--cf-secondary)",
                border: "1px solid var(--cf-border)",
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="mt-3 flex justify-between border-t pt-3 text-[10px]"
        style={{
          borderColor: "var(--cf-border)",
          color: "var(--cf-muted-foreground)",
        }}
      >
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </CardShell>
  );
}

export default function CardsPreview({ palette }: CardsPreviewProps) {
  return (
    <section className="@container min-w-0 space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Component showcase
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight">Cards</h2>
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Explore different components with the {palette.name} theme.
          </p>
        </div>

        <span
          className="rounded-full border px-3 py-1.5 text-[10px] font-medium"
          style={{
            borderColor: "var(--cf-border)",
            color: "var(--cf-muted-foreground)",
          }}
        >
          Live theme preview
        </span>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 @md:grid-cols-2 @lg:grid-cols-12">
        <div className="min-w-0 @lg:col-span-4">
          <RevenueCard />
        </div>

        <div className="min-w-0 @lg:col-span-4">
          <SubscriptionsCard />
        </div>

        <div className="min-w-0 @lg:col-span-4">
          <CalendarCard />
        </div>

        <div className="min-w-0 @lg:col-span-4">
          <MoveGoalCard />
        </div>

        <div className="min-w-0 @md:col-span-2 @lg:col-span-8">
          <ExerciseMinutesCard />
        </div>
      </div>
    </section>
  );
}

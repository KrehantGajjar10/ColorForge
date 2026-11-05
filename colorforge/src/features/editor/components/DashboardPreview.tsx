import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  CreditCard,
  Download,
  LayoutDashboard,
  MoreHorizontal,
  Search,
  Settings2,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";

const stats = [
  {
    label: "Total revenue",
    value: "$48,294",
    change: "+12.8%",
    positive: true,
    icon: Wallet,
  },
  {
    label: "Total customers",
    value: "2,420",
    change: "+8.2%",
    positive: true,
    icon: Users,
  },
  {
    label: "Total orders",
    value: "1,284",
    change: "+4.6%",
    positive: true,
    icon: ShoppingBag,
  },
  {
    label: "Refund rate",
    value: "2.4%",
    change: "-1.2%",
    positive: true,
    icon: Activity,
  },
];

const activities = [
  {
    name: "Olivia Martin",
    email: "olivia@example.com",
    amount: "+$1,999.00",
    status: "Completed",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson@example.com",
    amount: "+$249.00",
    status: "Pending",
    initials: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    amount: "+$399.00",
    status: "Completed",
    initials: "IN",
  },
  {
    name: "William Kim",
    email: "william@example.com",
    amount: "+$129.00",
    status: "Failed",
    initials: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia@example.com",
    amount: "+$899.00",
    status: "Completed",
    initials: "SD",
  },
];

const chartBars = [34, 48, 40, 62, 52, 76, 58, 68, 46, 82, 65, 91];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function DashboardPreview() {
  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{
        backgroundColor: "var(--cf-background)",
        borderColor: "var(--cf-border)",
        color: "var(--cf-foreground)",
      }}
    >
      <div className="flex min-h-145">
        {/* Dashboard sidebar */}
        <aside
          className="hidden w-52 shrink-0 flex-col border-r p-4 sm:flex"
          style={{
            backgroundColor: "var(--cf-secondary)",
            borderColor: "var(--cf-border)",
          }}
        >
          <div className="flex items-center gap-2 px-1">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "var(--cf-primary)",
                color: "var(--cf-primary-foreground)",
              }}
            >
              <LayoutDashboard size={16} />
            </div>
            <span className="text-sm font-semibold">Acme Studio</span>
          </div>

          <p
            className="mb-2 mt-8 px-2 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Workspace
          </p>

          <nav className="space-y-1" aria-label="Dashboard navigation">
            {[
              { label: "Overview", icon: LayoutDashboard, active: true },
              { label: "Analytics", icon: Activity, active: false },
              { label: "Customers", icon: Users, active: false },
              { label: "Orders", icon: ShoppingBag, active: false },
              { label: "Payments", icon: CreditCard, active: false },
            ].map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                type="button"
                aria-current={active ? "page" : undefined}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: active ? "var(--cf-primary)" : "transparent",
                  color: active
                    ? "var(--cf-primary-foreground)"
                    : "var(--cf-muted-foreground)",
                }}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-1 pt-8">
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              <Settings2 size={15} />
              Settings
            </button>
            <div
              className="mt-3 flex items-center gap-2 border-t pt-4"
              style={{ borderColor: "var(--cf-border)" }}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-semibold"
                style={{
                  backgroundColor: "var(--cf-accent)",
                  color: "var(--cf-accent-foreground)",
                }}
              >
                JD
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">John Doe</p>
                <p
                  className="truncate text-[10px]"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  john@example.com
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main dashboard */}
        <main className="min-w-0 flex-1 p-3 sm:p-5">
          {/* Header */}
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">Dashboard</h2>
              <p
                className="mt-1 text-[11px]"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                Welcome back, John. Here's your overview.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Search dashboard"
                className="flex h-8 w-8 items-center justify-center rounded-lg border"
                style={{ borderColor: "var(--cf-border)" }}
              >
                <Search size={14} />
              </button>
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-8 w-8 items-center justify-center rounded-lg border"
                style={{ borderColor: "var(--cf-border)" }}
              >
                <Bell size={14} />
                <span
                  className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "var(--cf-primary)" }}
                />
              </button>
              <button
                type="button"
                className="flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-[10px] font-medium"
                style={{ borderColor: "var(--cf-border)" }}
              >
                <CalendarDays size={12} />
                Last 30 days
                <ChevronDown size={12} />
              </button>
            </div>
          </header>

          {/* Statistics */}
          <section
            className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4"
            aria-label="Key statistics"
          >
            {stats.map(({ label, value, change, positive, icon: Icon }) => (
              <article
                key={label}
                className="min-w-0 rounded-lg border p-3 sm:p-4"
                style={{ borderColor: "var(--cf-border)" }}
              >
                <div className="flex items-center justify-between gap-2">
                  <p
                    className="truncate text-[10px] sm:text-xs"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    {label}
                  </p>
                  <Icon
                    size={15}
                    style={{ color: "var(--cf-muted-foreground)" }}
                  />
                </div>
                <p className="mt-3 text-lg font-semibold tracking-tight sm:text-2xl">
                  {value}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[10px]">
                  {positive ? (
                    <ArrowUpRight
                      size={12}
                      style={{ color: "var(--cf-primary)" }}
                    />
                  ) : (
                    <ArrowDownRight
                      size={12}
                      style={{ color: "var(--cf-primary)" }}
                    />
                  )}
                  <span
                    className="font-medium"
                    style={{ color: "var(--cf-primary)" }}
                  >
                    {change}
                  </span>
                  <span style={{ color: "var(--cf-muted-foreground)" }}>
                    vs last month
                  </span>
                </div>
              </article>
            ))}
          </section>

          {/* Analytics chart */}
          <section
            className="mt-4 rounded-lg border p-3 sm:p-4"
            style={{ borderColor: "var(--cf-border)" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-semibold sm:text-sm">
                  Revenue overview
                </h3>
                <p
                  className="mt-1 text-[10px]"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  Monthly revenue performance
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 rounded-md border px-2 py-1.5 text-[10px]"
                style={{ borderColor: "var(--cf-border)" }}
              >
                This year
                <ChevronDown size={11} />
              </button>
            </div>

            <div className="mt-5 flex h-36 gap-3">
              <div
                className="flex flex-col justify-between pb-5 text-[9px]"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                <span>$10k</span>
                <span>$7.5k</span>
                <span>$5k</span>
                <span>$2.5k</span>
                <span>$0</span>
              </div>

              <div className="relative flex min-w-0 flex-1 flex-col">
                <div className="absolute inset-0 flex flex-col justify-between pb-5">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div
                      key={line}
                      className="border-t border-dashed"
                      style={{ borderColor: "var(--cf-border)" }}
                    />
                  ))}
                </div>

                <div className="relative z-10 flex min-h-0 flex-1 items-end justify-around gap-1 px-1 pb-5">
                  {chartBars.map((height, index) => (
                    <div
                      key={index}
                      className="group relative flex h-full flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-sm transition-opacity group-hover:opacity-75"
                        style={{
                          height: `${height}%`,
                          backgroundColor:
                            index === 9
                              ? "var(--cf-primary)"
                              : "var(--cf-accent)",
                          opacity: index === 9 ? 1 : 0.7,
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 flex justify-around text-[9px]"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  {months.map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Recent activity */}
          <section
            className="mt-4 overflow-hidden rounded-lg border"
            style={{ borderColor: "var(--cf-border)" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4">
              <div>
                <h3 className="text-xs font-semibold sm:text-sm">
                  Recent transactions
                </h3>
                <p
                  className="mt-1 text-[10px]"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  Latest activity from your store
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 text-[10px] font-medium"
                style={{ color: "var(--cf-primary)" }}
              >
                <Download size={12} />
                Export
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-105 text-left text-[10px]">
                <thead>
                  <tr
                    className="border-y"
                    style={{
                      backgroundColor: "var(--cf-secondary)",
                      borderColor: "var(--cf-border)",
                      color: "var(--cf-muted-foreground)",
                    }}
                  >
                    <th className="px-3 py-2.5 font-medium sm:px-4">
                      Customer
                    </th>
                    <th className="px-3 py-2.5 font-medium">Status</th>
                    <th className="px-3 py-2.5 text-right font-medium sm:px-4">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr
                      key={activity.email}
                      className="border-b last:border-0"
                      style={{ borderColor: "var(--cf-border)" }}
                    >
                      <td className="px-3 py-3 sm:px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold"
                            style={{
                              backgroundColor: "var(--cf-muted)",
                              color: "var(--cf-foreground)",
                            }}
                          >
                            {activity.initials}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {activity.name}
                            </p>
                            <p
                              className="truncate text-[9px]"
                              style={{ color: "var(--cf-muted-foreground)" }}
                            >
                              {activity.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className="rounded-full px-2 py-1 text-[9px] font-medium"
                          style={{
                            backgroundColor:
                              activity.status === "Completed"
                                ? "var(--cf-accent)"
                                : "var(--cf-muted)",
                            color:
                              activity.status === "Completed"
                                ? "var(--cf-accent-foreground)"
                                : "var(--cf-muted-foreground)",
                          }}
                        >
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right font-semibold sm:px-4">
                        {activity.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="flex items-center justify-between px-3 py-3 text-[10px] sm:px-4"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              <span>Showing 5 of 20 transactions</span>
              <button
                type="button"
                className="flex items-center gap-1"
                style={{ color: "var(--cf-foreground)" }}
              >
                View all
                <MoreHorizontal size={13} />
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

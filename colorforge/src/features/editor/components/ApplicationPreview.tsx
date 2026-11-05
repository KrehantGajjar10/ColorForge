import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  LayoutGrid,
  ListTodo,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Users,
} from "lucide-react";

const projects = [
  { name: "Website Redesign", color: "#d97757", active: true },
  { name: "Mobile Application", color: "#8b7bd8", active: false },
  { name: "Brand Identity", color: "#4f9d83", active: false },
];

const columns = [
  {
    title: "To do",
    count: 3,
    tasks: [
      {
        title: "Research competitor websites",
        project: "Website Redesign",
        priority: "High",
        due: "Nov 08",
        initials: ["JD", "AM"],
      },
      {
        title: "Create wireframe concepts",
        project: "Website Redesign",
        priority: "Medium",
        due: "Nov 10",
        initials: ["SK"],
      },
      {
        title: "Review brand guidelines",
        project: "Brand Identity",
        priority: "Low",
        due: "Nov 12",
        initials: ["AM"],
      },
    ],
  },
  {
    title: "In progress",
    count: 2,
    tasks: [
      {
        title: "Design homepage layout",
        project: "Website Redesign",
        priority: "High",
        due: "Nov 06",
        initials: ["JD", "SK"],
      },
      {
        title: "Build onboarding screens",
        project: "Mobile Application",
        priority: "Medium",
        due: "Nov 09",
        initials: ["AM"],
      },
    ],
  },
  {
    title: "Completed",
    count: 2,
    tasks: [
      {
        title: "Set up project workspace",
        project: "Website Redesign",
        priority: "Low",
        due: "Nov 02",
        initials: ["JD"],
      },
      {
        title: "Define project scope",
        project: "Mobile Application",
        priority: "Medium",
        due: "Nov 03",
        initials: ["SK", "AM"],
      },
    ],
  },
];

const team = [
  { initials: "JD", name: "John Doe" },
  { initials: "AM", name: "Anna Miller" },
  { initials: "SK", name: "Sarah Kim" },
];

function TaskCard({
  task,
}: {
  task: (typeof columns)[number]["tasks"][number];
}) {
  const priorityColor =
    task.priority === "High"
      ? "#d97757"
      : task.priority === "Medium"
        ? "#c49a48"
        : "#4f9d83";

  return (
    <article
      className="rounded-lg border p-3"
      style={{
        backgroundColor: "var(--cf-background)",
        borderColor: "var(--cf-border)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium leading-5">{task.title}</p>
        <MoreHorizontal
          size={15}
          className="shrink-0"
          style={{ color: "var(--cf-muted-foreground)" }}
        />
      </div>

      <p
        className="mt-2 text-[10px]"
        style={{ color: "var(--cf-muted-foreground)" }}
      >
        {task.project}
      </p>

      <div
        className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3"
        style={{ borderColor: "var(--cf-border)" }}
      >
        <span
          className="rounded-md px-2 py-1 text-[9px] font-medium"
          style={{
            backgroundColor: `${priorityColor}18`,
            color: priorityColor,
          }}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-1 text-[9px]">
          <CalendarDays
            size={11}
            style={{ color: "var(--cf-muted-foreground)" }}
          />
          <span style={{ color: "var(--cf-muted-foreground)" }}>
            {task.due}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center">
        {task.initials.map((initial, index) => (
          <span
            key={initial}
            className="flex h-6 w-6 items-center justify-center rounded-full border text-[8px] font-semibold"
            style={{
              marginLeft: index === 0 ? 0 : -5,
              borderColor: "var(--cf-background)",
              backgroundColor:
                index % 2 === 0 ? "var(--cf-accent)" : "var(--cf-muted)",
              color:
                index % 2 === 0
                  ? "var(--cf-accent-foreground)"
                  : "var(--cf-foreground)",
            }}
          >
            {initial}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function ApplicationPreview() {
  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{
        backgroundColor: "var(--cf-background)",
        borderColor: "var(--cf-border)",
        color: "var(--cf-foreground)",
      }}
    >
      <div className="flex min-h-150">
        {/* Application sidebar */}
        <aside
          className="hidden w-52 shrink-0 flex-col border-r p-4 md:flex"
          style={{
            backgroundColor: "var(--cf-secondary)",
            borderColor: "var(--cf-border)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                backgroundColor: "var(--cf-primary)",
                color: "var(--cf-primary-foreground)",
              }}
            >
              <LayoutGrid size={16} />
            </div>
            <span className="text-sm font-semibold">Flowspace</span>
          </div>

          <div
            className="mt-7 rounded-lg border p-2.5"
            style={{
              backgroundColor: "var(--cf-background)",
              borderColor: "var(--cf-border)",
            }}
          >
            <p
              className="text-[9px] font-medium uppercase tracking-wider"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Workspace
            </p>
            <p className="mt-1 text-xs font-semibold">Studio Workspace</p>
          </div>

          <p
            className="mb-2 mt-7 px-2 text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Menu
          </p>

          <nav className="space-y-1" aria-label="Application navigation">
            <div
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium"
              style={{
                backgroundColor: "var(--cf-primary)",
                color: "var(--cf-primary-foreground)",
              }}
            >
              <LayoutGrid size={14} />
              Overview
            </div>
            <div
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              <ListTodo size={14} />
              My tasks
            </div>
            <div
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              <CalendarDays size={14} />
              Calendar
            </div>
            <div
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              <Users size={14} />
              Team members
            </div>
          </nav>

          <div className="mt-8 flex items-center justify-between px-2">
            <p
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              Projects
            </p>
            <Plus size={13} style={{ color: "var(--cf-muted-foreground)" }} />
          </div>

          <div className="mt-2 space-y-1">
            {projects.map((project) => (
              <div
                key={project.name}
                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px]"
                style={{
                  backgroundColor: project.active
                    ? "var(--cf-muted)"
                    : "transparent",
                  color: project.active
                    ? "var(--cf-foreground)"
                    : "var(--cf-muted-foreground)",
                }}
              >
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{ backgroundColor: project.color }}
                />
                <span className="truncate">{project.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-1 pt-8">
            <div
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs"
              style={{ color: "var(--cf-muted-foreground)" }}
            >
              <Settings2 size={14} />
              Settings
            </div>
            <div
              className="flex items-center gap-2 border-t pt-4"
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
                  className="text-[10px]"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  Free plan
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main application */}
        <main className="min-w-0 flex-1 p-3 sm:p-5">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div
                className="mb-1 flex items-center gap-1 text-[10px]"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                Projects
                <span>/</span>
                <span style={{ color: "var(--cf-foreground)" }}>
                  Website Redesign
                </span>
              </div>
              <h2 className="text-base font-semibold">Website Redesign</h2>
              <p
                className="mt-1 text-[10px]"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                Manage tasks and collaborate with your team.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {team.map((member, index) => (
                  <span
                    key={member.initials}
                    title={member.name}
                    className="flex h-7 w-7 items-center justify-center rounded-full border text-[9px] font-semibold"
                    style={{
                      borderColor: "var(--cf-background)",
                      backgroundColor:
                        index === 1 ? "var(--cf-muted)" : "var(--cf-accent)",
                      color:
                        index === 1
                          ? "var(--cf-foreground)"
                          : "var(--cf-accent-foreground)",
                    }}
                  >
                    {member.initials}
                  </span>
                ))}
              </div>
              <div
                className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[10px] font-medium"
                style={{
                  backgroundColor: "var(--cf-primary)",
                  color: "var(--cf-primary-foreground)",
                }}
              >
                <Plus size={12} />
                Invite
              </div>
            </div>
          </header>

          {/* Project summary */}
          <section
            className="mt-5 grid grid-cols-3 gap-2 sm:gap-3"
            aria-label="Project summary"
          >
            {[
              { label: "Total tasks", value: "24", icon: ListTodo },
              { label: "Completed", value: "16", icon: CheckCircle2 },
              { label: "In progress", value: "5", icon: Clock3 },
            ].map(({ label, value, icon: Icon }) => (
              <article
                key={label}
                className="rounded-lg border p-3"
                style={{ borderColor: "var(--cf-border)" }}
              >
                <div className="flex items-center gap-1.5">
                  <Icon
                    size={13}
                    style={{ color: "var(--cf-muted-foreground)" }}
                  />
                  <p
                    className="text-[9px] sm:text-[10px]"
                    style={{ color: "var(--cf-muted-foreground)" }}
                  >
                    {label}
                  </p>
                </div>
                <p className="mt-2 text-lg font-semibold">{value}</p>
              </article>
            ))}
          </section>

          {/* Board toolbar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[10px] font-medium"
                style={{
                  backgroundColor: "var(--cf-muted)",
                  color: "var(--cf-foreground)",
                }}
              >
                <LayoutGrid size={13} />
                Board
              </div>
              <div
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[10px]"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                <ListTodo size={13} />
                List
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-[10px]"
                style={{
                  borderColor: "var(--cf-border)",
                  color: "var(--cf-muted-foreground)",
                }}
              >
                <Search size={12} />
                Search tasks
              </div>
              <div
                className="flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-[10px]"
                style={{
                  borderColor: "var(--cf-border)",
                  color: "var(--cf-muted-foreground)",
                }}
              >
                <Settings2 size={12} />
                Filter
              </div>
            </div>
          </div>

          {/* Task board */}
          <section
            className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3"
            aria-label="Task board"
          >
            {columns.map((column, index) => (
              <div
                key={column.title}
                className="min-w-0 rounded-lg p-2.5"
                style={{ backgroundColor: "var(--cf-secondary)" }}
              >
                <div className="mb-3 flex items-center justify-between gap-2 px-1">
                  <div className="flex items-center gap-2">
                    {index === 0 ? (
                      <Circle
                        size={13}
                        style={{ color: "var(--cf-muted-foreground)" }}
                      />
                    ) : index === 1 ? (
                      <Clock3
                        size={13}
                        style={{ color: "var(--cf-primary)" }}
                      />
                    ) : (
                      <CheckCircle2
                        size={13}
                        style={{ color: "var(--cf-primary)" }}
                      />
                    )}
                    <h3 className="text-[11px] font-semibold">
                      {column.title}
                    </h3>
                    <span
                      className="rounded-md px-1.5 py-0.5 text-[9px]"
                      style={{
                        backgroundColor: "var(--cf-muted)",
                        color: "var(--cf-muted-foreground)",
                      }}
                    >
                      {column.count}
                    </span>
                  </div>
                  <MoreHorizontal
                    size={14}
                    style={{ color: "var(--cf-muted-foreground)" }}
                  />
                </div>

                <div className="space-y-2">
                  {column.tasks.map((task) => (
                    <TaskCard key={task.title} task={task} />
                  ))}
                </div>

                <div
                  className="mt-2 flex items-center gap-1.5 rounded-lg px-2 py-2 text-[10px]"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  <Plus size={12} />
                  Add task
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

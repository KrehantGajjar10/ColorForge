import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Crown,
  FileText,
  MessageCircle,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

function PreviewCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`min-w-0 overflow-hidden rounded-xl border p-4 shadow-sm sm:p-5 ${className}`}
      style={{
        backgroundColor: "var(--cf-card, var(--cf-background))",
        borderColor: "var(--cf-border)",
        color: "var(--cf-card-foreground, var(--cf-foreground))",
      }}
    >
      {children}
    </article>
  );
}

function CardTitle({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
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
      {icon && (
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundColor: "var(--cf-secondary)",
            color: "var(--cf-muted-foreground)",
          }}
        >
          {icon}
        </span>
      )}
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block min-w-0 space-y-1.5">
      <span className="text-xs font-medium">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full min-w-0 rounded-lg border px-3 py-2.5 text-xs outline-none transition-shadow focus:ring-2"
        style={{
          backgroundColor: "var(--cf-background)",
          borderColor: "var(--cf-border)",
          color: "var(--cf-foreground)",
          outlineColor: "var(--cf-primary)",
        }}
      />
    </label>
  );
}

function PrimaryButton({
  children,
  type = "button",
  onClick,
}: {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-opacity hover:opacity-85"
      style={{
        backgroundColor: "var(--cf-primary)",
        color: "var(--cf-primary-foreground)",
      }}
    >
      {children}
    </button>
  );
}

function UpgradeCard() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  return (
    <PreviewCard>
      <div className="flex items-center justify-between gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            backgroundColor: "var(--cf-secondary)",
            color: "var(--cf-primary)",
          }}
        >
          <Crown size={18} />
        </span>
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-medium"
          style={{
            backgroundColor: "var(--cf-secondary)",
            color: "var(--cf-muted-foreground)",
          }}
        >
          Pro plan
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold">
        Upgrade your subscription
      </h3>
      <p
        className="mt-1 text-xs leading-relaxed"
        style={{ color: "var(--cf-muted-foreground)" }}
      >
        Get more space, advanced features, and priority support.
      </p>

      <div
        className="mt-4 grid grid-cols-2 rounded-lg p-1"
        style={{ backgroundColor: "var(--cf-secondary)" }}
      >
        {(["monthly", "yearly"] as const).map((period) => (
          <button
            key={period}
            type="button"
            onClick={() => setBilling(period)}
            className="rounded-md px-2 py-2 text-xs font-medium capitalize transition-colors"
            style={{
              backgroundColor:
                billing === period ? "var(--cf-background)" : "transparent",
              color:
                billing === period
                  ? "var(--cf-foreground)"
                  : "var(--cf-muted-foreground)",
            }}
          >
            {period}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-end gap-1">
        <span className="text-3xl font-bold tracking-tight">
          {billing === "yearly" ? "$8" : "$12"}
        </span>
        <span
          className="pb-1 text-xs"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          / month
        </span>
      </div>

      {billing === "yearly" && (
        <p
          className="mt-1 text-[10px] font-medium"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          Billed annually · Save 33%
        </p>
      )}

      <ul className="mt-4 space-y-2.5 text-xs">
        {["Unlimited projects", "Advanced analytics", "Priority support"].map(
          (feature) => (
            <li key={feature} className="flex items-center gap-2">
              <CheckCircle2 size={14} style={{ color: "var(--cf-primary)" }} />
              {feature}
            </li>
          ),
        )}
      </ul>

      <PrimaryButton>
        Upgrade now <ArrowUpRight size={14} />
      </PrimaryButton>
    </PreviewCard>
  );
}

const teamMembers = [
  {
    name: "Olivia Rhye",
    email: "olivia@example.com",
    role: "Owner",
    initials: "OR",
  },
  {
    name: "Phoenix Baker",
    email: "phoenix@example.com",
    role: "Admin",
    initials: "PB",
  },
  {
    name: "Lana Steiner",
    email: "lana@example.com",
    role: "Member",
    initials: "LS",
  },
  {
    name: "Demi Wilkinson",
    email: "demi@example.com",
    role: "Member",
    initials: "DW",
  },
];

function TeamMembersCard() {
  const [showAll, setShowAll] = useState(false);
  const members = showAll ? teamMembers : teamMembers.slice(0, 3);

  return (
    <PreviewCard>
      <CardTitle
        title="Team Members"
        description="Manage the people in your workspace."
        icon={<Users size={17} />}
      />

      <div className="mt-4 space-y-3">
        {members.map((member, index) => (
          <div key={member.email} className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
              style={{
                backgroundColor: "var(--cf-secondary)",
                color: "var(--cf-foreground)",
              }}
            >
              {member.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{member.name}</p>
              <p
                className="truncate text-[10px]"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                {member.email}
              </p>
            </div>
            <span
              className="shrink-0 rounded-md px-2 py-1 text-[10px]"
              style={{
                backgroundColor: "var(--cf-secondary)",
                color: "var(--cf-muted-foreground)",
              }}
            >
              {member.role}
            </span>
            {index === 0 && <span className="sr-only">Workspace owner</span>}
          </div>
        ))}
      </div>

      <div
        className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-3"
        style={{ borderColor: "var(--cf-border)" }}
      >
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="text-xs font-medium"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          {showAll ? "Show less" : "View all members"}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold"
          style={{ color: "var(--cf-primary)" }}
        >
          <Plus size={13} /> Invite
        </button>
      </div>
    </PreviewCard>
  );
}

function CookieSettingsCard() {
  const [settings, setSettings] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    personalization: false,
  });

  const options = [
    {
      id: "necessary",
      label: "Strictly necessary",
      description: "Required for the website to function.",
      locked: true,
    },
    {
      id: "analytics",
      label: "Analytics cookies",
      description: "Help us understand how the site is used.",
    },
    {
      id: "marketing",
      label: "Marketing cookies",
      description: "Used to show relevant advertisements.",
    },
    {
      id: "personalization",
      label: "Personalization",
      description: "Remember your preferences and settings.",
    },
  ] as const;

  return (
    <PreviewCard>
      <CardTitle
        title="Cookie Settings"
        description="Manage your privacy preferences."
        icon={<ShieldCheck size={17} />}
      />

      <div className="mt-4 space-y-3">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium">{option.label}</p>
              <p
                className="mt-0.5 text-[10px] leading-relaxed"
                style={{ color: "var(--cf-muted-foreground)" }}
              >
                {option.description}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings[option.id]}
              disabled={"locked" in option && option.locked}
              onClick={() =>
                setSettings((current) => ({
                  ...current,
                  [option.id]: !current[option.id],
                }))
              }
              className="relative h-5 w-9 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed"
              style={{
                backgroundColor: settings[option.id]
                  ? "var(--cf-primary)"
                  : "var(--cf-border)",
              }}
              aria-label={`Toggle ${option.label}`}
            >
              <span
                className="absolute top-0.5 h-4 w-4 rounded-full transition-transform"
                style={{
                  backgroundColor: "var(--cf-background)",
                  transform: settings[option.id]
                    ? "translateX(18px)"
                    : "translateX(2px)",
                }}
              />
            </button>
          </div>
        ))}
      </div>

      <div
        className="mt-4 flex flex-wrap justify-end gap-2 border-t pt-3"
        style={{ borderColor: "var(--cf-border)" }}
      >
        <button
          type="button"
          onClick={() =>
            setSettings({
              necessary: true,
              analytics: false,
              marketing: false,
              personalization: false,
            })
          }
          className="rounded-lg border px-3 py-2 text-xs font-medium"
          style={{ borderColor: "var(--cf-border)" }}
        >
          Reject optional
        </button>
        <PrimaryButton
          onClick={() => {
            setSettings((current) => ({ ...current, necessary: true }));
          }}
        >
          Save preferences
        </PrimaryButton>
      </div>
    </PreviewCard>
  );
}

function CreateAccountCard() {
  const [created, setCreated] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreated(true);
  }

  return (
    <PreviewCard>
      <CardTitle
        title="Create an account"
        description="Enter your details to get started."
        icon={<Sparkles size={17} />}
      />

      {created ? (
        <div
          className="mt-5 rounded-lg p-4 text-center"
          style={{ backgroundColor: "var(--cf-secondary)" }}
        >
          <CheckCircle2
            size={24}
            className="mx-auto"
            style={{ color: "var(--cf-primary)" }}
          />
          <p className="mt-2 text-sm font-semibold">
            Account details submitted
          </p>
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            This is a preview form. No account was created.
          </p>
          <button
            type="button"
            onClick={() => setCreated(false)}
            className="mt-3 text-xs font-semibold"
            style={{ color: "var(--cf-primary)" }}
          >
            Back to form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <Field label="Full name" placeholder="Your name" />
          <Field
            label="Email address"
            placeholder="name@example.com"
            type="email"
          />
          <Field
            label="Password"
            placeholder="Create a password"
            type="password"
          />
          <PrimaryButton type="submit">Create account</PrimaryButton>
          <p
            className="text-center text-[10px]"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </form>
      )}
    </PreviewCard>
  );
}

function ChatConversationCard() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "them",
      text: "Hey! Have you had a chance to review the latest design?",
    },
    {
      from: "you",
      text: "Yes, it looks great. I have a few small suggestions.",
    },
    { from: "them", text: "Perfect! Send them over when you're ready." },
  ]);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    setMessages((current) => [...current, { from: "you", text: trimmed }]);
    setMessage("");
  }

  return (
    <PreviewCard className="flex min-h-80 flex-col">
      <div className="flex items-center justify-between gap-3">
        <CardTitle
          title="Messages"
          description="Conversation with Olivia"
          icon={<MessageCircle size={17} />}
        />
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: "var(--cf-primary)" }}
          title="Online"
        />
      </div>

      <div className="mt-4 flex-1 space-y-3">
        {messages.map((item, index) => (
          <div
            key={`${index}-${item.text}`}
            className={`flex ${item.from === "you" ? "justify-end" : "justify-start"}`}
          >
            <p
              className="max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed"
              style={{
                backgroundColor:
                  item.from === "you"
                    ? "var(--cf-primary)"
                    : "var(--cf-secondary)",
                color:
                  item.from === "you"
                    ? "var(--cf-primary-foreground)"
                    : "var(--cf-foreground)",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <form
        onSubmit={sendMessage}
        className="mt-4 flex min-w-0 items-center gap-2 border-t pt-3"
        style={{ borderColor: "var(--cf-border)" }}
      >
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write a message..."
          className="min-w-0 flex-1 rounded-lg border px-3 py-2.5 text-xs outline-none"
          style={{
            backgroundColor: "var(--cf-background)",
            borderColor: "var(--cf-border)",
            color: "var(--cf-foreground)",
          }}
        />
        <button
          type="submit"
          disabled={!message.trim()}
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg disabled:opacity-40"
          style={{
            backgroundColor: "var(--cf-primary)",
            color: "var(--cf-primary-foreground)",
          }}
        >
          <Send size={15} />
        </button>
      </form>
    </PreviewCard>
  );
}

function DateRangeCard() {
  const [startDate, setStartDate] = useState("2025-06-01");
  const [endDate, setEndDate] = useState("2025-06-15");

  return (
    <PreviewCard>
      <CardTitle
        title="Date Range"
        description="Choose a date range for your report."
        icon={<FileText size={17} />}
      />

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="min-w-0 space-y-1.5">
          <span className="text-xs font-medium">Start date</span>
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="w-full min-w-0 rounded-lg border px-3 py-2.5 text-xs outline-none"
            style={{
              backgroundColor: "var(--cf-background)",
              borderColor: "var(--cf-border)",
              color: "var(--cf-foreground)",
            }}
          />
        </label>

        <label className="min-w-0 space-y-1.5">
          <span className="text-xs font-medium">End date</span>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="w-full min-w-0 rounded-lg border px-3 py-2.5 text-xs outline-none"
            style={{
              backgroundColor: "var(--cf-background)",
              borderColor: "var(--cf-border)",
              color: "var(--cf-foreground)",
            }}
          />
        </label>
      </div>

      <div
        className="mt-4 rounded-lg p-3"
        style={{ backgroundColor: "var(--cf-secondary)" }}
      >
        <p
          className="text-[10px] font-medium"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          Selected range
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span>{startDate}</span>
          <span style={{ color: "var(--cf-muted-foreground)" }}>→</span>
          <span>{endDate}</span>
        </div>
      </div>
    </PreviewCard>
  );
}

function ShareDocumentCard() {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://colorforge.app/documents/design-system";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <PreviewCard>
      <CardTitle
        title="Share this document"
        description="Anyone with the link can view this document."
        icon={<FileText size={17} />}
      />

      <div
        className="mt-4 flex min-w-0 items-center gap-2 rounded-lg border p-2"
        style={{
          backgroundColor: "var(--cf-background)",
          borderColor: "var(--cf-border)",
        }}
      >
        <span
          className="min-w-0 flex-1 truncate px-1 text-xs"
          style={{ color: "var(--cf-muted-foreground)" }}
        >
          {shareUrl}
        </span>
        <button
          type="button"
          onClick={copyLink}
          className="flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium"
          style={{
            backgroundColor: "var(--cf-secondary)",
            color: "var(--cf-foreground)",
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium">General access</p>
          <p
            className="mt-0.5 text-[10px]"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Anyone with the link
          </p>
        </div>
        <span
          className="rounded-md px-2.5 py-1.5 text-[10px] font-medium"
          style={{
            backgroundColor: "var(--cf-secondary)",
            color: "var(--cf-muted-foreground)",
          }}
        >
          Viewer
        </span>
      </div>
    </PreviewCard>
  );
}

function ReportIssueCard() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <PreviewCard>
      <CardTitle
        title="Report an issue"
        description="Tell us what went wrong and we'll take a look."
        icon={<MessageCircle size={17} />}
      />

      {submitted ? (
        <div
          className="mt-5 rounded-lg p-4 text-center"
          style={{ backgroundColor: "var(--cf-secondary)" }}
        >
          <CheckCircle2
            size={23}
            className="mx-auto"
            style={{ color: "var(--cf-primary)" }}
          />
          <p className="mt-2 text-sm font-semibold">Report submitted</p>
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Preview only — your report was not sent to a server.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-3 text-xs font-semibold"
            style={{ color: "var(--cf-primary)" }}
          >
            Submit another report
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium">Issue type</span>
            <select
              className="w-full rounded-lg border px-3 py-2.5 text-xs outline-none"
              style={{
                backgroundColor: "var(--cf-background)",
                borderColor: "var(--cf-border)",
                color: "var(--cf-foreground)",
              }}
            >
              <option>Bug report</option>
              <option>Feature request</option>
              <option>Other</option>
            </select>
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium">Description</span>
            <textarea
              required
              rows={3}
              placeholder="Describe the issue..."
              className="w-full resize-y rounded-lg border px-3 py-2.5 text-xs outline-none"
              style={{
                backgroundColor: "var(--cf-background)",
                borderColor: "var(--cf-border)",
                color: "var(--cf-foreground)",
              }}
            />
          </label>

          <PrimaryButton type="submit">Submit report</PrimaryButton>
        </form>
      )}
    </PreviewCard>
  );
}

const payments = [
  { id: "INV-001", status: "Paid", amount: "$250.00", date: "Jun 12, 2025" },
  { id: "INV-002", status: "Pending", amount: "$150.00", date: "Jun 10, 2025" },
  { id: "INV-003", status: "Paid", amount: "$350.00", date: "Jun 08, 2025" },
  { id: "INV-004", status: "Failed", amount: "$120.00", date: "Jun 05, 2025" },
];

function PaymentsTableCard() {
  return (
    <PreviewCard className="sm:col-span-2">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <CardTitle
          title="Recent Payments"
          description="Manage and review your latest transactions."
        />
        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-xs font-medium"
          style={{ borderColor: "var(--cf-border)" }}
        >
          View all
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-120 text-left text-xs">
          <thead>
            <tr
              className="border-b text-[10px]"
              style={{
                borderColor: "var(--cf-border)",
                color: "var(--cf-muted-foreground)",
              }}
            >
              <th className="py-3 pr-3 font-medium">Invoice</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Date</th>
              <th className="py-3 pl-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b last:border-0"
                style={{ borderColor: "var(--cf-border)" }}
              >
                <td className="py-3 pr-3 font-medium">{payment.id}</td>
                <td className="px-3 py-3">
                  <span
                    className="rounded-full px-2 py-1 text-[10px] font-medium"
                    style={{
                      backgroundColor: "var(--cf-secondary)",
                      color: "var(--cf-foreground)",
                    }}
                  >
                    {payment.status}
                  </span>
                </td>
                <td
                  className="px-3 py-3"
                  style={{ color: "var(--cf-muted-foreground)" }}
                >
                  {payment.date}
                </td>
                <td className="py-3 pl-3 text-right font-semibold tabular-nums">
                  {payment.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewCard>
  );
}

export default function AdvancedCardsPreview() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            More components
          </p>
          <h2 className="mt-1 text-lg font-bold tracking-tight">
            Advanced cards & forms
          </h2>
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--cf-muted-foreground)" }}
          >
            Interactive forms, settings, and data components.
          </p>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 @md:grid-cols-2 @lg:grid-cols-3">
        <UpgradeCard />
        <TeamMembersCard />
        <CookieSettingsCard />
        <CreateAccountCard />
        <ChatConversationCard />
        <DateRangeCard />
        <ShareDocumentCard />
        <ReportIssueCard />
        <PaymentsTableCard />
      </div>
    </section>
  );
}

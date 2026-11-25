import { Check, X } from "lucide-react";

export function StatusLabel({ passed }: { passed: boolean }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold"
      style={{
        backgroundColor: passed
          ? "rgba(22, 163, 74, 0.10)"
          : "rgba(220, 38, 38, 0.10)",
        color: passed ? "#16a34a" : "#dc2626",
      }}
    >
      {passed ? (
        <Check size={11} aria-hidden="true" />
      ) : (
        <X size={11} aria-hidden="true" />
      )}
      {passed ? "Pass" : "Fail"}
    </span>
  );
}

export function ResultRow({
  label,
  passed,
}: {
  label: string;
  passed: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between gap-3 border-b py-2.5 last:border-b-0"
      style={{ borderColor: "var(--cf-border)" }}
    >
      <span className="text-xs" style={{ color: "var(--cf-muted-foreground)" }}>
        {label}
      </span>
      <StatusLabel passed={passed} />
    </div>
  );
}

import { isValidHex, normalizeHex } from "../utils/colorControl.utils";

interface ColorControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorControl({
  label,
  value,
  onChange,
}: ColorControlProps) {
  const valid = isValidHex(value);
  const colorValue = valid ? normalizeHex(value) : "#000000";

  return (
    <div className="min-w-0 space-y-2">
      <label className="block text-xs font-medium">{label}</label>

      <div
        className="flex h-11 min-w-0 items-center gap-2 rounded-lg border p-1.5"
        style={{
          borderColor: "var(--cf-border)",
          backgroundColor: "var(--cf-background)",
        }}
      >
        <input
          type="color"
          value={colorValue}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          className="size-7 shrink-0 cursor-pointer rounded-md border-0 bg-transparent p-0"
          aria-label={`${label} color picker`}
        />

        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          spellCheck={false}
          autoComplete="off"
          maxLength={7}
          aria-label={`${label} HEX value`}
          aria-invalid={!valid}
          className="min-w-0 flex-1 bg-transparent font-mono text-xs uppercase outline-none"
        />
      </div>

      {!valid && (
        <p className="text-[11px] text-red-500">
          Enter a valid six-digit HEX color.
        </p>
      )}
    </div>
  );
}

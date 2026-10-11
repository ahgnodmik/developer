import { Lock } from "lucide-react";

/** Representative label shown over an image that was blurred at build time for confidentiality. */
export function RedactedLabel({ label, large = false }: { label: string; large?: boolean }) {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center p-3">
      <span
        className={`inline-flex items-center gap-2 rounded-full bg-[var(--n-bg)]/90 text-[var(--n-text)] font-medium shadow-sm ring-1 ring-[var(--n-border)] backdrop-blur-sm text-center ${
          large ? "px-5 py-2.5 text-base md:text-lg" : "px-3.5 py-1.5 text-sm"
        }`}
      >
        <Lock className={large ? "w-4 h-4 shrink-0" : "w-3.5 h-3.5 shrink-0"} />
        {label}
      </span>
    </span>
  );
}

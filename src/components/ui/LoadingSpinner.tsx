type LoadingSpinnerProps = {
  label: string;
};

export default function LoadingSpinner({ label }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-3 text-sm text-[var(--ink-soft)]"
    >
      <span
        aria-hidden="true"
        className="size-5 animate-spin rounded-full border-2 border-current border-r-transparent"
      />
      <span>{label}</span>
    </div>
  );
}

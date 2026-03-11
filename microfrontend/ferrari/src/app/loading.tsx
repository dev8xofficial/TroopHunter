export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--ferrari-light)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--ferrari-dark)] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[var(--ferrari-muted)]">Loading...</p>
      </div>
    </div>
  );
}

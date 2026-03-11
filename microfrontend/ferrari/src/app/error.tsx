'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--ferrari-light)]">
      <div className="flex flex-col items-center gap-6 text-center max-w-md px-6">
        <h2 className="text-2xl font-bold text-[var(--ferrari-dark)]">Something went wrong</h2>
        <p className="text-sm text-[var(--ferrari-muted)] leading-relaxed">{error.message || 'An unexpected error occurred.'}</p>
        <button onClick={reset} className="px-5 py-2.5 rounded-full bg-[var(--ferrari-dark)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
          Try again
        </button>
      </div>
    </div>
  );
}

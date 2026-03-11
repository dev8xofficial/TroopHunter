import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--ferrari-light)]">
      <div className="flex flex-col items-center gap-6 text-center max-w-md px-6">
        <h1 className="text-8xl font-bold text-[var(--ferrari-dark)] tracking-tighter">404</h1>
        <p className="text-lg text-[var(--ferrari-muted)]">This page could not be found.</p>
        <Link href="/" className="px-5 py-2.5 rounded-full bg-[var(--ferrari-dark)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
          Go home
        </Link>
      </div>
    </div>
  );
}

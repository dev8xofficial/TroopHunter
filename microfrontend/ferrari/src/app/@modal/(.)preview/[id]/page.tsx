'use client';

import { useRouter } from 'next/navigation';

/**
 * Intercepted route for preview modal.
 * This demonstrates parallel routes for scalable modal patterns.
 */

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export default function PreviewModal({ params }: PreviewPageProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => router.back()}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-[var(--ferrari-dark)]">Preview Modal</h2>
        <p className="mt-2 text-sm text-[var(--ferrari-muted)]">This is an intercepted route modal — a scalable pattern for 1000+ routes.</p>
        <button onClick={() => router.back()} className="mt-6 px-4 py-2 rounded-full bg-[var(--ferrari-dark)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
          Close
        </button>
      </div>
    </div>
  );
}

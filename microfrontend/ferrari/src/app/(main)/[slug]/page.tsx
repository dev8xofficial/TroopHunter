import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * Dynamic route segment — supports 1,000+ routes via [slug].
 * In production, populate generateStaticParams with your route data.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title,
    description: `${title} — Ferrari microfrontend page`
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  // In production, fetch page data here and call notFound() if not found
  if (!slug) {
    notFound();
  }

  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="container-narrow py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-[var(--ferrari-dark)] tracking-tight">{title}</h1>
      <p className="mt-4 text-[var(--ferrari-muted)]">
        Dynamic route: <code className="font-mono text-sm bg-black/5 px-2 py-1 rounded">/{slug}</code>
      </p>
    </main>
  );
}

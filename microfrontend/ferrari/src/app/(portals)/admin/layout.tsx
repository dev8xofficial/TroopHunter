import type { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <ThemeProvider brandId="admin">{children}</ThemeProvider>;
}


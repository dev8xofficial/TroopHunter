import type { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <ThemeProvider brandId="client">{children}</ThemeProvider>;
}


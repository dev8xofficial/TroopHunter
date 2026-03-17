import type { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';

export default function AgentLayout({ children }: { children: ReactNode }) {
  return <ThemeProvider brandId="admin">{children}</ThemeProvider>;
}


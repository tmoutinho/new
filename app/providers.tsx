'use client';

import { ReactionProvider } from '@/lib/reactions-context';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <ReactionProvider>{children}</ReactionProvider>;
}

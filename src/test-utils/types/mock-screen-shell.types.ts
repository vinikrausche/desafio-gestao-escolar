import type { PropsWithChildren, ReactNode } from 'react';

export type MockScreenShellProps = PropsWithChildren<{
  description?: string;
  eyebrow: string;
  floatingAction?: ReactNode;
  title: string;
}>;

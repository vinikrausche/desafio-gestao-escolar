import type { PropsWithChildren, ReactNode } from 'react';

export type ScreenShellProps = PropsWithChildren<{
  description?: string;
  eyebrow: string;
  floatingAction?: ReactNode;
  title: string;
}>;

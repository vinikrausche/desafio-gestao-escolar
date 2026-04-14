import type { PropsWithChildren } from 'react';

export type StateCardTone = 'surface' | 'soft' | 'error';
export type StateCardActionVariant = 'primary' | 'secondary';
export type StateCardLayout = 'row' | 'column';
export type StateCardAlign = 'start' | 'center';

export type StateCardProps = PropsWithChildren<{
  actionLabel?: string;
  actionVariant?: StateCardActionVariant;
  align?: StateCardAlign;
  layout?: StateCardLayout;
  message: string;
  minHeight?: number;
  onAction?: () => void;
  showSpinner?: boolean;
  tone?: StateCardTone;
  title?: string;
}>;

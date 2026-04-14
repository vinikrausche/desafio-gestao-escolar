import type { ElementType } from 'react';

export type IconActionButtonTone = 'default' | 'danger';

export type IconActionButtonProps = {
  accessibilityLabel: string;
  icon: ElementType;
  iconColor: string;
  isDisabled?: boolean;
  onPress: () => void;
  tone?: IconActionButtonTone;
};

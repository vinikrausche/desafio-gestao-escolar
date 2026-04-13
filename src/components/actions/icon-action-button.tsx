import { Button, Icon } from '@gluestack-ui/themed';
import type { ElementType } from 'react';

import { iconActionButtonStyles as styles } from './icon-action-button.styles';

type IconActionButtonTone = 'default' | 'danger';

type IconActionButtonProps = {
  accessibilityLabel: string;
  icon: ElementType;
  iconColor: string;
  isDisabled?: boolean;
  onPress: () => void;
  tone?: IconActionButtonTone;
};

const toneStyles = {
  danger: styles.dangerButton,
  default: styles.defaultButton,
} as const;

export function IconActionButton({
  accessibilityLabel,
  icon,
  iconColor,
  isDisabled = false,
  onPress,
  tone = 'default',
}: IconActionButtonProps) {
  return (
    <Button
      accessibilityLabel={accessibilityLabel}
      isDisabled={isDisabled}
      onPress={() => void onPress()}
      style={[styles.baseButton, toneStyles[tone]]}
    >
      <Icon as={icon} color={iconColor} style={styles.icon} />
    </Button>
  );
}

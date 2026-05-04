import { Pressable, Text } from 'react-native';

import { appButtonStyles as styles } from './app-button.styles';
import type { AppButtonProps } from './types/app-button.types';

export type {
  AppButtonAlign,
  AppButtonProps,
  AppButtonSize,
  AppButtonVariant,
} from './types/app-button.types';

const alignmentStyles = {
  center: styles.centerAlign,
  start: styles.startAlign,
  stretch: styles.stretchAlign,
} as const;

const sizeStyles = {
  compact: {
    button: styles.compactButton,
    text: styles.compactText,
  },
  md: {
    button: styles.mdButton,
    text: styles.mdText,
  },
  sm: {
    button: styles.smButton,
    text: styles.smText,
  },
} as const;

const variantStyles = {
  dangerSoft: {
    button: styles.dangerSoftButton,
    text: styles.dangerSoftText,
  },
  primary: {
    button: styles.primaryButton,
    text: styles.primaryText,
  },
  secondary: {
    button: styles.secondaryButton,
    text: styles.secondaryText,
  },
  soft: {
    button: styles.softButton,
    text: styles.softText,
  },
} as const;

export function AppButton({
  accessibilityLabel,
  align = 'stretch',
  isDisabled = false,
  label,
  onPress,
  size = 'md',
  style,
  textStyle,
  variant = 'primary',
}: AppButtonProps) {
  const selectedSize = sizeStyles[size];
  const selectedVariant = variantStyles[variant];

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={isDisabled ? undefined : () => void onPress()}
      style={[
        styles.baseButton,
        alignmentStyles[align],
        selectedSize.button,
        selectedVariant.button,
        isDisabled ? styles.disabledButton : null,
        style,
      ]}
    >
      <Text
        style={[
          styles.baseText,
          selectedSize.text,
          selectedVariant.text,
          isDisabled ? styles.disabledText : null,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

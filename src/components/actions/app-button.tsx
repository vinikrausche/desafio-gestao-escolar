import { Button, ButtonText } from '@gluestack-ui/themed';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { appButtonStyles as styles } from './app-button.styles';

export type AppButtonVariant = 'primary' | 'secondary' | 'soft' | 'dangerSoft';

export type AppButtonSize = 'compact' | 'sm' | 'md';
export type AppButtonAlign = 'start' | 'center' | 'stretch';

type AppButtonProps = {
  accessibilityLabel?: string;
  align?: AppButtonAlign;
  isDisabled?: boolean;
  label: string;
  onPress: () => void;
  size?: AppButtonSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: AppButtonVariant;
};

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
    <Button
      accessibilityLabel={accessibilityLabel}
      isDisabled={isDisabled}
      onPress={() => void onPress()}
      style={[
        styles.baseButton,
        alignmentStyles[align],
        selectedSize.button,
        selectedVariant.button,
        style,
      ]}
    >
      <ButtonText
        style={[
          styles.baseText,
          selectedSize.text,
          selectedVariant.text,
          textStyle,
        ]}
      >
        {label}
      </ButtonText>
    </Button>
  );
}

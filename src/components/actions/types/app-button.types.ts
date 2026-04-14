import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type AppButtonVariant = 'primary' | 'secondary' | 'soft' | 'dangerSoft';
export type AppButtonSize = 'compact' | 'sm' | 'md';
export type AppButtonAlign = 'start' | 'center' | 'stretch';

export type AppButtonProps = {
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

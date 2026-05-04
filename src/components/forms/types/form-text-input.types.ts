import type { KeyboardTypeOptions, TextInputProps } from 'react-native';

export type FormTextInputProps = {
  autoCapitalize?: TextInputProps['autoCapitalize'];
  errorMessage?: string;
  helperMessage?: string;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  onBlur?: () => void;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
};

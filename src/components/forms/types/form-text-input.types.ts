import type { KeyboardTypeOptions, TextInputProps } from 'react-native';

export type FormTextInputProps = {
  autoCapitalize?: TextInputProps['autoCapitalize'];
  errorMessage?: string;
  helperMessage?: string;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  multiline?: boolean;
  numberOfLines?: number;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
};

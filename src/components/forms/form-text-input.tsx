import {
  Input,
  InputField,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';
import type { KeyboardTypeOptions, TextInputProps } from 'react-native';

import { appTheme } from '../../theme/app-theme';
import { formTextInputStyles as styles } from './form-text-input.styles';

type FormTextInputProps = {
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

export function FormTextInput({
  autoCapitalize,
  errorMessage,
  helperMessage,
  keyboardType,
  label,
  multiline = false,
  numberOfLines = 4,
  onChangeText,
  placeholder,
  value,
}: FormTextInputProps) {
  const hasError = Boolean(errorMessage);

  return (
    <VStack style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      {multiline ? (
        <Textarea
          style={[
            styles.input,
            styles.textarea,
            hasError ? styles.inputError : null,
          ]}
        >
          <TextareaInput
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            multiline
            numberOfLines={numberOfLines}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={appTheme.colors.textMuted}
            style={styles.textareaField}
            textAlignVertical="top"
            value={value}
          />
        </Textarea>
      ) : (
        <Input style={[styles.input, hasError ? styles.inputError : null]}>
          <InputField
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={appTheme.colors.textMuted}
            style={styles.inputField}
            value={value}
          />
        </Input>
      )}

      {!hasError && helperMessage ? (
        <Text style={styles.helperText}>{helperMessage}</Text>
      ) : null}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </VStack>
  );
}

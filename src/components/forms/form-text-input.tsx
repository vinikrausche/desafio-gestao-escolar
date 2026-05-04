import {
  Input,
  InputField,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';
import { useState } from 'react';
import { Platform, type TextInputProps } from 'react-native';

import { appTheme } from '../../theme/app-theme';
import { formTextInputStyles as styles } from './form-text-input.styles';
import type { FormTextInputProps } from './types/form-text-input.types';

export function FormTextInput({
  autoCapitalize,
  errorMessage,
  helperMessage,
  keyboardType,
  label,
  maxLength,
  multiline = false,
  numberOfLines = 4,
  onBlur,
  onChangeText,
  placeholder,
  value,
}: FormTextInputProps) {
  const hasError = Boolean(errorMessage);
  const [isFocused, setIsFocused] = useState(false);
  const webFocusResetStyle =
    Platform.OS === 'web'
      ? ({
          outlineColor: 'transparent',
          outlineStyle: 'none',
          outlineWidth: 0,
        } as unknown as TextInputProps['style'])
      : undefined;

  return (
    <VStack style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      {multiline ? (
        <Textarea
          style={[
            styles.input,
            styles.textarea,
            isFocused && !hasError ? styles.inputFocused : null,
            hasError ? styles.inputError : null,
          ]}
        >
          <TextareaInput
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            maxLength={maxLength}
            multiline
            numberOfLines={numberOfLines}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.();
            }}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            placeholderTextColor={appTheme.colors.textMuted}
            style={[styles.textareaField, webFocusResetStyle]}
            textAlignVertical="top"
            value={value}
          />
        </Textarea>
      ) : (
        <Input
          style={[
            styles.input,
            isFocused && !hasError ? styles.inputFocused : null,
            hasError ? styles.inputError : null,
          ]}
        >
          <InputField
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            maxLength={maxLength}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.();
            }}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            placeholderTextColor={appTheme.colors.textMuted}
            style={[styles.inputField, webFocusResetStyle]}
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

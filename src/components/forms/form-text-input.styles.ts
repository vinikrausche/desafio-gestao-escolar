import { StyleSheet } from 'react-native';

import { appTheme } from '../../theme/app-theme';

export const formTextInputStyles = StyleSheet.create({
  errorText: {
    color: appTheme.colors.error,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  field: {
    gap: 10,
  },
  helperText: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  input: {
    backgroundColor: appTheme.colors.surfaceAlt,
    borderColor: appTheme.colors.border,
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 56,
    paddingHorizontal: 16,
    shadowColor: appTheme.colors.brandStrong,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 16,
  },
  inputError: {
    backgroundColor: appTheme.colors.errorSoft,
    borderColor: appTheme.colors.errorBorder,
  },
  inputField: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: appTheme.colors.textPrimary,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    minHeight: 54,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  label: {
    color: appTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  textarea: {
    minHeight: 116,
    paddingBottom: 12,
    paddingTop: 12,
  },
  textareaField: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: appTheme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    minHeight: 80,
    paddingHorizontal: 0,
  },
});

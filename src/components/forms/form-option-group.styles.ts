import { StyleSheet } from 'react-native';

import { appTheme } from '../../theme/app-theme';

export const formOptionGroupStyles = StyleSheet.create({
  errorText: {
    color: appTheme.colors.error,
    fontSize: 13,
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
  label: {
    color: appTheme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

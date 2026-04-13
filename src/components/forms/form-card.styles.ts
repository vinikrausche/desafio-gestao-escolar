import { StyleSheet } from 'react-native';

import { appShadows, appTheme } from '../../theme/app-theme';

export const formCardStyles = StyleSheet.create({
  card: {
    ...appShadows.card,
    backgroundColor: appTheme.colors.surface,
    borderColor: appTheme.colors.border,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  content: {
    gap: 18,
  },
  errorContainer: {
    backgroundColor: appTheme.colors.errorSoft,
    borderColor: appTheme.colors.errorBorder,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  errorText: {
    color: appTheme.colors.error,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
});

import { StyleSheet } from 'react-native';

import { appTheme } from '../../../theme/app-theme';

export const schoolMapFooterStyles = StyleSheet.create({
  address: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  header: {
    gap: 4,
  },
  mapFrame: {
    backgroundColor: appTheme.colors.surfaceAlt,
    borderColor: appTheme.colors.border,
    borderRadius: 16,
    borderWidth: 1,
    height: 260,
    overflow: 'hidden',
  },
  mapWebView: {
    flex: 1,
  },
  section: {
    gap: 12,
  },
  title: {
    color: appTheme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});

import { StyleSheet } from 'react-native';

import { appShadows, appTheme } from '../../theme/app-theme';

export const appDialogStyles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(11, 31, 33, 0.52)',
  },
  body: {
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  content: {
    ...appShadows.hero,
    backgroundColor: appTheme.colors.surface,
    borderColor: appTheme.colors.border,
    borderRadius: 24,
    borderWidth: 1,
    maxWidth: 420,
    overflow: 'hidden',
    width: '92%',
  },
  footer: {
    borderTopColor: appTheme.colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-end',
    padding: 20,
  },
  header: {
    paddingBottom: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  root: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  message: {
    color: appTheme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  title: {
    color: appTheme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
});

import { StyleSheet } from 'react-native';
import { appShadows, appTheme } from '../../theme/app-theme';

export const stateCardStyles = StyleSheet.create({
  card: {
    ...appShadows.card,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  centerCopy: {
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  columnContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: 12,
  },
  copy: {
    gap: 10,
  },
  errorMessage: {
    color: '#7A271A',
  },
  errorTitle: {
    color: appTheme.colors.error,
  },
  message: {
    color: appTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  rowContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  softTone: {
    backgroundColor: appTheme.colors.brandSoft,
    borderColor: appTheme.colors.brandMuted,
  },
  surfaceTone: {
    backgroundColor: appTheme.colors.surface,
    borderColor: appTheme.colors.border,
  },
  title: {
    color: appTheme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  errorTone: {
    backgroundColor: appTheme.colors.errorSoft,
    borderColor: appTheme.colors.errorBorder,
  },
});

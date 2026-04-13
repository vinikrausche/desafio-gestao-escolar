import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../theme/button-presets';
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
  primaryAction: {
    ...centeredButtonStyle,
    backgroundColor: appTheme.colors.brandStrong,
    borderRadius: 16,
    minHeight: 44,
  },
  primaryActionText: {
    ...centeredButtonTextStyle,
    color: appTheme.colors.textInverse,
    fontSize: 14,
    fontWeight: '700',
  },
  rowContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryAction: {
    ...centeredButtonStyle,
    backgroundColor: appTheme.colors.surface,
    borderColor: appTheme.colors.borderStrong,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 44,
  },
  secondaryActionText: {
    ...centeredButtonTextStyle,
    color: appTheme.colors.brandStrong,
    fontSize: 14,
    fontWeight: '700',
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

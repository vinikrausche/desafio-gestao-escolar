import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../theme/button-presets';
import { appTheme } from '../../theme/app-theme';

export const appButtonStyles = StyleSheet.create({
  baseButton: {
    ...centeredButtonStyle,
  },
  baseText: {
    ...centeredButtonTextStyle,
    fontWeight: '700',
  },
  centerAlign: {
    alignSelf: 'center',
  },
  compactButton: {
    borderRadius: 14,
    minHeight: 40,
  },
  compactText: {
    fontSize: 13,
  },
  dangerSoftButton: {
    backgroundColor: appTheme.colors.errorSoft,
    borderColor: appTheme.colors.errorBorder,
    borderWidth: 1,
  },
  dangerSoftText: {
    color: appTheme.colors.error,
  },
  disabledButton: {
    opacity: 0.55,
  },
  disabledText: {
    color: appTheme.colors.textMuted,
  },
  mdButton: {
    borderRadius: 18,
    minHeight: 52,
  },
  mdText: {
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: appTheme.colors.brandStrong,
  },
  primaryText: {
    color: appTheme.colors.textInverse,
  },
  secondaryButton: {
    backgroundColor: appTheme.colors.surface,
    borderColor: appTheme.colors.borderStrong,
    borderWidth: 1,
  },
  secondaryText: {
    color: appTheme.colors.brandStrong,
  },
  smButton: {
    borderRadius: 16,
    minHeight: 44,
  },
  smText: {
    fontSize: 14,
  },
  softButton: {
    backgroundColor: appTheme.colors.brandSoft,
    borderColor: appTheme.colors.brandMuted,
    borderWidth: 1,
  },
  softText: {
    color: appTheme.colors.brandStrong,
  },
  startAlign: {
    alignSelf: 'flex-start',
  },
  stretchAlign: {
    alignSelf: 'stretch',
  },
});

import { StyleSheet } from 'react-native';

import { centeredButtonStyle } from '../../theme/button-presets';
import { appTheme } from '../../theme/app-theme';

export const iconActionButtonStyles = StyleSheet.create({
  baseButton: {
    ...centeredButtonStyle,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 0,
  },
  dangerButton: {
    backgroundColor: appTheme.colors.errorSoft,
    borderColor: appTheme.colors.errorBorder,
  },
  defaultButton: {
    backgroundColor: appTheme.colors.surfaceAlt,
    borderColor: appTheme.colors.borderStrong,
  },
  icon: {
    height: 18,
    width: 18,
  },
});

import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../theme/button-presets';
import { appTheme } from '../../theme/app-theme';

export const formActionsStyles = StyleSheet.create({
  actions: {
    gap: 12,
  },
  primaryButton: {
    ...centeredButtonStyle,
    backgroundColor: appTheme.colors.brandStrong,
    borderRadius: 18,
    minHeight: 52,
  },
  primaryButtonText: {
    ...centeredButtonTextStyle,
    color: appTheme.colors.textInverse,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    ...centeredButtonStyle,
    backgroundColor: appTheme.colors.surface,
    borderColor: appTheme.colors.borderStrong,
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 52,
  },
  secondaryButtonText: {
    ...centeredButtonTextStyle,
    color: appTheme.colors.brandStrong,
    fontSize: 15,
    fontWeight: '700',
  },
});

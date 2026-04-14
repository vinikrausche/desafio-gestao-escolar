import { StyleSheet } from 'react-native';

import { appTheme } from '../../theme/app-theme';

export const homeHeaderActionStyles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18,
  },
  pressable: {
    alignItems: 'center',
    backgroundColor: appTheme.colors.brand,
    borderColor: appTheme.colors.brandMuted,
    borderRadius: 14,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    marginRight: 8,
    width: 36,
  },
});

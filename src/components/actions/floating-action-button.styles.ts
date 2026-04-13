import { StyleSheet } from 'react-native';

import { appShadows, appTheme } from '../../theme/app-theme';

export const floatingActionButtonStyles = StyleSheet.create({
  fab: {
    ...appShadows.hero,
    alignItems: 'center',
    backgroundColor: appTheme.colors.brandStrong,
    borderColor: appTheme.colors.brandStrong,
    borderRadius: 999,
    borderWidth: 1,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  icon: {
    color: appTheme.colors.textInverse,
    height: 24,
    width: 24,
  },
});

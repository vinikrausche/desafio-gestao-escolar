import { StyleSheet } from 'react-native';

import { appShadows, appTheme } from '../../theme/app-theme';

export const searchFilterPanelStyles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
  },
  content: {
    gap: 16,
  },
  panel: {
    ...appShadows.card,
    backgroundColor: appTheme.colors.surface,
    borderColor: appTheme.colors.border,
    borderRadius: 24,
    borderWidth: 1,
    gap: 16,
    padding: 16,
  },
});

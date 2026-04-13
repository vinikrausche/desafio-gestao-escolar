import { StyleSheet } from 'react-native';

import { appTheme } from '../../theme/app-theme';

export const listHeaderStyles = StyleSheet.create({
  badge: {
    backgroundColor: appTheme.colors.brandSoft,
    borderColor: appTheme.colors.brandMuted,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: appTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  row: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    color: appTheme.colors.textPrimary,
    textAlign: 'left',
  },
});

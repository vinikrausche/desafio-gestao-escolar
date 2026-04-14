import { StyleSheet } from 'react-native';

import { appTheme } from '../../theme/app-theme';

export const classroomsScreenStyles = StyleSheet.create({
  content: {
    gap: 18,
  },
  list: {
    gap: 14,
  },
  schoolAddress: {
    color: appTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  schoolName: {
    color: appTheme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  schoolSummary: {
    gap: 6,
  },
});

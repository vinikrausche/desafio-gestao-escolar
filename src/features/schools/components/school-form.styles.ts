import { StyleSheet } from 'react-native';

import { appTheme } from '../../../theme/app-theme';

export const schoolFormStyles = StyleSheet.create({
  classroomCard: {
    backgroundColor: appTheme.colors.surfaceAlt,
    borderColor: appTheme.colors.border,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  classroomCardContent: {
    gap: 12,
  },
  classroomHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  classroomHelper: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  classroomTitle: {
    color: appTheme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    gap: 6,
  },
  sectionHelper: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  sectionTitle: {
    color: appTheme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
});

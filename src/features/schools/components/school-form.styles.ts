import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../../theme/button-presets';
import { appTheme } from '../../../theme/app-theme';

export const schoolFormStyles = StyleSheet.create({
  addClassroomButton: {
    ...centeredButtonStyle,
    alignSelf: 'flex-start',
    backgroundColor: appTheme.colors.brandSoft,
    borderColor: appTheme.colors.brandMuted,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 44,
  },
  addClassroomButtonText: {
    ...centeredButtonTextStyle,
    color: appTheme.colors.brandStrong,
    fontSize: 14,
    fontWeight: '700',
  },
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
  removeClassroomButton: {
    ...centeredButtonStyle,
    alignSelf: 'flex-start',
    backgroundColor: appTheme.colors.errorSoft,
    borderColor: appTheme.colors.errorBorder,
    borderRadius: 14,
    borderWidth: 1,
    minHeight: 40,
  },
  removeClassroomButtonText: {
    ...centeredButtonTextStyle,
    color: appTheme.colors.error,
    fontSize: 13,
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

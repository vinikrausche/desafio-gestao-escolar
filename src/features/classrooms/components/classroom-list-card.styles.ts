import { StyleSheet } from 'react-native';

import { appShadows, appTheme } from '../../../theme/app-theme';

export const classroomListCardStyles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  card: {
    ...appShadows.card,
    backgroundColor: appTheme.colors.surface,
    borderColor: appTheme.colors.border,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  content: {
    gap: 14,
  },
  metaBadge: {
    alignSelf: 'flex-start',
    backgroundColor: appTheme.colors.brandSoft,
    borderColor: appTheme.colors.brandMuted,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  metaBadgeText: {
    color: appTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  name: {
    color: appTheme.colors.textPrimary,
    lineHeight: 26,
  },
  schoolYear: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
});

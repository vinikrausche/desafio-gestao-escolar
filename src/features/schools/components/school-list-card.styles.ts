import { StyleSheet } from 'react-native';

import { appShadows, appTheme } from '../../../theme/app-theme';

export const schoolListCardStyles = StyleSheet.create({
  actionsGrid: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    width: '100%',
  },
  address: {
    color: appTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  badge: {
    alignSelf: 'flex-start',
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
  },
  card: {
    ...appShadows.card,
    backgroundColor: appTheme.colors.surface,
    borderColor: appTheme.colors.border,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  classroomPreview: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  content: {
    gap: 14,
  },
  header: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  headerCopy: {
    flex: 1,
    gap: 6,
    paddingRight: 8,
  },
  meta: {
    color: appTheme.colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  name: {
    color: appTheme.colors.textPrimary,
    lineHeight: 26,
  },
});

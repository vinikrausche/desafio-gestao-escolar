import { StyleSheet } from 'react-native';

import { appShadows, appTheme } from '../../../theme/app-theme';

export const schoolListCardStyles = StyleSheet.create({
  actionsGrid: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
    width: '100%',
  },
  actionsGridCompact: {
    justifyContent: 'flex-start',
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
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 0,
  },
  cardLayout: {
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardLayoutCompact: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  classroomPreview: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  content: {
    flex: 1,
    gap: 14,
    minWidth: 240,
    padding: 16,
  },
  coverInitials: {
    color: appTheme.colors.textInverse,
    fontSize: 28,
    fontWeight: '900',
  },
  coverPhoto: {
    backgroundColor: appTheme.colors.brandStrong,
    minHeight: 160,
    width: 164,
  },
  coverPhotoCompact: {
    height: 148,
    minHeight: 148,
    width: '100%',
  },
  coverPlaceholder: {
    alignItems: 'center',
    backgroundColor: appTheme.colors.brandStrong,
    justifyContent: 'center',
    minHeight: 160,
    width: 164,
  },
  coverPlaceholderCompact: {
    height: 118,
    minHeight: 118,
    width: '100%',
  },
  header: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  headerCompact: {
    alignItems: 'flex-start',
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
  manageButton: {
    flex: 1,
    minWidth: 170,
  },
  miniMetric: {
    backgroundColor: appTheme.colors.surfaceAlt,
    borderColor: appTheme.colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexBasis: 132,
    flexGrow: 1,
    gap: 3,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  miniMetricLabel: {
    color: appTheme.colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  miniMetricValue: {
    color: appTheme.colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  name: {
    color: appTheme.colors.textPrimary,
    lineHeight: 26,
  },
  statusLabel: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    fontSize: 11,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 4,
    textTransform: 'uppercase',
  },
  statusPending: {
    backgroundColor: appTheme.colors.errorSoft,
    borderColor: appTheme.colors.errorBorder,
    color: appTheme.colors.error,
  },
  statusReady: {
    backgroundColor: appTheme.colors.successSoft,
    borderColor: appTheme.colors.successBorder,
    color: appTheme.colors.success,
  },
});

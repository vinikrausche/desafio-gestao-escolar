import { StyleSheet } from 'react-native';

import { appShadows, appTheme } from '../../theme/app-theme';

export const schoolsScreenStyles = StyleSheet.create({
  content: {
    gap: 20,
  },
  dashboardCard: {
    ...appShadows.card,
    backgroundColor: appTheme.colors.surface,
    borderColor: appTheme.colors.border,
    borderRadius: 22,
    borderWidth: 1,
    gap: 18,
    padding: 18,
  },
  dashboardCopy: {
    flex: 1,
    gap: 8,
    minWidth: 240,
  },
  dashboardDescription: {
    color: appTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  dashboardEyebrow: {
    color: appTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  dashboardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
  },
  dashboardTitle: {
    color: appTheme.colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  list: {
    gap: 12,
  },
  listBadge: {
    alignSelf: 'flex-start',
    backgroundColor: appTheme.colors.brandSoft,
    borderColor: appTheme.colors.brandMuted,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  listBadgeText: {
    color: appTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  listHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  listHeaderCopy: {
    flex: 1,
    gap: 4,
    minWidth: 220,
  },
  metricAccent: {
    borderRadius: 999,
    height: 5,
    width: 42,
  },
  metricAccentBrand: {
    backgroundColor: appTheme.colors.brand,
  },
  metricAccentMuted: {
    backgroundColor: appTheme.colors.textMuted,
  },
  metricAccentSuccess: {
    backgroundColor: appTheme.colors.success,
  },
  metricAccentWarning: {
    backgroundColor: '#D97706',
  },
  metricCard: {
    backgroundColor: appTheme.colors.surfaceAlt,
    borderColor: appTheme.colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexBasis: 180,
    flexGrow: 1,
    gap: 7,
    minWidth: 150,
    padding: 14,
  },
  metricHelper: {
    color: appTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  metricLabel: {
    color: appTheme.colors.textSecondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricValue: {
    color: appTheme.colors.textPrimary,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  operationalCopy: {
    gap: 4,
  },
  operationalFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  operationalFooterText: {
    color: appTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  operationalLabel: {
    color: appTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  operationalPanel: {
    backgroundColor: appTheme.colors.brandSoft,
    borderColor: appTheme.colors.brandMuted,
    borderRadius: 18,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  operationalValue: {
    color: appTheme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 22,
  },
  progressFill: {
    backgroundColor: appTheme.colors.brandStrong,
    borderRadius: 999,
    height: '100%',
  },
  progressTrack: {
    backgroundColor: appTheme.colors.surface,
    borderRadius: 999,
    height: 10,
    overflow: 'hidden',
  },
  sectionDescription: {
    color: appTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  sectionEyebrow: {
    color: appTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: appTheme.colors.textPrimary,
    fontWeight: '800',
    lineHeight: 26,
  },
});

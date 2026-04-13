import { StyleSheet } from 'react-native';

import { appShadows, appTheme } from '../../theme/app-theme';

export const screenShellStyles = StyleSheet.create({
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
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  description: {
    color: '#D5F0EC',
    fontSize: 15,
    lineHeight: 24,
  },
  floatingActionContainer: {
    bottom: 24,
    position: 'absolute',
    right: 20,
  },
  heroCard: {
    ...appShadows.hero,
    backgroundColor: appTheme.colors.brandStrong,
    borderColor: appTheme.colors.brand,
    borderRadius: 30,
    borderWidth: 1,
    padding: 24,
  },
  heroContent: {
    gap: 14,
  },
  safeArea: {
    backgroundColor: appTheme.colors.background,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContentWithFloatingAction: {
    paddingBottom: 120,
  },
  stack: {
    gap: 18,
  },
  title: {
    color: appTheme.colors.textInverse,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
  },
});

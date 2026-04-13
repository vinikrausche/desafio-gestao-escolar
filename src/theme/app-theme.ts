export const appTheme = {
  brandName: 'Verde institucional',
  colors: {
    background: '#F3F7F6',
    surface: '#FFFFFF',
    surfaceAlt: '#F7FBF9',
    brand: '#14746F',
    brandStrong: '#0F5C57',
    brandSoft: '#E5F3F1',
    brandMuted: '#B9E0DA',
    textPrimary: '#16302E',
    textSecondary: '#58706D',
    textMuted: '#748784',
    textInverse: '#F8FAFC',
    border: '#D7E5E2',
    borderStrong: '#AFC9C4',
    error: '#B42318',
    errorBorder: '#FECACA',
    errorSoft: '#FEE4E2',
    success: '#027A48',
    successBorder: '#ABEFC6',
    successSoft: '#ECFDF3',
  },
} as const;

export const appShadows = {
  card: {
    elevation: 3,
    shadowColor: '#0B1F33',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  hero: {
    elevation: 4,
    shadowColor: '#071523',
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.18,
    shadowRadius: 28,
  },
} as const;

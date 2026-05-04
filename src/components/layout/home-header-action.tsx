import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

import { appTheme } from '../../theme/app-theme';
import { homeHeaderActionStyles as styles } from './home-header-action.styles';
import type { HomeHeaderActionProps } from './types/home-header-action.types';

function HomeGlyph() {
  return (
    <Svg focusable={false} style={styles.icon} viewBox="0 0 24 24">
      <Path
        d="M3.75 10.5 12 4.5l8.25 6v8.25a.75.75 0 0 1-.75.75h-4.5v-5.25a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0-.75.75v5.25H4.5a.75.75 0 0 1-.75-.75Z"
        fill={appTheme.colors.textInverse}
      />
    </Svg>
  );
}

export function HomeHeaderAction({ isVisible = true }: HomeHeaderActionProps) {
  const router = useRouter();

  if (!isVisible) {
    return null;
  }

  return (
    <Pressable
      accessibilityHint="Volta para a tela inicial de escolas"
      accessibilityLabel="Ir para a home"
      onPress={() => router.replace('/schools')}
      style={styles.pressable}
    >
      <HomeGlyph />
    </Pressable>
  );
}

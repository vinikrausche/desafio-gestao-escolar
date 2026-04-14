import { Text, View } from 'react-native';
import type { MockScreenShellProps } from './types/mock-screen-shell.types';

// ! O mock remove dependencias de layout/navegacao e mantem o foco no comportamento da tela.
export function MockScreenShell({
  children,
  description,
  eyebrow,
  title,
}: MockScreenShellProps) {
  return (
    <View>
      <Text>{eyebrow}</Text>
      <Text>{title}</Text>
      {description ? <Text>{description}</Text> : null}
      {children}
    </View>
  );
}

import type { PropsWithChildren, ReactNode } from 'react';
import { Text, View } from 'react-native';

type MockScreenShellProps = PropsWithChildren<{
  description?: string;
  eyebrow: string;
  floatingAction?: ReactNode;
  title: string;
}>;

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

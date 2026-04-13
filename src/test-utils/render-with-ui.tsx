import { gluestackUIConfig } from '@gluestack-ui/config';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { render, type RenderOptions } from '@testing-library/react-native';
import type { PropsWithChildren, ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function TestProviders({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={gluestackUIConfig}>
        <OverlayProvider>{children}</OverlayProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

// ! O helper concentra o render padrao para manter os testes de interface enxutos.
export function renderWithUi(
  element: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(element, {
    wrapper: TestProviders,
    ...options,
  });
}

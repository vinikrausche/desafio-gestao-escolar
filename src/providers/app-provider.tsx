import { gluestackUIConfig } from '@gluestack-ui/config';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { type PropsWithChildren, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { startMockServer } from '../server/mirage';
import { useAppBootstrapStore } from '../store/app-bootstrap.store';

async function bootstrapApplication() {
  if (__DEV__) {
    await startMockServer();
  }
}

export function AppProvider({ children }: PropsWithChildren) {
  const hasStartedRef = useRef(false);
  const errorMessage = useAppBootstrapStore((state) => state.errorMessage);
  const markError = useAppBootstrapStore((state) => state.markError);
  const markReady = useAppBootstrapStore((state) => state.markReady);
  const markStarting = useAppBootstrapStore((state) => state.markStarting);
  const status = useAppBootstrapStore((state) => state.status);

  useEffect(() => {
    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;

    void (async () => {
      try {
        markStarting();
        await bootstrapApplication();
        markReady();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown bootstrap error';

        markError(message);
      }
    })();
  }, [markError, markReady, markStarting]);

  if (status === 'error') {
    throw new Error(errorMessage ?? 'Application bootstrap failed.');
  }

  if (status !== 'ready') {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GluestackUIProvider config={gluestackUIConfig}>
          <OverlayProvider>{children}</OverlayProvider>
        </GluestackUIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

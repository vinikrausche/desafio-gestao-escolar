import 'react-native-gesture-handler';

import { Stack } from 'expo-router';

import { HomeHeaderAction } from '../src/components/layout/home-header-action';
import { AppProvider } from '../src/providers/app-provider';
import { appTheme } from '../src/theme/app-theme';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: appTheme.colors.brandStrong,
          },
          headerTintColor: appTheme.colors.textInverse,
          headerRight: () => <HomeHeaderAction />,
          contentStyle: {
            backgroundColor: appTheme.colors.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="schools/index"
          options={{
            headerRight: () => <HomeHeaderAction isVisible={false} />,
            title: 'Escolas',
          }}
        />
        <Stack.Screen name="schools/new" options={{ title: 'Nova Escola' }} />
        <Stack.Screen
          name="schools/[schoolId]/edit"
          options={{ title: 'Editar Escola' }}
        />
        <Stack.Screen
          name="schools/[schoolId]/classrooms/index"
          options={{ title: 'Turmas' }}
        />
        <Stack.Screen
          name="schools/[schoolId]/classrooms/new"
          options={{ title: 'Nova Turma' }}
        />
        <Stack.Screen
          name="schools/[schoolId]/classrooms/[classroomId]/edit"
          options={{ title: 'Editar Turma' }}
        />
      </Stack>
    </AppProvider>
  );
}

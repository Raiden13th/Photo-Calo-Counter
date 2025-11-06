import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useAuthStore } from '@store';
import { validateEnv } from '@config/env';

export default function RootLayout() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    // Validate environment variables
    validateEnv();
    
    // Initialize auth
    initialize();
  }, []);

  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="meal/[id]" />
      </Stack>
    </PaperProvider>
  );
}


import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from '@/hooks/useCart';
import { COLORS } from '@/constants/theme';

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="light" />
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="principal" />
        <Stack.Screen name="detalle" />
        <Stack.Screen name="pedido" />
      </Stack>
    </CartProvider>
  );
}

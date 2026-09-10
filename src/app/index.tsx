import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import StepIndicator from '@/components/StepIndicator';
import { COLORS, RADIUS, SPACING } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.replace('/principal');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StepIndicator
        current={1}
        onStepPress={(step) => {
          if (step === 2) router.push('/principal');
          if (step === 3) router.push('/pedido');
        }}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons name="pizza" size={28} color={COLORS.red} />
          </View>

          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Inicia sesión para pedir tu pizza</Text>

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="nombre@correo.com"
            placeholderTextColor={COLORS.textFaint}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={COLORS.textFaint}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={styles.forgotWrap}>
            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </Pressable>

          <View style={styles.registerRow}>
            <Text style={styles.subtitle}>¿No tienes cuenta? </Text>
            <Pressable>
              <Text style={styles.link}>Regístrate</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1, justifyContent: 'center', paddingHorizontal: SPACING.lg },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(214,46,46,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: { color: COLORS.text, fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: COLORS.textMuted, fontSize: 13, marginBottom: SPACING.lg },
  label: { color: COLORS.textMuted, fontSize: 12, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.cardAlt,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  forgotWrap: { alignSelf: 'flex-end', marginBottom: SPACING.lg },
  link: { color: COLORS.link, fontSize: 13, fontWeight: '600' },
  button: {
    backgroundColor: COLORS.red,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm + 4,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  buttonText: { color: COLORS.text, fontWeight: '700', fontSize: 15 },
  registerRow: { flexDirection: 'row', justifyContent: 'center' },
});

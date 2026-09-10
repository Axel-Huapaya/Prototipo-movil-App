import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import StepIndicator from '@/components/StepIndicator';
import { COLORS, RADIUS, SPACING } from '@/constants/theme';
import { useCart } from '@/hooks/useCart';

export default function DetalleScreen() {
  const router = useRouter();
  const { selectedProduct, quantities, increment, decrement } = useCart();

  if (!selectedProduct) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.emptyText}>No hay producto seleccionado.</Text>
        <Pressable style={styles.button} onPress={() => router.push('/principal')}>
          <Text style={styles.buttonText}>Volver al menú</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const qty = quantities[selectedProduct.id] || 0;

  return (
    <SafeAreaView style={styles.safe}>
      <StepIndicator current={2} onStepPress={() => router.push('/principal')} />

      <View style={styles.card}>
        <Pressable style={styles.backRow} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
          <Text style={styles.backText}>Volver</Text>
        </Pressable>

        <View style={styles.imageWrap}>
          <MaterialCommunityIcons name="pizza" size={64} color={COLORS.red} />
        </View>

        <Text style={styles.name}>{selectedProduct.name}</Text>
        <Text style={styles.desc}>{selectedProduct.description}</Text>
        <Text style={styles.price}>S/ {selectedProduct.price.toFixed(2)}</Text>

        <View style={styles.stepperRow}>
          <Pressable style={styles.stepperBtn} onPress={() => decrement(selectedProduct)}>
            <Text style={styles.stepperBtnText}>−</Text>
          </Pressable>
          <Text style={styles.stepperValue}>{qty}</Text>
          <Pressable style={styles.stepperBtn} onPress={() => increment(selectedProduct)}>
            <Text style={styles.stepperBtnText}>+</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => {
            if (qty === 0) increment(selectedProduct);
            router.push('/pedido');
          }}
        >
          <Text style={styles.buttonText}>Agregar y ver pedido</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  card: {
    flex: 1,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs, marginBottom: SPACING.md },
  backText: { color: COLORS.text, fontSize: 13, fontWeight: '600' },
  imageWrap: {
    height: 140,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  name: { color: COLORS.text, fontSize: 20, fontWeight: '700' },
  desc: { color: COLORS.textMuted, fontSize: 13, marginTop: 6 },
  price: { color: COLORS.text, fontSize: 16, fontWeight: '700', marginTop: SPACING.sm },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: { color: COLORS.text, fontSize: 18, fontWeight: '700' },
  stepperValue: { color: COLORS.text, fontSize: 16, minWidth: 20, textAlign: 'center' },
  button: {
    backgroundColor: COLORS.red,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm + 4,
    alignItems: 'center',
  },
  buttonText: { color: COLORS.text, fontWeight: '700', fontSize: 15 },
  emptyText: { color: COLORS.textMuted, textAlign: 'center', marginTop: 40, marginBottom: 16 },
});

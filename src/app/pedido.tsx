import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import StepIndicator from '@/components/StepIndicator';
import { COLORS, RADIUS, SPACING } from '@/constants/theme';
import { PRODUCTS, DELIVERY_FEE } from '@/constants/menu';
import { useCart } from '@/hooks/useCart';

export default function PedidoScreen() {
  const router = useRouter();
  const { quantities } = useCart();

  const items = useMemo(
    () =>
      PRODUCTS.filter((p) => (quantities[p.id] || 0) > 0).map((p) => ({
        ...p,
        qty: quantities[p.id],
      })),
    [quantities]
  );

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const total = items.length > 0 ? subtotal + DELIVERY_FEE : 0;

  const confirmOrder = () => {
    if (items.length === 0) {
      Alert.alert('Tu pedido está vacío', 'Agrega productos desde el menú.');
      return;
    }
    Alert.alert('Pedido confirmado', 'Gracias por tu compra (prototipo, sin backend).');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StepIndicator
        current={3}
        onStepPress={(step) => {
          if (step === 1) router.push('/');
          if (step === 2) router.push('/principal');
        }}
      />

      <View style={styles.card}>
        <Pressable style={styles.backRow} onPress={() => router.push('/principal')}>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
          <Text style={styles.headerTitle}>Tu pedido</Text>
        </Pressable>

        <ScrollView style={{ flex: 1 }}>
          {items.length === 0 && (
            <Text style={styles.emptyText}>Aún no agregaste productos.</Text>
          )}
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.qty} x {item.name}
              </Text>
              <Text style={styles.itemPrice}>S/ {(item.qty * item.price).toFixed(2)}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>S/ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envío</Text>
            <Text style={styles.summaryValue}>
              S/ {items.length > 0 ? DELIVERY_FEE.toFixed(2) : '0.00'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>S/ {total.toFixed(2)}</Text>
          </View>
        </View>

        <Pressable style={styles.confirmButton} onPress={confirmOrder}>
          <Text style={styles.confirmButtonText}>Confirmar pedido</Text>
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
  backRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.md },
  headerTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  emptyText: { color: COLORS.textMuted, fontSize: 13, textAlign: 'center', marginTop: SPACING.lg },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemName: { color: COLORS.text, fontSize: 13 },
  itemPrice: { color: COLORS.text, fontSize: 13, fontWeight: '600' },
  summaryBox: { marginTop: SPACING.md, paddingTop: SPACING.sm },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  summaryLabel: { color: COLORS.textMuted, fontSize: 13 },
  summaryValue: { color: COLORS.textMuted, fontSize: 13 },
  totalLabel: { color: COLORS.text, fontSize: 15, fontWeight: '700', marginTop: 6 },
  totalValue: { color: COLORS.text, fontSize: 15, fontWeight: '700', marginTop: 6 },
  confirmButton: {
    backgroundColor: COLORS.green,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm + 4,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  confirmButtonText: { color: COLORS.text, fontWeight: '700', fontSize: 15 },
});

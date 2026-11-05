import StepIndicator from '@/components/StepIndicator';
import { CATEGORIES, PRODUCTS, Product } from '@/constants/menu';
import { COLORS, RADIUS, SPACING } from '@/constants/theme';
import { useCart } from '@/hooks/useCart';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrincipalScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Pizzas');
  const { quantities, increment, decrement, cartItemsCount, setSelectedProduct } = useCart();

  const filteredProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
    router.push('/detalle');
  };

  const goToOrder = () => router.push('/pedido');

  return (
    <SafeAreaView style={styles.safe}>
      <StepIndicator
        current={2}
        onStepPress={(step) => {
          if (step === 1) router.push('/');
          if (step === 3) goToOrder();
        }}
      />

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.push('/')} hitSlop={8}>
            <Ionicons name="arrow-back" size={20} color={COLORS.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Menú Domino's</Text>
          <Pressable onPress={() => router.push('/camera')} hitSlop={8}>
            <Ionicons name="camera-outline" size={20} color={COLORS.text} />
          </Pressable>
        </View>

        <View style={styles.tabsRow}>
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <Pressable
                key={cat}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{cat}</Text>
              </Pressable>
            );
          })}
        </View>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const qty = quantities[item.id] || 0;
            return (
              <Pressable style={styles.productRow} onPress={() => openDetail(item)}>
                <View style={styles.productIcon}>
                  <MaterialCommunityIcons name="pizza" size={18} color={COLORS.red} />
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productDesc}>{item.description}</Text>
                  <Text style={styles.productPrice}>S/ {item.price.toFixed(2)}</Text>
                </View>

                <View style={styles.stepper}>
                  <Pressable
                    style={styles.stepperBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      decrement(item);
                    }}
                  >
                    <Text style={styles.stepperBtnText}>−</Text>
                  </Pressable>
                  <Text style={styles.stepperValue}>{qty}</Text>
                  <Pressable
                    style={styles.stepperBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      increment(item);
                    }}
                  >
                    <Text style={styles.stepperBtnText}>+</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          }}
        />

        <Pressable style={styles.orderBar} onPress={goToOrder}>
          <Text style={styles.orderBarText}>Ver pedido</Text>
          <Text style={styles.orderBarCount}>{cartItemsCount} items</Text>
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
    padding: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  headerTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  tabsRow: { flexDirection: 'row', gap: SPACING.xs, marginBottom: SPACING.md },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: SPACING.sm + 2,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.chipInactiveBg,
  },
  tabActive: { backgroundColor: COLORS.red },
  tabText: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600' },
  tabTextActive: { color: COLORS.text },
  listContent: { paddingBottom: SPACING.md },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.sm,
  },
  productIcon: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(214,46,46,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: { flex: 1 },
  productName: { color: COLORS.text, fontSize: 14, fontWeight: '700' },
  productDesc: { color: COLORS.textMuted, fontSize: 11, marginTop: 2 },
  productPrice: { color: COLORS.textMuted, fontSize: 12, marginTop: 4 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  stepperBtn: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: { color: COLORS.text, fontSize: 14, fontWeight: '700' },
  stepperValue: { color: COLORS.text, fontSize: 13, minWidth: 14, textAlign: 'center' },
  orderBar: {
    backgroundColor: COLORS.red,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm + 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  orderBarText: { color: COLORS.text, fontWeight: '700' },
  orderBarCount: { color: COLORS.text, fontWeight: '700' },
});
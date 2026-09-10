// src/components/StepIndicator.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, RADIUS, SPACING } from '@/constants/theme';

interface StepIndicatorProps {
  current: number;
  onStepPress?: (step: number) => void;
}

const STEPS = ['1. Login', '2. Menú', '3. Pedido'];

export default function StepIndicator({ current, onStepPress }: StepIndicatorProps) {
  return (
    <View style={styles.row}>
      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === current;
        return (
          <Pressable
            key={label}
            onPress={() => onStepPress && onStepPress(stepNumber)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  chip: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.chipInactiveBg,
  },
  chipActive: {
    backgroundColor: COLORS.text,
    borderColor: COLORS.text,
  },
  chipText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextActive: {
    color: COLORS.background,
  },
});

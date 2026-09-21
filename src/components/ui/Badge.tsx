import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing, FontSize, FontWeight } from '../../constants/theme';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export function Badge({ label, variant = 'default', style }: BadgeProps) {
  return (
    <View style={[styles.base, variantBg[variant], style]}>
      <Text style={[styles.text, variantText[variant]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.black,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

const variantBg: Record<BadgeVariant, ViewStyle> = {
  default: { backgroundColor: Colors.surfaceMuted },
  primary: { backgroundColor: Colors.primaryLight },
  success: { backgroundColor: Colors.successLight },
  warning: { backgroundColor: Colors.warningLight },
  danger: { backgroundColor: Colors.dangerLight },
  info: { backgroundColor: '#dbeafe' },
};

const variantText: Record<BadgeVariant, { color: string }> = {
  default: { color: Colors.textSecondary },
  primary: { color: Colors.primaryDark },
  success: { color: '#059669' },
  warning: { color: '#d97706' },
  danger: { color: '#dc2626' },
  info: { color: '#2563eb' },
};

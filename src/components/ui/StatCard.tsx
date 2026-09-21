import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing, FontSize, FontWeight, Shadow } from '../../constants/theme';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  style?: ViewStyle;
}

export function StatCard({ label, value, icon, color = Colors.primary, style }: StatCardProps) {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <View style={[styles.iconCircle, { backgroundColor: `${color}15` }]}>
          {icon}
        </View>
      )}
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    ...Shadow.sm,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  value: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.black,
  },
});

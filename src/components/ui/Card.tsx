import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Shadow, Spacing, FontSize, FontWeight } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'accent' | 'success' | 'warning' | 'danger';
  style?: ViewStyle;
}

export function Card({ children, title, subtitle, icon, variant = 'default', style }: CardProps) {
  return (
    <View style={[styles.base, variantStyles[variant], style]}>
      {(title || icon) && (
        <View style={styles.header}>
          {icon && <View style={styles.iconWrap}>{icon}</View>}
          <View style={styles.headerText}>
            {title && (
              <Text style={[styles.title, variant !== 'default' && variant !== 'elevated' ? styles.titleInverse : undefined]}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={[styles.subtitle, variant !== 'default' && variant !== 'elevated' ? styles.subtitleInverse : undefined]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconWrap: {
    marginRight: Spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  titleInverse: {
    color: Colors.textInverse,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  subtitleInverse: {
    color: 'rgba(255,255,255,0.75)',
  },
});

const variantStyles: Record<string, ViewStyle> = {
  default: {},
  elevated: { ...Shadow.md, borderColor: 'transparent' },
  accent: { backgroundColor: Colors.accent, borderColor: 'transparent' },
  success: { backgroundColor: Colors.success, borderColor: 'transparent' },
  warning: { backgroundColor: Colors.warning, borderColor: 'transparent' },
  danger: { backgroundColor: Colors.danger, borderColor: 'transparent' },
};

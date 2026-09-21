import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Radius, FontSize, FontWeight, Shadow, Spacing } from '../../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.textInverse}
        />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              textVariantStyles[variant],
              textSizeStyles[size],
              icon ? { marginLeft: Spacing.sm } : undefined,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
  },
  text: {
    fontWeight: FontWeight.bold,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: Colors.primary,
    ...Shadow.md,
  },
  secondary: {
    backgroundColor: Colors.surfaceMuted,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: Colors.danger,
    ...Shadow.md,
  },
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg },
  md: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl },
  lg: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing['2xl'] },
};

const textVariantStyles: Record<ButtonVariant, TextStyle> = {
  primary: { color: Colors.textInverse },
  secondary: { color: Colors.textPrimary },
  outline: { color: Colors.textPrimary },
  ghost: { color: Colors.primary },
  danger: { color: Colors.textInverse },
};

const textSizeStyles: Record<ButtonSize, TextStyle> = {
  sm: { fontSize: FontSize.sm },
  md: { fontSize: FontSize.md },
  lg: { fontSize: FontSize.lg },
};

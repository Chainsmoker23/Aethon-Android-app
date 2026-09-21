// Aethon Health Android — Color Palette & Design Tokens
// Matches the web app's Tailwind theme for brand consistency

export const Colors = {
  // Brand
  primary: '#3b82f6',       // Blue-500
  primaryDark: '#2563eb',   // Blue-600
  primaryLight: '#dbeafe',  // Blue-100
  accent: '#8b5cf6',        // Violet-500
  accentDark: '#7c3aed',    // Violet-600
  accentLight: '#ede9fe',   // Violet-100

  // Semantic
  success: '#10b981',       // Emerald-500
  successLight: '#d1fae5',  // Emerald-100
  warning: '#f59e0b',       // Amber-500
  warningLight: '#fef3c7',  // Amber-100
  danger: '#ef4444',        // Red-500
  dangerLight: '#fee2e2',   // Red-100

  // Neutrals
  background: '#f8fafc',    // Slate-50
  surface: '#ffffff',
  surfaceMuted: '#f1f5f9',  // Slate-100
  border: '#e2e8f0',        // Slate-200
  borderLight: '#f1f5f9',   // Slate-100

  // Text
  textPrimary: '#0f172a',   // Slate-900
  textSecondary: '#475569', // Slate-600
  textMuted: '#94a3b8',     // Slate-400
  textInverse: '#ffffff',

  // Dark mode overrides (for future use)
  dark: {
    background: '#0a0a0a',
    surface: '#18181b',
    surfaceMuted: '#27272a',
    border: '#3f3f46',
    textPrimary: '#fafafa',
    textSecondary: '#a1a1aa',
    textMuted: '#71717a',
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  black: '900' as const,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
// import { supabase } from '../../utils/supabase'; // TODO: Wire up actual auth
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';

const { width } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

const GEMINI_PALETTES = [
  ['rgba(167,243,252,0.8)', 'rgba(191,219,254,0.9)'], // Gemini Cyan/Blue
  ['rgba(249,168,212,0.8)', 'rgba(216,180,254,0.9)'], // Soft Pink/Purple
];

function AuraFog() {
  const colorIndex = useRef(0);
  const fadeOut = useRef(new Animated.Value(1)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  const [colors, setColors] = React.useState({
    current: GEMINI_PALETTES[0],
    next: GEMINI_PALETTES[1],
  });

  useEffect(() => {
    const cycle = () => {
      const nextIdx = (colorIndex.current + 1) % GEMINI_PALETTES.length;
      fadeOut.setValue(1);
      fadeIn.setValue(0);
      setColors({ current: GEMINI_PALETTES[colorIndex.current], next: GEMINI_PALETTES[nextIdx] });

      Animated.parallel([
        Animated.timing(fadeOut, { toValue: 0, duration: 6000, useNativeDriver: true }),
        Animated.timing(fadeIn, { toValue: 1, duration: 6000, useNativeDriver: true }),
      ]).start(() => {
        colorIndex.current = nextIdx;
        cycle();
      });
    };
    const timer = setTimeout(cycle, 4000);
    return () => clearTimeout(timer);
  }, []);

  const renderFogLayer = (colorLeft: string, colorRight: string, opacity: Animated.Value) => (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
      <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0)', colorLeft]} locations={[0, 0.55, 1]} style={StyleSheet.absoluteFill} />
      <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0)', colorRight]} locations={[0, 0.65, 1]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
    </Animated.View>
  );

  return (
    <View style={styles.auraContainer}>
      {renderFogLayer(colors.current[0], colors.current[1], fadeOut)}
      {renderFogLayer(colors.next[0], colors.next[1], fadeIn)}
    </View>
  );
}

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLogin = () => {
    // TODO: Wire up actual Google OAuth with Supabase here
    navigation.replace('RoleSelector');
  };

  const animatePress = (inPress: boolean) => {
    Animated.spring(scaleAnim, { toValue: inPress ? 0.95 : 1, useNativeDriver: true, speed: 20 }).start();
  };

  return (
    <View style={styles.container}>
      <AuraFog />

      <View style={[styles.content, { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 40 }]}>
        
        <View style={styles.header}>
          <Image 
            source={require('../../../assets/logo.jpg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sign in to Aethon</Text>
          <Text style={styles.subtitle}>Secure access for family and care teams</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPressIn={() => animatePress(true)}
              onPressOut={() => animatePress(false)}
              onPress={handleLogin}
            >
              <View style={styles.googleButton}>
                <Image 
                  source={require('../../../assets/google-icon.png')} 
                  style={styles.googleIcon} 
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  auraContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: '10%',
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 32,
    borderRadius: 28,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -1,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 100,
    width: '100%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  termsText: {
    marginTop: 24,
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});

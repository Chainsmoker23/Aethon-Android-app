import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Image, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { Feather } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase'; // Connected to real backend!

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
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-check if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigation.replace('RoleSelector');
      }
    });
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Login Failed', error.message);
      setLoading(false);
    } else {
      // Login successful!
      navigation.replace('RoleSelector');
    }
  };

  return (
    <View style={styles.container}>
      <AuraFog />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.content, { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 40 }]}
      >
        
        <View style={styles.header}>
          <Image 
            source={require('../../../assets/logo.jpg')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sign in to Aethon</Text>
          <Text style={styles.subtitle}>Secure access for family and care teams</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrap}>
            <Feather name="mail" size={20} color="#94a3b8" />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <View style={styles.inputWrap}>
            <Feather name="lock" size={20} color="#94a3b8" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            style={[styles.loginBtn, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginBtnText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
          </TouchableOpacity>
          
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </KeyboardAvoidingView>
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
    marginTop: '5%',
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 24,
    borderRadius: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    marginBottom: 20,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  loginBtn: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  termsText: {
    marginTop: 24,
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
});

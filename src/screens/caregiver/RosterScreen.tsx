import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const ROSTER = [
  { id: '1', name: 'Martha Bauer', room: '2A', age: 82, condition: 'Post-op recovery' },
  { id: '2', name: 'Hans Schmidt', room: '3B', age: 76, condition: 'Mobility support' },
  { id: '3', name: 'Elsa Keller', room: '1C', age: 89, condition: 'Dementia care' },
  { id: '4', name: 'Klaus Wagner', room: '2B', age: 71, condition: 'General care' },
];

export default function RosterScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Facility Roster</Text>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#94a3b8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search residents by name or room..."
          placeholderTextColor="#94a3b8"
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Assigned to You ({ROSTER.length})</Text>
        
        {ROSTER.map(res => (
          <TouchableOpacity key={res.id} style={styles.rosterCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {res.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{res.name}</Text>
              <Text style={styles.details}>Room {res.room} • {res.age} yrs • {res.condition}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#cbd5e1" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    marginHorizontal: 24,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 24,
    marginBottom: 24,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  rosterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f3ff', // Violet tint
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#7c3aed',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
});

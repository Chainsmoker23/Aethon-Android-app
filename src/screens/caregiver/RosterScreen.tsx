import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { useShift } from '../../context/ShiftContext';

type Resident = {
  id: string;
  first_name: string;
  last_name: string;
  room_number: string | null;
  care_stage: string;
};

export default function RosterScreen() {
  const insets = useSafeAreaInsets();
  const { pinnedResidentIds, togglePin, isPinned } = useShift();
  
  const [residents, setResidents] = useState<Resident[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchResidents();
    }, [])
  );

  const fetchResidents = async () => {
    try {
      const { data, error } = await supabase
        .from('residents')
        .select('id, first_name, last_name, room_number, care_stage')
        .order('last_name', { ascending: true });

      if (error) throw error;
      if (data) setResidents(data);
    } catch (error) {
      console.error('Error fetching residents:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResidents = residents.filter(r => {
    const fullName = `${r.first_name} ${r.last_name}`.toLowerCase();
    const query = search.toLowerCase();
    return fullName.includes(query) || (r.room_number?.toLowerCase().includes(query));
  });

  const pinnedResidents = filteredResidents.filter(r => isPinned(r.id));
  const unpinnedResidents = filteredResidents.filter(r => !isPinned(r.id));

  const renderResidentCard = (res: Resident) => (
    <TouchableOpacity key={res.id} style={styles.rosterCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {res.first_name[0]}{res.last_name[0]}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{res.first_name} {res.last_name}</Text>
        <Text style={styles.details}>
          {res.room_number ? `Room ${res.room_number}` : 'No Room'} • {res.care_stage}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.pinButton} 
        onPress={() => togglePin(res.id)}
      >
        <Feather 
          name="star" 
          size={22} 
          color={isPinned(res.id) ? "#fbbf24" : "#cbd5e1"} 
          style={isPinned(res.id) ? styles.starFilled : {}}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Facility Roster</Text>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#94a3b8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or room..."
          placeholderTextColor="#94a3b8"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      
      {loading && !refreshing ? (
        <ActivityIndicator style={{ marginTop: 40 }} color="#0f172a" />
      ) : (
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={async () => {
                setRefreshing(true);
                await fetchResidents();
                setRefreshing(false);
              }}
              tintColor="#7c3aed"
            />
          }
        >
          
          {pinnedResidents.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>My Pinned Patients ({pinnedResidents.length})</Text>
              {pinnedResidents.map(renderResidentCard)}
              <View style={styles.divider} />
            </>
          )}

          <Text style={styles.sectionTitle}>All Residents ({unpinnedResidents.length})</Text>
          {unpinnedResidents.length === 0 && (
            <Text style={{color: '#94a3b8', marginLeft: 4}}>No other residents found.</Text>
          )}
          {unpinnedResidents.map(renderResidentCard)}
          
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#0f172a' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 24, paddingHorizontal: 16, height: 50, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 16 },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16, color: '#0f172a' },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 100 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12, marginTop: 8 },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 16 },
  
  rosterCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#64748b' },
  info: { flex: 1, marginLeft: 16 },
  name: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  details: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  pinButton: { padding: 8, marginRight: -8 },
  starFilled: { color: '#fbbf24' }
});


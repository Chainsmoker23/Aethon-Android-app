import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RESIDENTS = [
  'Martha Bauer',
  'Hans Schmidt',
  'Elsa Keller',
];

const MOODS = [
  { icon: 'smile', label: 'Good', color: '#10b981', bg: '#d1fae5' },
  { icon: 'meh', label: 'Okay', color: '#f59e0b', bg: '#fef3c7' },
  { icon: 'frown', label: 'Poor', color: '#ef4444', bg: '#fee2e2' },
];

export default function LogNoteScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  const [selectedResident, setSelectedResident] = useState(RESIDENTS[0]);
  const [selectedMood, setSelectedMood] = useState(MOODS[0].label);
  const [note, setNote] = useState('');

  const handleSave = () => {
    // Navigate back to the Caregiver Home (in a real app, this saves to Supabase)
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={0}
    >
      {/* Custom Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log Care Note</Text>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={!note.trim()}>
          <Text style={[styles.saveBtnText, !note.trim() && { color: '#94a3b8' }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        
        {/* Resident Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select Resident</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {RESIDENTS.map(res => (
              <TouchableOpacity 
                key={res}
                style={[
                  styles.pill,
                  selectedResident === res ? styles.pillActive : styles.pillInactive
                ]}
                onPress={() => setSelectedResident(res)}
              >
                <Text style={[
                  styles.pillText,
                  selectedResident === res ? styles.pillTextActive : styles.pillTextInactive
                ]}>{res}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Vitals: Mood */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Patient Mood</Text>
          <View style={styles.moodContainer}>
            {MOODS.map(mood => {
              const isActive = selectedMood === mood.label;
              return (
                <TouchableOpacity 
                  key={mood.label}
                  style={[
                    styles.moodCard,
                    isActive ? { borderColor: mood.color, backgroundColor: mood.bg } : { borderColor: '#e2e8f0' }
                  ]}
                  onPress={() => setSelectedMood(mood.label)}
                >
                  <Feather name={mood.icon as any} size={24} color={isActive ? mood.color : '#94a3b8'} />
                  <Text style={[
                    styles.moodLabel,
                    isActive ? { color: mood.color } : { color: '#64748b' }
                  ]}>{mood.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Note Entry */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Clinical Note</Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Record observations, treatments, and general status..."
              placeholderTextColor="#94a3b8"
              multiline
              textAlignVertical="top"
              value={note}
              onChangeText={setNote}
            />
          </View>
        </View>

        {/* Attachments */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Attachments</Text>
          <TouchableOpacity style={styles.attachBox}>
            <Feather name="camera" size={24} color="#7c3aed" />
            <Text style={styles.attachText}>Add Photo or Document</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // Very subtle gray background for the form
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    zIndex: 10,
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  saveBtn: {
    padding: 8,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7c3aed', // Clinical Violet
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  pillInactive: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
  },
  pillText: {
    fontSize: 15,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#ffffff',
  },
  pillTextInactive: {
    color: '#64748b',
  },
  moodContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  moodCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: '#ffffff',
  },
  moodLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '700',
  },
  inputWrap: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  input: {
    height: 150,
    padding: 16,
    fontSize: 16,
    color: '#0f172a',
    lineHeight: 24,
  },
  attachBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f3ff', // Light violet tint
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ddd6fe',
    gap: 12,
  },
  attachText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6d28d9',
  },
});

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

const PRIORITIES = [
  { id: 'low', label: 'Low', color: '#64748b', bg: '#f1f5f9', border: '#e2e8f0', icon: 'info' },
  { id: 'medium', label: 'Medium', color: '#d97706', bg: '#fef3c7', border: '#fde68a', icon: 'alert-circle' },
  { id: 'high', label: 'High', color: '#dc2626', bg: '#fee2e2', border: '#fecaca', icon: 'alert-triangle' },
];

const REASONS = [
  'Medical Attention',
  'Behavioral Issue',
  'Fall / Injury',
  'Equipment Failure',
  'Family Request',
  'Other',
];

export default function EscalationScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  const [selectedResident, setSelectedResident] = useState(RESIDENTS[0]);
  const [selectedPriority, setSelectedPriority] = useState(PRIORITIES[2].id); // Default to High for escalations
  const [selectedReason, setSelectedReason] = useState(REASONS[0]);
  const [details, setDetails] = useState('');

  const handleEscalate = () => {
    // In a real app, this would trigger an alert/push notification via Supabase
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Feather name="alert-triangle" size={16} color="#dc2626" />
          <Text style={styles.headerTitle}>New Escalation</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Resident</Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Priority Level</Text>
          <View style={styles.priorityContainer}>
            {PRIORITIES.map(priority => {
              const isActive = selectedPriority === priority.id;
              return (
                <TouchableOpacity 
                  key={priority.id}
                  style={[
                    styles.priorityCard,
                    isActive ? { borderColor: priority.border, backgroundColor: priority.bg } : { borderColor: '#e2e8f0', backgroundColor: '#ffffff' }
                  ]}
                  onPress={() => setSelectedPriority(priority.id)}
                >
                  <Feather name={priority.icon as any} size={20} color={isActive ? priority.color : '#94a3b8'} />
                  <Text style={[
                    styles.priorityLabel,
                    isActive ? { color: priority.color } : { color: '#64748b' }
                  ]}>{priority.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Reason</Text>
          <View style={styles.reasonWrap}>
            {REASONS.map(reason => {
              const isActive = selectedReason === reason;
              return (
                <TouchableOpacity 
                  key={reason}
                  style={[
                    styles.reasonChip,
                    isActive ? styles.reasonChipActive : styles.reasonChipInactive
                  ]}
                  onPress={() => setSelectedReason(reason)}
                >
                  <Text style={[
                    styles.reasonChipText,
                    isActive ? styles.reasonChipTextActive : styles.reasonChipTextInactive
                  ]}>{reason}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Additional Details</Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              placeholder="Provide specific details about the escalation..."
              placeholderTextColor="#94a3b8"
              multiline
              textAlignVertical="top"
              value={details}
              onChangeText={setDetails}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.submitBtn, !details.trim() && styles.submitBtnDisabled]} 
          onPress={handleEscalate}
          disabled={!details.trim()}
        >
          <Feather name="bell" size={20} color="#ffffff" />
          <Text style={styles.submitBtnText}>Submit Escalation</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
    width: 40,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
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
    backgroundColor: '#0f172a', // Deep slate for selection
    borderColor: '#0f172a',
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
  priorityContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  priorityLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '700',
  },
  reasonWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  reasonChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  reasonChipActive: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
  },
  reasonChipInactive: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
  },
  reasonChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  reasonChipTextActive: {
    color: '#dc2626',
  },
  reasonChipTextInactive: {
    color: '#64748b',
  },
  inputWrap: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  input: {
    height: 120,
    padding: 16,
    fontSize: 16,
    color: '#0f172a',
    lineHeight: 24,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: '#dc2626', // Urgent red
    gap: 10,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnDisabled: {
    backgroundColor: '#f1f5f9',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const ALERTS = [
  { id: '1', resident: 'Martha Bauer', room: '2A', type: 'Medication', message: 'Pain medication due in 15 mins.', time: 'Just now' },
  { id: '2', resident: 'Hans Schmidt', room: '3B', type: 'System', message: 'Bed sensor disconnected.', time: '12 mins ago' },
  { id: '3', resident: 'Elsa Keller', room: '1C', type: 'Family', message: 'Family member left a new message.', time: '1h ago' },
];

export default function AlertsScreen() {
  const insets = useSafeAreaInsets();
  const [alerts, setAlerts] = useState(ALERTS);

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Active Alerts</Text>
        <TouchableOpacity>
          <Text style={styles.headerAction}>Clear All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {alerts.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="bell-off" size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
            <Text style={styles.emptyTitle}>No active alerts</Text>
            <Text style={styles.emptyDesc}>You are all caught up for this shift.</Text>
          </View>
        ) : (
          alerts.map(alert => (
            <View key={alert.id} style={styles.alertCard}>
              <View style={styles.alertHeader}>
                <Text style={styles.alertType}>{alert.type}</Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
              <Text style={styles.alertResident}>{alert.resident} • Room {alert.room}</Text>
              <Text style={styles.alertMessage}>{alert.message}</Text>
              <TouchableOpacity style={styles.dismissBtn} onPress={() => dismissAlert(alert.id)}>
                <Text style={styles.dismissBtnText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  headerAction: {
    fontSize: 15,
    fontWeight: '600',
    color: '#7c3aed',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  alertCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  alertType: {
    fontSize: 12,
    fontWeight: '700',
    color: '#dc2626',
    textTransform: 'uppercase',
  },
  alertTime: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  alertResident: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 16,
  },
  dismissBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  dismissBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
  },
});

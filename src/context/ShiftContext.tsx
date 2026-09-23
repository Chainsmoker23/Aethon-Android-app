import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ShiftContextType = {
  pinnedResidentIds: string[];
  togglePin: (id: string) => void;
  isPinned: (id: string) => boolean;
  clearPins: () => void;
};

const ShiftContext = createContext<ShiftContextType | undefined>(undefined);

const PIN_STORAGE_KEY = '@aethon_pinned_residents';

export function ShiftProvider({ children }: { children: React.ReactNode }) {
  const [pinnedResidentIds, setPinnedResidentIds] = useState<string[]>([]);

  // Load pins on mount
  useEffect(() => {
    const loadPins = async () => {
      try {
        const stored = await AsyncStorage.getItem(PIN_STORAGE_KEY);
        if (stored) {
          setPinnedResidentIds(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Failed to load pins", err);
      }
    };
    loadPins();
  }, []);

  // Save pins whenever they change
  useEffect(() => {
    const savePins = async () => {
      try {
        await AsyncStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(pinnedResidentIds));
      } catch (err) {
        console.error("Failed to save pins", err);
      }
    };
    savePins();
  }, [pinnedResidentIds]);

  const togglePin = (id: string) => {
    setPinnedResidentIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const isPinned = (id: string) => pinnedResidentIds.includes(id);

  const clearPins = () => {
    setPinnedResidentIds([]);
  };

  return (
    <ShiftContext.Provider value={{ pinnedResidentIds, togglePin, isPinned, clearPins }}>
      {children}
    </ShiftContext.Provider>
  );
}

export function useShift() {
  const context = useContext(ShiftContext);
  if (context === undefined) {
    throw new Error('useShift must be used within a ShiftProvider');
  }
  return context;
}

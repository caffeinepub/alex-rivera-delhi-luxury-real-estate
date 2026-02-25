import React, { createContext, useContext, useState, useCallback } from 'react';

interface CompareContextType {
  compareIds: string[];
  toggleCompare: (propertyId: string) => boolean;
  isInCompare: (propertyId: string) => boolean;
  clearCompare: () => void;
  compareCount: number;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const toggleCompare = useCallback((propertyId: string): boolean => {
    let success = false;
    setCompareIds(prev => {
      if (prev.includes(propertyId)) {
        success = true;
        return prev.filter(id => id !== propertyId);
      }
      if (prev.length >= 3) {
        success = false;
        return prev;
      }
      success = true;
      return [...prev, propertyId];
    });
    return success;
  }, []);

  const isInCompare = useCallback((propertyId: string) => {
    return compareIds.includes(propertyId);
  }, [compareIds]);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
  }, []);

  return (
    <CompareContext.Provider value={{
      compareIds,
      toggleCompare,
      isInCompare,
      clearCompare,
      compareCount: compareIds.length,
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}

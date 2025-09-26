import { useState, useCallback } from 'react';
import { ArchivedItem, ArchivedItemsState, ArchivedItemsActions } from './types';

interface UseArchivedItemsReturn extends ArchivedItemsState, ArchivedItemsActions {}

export const useArchivedItems = (): UseArchivedItemsReturn => {
  const [state, setState] = useState<ArchivedItemsState>({
    items: [],
    loading: false,
    error: null,
  });

  const addArchivedItem = useCallback((item: Omit<ArchivedItem, 'deletedAt'>) => {
    const archivedItem: ArchivedItem = {
      ...item,
      deletedAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      items: [archivedItem, ...prev.items],
    }));
  }, []);

  const restoreArchivedItem = useCallback((id: string): ArchivedItem | null => {
    let restoredItem: ArchivedItem | null = null;

    setState(prev => {
      const item = prev.items.find(item => item.id === id);
      if (item) {
        restoredItem = item;
        return {
          ...prev,
          items: prev.items.filter(item => item.id !== id),
        };
      }
      return prev;
    });

    return restoredItem;
  }, []);

  const removeArchivedItem = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  }, []);

  const permanentlyDeleteItem = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  }, []);

  const clearArchivedItems = useCallback(() => {
    setState(prev => ({
      ...prev,
      items: [],
    }));
  }, []);

  return {
    ...state,
    addArchivedItem,
    restoreArchivedItem,
    removeArchivedItem,
    permanentlyDeleteItem,
    clearArchivedItems,
  };
};

import { useEffect } from 'react';

/**
 * Custom hook to sync state across browser tabs/windows using storage events
 * 
 * Use this for data that should be shared across tabs (e.g., exams, registrations).
 * Do NOT use for tab-specific state (e.g., user role, UI state).
 * 
 * @param callback Function to call when localStorage changes in another tab
 */
export function useStorageSync(callback: (key: string, newValue: string | null) => void) {
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // StorageEvent is fired when localStorage changes in a DIFFERENT tab/window
      if (e.key && e.storageArea === localStorage) {
        callback(e.key, e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [callback]);
}

/**
 * Broadcasts a storage change to all other tabs (trigger storage event)
 * @param key The localStorage key that changed
 */
export function broadcastStorageChange(key: string) {
  // Dispatch a custom event for same-tab updates if needed
  window.dispatchEvent(new CustomEvent('local-storage-change', { 
    detail: { key, value: localStorage.getItem(key) } 
  }));
}


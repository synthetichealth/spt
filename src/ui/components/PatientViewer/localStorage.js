import { useCallback, useEffect, useState } from 'react';

const dispatchStorageChange = (key, newValue, oldValue) => {
  if (typeof window === 'undefined') return;

  try {
    window.dispatchEvent(
      new StorageEvent('storage', {
        storageArea: window.localStorage,
        url: window.location.href,
        key,
        newValue,
        oldValue,
      }),
    );
  } catch (_e) {
    const event = new Event('storage');
    Object.defineProperties(event, {
      key: { value: key },
      newValue: { value: newValue },
      oldValue: { value: oldValue },
      storageArea: { value: window.localStorage },
    });
    window.dispatchEvent(event);
  }
};

export const readStoredJson = (key, defaultValue = undefined) => {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue == null ? defaultValue : JSON.parse(storedValue);
  } catch (_e) {
    return defaultValue;
  }
};

export const saveStoredJson = (key, value) => {
  if (typeof window === 'undefined') return false;

  try {
    const oldValue = window.localStorage.getItem(key);
    const newValue = JSON.stringify(value);
    window.localStorage.setItem(key, newValue);
    dispatchStorageChange(key, newValue, oldValue);
    return true;
  } catch (_e) {
    return false;
  }
};

export const removeStoredValue = (key) => {
  if (typeof window === 'undefined') return false;

  try {
    const oldValue = window.localStorage.getItem(key);
    window.localStorage.removeItem(key);
    dispatchStorageChange(key, null, oldValue);
    return true;
  } catch (_e) {
    // Ignore storage failures; the current in-memory state can still be shown.
    return false;
  }
};

export const useStoredJson = (key, defaultValue = undefined) => {
  const [storedValue, setStoredValueState] = useState(() => readStoredJson(key, defaultValue));

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleStorageChange = (event) => {
      if (event.key !== key) return;
      if (event.storageArea && event.storageArea !== window.localStorage) return;

      setStoredValueState(readStoredJson(key, defaultValue));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, defaultValue]);

  const setStoredValue = useCallback(
    (nextValue) => {
      setStoredValueState(nextValue);
      saveStoredJson(key, nextValue);
    },
    [key],
  );

  return [storedValue, setStoredValue];
};

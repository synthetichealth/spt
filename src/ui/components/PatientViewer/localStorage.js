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
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (_e) {
    return false;
  }
};

export const removeStoredValue = (key) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(key);
  } catch (_e) {
    // Ignore storage failures; the current in-memory state can still be shown.
  }
};

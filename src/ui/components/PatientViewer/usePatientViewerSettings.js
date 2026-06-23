import useLocalStorage from 'use-local-storage';

import FILTER_PRESETS from './FilterPresets';

const SETTINGS_STORAGE_KEY = 'patient-viewer-settings';

const getStoredValue = (key, defaultValue) => {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue == null ? defaultValue : JSON.parse(storedValue);
  } catch (_e) {
    return defaultValue;
  }
};

const getDefaultSettings = () => {
  const filterPresets = {};

  Object.keys(FILTER_PRESETS).forEach((presetKey) => {
    filterPresets[presetKey] = getStoredValue(presetKey, false);
  });

  return {
    isGroupByEncounter: getStoredValue('group-by-encounter', false),
    filterPresets,
  };
};

const normalizeSettings = (settings) => {
  const defaultSettings = getDefaultSettings();
  const normalizedFilterPresets = { ...defaultSettings.filterPresets };

  Object.keys(FILTER_PRESETS).forEach((presetKey) => {
    if (settings?.filterPresets?.[presetKey] != null) {
      normalizedFilterPresets[presetKey] = settings.filterPresets[presetKey];
    }
  });

  return {
    ...defaultSettings,
    ...settings,
    filterPresets: normalizedFilterPresets,
  };
};

const usePatientViewerSettings = () => {
  const [storedSettings, setStoredSettings] = useLocalStorage(
    SETTINGS_STORAGE_KEY,
    getDefaultSettings(),
  );
  const settings = normalizeSettings(storedSettings);

  const setIsGroupByEncounter = (isGroupByEncounter) => {
    setStoredSettings({
      ...settings,
      isGroupByEncounter,
    });
  };

  const setFilterPreset = (presetKey, isLoaded) => {
    setStoredSettings({
      ...settings,
      filterPresets: {
        ...settings.filterPresets,
        [presetKey]: isLoaded,
      },
    });
  };

  return {
    settings,
    setIsGroupByEncounter,
    setFilterPreset,
  };
};

export default usePatientViewerSettings;

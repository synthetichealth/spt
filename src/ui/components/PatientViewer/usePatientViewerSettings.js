import { useMemo } from 'react';

import FILTER_PRESETS from './FilterPresets';
import { readStoredJson, useStoredJson } from './localStorage';

const SETTINGS_STORAGE_KEY = 'patient-viewer-settings';

const getDefaultSettings = () => {
  const filterPresets = {};

  Object.keys(FILTER_PRESETS).forEach((presetKey) => {
    filterPresets[presetKey] = readStoredJson(presetKey, false);
  });

  return {
    isGroupByEncounter: readStoredJson('group-by-encounter', false),
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
  const defaultSettings = useMemo(() => getDefaultSettings(), []);
  const [storedSettings, setStoredSettings] = useStoredJson(SETTINGS_STORAGE_KEY, defaultSettings);
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

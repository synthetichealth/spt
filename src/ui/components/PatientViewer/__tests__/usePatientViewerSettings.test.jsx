/**
 * @jest-environment jsdom
 */
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import FILTER_PRESETS from '../FilterPresets';
import usePatientViewerSettings from '../usePatientViewerSettings';

const presetKey = Object.keys(FILTER_PRESETS)[0];

const SettingsConsumer = ({ name }) => {
  const { settings, setFilterPreset } = usePatientViewerSettings();

  return (
    <div>
      <span id={`${name}-value`}>{String(settings.filterPresets[presetKey])}</span>
      <button type="button" onClick={() => setFilterPreset(presetKey, true)}>
        update {name}
      </button>
    </div>
  );
};

describe('usePatientViewerSettings', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    window.localStorage.clear();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    window.localStorage.clear();
  });

  test('syncs settings changes across hook instances without a refresh', () => {
    act(() => {
      root.render(
        <>
          <SettingsConsumer name="first" />
          <SettingsConsumer name="second" />
        </>,
      );
    });

    expect(container.querySelector('#first-value').textContent).toBe('false');
    expect(container.querySelector('#second-value').textContent).toBe('false');

    act(() => {
      container.querySelector('button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.querySelector('#first-value').textContent).toBe('true');
    expect(container.querySelector('#second-value').textContent).toBe('true');
  });
});

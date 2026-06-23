/**
 * @jest-environment jsdom
 */
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import PatientViewer from '../PatientViewer';

const mockGetPatientById = jest.fn();
const mockUploadedBundle = { current: null };

jest.mock('../../SyntheticMass/api', () => ({
  getPatientById: (...args) => mockGetPatientById(...args),
}));

jest.mock('../../../github', () => ({
  getPatientOnGitHub: jest.fn(),
}));

jest.mock('../csvToFhir', () => jest.fn());

jest.mock('../usePatientViewerSettings', () => () => ({
  settings: {
    isGroupByEncounter: false,
    filterPresets: {},
  },
  setIsGroupByEncounter: jest.fn(),
}));

jest.mock('fhir-visualizers', () => ({
  PatientVisualizer: ({ patient }) => <div>Patient: {patient?.name?.[0]?.family}</div>,
}));

jest.mock(
  '../Settings',
  () =>
    function MockSettings() {
      return <div>Settings</div>;
    },
);

jest.mock('../../ResourceTables/ResourceTables', () => {
  const MockTable = () => <div />;

  return {
    ConditionsTable: MockTable,
    ObservationsTable: MockTable,
    ReportsTable: MockTable,
    MedicationRequestsTable: MockTable,
    AllergiesTable: MockTable,
    CarePlansTable: MockTable,
    ProceduresTable: MockTable,
    EncountersTable: MockTable,
    ImmunizationsTable: MockTable,
    DocumentReferencesTable: MockTable,
    MediasTable: MockTable,
  };
});

jest.mock('react-router-hash-link', () => ({
  HashLink: ({ children }) => <a href="/">{children}</a>,
}));

jest.mock(
  'react-dropzone',
  () =>
    function MockDropzone({ children, onDrop }) {
      return (
        <div>
          <button
            type="button"
            onClick={() =>
              onDrop([new File([JSON.stringify(mockUploadedBundle.current)], 'patient.json')])
            }
          >
            Upload Bundle
          </button>
          {children({
            getRootProps: () => ({}),
            getInputProps: () => ({}),
          })}
        </div>
      );
    },
);

const makeBundle = (id, family) => ({
  resourceType: 'Bundle',
  entry: [
    {
      resource: {
        resourceType: 'Patient',
        id,
        name: [{ given: ['Test'], family }],
      },
    },
  ],
});

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

const clickButton = async (container, text) => {
  const button = Array.from(container.querySelectorAll('button')).find(
    (candidate) => candidate.textContent === text,
  );

  await act(async () => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
  });
};

describe('PatientViewer', () => {
  let container;
  let root;
  let setItemSpy;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    window.localStorage.clear();
    mockGetPatientById.mockReset();
    mockUploadedBundle.current = null;
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    window.localStorage.clear();
    setItemSpy?.mockRestore();
  });

  test('reloads a source-backed patient even when the old previousBundle entry is stale', async () => {
    const mariaBundle = makeBundle('maria', 'Pare');
    const elenaBundle = makeBundle('elena', 'Rivera');

    window.localStorage.setItem('previousBundle', JSON.stringify(mariaBundle));
    mockGetPatientById.mockResolvedValue(elenaBundle);

    const originalSetItem = Storage.prototype.setItem;
    setItemSpy = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(function setItem(key, value) {
        if (key === 'previousBundle' && value.includes('Rivera')) {
          throw new Error('quota exceeded');
        }

        return Reflect.apply(originalSetItem, this, [key, value]);
      });

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/record_viewer?patient=elena']}>
          <PatientViewer />
        </MemoryRouter>,
      );
      await flushPromises();
    });

    expect(container.textContent).toContain('Patient: Rivera');
    expect(JSON.parse(window.localStorage.getItem('previousPatientId'))).toBe('elena');
    expect(window.localStorage.getItem('previousBundle')).toBeNull();

    act(() => {
      root.unmount();
    });

    root = createRoot(container);
    mockGetPatientById.mockClear();

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/record_viewer']}>
          <PatientViewer />
        </MemoryRouter>,
      );
      await flushPromises();
    });

    expect(container.textContent).toContain('Reload Last Patient');

    await clickButton(container, 'Reload Last Patient');

    expect(mockGetPatientById).toHaveBeenCalledWith('elena');
    expect(container.textContent).toContain('Patient: Rivera');
  });

  test('reloads the last uploaded file bundle instead of a stale previousBundle', async () => {
    const mariaBundle = makeBundle('maria', 'Pare');
    const elenaBundle = makeBundle('elena', 'Rivera');

    window.localStorage.setItem('previousBundle', JSON.stringify(mariaBundle));
    mockUploadedBundle.current = elenaBundle;

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/record_viewer']}>
          <PatientViewer />
        </MemoryRouter>,
      );
      await flushPromises();
    });

    await clickButton(container, 'Upload Bundle');

    expect(container.textContent).toContain('Patient: Rivera');
    expect(JSON.parse(window.localStorage.getItem('previousBundle'))).toEqual(elenaBundle);
    expect(window.localStorage.getItem('previousPatientId')).toBeNull();

    act(() => {
      root.unmount();
    });

    root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/record_viewer']}>
          <PatientViewer />
        </MemoryRouter>,
      );
      await flushPromises();
    });

    await clickButton(container, 'Reload Last Patient');

    expect(container.textContent).toContain('Patient: Rivera');
    expect(container.textContent).not.toContain('Patient: Pare');
  });

  test('clears a stale previousBundle when the last uploaded file is too large to save', async () => {
    const mariaBundle = makeBundle('maria', 'Pare');
    const elenaBundle = makeBundle('elena', 'Rivera');

    window.localStorage.setItem('previousBundle', JSON.stringify(mariaBundle));
    mockUploadedBundle.current = elenaBundle;

    const originalSetItem = Storage.prototype.setItem;
    setItemSpy = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(function setItem(key, value) {
        if (key === 'previousBundle' && value.includes('Rivera')) {
          throw new Error('quota exceeded');
        }

        return Reflect.apply(originalSetItem, this, [key, value]);
      });

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/record_viewer']}>
          <PatientViewer />
        </MemoryRouter>,
      );
      await flushPromises();
    });

    await clickButton(container, 'Upload Bundle');

    expect(container.textContent).toContain('Patient: Rivera');
    expect(window.localStorage.getItem('previousBundle')).toBeNull();

    act(() => {
      root.unmount();
    });

    root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/record_viewer']}>
          <PatientViewer />
        </MemoryRouter>,
      );
      await flushPromises();
    });

    expect(container.textContent).not.toContain('Reload Last Patient');
  });
});

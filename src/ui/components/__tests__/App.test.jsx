/**
 * @jest-environment jsdom
 */
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';

const renderApp = async (root) => {
  await act(async () => {
    root.render(<App />);
    await Promise.resolve();
  });
};

jest.mock(
  '../PatientViewer',
  () =>
    function MockPatientViewer() {
      return <div>Patient Viewer Screen</div>;
    },
);

jest.mock(
  '../Customizer',
  () =>
    function MockCustomizer() {
      return <div>Synthea Customizer Screen</div>;
    },
);

jest.mock('../Collections', () => {
  const PropTypes = require('prop-types');

  function MockCollections({ selectedCollection }) {
    return <div>Collection Screen: {selectedCollection}</div>;
  }

  MockCollections.propTypes = {
    selectedCollection: PropTypes.string.isRequired,
  };

  return MockCollections;
});

describe('App', () => {
  let container;
  let root;

  beforeEach(() => {
    window.location.hash = '#/';
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  test('renders the routed application shell', async () => {
    await renderApp(root);

    expect(container.textContent).toContain('Synthea Toolkit');
    expect(container.textContent).toContain('Patient Viewer');
    expect(container.textContent).toContain('Synthea Customizer');
    expect(container.textContent).toContain('Patient Viewer Screen');
  });

  test('renders the not-found route', async () => {
    window.location.hash = '#/missing';

    await renderApp(root);

    expect(container.textContent).toContain('Page not found');
    expect(container.textContent).toContain('return to home');
  });
});

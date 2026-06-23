import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import theme from './styles/theme';
import './app.css';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ConstructionIcon from '@mui/icons-material/Construction';

import Layout from './Layout';
import PatientViewer from './PatientViewer';
import Customizer from './Customizer';
import Collections from './Collections';
import { COLLECTIONS } from './Collections/config';
import NotFound from './NotFound';

const queryClient = new QueryClient();

const offline = process.env.FRONTEND_ONLY === 'true';

// App Routes:
// path must start with '/'
// if label is false no navlink will render in sidebar
// if icon is blank it will default to DashboardIcon
const routes = [
  // HashRouter Path, Nav Label, Rendered React Component, Icon (optional)
  { path: '/', label: false, element: <PatientViewer /> },
  {
    path: '/record_viewer',
    label: 'Patient Viewer',
    element: <PatientViewer />,
    icon: <PersonSearchIcon fontSize="large" color="primary" />,
  },
  {
    path: '/customizer',
    label: 'Synthea Customizer',
    element: <Customizer />,
    icon: <ConstructionIcon fontSize="large" color="primary" />,
  },

  ...COLLECTIONS.map(({ name, label }) => ({
    path: `/${name}`,
    label: offline ? false : label,
    element: <Collections selectedCollection={name} />,
  })),

  // this must be last:
  { path: '/*', label: false, element: <NotFound /> },
];

function App() {
  return (
    <div className={'app'}>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Layout routes={routes} />
          </ThemeProvider>
        </StyledEngineProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;

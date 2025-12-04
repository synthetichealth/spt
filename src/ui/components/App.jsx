import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import theme from './styles/theme';
import './app.css';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import Layout from './Layout';
import PatientViewer from './PatientViewer';
import Collections from './Collections';
import NotFound from './NotFound';

const queryClient = new QueryClient();

const offline = process.env.FRONTEND_ONLY === 'true';

// App Routes:
// path must start with '/'
// if label is false no navlink will render in sidebar
// if icon is blank it will default to DashboardIcon
const routes = [
  // HashRouter Path,          Nav Label,                                    Rendered React Component,   Icon (optional)
  { path: '/', label: false, element: <PatientViewer /> },
  {
    path: '/record_viewer',
    label: 'Patient Viewer',
    element: <PatientViewer />,
    icon: <PersonSearchIcon fontSize="large" color="primary" />,
  },

  // collections
  {
    path: '/patients',
    label: offline ? false : 'Patients',
    element: <Collections selectedCollection="patients" />,
  },
  {
    path: '/allergies',
    label: offline ? false : 'Allergies',
    element: <Collections selectedCollection="allergies" />,
  },
  {
    path: '/careplans',
    label: offline ? false : 'Careplans',
    element: <Collections selectedCollection="careplans" />,
  },
  {
    path: '/conditions',
    label: offline ? false : 'Conditions',
    element: <Collections selectedCollection="conditions" />,
  },
  {
    path: '/devices',
    label: offline ? false : 'Devices',
    element: <Collections selectedCollection="devices" />,
  },
  {
    path: '/encounters',
    label: offline ? false : 'Encounters',
    element: <Collections selectedCollection="encounters" />,
  },
  {
    path: '/imaging_studies',
    label: offline ? false : 'Imaging Studies',
    element: <Collections selectedCollection="imaging_studies" />,
  },
  {
    path: '/immunizations',
    label: offline ? false : 'Immunizations',
    element: <Collections selectedCollection="immunizations" />,
  },
  {
    path: '/medications',
    label: offline ? false : 'Medications',
    element: <Collections selectedCollection="medications" />,
  },
  {
    path: '/observations',
    label: offline ? false : 'Observations',
    element: <Collections selectedCollection="observations" />,
  },
  {
    path: '/organizations',
    label: offline ? false : 'Organizations',
    element: <Collections selectedCollection="organizations" />,
  },
  {
    path: '/payer_transitions',
    label: offline ? false : 'Payer Transitions',
    element: <Collections selectedCollection="payer_transitions" />,
  },
  {
    path: '/payers',
    label: offline ? false : 'Payers',
    element: <Collections selectedCollection="payers" />,
  },
  {
    path: '/procedures',
    label: offline ? false : 'Procedures',
    element: <Collections selectedCollection="procedures" />,
  },
  {
    path: '/providers',
    label: offline ? false : 'Providers',
    element: <Collections selectedCollection="providers" />,
  },
  {
    path: '/supplies',
    label: offline ? false : 'Supplies',
    element: <Collections selectedCollection="supplies" />,
  },

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

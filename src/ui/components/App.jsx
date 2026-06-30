import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import theme from './styles/theme';
import './app.css';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ConstructionIcon from '@mui/icons-material/Construction';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HealingIcon from '@mui/icons-material/Healing';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MedicationIcon from '@mui/icons-material/Medication';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import SickIcon from '@mui/icons-material/Sick';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Layout from './Layout';
import PatientViewer from './PatientViewer';
import Customizer from './Customizer';
import Collections from './Collections';
import { COLLECTIONS } from './Collections/config';
import CSVFileManager from './CSVFileManager';
import NotFound from './NotFound';

const queryClient = new QueryClient();

const offline = process.env.FRONTEND_ONLY === 'true';
const collectionIconProps = { fontSize: 'large', color: 'primary' };
const collectionIcons = {
  allergies: <HealthAndSafetyIcon {...collectionIconProps} />,
  careplans: <AssignmentIcon {...collectionIconProps} />,
  conditions: <SickIcon {...collectionIconProps} />,
  devices: <DevicesOtherIcon {...collectionIconProps} />,
  encounters: <LocalHospitalIcon {...collectionIconProps} />,
  imaging_studies: <VisibilityIcon {...collectionIconProps} />,
  immunizations: <VaccinesIcon {...collectionIconProps} />,
  medications: <MedicationIcon {...collectionIconProps} />,
  observations: <MonitorHeartIcon {...collectionIconProps} />,
  organizations: <BusinessIcon {...collectionIconProps} />,
  patients: <PersonIcon {...collectionIconProps} />,
  payer_transitions: <CreditCardIcon {...collectionIconProps} />,
  payers: <PaidIcon {...collectionIconProps} />,
  procedures: <HealingIcon {...collectionIconProps} />,
  providers: <MedicalInformationIcon {...collectionIconProps} />,
  supplies: <Inventory2Icon {...collectionIconProps} />,
};

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
  {
    path: '/load_csvs',
    label: offline ? false : 'Load CSVs',
    element: <CSVFileManager />,
    icon: <UploadFileIcon fontSize="large" color="primary" />,
  },

  ...COLLECTIONS.map(({ name, label }) => ({
    path: `/${name}`,
    label: offline ? false : label,
    element: <Collections selectedCollection={name} />,
    icon: collectionIcons[name] || <FactCheckIcon {...collectionIconProps} />,
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

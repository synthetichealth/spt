import React, { useState, useEffect, useMemo, memo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import useStyles from './styles';
import Sidebar from './Sidebar';
import Collections from '../Collections';
import Dashboard from './Dashboard';

import PatientViewer from '../PatientViewer';
import SyntheticMass from '../SyntheticMass';
import Customizer from '../Customizer';
// import CSVPatientViewer from '../CSVPatientViewer';

function DashboardLayout() {
  const classes = useStyles();
  const [contentKey, setContentKey] = useState('dashboard');

  const location = useLocation();
  const history = useHistory();

  // can do useMemo to update labels like notifications
  const tabs = useMemo(() => {
    return [
      {
        key: 'dashboard',
        label: 'Dashboard',
        offline: true,
        component: <Dashboard />
      },
      {
        key: 'record_viewer',
        label: 'Patient Viewer',
        offline: true,
        component: <PatientViewer />
      },
      {
        key: 'customizer',
        label: 'Synthea Customizer',
        offline: true,
        component: <Customizer />
      },
      // {
      //   key: 'syntheticmass',
      //   label: 'SyntheticMass',
      //   offline: true,
      //   component: <SyntheticMass />
      // },
      { key: 'csv', label: 'CSV', component: null },
      { key: 'load_csv', label: 'Load Files', component: null },
      // {
      //   key: 'csv_patient_viewer',
      //   label: 'CSV Patient Viewer',
      //   component: <CSVPatientViewer />
      // },
      {
        key: 'patients',
        label: 'Patients',
        component: <Collections selectedCollection="patients" />
      },
      {
        key: 'allergies',
        label: 'Allergies',
        component: <Collections selectedCollection="allergies" />
      },
      {
        key: 'careplans',
        label: 'Careplans',
        component: <Collections selectedCollection="careplans" />
      },
      {
        key: 'conditions',
        label: 'Conditions',
        component: <Collections selectedCollection="conditions" />
      },
      {
        key: 'devices',
        label: 'Devices',
        component: <Collections selectedCollection="devices" />
      },
      {
        key: 'encounters',
        label: 'Encounters',
        component: <Collections selectedCollection="encounters" />
      },
      {
        key: 'imaging_studies',
        label: 'Imaging Studies',
        component: <Collections selectedCollection="imaging_studies" />
      },
      {
        key: 'immunizations',
        label: 'Immunizations',
        component: <Collections selectedCollection="immunizations" />
      },
      {
        key: 'medications',
        label: 'Medications',
        component: <Collections selectedCollection="medications" />
      },
      {
        key: 'observations',
        label: 'Observations',
        component: <Collections selectedCollection="observations" />
      },
      {
        key: 'organizations',
        label: 'Organizations',
        component: <Collections selectedCollection="organizations" />
      },

      {
        key: 'payer_transitions',
        label: 'Payer Transitions',
        component: <Collections selectedCollection="payer_transitions" />
      },

      { key: 'payers', label: 'Payers', component: <Collections selectedCollection="payers" /> },

      {
        key: 'procedures',
        label: 'Procedures',
        component: <Collections selectedCollection="procedures" />
      },

      {
        key: 'providers',
        label: 'Providers',
        component: <Collections selectedCollection="providers" />
      },

      {
        key: 'supplies',
        label: 'Supplies',
        component: <Collections selectedCollection="supplies" />
      }
    ];
  });

  useEffect(() => {
    const path = location.pathname.slice(1);
    if (path && path.length && tabs.find(t => t.key === path)) {
      setContentKey(path);
    }
  }, [location]);

  const content = useMemo(() => {
    return (
      tabs.find(tab => {
        return tab.key === contentKey;
      }) || tabs[0]
    );
  }, [contentKey, tabs]);

  const redirectCallback = key => history.push(`/${key}`);

  return (
    <div className={classes.container}>
      <Sidebar tabs={tabs} callback={redirectCallback} selected={contentKey} />
      <main className={classes.content}>{content.component}</main>
    </div>
  );
}

export default memo(DashboardLayout);

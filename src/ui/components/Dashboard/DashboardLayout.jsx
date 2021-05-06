import React, { useState, useEffect, useMemo, memo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import useStyles from './styles';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import Collections from '../Collections';
import Dashboard from './Dashboard';

import PatientViewer from '../PatientViewer';
import SyntheticMass from '../SyntheticMass';

function DashboardLayout() {
  const classes = useStyles();
  const [contentKey, setContentKey] = useState('dashboard');

  const location = useLocation();
  const history = useHistory();

  // can do useMemo to update labels like notifications
  const tabs = useMemo(() => {
    return [
      { key: 'dashboard', label: 'Dashboard', offline: true, component: (<div></div>) },
      { key: 'record_viewer', label: 'Patient Viewer', offline: true, component: <PatientViewer /> },
      { key: 'syntheticmass', label: 'SyntheticMass', offline: true, component: <SyntheticMass /> },
      { key: 'collections', label: 'Collections', component: null },
      { key: 'servers', label: 'Servers', component: <Collections selectedCollection="servers" /> },
      {
        key: 'endpoints',
        label: 'Endpoints',
        component: <Collections selectedCollection="endpoints" />
      },
      {
        key: 'subscriptions',
        label: 'Subscriptions',
        component: <Collections selectedCollection="subscriptions" />
      },
      {
        key: 'plandefinitions',
        label: 'Plan Definitions',
        component: <Collections selectedCollection="plandefinitions" />
      },
      { key: 'logs', label: 'Logs', component: <Collections selectedCollection="logs" /> },
      {
        key: 'completedreports',
        label: 'Completed Reports',
        component: <Collections selectedCollection="completedreports" />
      },
      {
        key: 'reporting',
        label: 'Reporting',
        component: <Collections selectedCollection="reporting" />
      },
      { key: 'errors', label: 'Errors', component: <Collections selectedCollection="errors" /> },
      {
        key: 'requests',
        label: 'Requests',
        component: <Collections selectedCollection="requests" />
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
    return tabs.find(tab => {
      return tab.key === contentKey;
    }) || tabs[0];
  }, [contentKey, tabs]);

  const redirectCallback = key => history.push(`/${key}`);

  return (
    <div className={classes.container}>
      <Sidebar tabs={tabs} callback={redirectCallback} selected={contentKey} />
      <main className={classes.content}>
        {content.component}
      </main>
    </div>
  );
}

export default memo(DashboardLayout);

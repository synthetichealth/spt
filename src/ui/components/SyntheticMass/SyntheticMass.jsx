import React from 'react';
import { useLocation } from 'react-router-dom';

import StateMap from './StateMap';
import PatientList from './PatientList';
import PatientViewer from '../PatientViewer';

const SyntheticMass = () => {
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const city = urlParams.get('city');
  const patient = urlParams.get('patient');

  return (
    <div>
      <StateMap />
      {city && <PatientList city={city} />}
      {patient && <PatientViewer id={patient} />}
    </div>
  );
};

export default SyntheticMass;

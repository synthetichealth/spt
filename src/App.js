import React from 'react';
import './App.css';
import { PatientVisualizer, ConditionsVisualizer, ObservationsVisualizer } from 'fhir-visualizers';

import bundle from './demo_data.json';


export default class App extends React.Component {

  render() {
  	const allResources = bundle.entry.map(e => e.resource);
  	const patient = allResources.find(r => r.resourceType === 'Patient');
  	const conditions = allResources.filter(r => r.resourceType === 'Condition');
  	const observations = allResources.filter(r => r.resourceType === 'Observation');

    return (
      <div>
        <PatientVisualizer patient={patient} />
        <ConditionsVisualizer rows={conditions}/>
        <ObservationsVisualizer rows={observations} />
      </div>
    );
  }
}
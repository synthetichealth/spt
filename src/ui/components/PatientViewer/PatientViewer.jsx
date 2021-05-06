import React, { useState, useEffect } from 'react';
import { 
  PatientVisualizer,
  ConditionsVisualizer,
  ObservationsVisualizer,
  ReportsVisualizer,
  MedicationsVisualizer,
  AllergiesVisualizer,
  CarePlansVisualizer,
  ProceduresVisualizer,
  EncountersVisualizer,
  ImmunizationsVisualizer,
  DocumentReferencesVisualizer
} from 'fhir-visualizers';

import Dropzone from 'react-dropzone';

import './PatientViewer.css';

const isMatchingReference = (entry, reference, resourceType) => {
  return entry.id === reference
    || ('urn:uuid:'+entry.id) === reference
    || (resourceType+'/'+entry.id) === reference;
}

const getDropzone = (setLoading, callback) => {
  const onDrop = files => {
      const reader = new FileReader();
      reader.readAsText(files[0]);
      setLoading(true);
      reader.onload = () => {
        if (reader.result) {
          const json = JSON.parse(reader.result);
          setLoading(false);
          callback(json);
        }
      };
    };

  return  (
    <Dropzone onDrop={onDrop}>
      {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps(
            { style: { height: '100vh', width: '100%', background: '#F0F8FF' } }
            )}>
            <input {...getInputProps()} />
            <p>Drag n drop a FHIR JSON file here, or click to select a file</p>
          </div>
        </section>
      )}
    </Dropzone>
    );
}

const PatientViewer = (props) => {
  const [bundle, setBundle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  if (!bundle) return getDropzone(setIsLoading, setBundle);

  if (isLoading) return <img src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp" alt="loading..." />;

  const allResources = bundle.entry.map(e => e.resource);
  const patient = allResources.find(r => r.resourceType === 'Patient');

  const getByType = (type) => allResources.filter(r => r.resourceType === type);
  const conditions = getByType('Condition');
  const medications = getByType('MedicationRequest');
  let observations = getByType('Observation');
  const reports = getByType('DiagnosticReport');

  reports.forEach(r => {
    if (r.result) {
      r.observations = r.result.map(res => observations.find(o => isMatchingReference(o, res.reference, 'Observation')));
      observations = observations.filter(o => !r.observations.includes(o));
    }
    
  });

  const careplans = getByType('CarePlan');
  let goals = getByType('Goal');
  // note that the syntheticmass server doesn't currently return goals in Patient$everything

  careplans.forEach(cp => {
    if (cp.goal) {
      cp.goals = cp.goal.map(cpg => goals.find(g => isMatchingReference(g, cpg.reference, 'Goal'))).filter(g => g);
    }
  });

  const procedures = getByType('Procedure');
  const encounters = getByType('Encounter');
  const allergies = getByType('AllergyIntolerance');
  const immunizations = getByType('Immunization');
  const documents = getByType('DocumentReference');

  return (
      <div style={{ background: '#fff' }}>
        <PatientVisualizer patient={patient} />
        <ConditionsVisualizer rows={conditions} />
        <MedicationsVisualizer rows={medications} />
        <ObservationsVisualizer rows={observations} />
        <ReportsVisualizer rows={reports} />
        <CarePlansVisualizer rows={careplans} />
        <ProceduresVisualizer rows={procedures} />
        <EncountersVisualizer rows={encounters} />
        <AllergiesVisualizer rows={allergies} />
        <ImmunizationsVisualizer rows={immunizations} />
        <DocumentReferencesVisualizer rows={documents} />
      </div>
    );
};

export default PatientViewer;
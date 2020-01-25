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
  ImmunizationsVisualizer
} from 'fhir-visualizers';
import { useParams } from "react-router-dom";

import { getPatientById } from '../syntheticmass_api';

const isMatchingReference = (entry, reference, resourceType) => {
  return entry.id === reference
    || ('urn:uuid:'+entry.id) === reference
    || (resourceType+'/'+entry.id) === reference;
}

const PatientViewer = (props) => {
  const { id } = useParams();

  const [bundle, setBundle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPatientById(id)
      .then(patientEverythingBundle => {
        setBundle(patientEverythingBundle);
        setIsLoading(false);
      });
  }, [id]);  

  if (isLoading) return <img src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp" alt="loading..." />;

  const allResources = bundle.entry.map(e => e.resource);
  const patient = allResources.find(r => r.resourceType === 'Patient');

  const getByType = (type) => allResources.filter(r => r.resourceType === type);
  const conditions = getByType('Condition');
  const medications = getByType('MedicationRequest');
  let observations = getByType('Observation');
  const reports = getByType('DiagnosticReport');

  reports.forEach(r => {
    r.observations = r.result.map(res => observations.find(o => isMatchingReference(o, res.reference, 'Observation')));
    observations = observations.filter(o => !r.observations.includes(o));
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

  return (
      <div>
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
      </div>
    );
};

export default PatientViewer;
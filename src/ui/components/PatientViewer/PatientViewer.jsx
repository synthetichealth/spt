import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import {
  PatientVisualizer
} from 'fhir-visualizers';
import {
  ConditionsTable,
  ObservationsTable,
  ReportsTable,
  MedicationRequestsTable,
  AllergiesTable,
  CarePlansTable,
  ProceduresTable,
  EncountersTable,
  ImmunizationsTable,
  DocumentReferencesTable
} from '../ResourceTables/ResourceTables';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';

import EncounterGroupedRecord from './EncounterGroupedRecord';

import Settings from './Settings';

import { isMatchingReference } from './utils';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

import Dropzone from 'react-dropzone';

import { getPatientById } from '../SyntheticMass/api';
import { getPatientOnGitHub } from '../../github';
import csvToFhir from './csvToFhir';

import { evaluateResource, appliesToResource } from '../../fhirpath_utils';

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

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <>
          <div
            {...getRootProps({
              style: { height: '100vh', width: '100%', background: '#F0F8FF', padding: "2rem" }
            })}
          >
            <input {...getInputProps()} />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100%"
            >
              <Box sx={{ p: 2, border: '1px dashed grey', textAlign: 'center' }}>
                <h2>Drag &amp; drop a FHIR JSON file here</h2>
                <h2>or <span style={{textDecoration: 'underline', color: 'blue'}}>click to select a file</span>.</h2>
              </Box>
            </Box>
          </div>
        </>
      )}
    </Dropzone>
  );
};

function getPatient(id) {
  if (id.startsWith('csv/')) {
    return csvToFhir(id.slice(4)); // slice off the "csv/" bit
  } else if (id.startsWith('github/')) {
    return getPatientOnGitHub(id);
  } else {
    return getPatientById(id);
  }
}

const PatientViewer = props => {
  const location = useLocation();
  const [urlParams, setUrlParams] = useSearchParams();

  const id = props.id || urlParams.get('patient');

  const [bundle, _setBundle] = useState();
  const [previousBundle, setPreviousBundle] = useLocalStorage("previousBundle", bundle);
  const [isLoading, setIsLoading] = useState(!bundle);

  const setBundle = (bundle) => {
    _setBundle(bundle);
    setPreviousBundle(bundle);
    setIsLoading(false);
  }



  const [isGroupByEncounter, setIsGroupByEncounter] = useLocalStorage("group-by-encounter", false);
  const [filters, setFilters] = useLocalStorage("filters", {});
  const [filterMode, setFilterMode] = useLocalStorage("filter-mode", "include");

  // TODO: probably a better way to make these generic. don't want to pass around 100 variables for different settings
  const [hideStoppedMeds, setHideStoppedMeds] = useLocalStorage("Hide Stopped Medications", false);
  const [hideResolvedConditions, setHideResolvedConditions] = useLocalStorage("Hide Resolved Conditions", false);

  useEffect(() => {
    if (id && !bundle) {
      setIsLoading(true);
      getPatient(id).then(patientEverythingBundle => {
        setBundle(patientEverythingBundle);
      });
    }
  }, [id, bundle]);

  if (!id && !bundle) {
    return (
      <>
      { previousBundle && 
        <Button variant="contained" onClick={() => setBundle(previousBundle)} style={{textTransform: "none"}}>Reload Last Patient</Button>
      } 
      { getDropzone(setIsLoading, setBundle) }
      </>

    );
  }

  if (isLoading)
    return <img src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp" alt="loading..." />;

  let allResources = bundle.entry.map(e => e.resource);

  if (Object.keys(filters).length) {
    allResources = allResources.filter(r => {
      const filtersByResourceType = filters[r.resourceType];
      if (!filtersByResourceType) return true;

      const anyMatch = filtersByResourceType.some(f => appliesToResource(r, f));
      return filterMode === 'exclude' ? !anyMatch : anyMatch;
    });
  }

  const patient = allResources.find(r => r.resourceType === 'Patient');

  const toggleGroup = event => {
    event.preventDefault();
    setIsGroupByEncounter(!isGroupByEncounter);
  };

  return (
    <Paper style={{margin: "1rem", padding: "1rem"}}>
      <Settings />
      <PatientVisualizer patient={patient} />

      <a href="#" onClick={toggleGroup}>
        { isGroupByEncounter ? "Ungroup" : "Group" } by Encounter
      </a>
      <br/>

      { isGroupByEncounter ? (
          <EncounterGroupedRecord allResources={allResources} />
        ) : (
        // !isGroupByEncounter
        <>
          <LinksByType />
          <EntireRecord 
            allResources={allResources} 
            hideResolvedConditions={hideResolvedConditions}
            hideStoppedMeds={hideStoppedMeds} />
        </>
        )}

    </Paper>
  );

};

const LinksByType = () => {
  const types = [
    'Conditions',
    'Medications',
    'Observations',
    'Reports',
    'CarePlans',
    'Procedures',
    'Encounters',
    'Allergies',
    'Immunizations',
    'Documents'
  ];
  const location = useLocation();
  return (
    <div>
      Jump To:<br />
        {types.map((t, i) => {
          // newLocation preserves any query, like if we're in a patient via syntheticmass
          const newLocation = { ...location, hash: '#' + t };
          return (
              <>
              { i > 0 && ' | ' }
              <Link to={newLocation}>{t}</Link>
              </>
          );
        })}
    </div>
  );
};

const EntireRecord = props => {
  const { allResources, hideStoppedMeds, hideResolvedConditions } = props;
  const getByType = type => allResources.filter(r => r.resourceType === type);
  let conditions = getByType('Condition');
  if (hideResolvedConditions) {
    conditions = conditions.filter(c => !c.abatementDateTime);
  }

  let medications = getByType('MedicationRequest');
  if (hideStoppedMeds) {
    medications = medications.filter(m => m.status !== 'stopped');
  }

  const meds = getByType('Medication');
  medications.forEach(m => {
    if (m.medicationReference) {
      const referencedMed = meds.find(med => isMatchingReference(med, m.medicationReference.reference, 'Medication'));
      if (referencedMed) {
        m.medicationCodeableConcept = referencedMed.code;
      }
    }
  });

  let observations = getByType('Observation');
  const reports = getByType('DiagnosticReport');

  reports.forEach(r => {
    if (r.result) {
      r.observations = r.result.map(res =>
        observations.find(o => isMatchingReference(o, res.reference, 'Observation'))
      );
      observations = observations.filter(o => !r.observations.includes(o));
    }
  });

  const careplans = getByType('CarePlan');
  const goals = getByType('Goal');
  // note that the syntheticmass server doesn't currently return goals in Patient$everything

  careplans.forEach(cp => {
    if (cp.goal) {
      cp.goals = cp.goal
        .map(cpg => goals.find(g => isMatchingReference(g, cpg.reference, 'Goal')))
        .filter(g => g);
    }
  });

  const procedures = getByType('Procedure');
  const encounters = getByType('Encounter');
  const allergies = getByType('AllergyIntolerance');
  const immunizations = getByType('Immunization');
  const documents = getByType('DocumentReference');

  return (
    <Section
      conditions={conditions}
      medications={medications}
      observations={observations}
      reports={reports}
      careplans={careplans}
      procedures={procedures}
      encounters={encounters}
      allergies={allergies}
      immunizations={immunizations}
      documents={documents}
    />
  );
};


const isNotEmpty = rows => rows != null && rows.length > 0;

const Section = props => {
  const show = props.showEmptySections ? _rows => true : rows => isNotEmpty(rows);
  return (
    <div>
      {show(props.conditions) && <ConditionsTable rows={props.conditions} />}
      {show(props.medications) && <MedicationRequestsTable rows={props.medications} />}
      {show(props.observations) && <ObservationsTable rows={props.observations} />}
      {show(props.reports) && <ReportsTable rows={props.reports} />}
      {show(props.careplans) && <CarePlansTable rows={props.careplans} />}
      {show(props.procedures) && <ProceduresTable rows={props.procedures} />}
      {show(props.encounters) && <EncountersTable rows={props.encounters} />}
      {show(props.allergies) && <AllergiesTable rows={props.allergies} />}
      {show(props.immunizations) && <ImmunizationsTable rows={props.immunizations} />}
      {show(props.documents) && <DocumentReferencesTable rows={props.documents} />}
    </div>
  );
};

export default PatientViewer;

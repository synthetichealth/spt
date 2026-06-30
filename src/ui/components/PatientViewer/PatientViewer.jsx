import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { PatientVisualizer } from 'fhir-visualizers';
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
  DocumentReferencesTable,
  MediasTable,
} from '../ResourceTables/ResourceTables';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import EncounterGroupedRecord from './EncounterGroupedRecord';

import Settings from './Settings';

import { attachImagingStudy, isMatchingReference, withDerivedFields } from './utils';

import Dropzone from 'react-dropzone';

import { getPatientOnGitHub } from '../../github';
import csvToFhir from './csvToFhir';

import { appliesToResource } from '../../fhirpath_utils';

import FILTER_PRESETS from './FilterPresets';
import usePatientViewerSettings from './usePatientViewerSettings';
import { readStoredJson, removeStoredValue, saveStoredJson } from './localStorage';

const PREVIOUS_BUNDLE_KEY = 'previousBundle';
const PREVIOUS_PATIENT_ID_KEY = 'previousPatientId';

const savePreviousSourcePatient = (sourceId) => {
  removeStoredValue(PREVIOUS_BUNDLE_KEY);

  const isSaved = saveStoredJson(PREVIOUS_PATIENT_ID_KEY, sourceId);
  if (!isSaved) {
    removeStoredValue(PREVIOUS_PATIENT_ID_KEY);
  }

  return isSaved;
};

const savePreviousBundle = (nextBundle) => {
  removeStoredValue(PREVIOUS_PATIENT_ID_KEY);
  removeStoredValue(PREVIOUS_BUNDLE_KEY);

  const isSaved = saveStoredJson(PREVIOUS_BUNDLE_KEY, nextBundle);
  if (!isSaved) {
    removeStoredValue(PREVIOUS_BUNDLE_KEY);
  }

  return isSaved;
};

const validateFhirBundle = (bundle) => {
  if (!bundle || typeof bundle !== 'object') {
    return 'The selected file did not contain a FHIR JSON object.';
  }

  if (bundle.resourceType && bundle.resourceType !== 'Bundle') {
    return `Expected a FHIR Bundle, but found ${bundle.resourceType}.`;
  }

  if (!Array.isArray(bundle.entry)) {
    return 'Expected a FHIR Bundle with an entry array.';
  }

  const invalidEntry = bundle.entry.find((entry) => !entry?.resource?.resourceType);
  if (invalidEntry) {
    return 'Every Bundle entry must contain a resource with a resourceType.';
  }

  return null;
};

const getDropzone = (setLoading, setError, callback) => {
  const onDrop = (files) => {
    if (!files?.length) return;

    const reader = new FileReader();
    reader.readAsText(files[0]);
    setError(null);
    setLoading(true);
    reader.onerror = () => {
      setLoading(false);
      setError('Unable to read the selected file.');
    };
    reader.onload = () => {
      if (reader.result) {
        try {
          const json = JSON.parse(reader.result);
          callback(json);
        } catch (_e) {
          setLoading(false);
          setError('Unable to parse the selected file as JSON.');
        }
      }
    };
  };

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <>
          <div
            {...getRootProps({
              style: {
                minHeight: 'calc(100vh - 180px)',
                width: '100%',
                background: '#F0F8FF',
                padding: '2rem',
                boxSizing: 'border-box',
              },
            })}
          >
            <input {...getInputProps()} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100%',
              }}
            >
              <Box sx={{ p: 2, border: '1px dashed grey', textAlign: 'center' }}>
                <h2>Drag &amp; drop a FHIR JSON file here</h2>
                <h2>
                  or{' '}
                  <span style={{ textDecoration: 'underline', color: 'blue' }}>
                    click to select a file
                  </span>
                  .
                </h2>
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
    return null;
  }
}

const PatientViewer = (props) => {
  const [urlParams] = useSearchParams();

  const id = props.id || urlParams.get('patient');

  const [bundle, _setBundle] = useState();
  const [loadedPatientId, setLoadedPatientId] = useState();
  const pendingPatientId = useRef();
  const [loadError, setLoadError] = useState();
  const [previousBundle, setPreviousBundle] = useState(() => readStoredJson(PREVIOUS_BUNDLE_KEY));
  const [previousPatientId, setPreviousPatientId] = useState(() =>
    readStoredJson(PREVIOUS_PATIENT_ID_KEY),
  );
  const [isLoading, setIsLoading] = useState(!bundle);

  const setBundle = (nextBundle, sourceId) => {
    const validationError = validateFhirBundle(nextBundle);
    if (validationError) {
      _setBundle(undefined);
      setLoadedPatientId(undefined);
      setLoadError(validationError);
      setIsLoading(false);
      return;
    }

    _setBundle(nextBundle);
    if (sourceId) {
      savePreviousSourcePatient(sourceId);
      setPreviousPatientId(sourceId);
      setPreviousBundle(undefined);
    } else {
      const isSaved = savePreviousBundle(nextBundle);
      setPreviousPatientId(undefined);
      setPreviousBundle(isSaved ? nextBundle : undefined);
    }
    setLoadedPatientId(sourceId);
    setLoadError(null);
    setIsLoading(false);
  };

  const { settings, setIsGroupByEncounter } = usePatientViewerSettings();
  const isGroupByEncounter = settings.isGroupByEncounter;
  const loadedPresets = Object.entries(settings.filterPresets)
    .filter((entry) => entry[1])
    .map(([presetKey]) => presetKey);

  const loadPatient = (patientId) => {
    pendingPatientId.current = patientId;
    _setBundle(undefined);
    setLoadError(null);
    setIsLoading(true);

    getPatient(patientId)
      .then((patientEverythingBundle) => {
        if (pendingPatientId.current === patientId) {
          setBundle(patientEverythingBundle, patientId);
        }
      })
      .catch((error) => {
        if (pendingPatientId.current === patientId) {
          _setBundle(undefined);
          setLoadedPatientId(undefined);
          setLoadError(error?.message || 'Unable to load the requested patient.');
          setIsLoading(false);
        }
      })
      .finally(() => {
        if (pendingPatientId.current === patientId) {
          pendingPatientId.current = undefined;
        }
      });
  };

  const reloadPreviousPatient = () => {
    if (previousPatientId) {
      loadPatient(previousPatientId);
    } else {
      setBundle(previousBundle);
    }
  };

  useEffect(() => {
    if (!id || loadedPatientId === id || pendingPatientId.current === id) {
      return undefined;
    }

    loadPatient(id);

    return () => {
      if (pendingPatientId.current === id) {
        pendingPatientId.current = undefined;
      }
    };
  }, [id, loadedPatientId]);

  if (!id && !bundle) {
    return (
      <>
        {loadError && (
          <Alert severity="error" sx={{ m: 2 }}>
            {loadError}
          </Alert>
        )}
        {(previousPatientId || previousBundle) && (
          <Button
            variant="contained"
            onClick={reloadPreviousPatient}
            style={{ textTransform: 'none' }}
          >
            Reload Last Patient
          </Button>
        )}
        {getDropzone(setIsLoading, setLoadError, setBundle)}
      </>
    );
  }

  if (isLoading)
    return <img src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp" alt="loading..." />;

  if (loadError) {
    return (
      <Paper style={{ margin: '1rem', padding: '1rem' }}>
        <Alert severity="error">{loadError}</Alert>
      </Paper>
    );
  }

  let allResources = bundle.entry.map((e) => e.resource);

  for (const presetKey of loadedPresets) {
    const preset = FILTER_PRESETS[presetKey];
    if (isGroupByEncounter && !preset.filterOnGroupByEncounter) continue;
    allResources = allResources.filter((r) => {
      const filtersByResourceType = preset.filters[r.resourceType];
      if (!filtersByResourceType) return true;

      const anyMatch = filtersByResourceType.some((f) => appliesToResource(r, f));
      return preset.mode === 'exclude' ? !anyMatch : anyMatch;
    });
  }

  const patient = allResources.find((r) => r.resourceType === 'Patient');
  const recordSections = buildRecordSections(allResources);

  const toggleGroup = (event) => {
    event.preventDefault();
    setIsGroupByEncounter(!isGroupByEncounter);
  };

  return (
    <Paper className="patient-viewer" style={{ margin: '1rem', padding: '1rem' }}>
      <Settings />
      <PatientVisualizer patient={patient} />

      <a href="#" onClick={toggleGroup}>
        {isGroupByEncounter ? 'Ungroup' : 'Group'} by Encounter
      </a>
      <br />

      {isGroupByEncounter ? (
        <EncounterGroupedRecord allResources={allResources} />
      ) : (
        // !isGroupByEncounter
        <>
          <LinksByType />
          <EntireRecord recordSections={recordSections} />
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
    'Documents',
    'Images',
  ];
  const location = useLocation();
  return (
    <div>
      Jump To:
      <br />
      {types.map((t, i) => {
        // newLocation preserves any query, like if we're in a patient via syntheticmass
        const newLocation = { ...location, hash: '#' + t };
        return (
          <React.Fragment key={t}>
            {i > 0 && ' | '}
            <Link to={newLocation}>{t}</Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const buildRecordSections = (allResources) => {
  const getByType = (type) => allResources.filter((r) => r.resourceType === type);
  const conditions = getByType('Condition');
  const meds = getByType('Medication');

  const medications = getByType('MedicationRequest').map((m) => {
    if (m.medicationReference) {
      const referencedMed = meds.find((med) =>
        isMatchingReference(med, m.medicationReference.reference, 'Medication'),
      );
      if (referencedMed) {
        return withDerivedFields(m, { medicationCodeableConcept: referencedMed.code });
      }
    }
    return m;
  });

  let observations = getByType('Observation');
  const reports = getByType('DiagnosticReport').map((r) => {
    if (r.result) {
      const reportObservations = r.result
        .map((res) =>
          observations.find((o) => isMatchingReference(o, res.reference, 'Observation')),
        )
        .filter((o) => o);
      observations = observations.filter((o) => !reportObservations.includes(o));
      return withDerivedFields(r, { observations: reportObservations });
    }
    return r;
  });

  const goals = getByType('Goal');
  // note that the syntheticmass server doesn't currently return goals in Patient$everything

  const careplans = getByType('CarePlan').map((cp) => {
    if (cp.goal) {
      const carePlanGoals = cp.goal
        .map((cpg) => goals.find((g) => isMatchingReference(g, cpg.reference, 'Goal')))
        .filter((g) => g);
      return withDerivedFields(cp, { goals: carePlanGoals });
    }
    return cp;
  });

  const procedures = getByType('Procedure');
  const encounters = getByType('Encounter');
  const allergies = getByType('AllergyIntolerance');
  const immunizations = getByType('Immunization');
  const documents = getByType('DocumentReference');

  const medias = getByType('Media').map((m) => attachImagingStudy(m, allResources));

  return {
    allResources,
    conditions,
    medications,
    observations,
    reports,
    careplans,
    procedures,
    encounters,
    allergies,
    immunizations,
    documents,
    medias,
  };
};

const EntireRecord = (props) => {
  const { recordSections } = props;

  return (
    <Section
      allResources={recordSections.allResources}
      conditions={recordSections.conditions}
      medications={recordSections.medications}
      observations={recordSections.observations}
      reports={recordSections.reports}
      careplans={recordSections.careplans}
      procedures={recordSections.procedures}
      encounters={recordSections.encounters}
      allergies={recordSections.allergies}
      immunizations={recordSections.immunizations}
      documents={recordSections.documents}
      medias={recordSections.medias}
    />
  );
};

const isNotEmpty = (rows) => rows != null && rows.length > 0;

const Section = (props) => {
  const show = props.showEmptySections ? () => true : (rows) => isNotEmpty(rows);
  const allResources = props.allResources;
  return (
    <div>
      {show(props.conditions) && (
        <ConditionsTable rows={props.conditions} allResources={allResources} />
      )}
      {show(props.medications) && (
        <MedicationRequestsTable rows={props.medications} allResources={allResources} />
      )}
      {show(props.observations) && (
        <ObservationsTable rows={props.observations} allResources={allResources} />
      )}
      {show(props.reports) && <ReportsTable rows={props.reports} allResources={allResources} />}
      {show(props.careplans) && (
        <CarePlansTable rows={props.careplans} allResources={allResources} />
      )}
      {show(props.procedures) && (
        <ProceduresTable rows={props.procedures} allResources={allResources} />
      )}
      {show(props.encounters) && (
        <EncountersTable rows={props.encounters} allResources={allResources} />
      )}
      {show(props.allergies) && (
        <AllergiesTable rows={props.allergies} allResources={allResources} />
      )}
      {show(props.immunizations) && (
        <ImmunizationsTable rows={props.immunizations} allResources={allResources} />
      )}
      {show(props.documents) && (
        <DocumentReferencesTable rows={props.documents} allResources={allResources} />
      )}
      {show(props.medias) && <MediasTable rows={props.medias} allResources={allResources} />}
    </div>
  );
};

export default PatientViewer;

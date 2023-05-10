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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useLocation, useHistory } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

import Dropzone from 'react-dropzone';

import { getPatientById } from '../SyntheticMass/api';
import csvToFhir from './csvToFhir';

const isMatchingReference = (entry, reference, resourceType) => {
  return (
    entry.id === reference ||
    'urn:uuid:' + entry.id === reference ||
    resourceType + '/' + entry.id === reference
  );
};

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
        <section>
          <div
            {...getRootProps({
              style: { height: '100vh', width: '100%', background: '#F0F8FF' }
            })}
          >
            <input {...getInputProps()} />
            <p>Drag n drop a FHIR JSON file here, or click to select a file</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

const SPACER = { title: '', versions: '*', getter: () => '' };

const round = function(num, digits) {
  return Number.parseFloat(num).toFixed(digits);
};

const obsValue = entry => {
  if (entry == null) {
    return '';
  } else if (entry.valueQuantity) {
    return round(entry.valueQuantity.value, 2) + ' ' + entry.valueQuantity.code;
  } else if (entry.valueCodeableConcept) {
    return entry.valueCodeableConcept.coding[0].display;
  } else if (entry.valueString) {
    return entry.valueString;
  }

  if (entry.code.coding[0].display === 'Blood Pressure') {
    if (!entry.component[0].valueQuantity) {
      return ''; // WTF!!
    }

    const v1 = Number.parseFloat(entry.component[0].valueQuantity.value);
    const v2 = Number.parseFloat(entry.component[1].valueQuantity.value);

    const s1 = v1.toFixed(0);
    const s2 = v2.toFixed(0);

    if (v1 > v2) {
      return s1 + ' / ' + s2 + ' mmHg';
    } else {
      return s2 + ' / ' + s1 + ' mmHg';
    }
  }

  return '';
};

function getPatient(id) {
  if (id.startsWith('csv/')) {
    return csvToFhir(id.slice(4)); // slice off the "csv/" bit
  } else {
    return getPatientById(id);
  }
}

const PatientViewer = props => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const id = props.id || urlParams.get('patient');

  const [bundle, setBundle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [isGroupByEncounter, setIsGroupByEncounter] = useState(false);

  useEffect(() => {
    if (id && !bundle) {
      setIsLoading(true);
      getPatient(id).then(patientEverythingBundle => {
        setBundle(patientEverythingBundle);
        setIsLoading(false);
      });
    }
  }, [id, bundle]);

  if (!id && !bundle) return getDropzone(setIsLoading, setBundle);

  if (isLoading)
    return <img src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp" alt="loading..." />;

  const allResources = bundle.entry.map(e => e.resource);
  const patient = allResources.find(r => r.resourceType === 'Patient');

  const toggleGroup = event => {
    event.preventDefault();
    setIsGroupByEncounter(!isGroupByEncounter);
  };

  if (isGroupByEncounter) {
    return (
      <div style={{ background: '#fff' }}>
        <PatientVisualizer patient={patient} />
        <a href="#" onClick={toggleGroup}>
          Ungroup by Encounter
        </a>

        <EncounterGroupedRecord allResources={allResources} />
      </div>
    );
  } else {
    return (
      <div style={{ background: '#fff' }}>
        <PatientVisualizer patient={patient} />
        <a href="#" onClick={toggleGroup}>
          Group by Encounter (Work in Progress)
        </a>
        <LinksByType />
        <EntireRecord allResources={allResources} />
      </div>
    );
  }
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
    'Vaccinations',
    'Documents'
  ];
  const location = useLocation();
  return (
    <div>
      Jump To:
      <ul>
        {types.map(t => {
          // newLocation preserves any query, like if we're in a patient via syntheticmass
          const newLocation = { ...location, hash: '#' + t };
          return (
            <li key={t}>
              <Link to={newLocation}>{t}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const EntireRecord = props => {
  const { allResources } = props;
  const getByType = type => allResources.filter(r => r.resourceType === type);
  const conditions = getByType('Condition');
  const medications = getByType('MedicationRequest');
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

const LinksByEncounter = props => {
  const { encounters } = props;
  const location = useLocation();
  const history = useHistory();

  return (
    <Autocomplete
      id="combo-box-demo"
      options={encounters}
      getOptionLabel={e =>
        `${e.period.start} - ${e.type[0].coding[0].code} ${e.type[0].coding[0].display}`
      }
      onChange={(_event, value, _reason) => {
        const newLocation = { ...location, hash: '#' + value.period.start };
        history.push(newLocation);
        document.getElementById(value.period.start).scrollIntoView();
      }}
      style={{ width: 900 }}
      renderInput={params => <TextField {...params} label="Jump To Encounter" variant="outlined" />}
    />
  );
};

const EncounterGroupedRecord = props => {
  const { allResources } = props;
  const encounters = allResources.filter(r => r.resourceType === 'Encounter').reverse(); // reverse chrono order

  const encounterSections = [];

  for (const e of encounters) {
    const getByType = type =>
      allResources.filter(
        r => r.resourceType === type && isMatchingReference(e, r.encounter?.reference, 'Encounter')
      );

    const medications = getByType('MedicationRequest');

    const conditions = getByType('Condition');

    const observations = getByType('Observation');

    const procedures = getByType('Procedure');
    // const reports = getByType('DiagnosticReport');

    // reports.forEach(r => {
    //   if (r.result) {
    //     r.observations = r.result.map(res => observations.find(o => isMatchingReference(o, res.reference, 'Observation')));
    //     observations = observations.filter(o => !r.observations.includes(o));
    //   }
    // });

    const title = `${e.period.start} - ${e.type[0].coding[0].code} ${e.type[0].coding[0].display}`;

    e.conditions = conditions;
    e.medications = medications;
    e.observations = observations;
    e.procedures = procedures;

    encounterSections.push(
      <div key={title}>
        <ReportsVisualizer
          title={e.period.start}
          columns={[
            {
              title: 'Type',
              versions: '*',
              getter: () => 'Encounter'
            },
            {
              title: 'Code',
              versions: '*',
              getter: n => n.type[0].coding[0].code
            },
            {
              title: 'Description',
              versions: '*',
              getter: n => n.type[0].coding[0].display
            },
            {
              title: 'Details',
              versions: '*',
              format: 'dateTime',
              getter: n => n.period.start
            },
            SPACER
          ]}
          nestedRows={[
            {
              getter: r => r.conditions,
              keyFn: o => o.id,
              columns: [
                {
                  title: 'Type',
                  versions: '*',
                  getter: () => 'Condition'
                },
                {
                  title: 'SNOMED',
                  versions: '*',
                  getter: c => c.code.coding[0].code
                },
                {
                  title: 'Condition',
                  versions: '*',
                  getter: c => c.code.coding[0].display
                },
                SPACER,
                SPACER
              ]
            },
            {
              getter: r => r.procedures,
              keyFn: o => o.id,
              columns: [
                {
                  title: 'Type',
                  versions: '*',
                  getter: () => 'Procedure'
                },
                {
                  title: 'SNOMED',
                  versions: '*',
                  getter: p => p.code.coding[0].code
                },
                {
                  title: 'Procedure',
                  versions: '*',
                  getter: p => p.code.coding[0].display
                },
                {
                  title: 'Date Performed',
                  versions: '*',
                  format: 'date',
                  getter: p => p.performedPeriod.start
                },
                SPACER
              ]
            },
            {
              getter: r => r.medications,
              keyFn: o => o.id,
              columns: [
                {
                  title: 'Type',
                  versions: '*',
                  getter: () => 'Medication'
                },
                {
                  title: 'RxNorm',
                  versions: '*',
                  getter: c => c.medicationCodeableConcept.coding[0].code
                },
                {
                  title: 'Medication',
                  versions: '*',
                  getter: c => c.medicationCodeableConcept.coding[0].display
                },
                {
                  title: 'Date Prescribed',
                  versions: '*',
                  format: 'date',
                  getter: c => c.authoredOn
                },
                { title: 'Status', versions: '*', getter: c => c.status }
              ]
            },
            {
              getter: r => r.observations,
              keyFn: o => o.id,
              columns: [
                {
                  title: 'Type',
                  versions: '*',
                  getter: () => 'Observation'
                },
                {
                  title: 'LOINC',
                  versions: '*',
                  getter: o => o.code.coding[0].code
                },
                {
                  title: 'Report/Observation',
                  versions: '*',
                  getter: o => o.code.coding[0].display
                },
                { title: 'Value', versions: '*', getter: o => obsValue(o) },
                SPACER
              ]
            }
          ]}
          rows={[e]}
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      <LinksByEncounter encounters={encounters} />
      <Accordion allowMultipleExpanded={true}>{encounterSections}</Accordion>;
    </React.Fragment>
  );
};

const isNotEmpty = rows => rows != null && rows.length > 0;

const Section = props => {
  const show = props.showEmptySections ? _rows => true : rows => isNotEmpty(rows);
  return (
    <div>
      {show(props.conditions) && <ConditionsVisualizer rows={props.conditions} />}
      {show(props.medications) && <MedicationsVisualizer rows={props.medications} />}
      {show(props.observations) && <BPGraph observations={props.observations} />}
      {show(props.observations) && <ObservationsVisualizer rows={props.observations} />}
      {show(props.reports) && <ReportsVisualizer rows={props.reports} />}
      {show(props.careplans) && <CarePlansVisualizer rows={props.careplans} />}
      {show(props.procedures) && <ProceduresVisualizer rows={props.procedures} />}
      {show(props.encounters) && <EncountersVisualizer rows={props.encounters} />}
      {show(props.allergies) && <AllergiesVisualizer rows={props.allergies} />}
      {show(props.immunizations) && <ImmunizationsVisualizer rows={props.immunizations} />}
      {show(props.documents) && <DocumentReferencesVisualizer rows={props.documents} />}
    </div>
  );
};

const BPGraph = props => {
  const observations = props.observations;
  const data = [];
  const multiObsBPs = observations.filter(o => o?.code?.coding?.[0]?.code === '85354-9');
  const singleObsBPs = observations.filter(o => ['8462-4', '8480-6'].includes(o?.code?.coding?.[0]?.code));

  multiObsBPs.forEach(o => {
    const sysBP = o.component.find(c => c.code.coding[0].code === '8480-6').valueQuantity.value;
    const diaBP = o.component.find(c => c.code.coding[0].code === '8462-4').valueQuantity.value;

    data.push({ date: o.effectiveDateTime, sysBP, diaBP });
  });

  const singleObsGrouper = {};

  singleObsBPs.forEach(o => {
    const date = o.effectiveDateTime;
    if (!singleObsGrouper[date]) singleObsGrouper[date] = {};
    const code = o.code.coding[0].code;
    if (code === '8480-6') singleObsGrouper[date]['sysBP'] = o.valueQuantity?.value || Number(o.valueString);
    if (code === '8462-4') singleObsGrouper[date]['diaBP'] = o.valueQuantity?.value || Number(o.valueString);
  });

  Object.keys(singleObsGrouper).forEach(date => {
    data.push({ date, ...singleObsGrouper[date]});
  });

  return (
    <LineChart width={730} height={250} data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sysBP" stroke="#8884d8" />
      <Line type="monotone" dataKey="diaBP" stroke="#82ca9d" />
    </LineChart>
    );
}

export default PatientViewer;

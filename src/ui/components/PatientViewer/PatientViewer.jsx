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
import { useParams } from "react-router-dom";

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

import Dropzone from 'react-dropzone';

import { getPatientById } from '../SyntheticMass/api';

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

const SPACER = { title: '', versions: '*', getter: () => '' };

const round = function (num, digits) {
  return Number.parseFloat(num).toFixed(digits);
}

const obsValue = (entry) => {
  if (entry == null) {
    return '';
  } else if (entry.valueQuantity) {
    return round(entry.valueQuantity.value, 2) + ' ' + entry.valueQuantity.code;
  } else if (entry.valueCodeableConcept) {
    return entry.valueCodeableConcept.coding[0].display;
  } else if (entry.valueString) {
    return entry.valueString;
  }

  if (entry.code.coding[0].display === "Blood Pressure") {

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
}

const PatientViewer = (props) => {
  const { id } = props;

  const [bundle, setBundle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [isGroupByEncounter, setIsGroupByEncounter] = useState(false);

  useEffect(() => {
    if (id && !bundle) {
      setIsLoading(true);
      getPatientById(id)
      .then(patientEverythingBundle => {
        setBundle(patientEverythingBundle);
        setIsLoading(false);
      });
    }
  }, [id, bundle]);  

  if (!id && !bundle) return getDropzone(setIsLoading, setBundle);

  if (isLoading) return <img src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp" alt="loading..." />;

  const allResources = bundle.entry.map(e => e.resource);
  const patient = allResources.find(r => r.resourceType === 'Patient');

  const toggleGroup = (event) => {
    event.preventDefault();
    setIsGroupByEncounter(!isGroupByEncounter);
  }

  if (isGroupByEncounter) {
    return (
      <div style={{ background: '#fff' }}>
        <PatientVisualizer patient={patient} />
        <a href="#" onClick={toggleGroup}>Ungroup by Encounter</a>
        <EncounterGroupedRecord allResources={allResources}/>
      </div>
      );
  } else {
    return (
      <div style={{ background: '#fff' }}>
        <PatientVisualizer patient={patient} />
        <a href="#" onClick={toggleGroup}>Group by Encounter (Work in Progress)</a>
        <EntireRecord allResources={allResources}/>
      </div>
      );  
  }
};

const EntireRecord = (props) => {
  const { allResources } = props;
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

const EncounterGroupedRecord = (props) => {
  const { allResources } = props;
  const encounters = allResources.filter(r => r.resourceType === 'Encounter').reverse(); // reverse chrono order

  const encounterSections = [];

  for (const e of encounters) {



    const getByType = (type) => allResources.filter(r => r.resourceType === type && isMatchingReference(e, r.encounter?.reference, 'Encounter') );


    const medications = getByType('MedicationRequest');

    const conditions = getByType('Condition');

    let observations = getByType('Observation');
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

    encounterSections.push(<div>
      <ReportsVisualizer 
        title={e.period.start}
        columns={[
          { title: 'SNOMED', versions: '*', getter: n => n.type[0].coding[0].code },
          { title: 'Encounter', versions: '*', getter: n => n.type[0].coding[0].display },
          { title: 'Start Time', versions: '*', format: 'dateTime', getter: n => n.period.start },
          SPACER
        ]}
        nestedRows={[
          {
            title: 'Conditions',
            getter: r => r.conditions,
            keyFn: o => o.id,
            columns: [
                { title: 'SNOMED', versions: '*', getter: c => c.code.coding[0].code },
                { title: 'Condition', versions: '*', getter: c => c.code.coding[0].display },
                SPACER,
                SPACER
            ]
          },
          {
            getter: r => r.medications,
            keyFn: o => o.id,
            columns: [
              { title: 'RxNorm', versions: '*', getter: c => c.medicationCodeableConcept.coding[0].code },
              { title: 'Medication', versions: '*', getter: c => c.medicationCodeableConcept.coding[0].display },
              { title: 'Date Prescribed', versions: '*', format: 'date', getter: c => c.authoredOn },
              { title: 'Status', 'versions': '*', getter: c => c.status }
            ]
          },
          {
            getter: r => r.observations,
            keyFn: o => o.id,
            columns: [
              { title: 'LOINC', versions: '*', getter: o => o.code.coding[0].code },
              { title: 'Report/Observation', versions: '*', getter: o => o.code.coding[0].display },
              { title: 'Value', versions: '*', getter: o => obsValue(o) },
              SPACER
            ]
          },
        ]}
        rows={[e]}
        />
    </div>);

  }


  return <Accordion allowMultipleExpanded={true}>{encounterSections}</Accordion>;
}

const isNotEmpty = (rows) => rows != null && rows.length > 0;

const Section = (props) => {
  const show = props.showEmptySections ? 
    (_rows) => true : 
    (rows) => isNotEmpty(rows);
  return (
      <div>
        { show(props.conditions) && <ConditionsVisualizer rows={props.conditions} /> }
        { show(props.medications) && <MedicationsVisualizer rows={props.medications} /> }
        { show(props.observations) && <ObservationsVisualizer rows={props.observations} /> }
        { show(props.reports) && <ReportsVisualizer rows={props.reports} /> }
        { show(props.careplans) && <CarePlansVisualizer rows={props.careplans} /> }
        { show(props.procedures) && <ProceduresVisualizer rows={props.procedures} /> }
        { show(props.encounters) && <EncountersVisualizer rows={props.encounters} /> }
        { show(props.allergies) && <AllergiesVisualizer rows={props.allergies} /> }
        { show(props.immunizations) && <ImmunizationsVisualizer rows={props.immunizations} /> }
        { show(props.documents) && <DocumentReferencesVisualizer rows={props.documents} /> }
      </div>
    );
}

export default PatientViewer;
import React from 'react';
import { useLocation } from 'react-router-dom';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import EncounterSection from './EncounterSection';

import { isMatchingReference } from './utils';

const LinksByEncounter = (props) => {
  const { encounters } = props;
  const location = useLocation();

  return (
    <Autocomplete
      id="combo-box-demo"
      options={encounters}
      getOptionLabel={(e) =>
        `${e.period.start} - ${e.type[0].coding[0].code} ${e.type[0].coding[0].display}`
      }
      onChange={(_event, value, _reason) => {
        const newLocation = { ...location, hash: '#' + value.period.start };
        document.getElementById(value.period.start).scrollIntoView();
      }}
      style={{ width: 900 }}
      renderInput={(params) => (
        <TextField {...params} label="Jump To Encounter" variant="outlined" />
      )}
    />
  );
};

const EncounterGroupedRecord = (props) => {
  const { allResources } = props;
  const encounters = allResources.filter((r) => r.resourceType === 'Encounter').reverse(); // reverse chrono order

  const encounterSections = [];

  for (const e of encounters) {
    const getByType = (type) =>
      allResources.filter(
        (r) =>
          r.resourceType === type && isMatchingReference(e, r.encounter?.reference, 'Encounter'),
      );

    const medications = getByType('MedicationRequest');

    const conditions = getByType('Condition');

    const observations = getByType('Observation');

    const procedures = getByType('Procedure');
    const notes = allResources.filter(
      (r) =>
        r.resourceType === 'DocumentReference' &&
        Array.isArray(r.context?.encounter) &&
        isMatchingReference(e, r.context.encounter[0]?.reference, 'Encounter'),
    );
    const medias = getByType('Media');

    medias.forEach((m) => {
      if (m.partOf && m.partOf[0]) {
        const partOf = allResources.find((r) => `urn:uuid:${r.id}` === m.partOf[0].reference);

        if (partOf?.resourceType === 'ImagingStudy') {
          m.partOf[0].resource = partOf;
        }
      }
    });
    // const reports = getByType('DiagnosticReport');

    // reports.forEach(r => {
    //   if (r.result) {
    //     r.observations = r.result.map(res => observations.find(o => isMatchingReference(o, res.reference, 'Observation')));
    //     observations = observations.filter(o => !r.observations.includes(o));
    //   }
    // });

    const title = `${e.period.start} - ${e.type[0].coding[0].code} ${e.type[0].coding[0].display}`;

    const encounterData = {
      encounter: e,
      conditions,
      medications,
      observations,
      procedures,
      notes,
      medias,
    };

    encounterSections.push(
      <div key={title} id={title}>
        <div className="health-record__header">
          <div className="header-title">
            <a id={e.period.start}>{title}</a>
          </div>
          <div className="header-divider"></div>
        </div>
        <EncounterSection encounterData={encounterData} />
      </div>,
    );
  }

  return (
    <React.Fragment>
      <LinksByEncounter encounters={encounters} />
      {encounterSections}
    </React.Fragment>
  );
};

export default EncounterGroupedRecord;

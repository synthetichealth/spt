import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

async function csvToFhir(id) {
  const [patientResp, conditionsResp, medicationsResp, encountersResp, observationsResp] =
    await Promise.all([
      axios.get(`/collection/patients?Id=${id}`),
      axios.get(`/collection/conditions?PATIENT=${id}`),
      axios.get(`/collection/medications?PATIENT=${id}`),
      axios.get(`/collection/encounters?PATIENT=${id}`),
      axios.get(`/collection/observations?PATIENT=${id}`),
    ]);

  // for testing, map these into FHIR

  const patientCSV = patientResp.data[0];
  if (!patientCSV) {
    throw new Error(`No CSV patient found for ${id}.`);
  }

  const conditionsCSV = conditionsResp.data;
  const medicationsCSV = medicationsResp.data;
  const encountersCSV = encountersResp.data;
  const observationsCSV = observationsResp.data;

  const bundle = {
    resourceType: 'Bundle',
    entry: [],
  };

  // Id,BIRTHDATE,DEATHDATE,SSN,DRIVERS,PASSPORT,
  // PREFIX,FIRST,LAST,SUFFIX,MAIDEN,MARITAL,
  // RACE,ETHNICITY,GENDER,BIRTHPLACE,
  // ADDRESS,CITY,STATE,COUNTY,ZIP,LAT,LON,HEALTHCARE_EXPENSES,HEALTHCARE_COVERAGE

  const patientFHIR = {
    resourceType: 'Patient',
    id: id,
    name: [
      {
        use: 'official',
        family: patientCSV.LAST,
        given: [patientCSV.FIRST],
        prefix: [patientCSV.PREFIX],
      },
    ],
    gender: patientCSV.GENDER,
    birthDate: patientCSV.BIRTHDATE,
    address: [
      {
        line: [patientCSV.ADDRESS],
        city: patientCSV.CITY,
        state: patientCSV.STATE,
        postalCode: patientCSV.ZIP,
        country: 'US',
      },
    ],
  };

  const patientURI = `urn:uuid:${id}`;

  bundle.entry.push({ fullUrl: patientURI, resource: patientFHIR });

  // START,STOP,PATIENT,ENCOUNTER,CODE,DESCRIPTION
  conditionsCSV.forEach((c) => {
    const conditionId = c.Id || c.ID || uuidv4();
    const conditionFHIR = {
      resourceType: 'Condition',
      id: conditionId,
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: c.CODE,
            display: c.DESCRIPTION,
          },
        ],
        text: c.DESCRIPTION,
      },
      subject: { reference: patientURI },
      encounter: { reference: `urn:uuid:${c.ENCOUNTER}` },
      onsetDateTime: c.START,
      abatementDateTime: c.STOP,
    };

    bundle.entry.push({ fullUrl: `urn:uuid:${conditionId}`, resource: conditionFHIR });
  });

  // Id,START,STOP,PATIENT,ORGANIZATION,PROVIDER,PAYER,
  // ENCOUNTERCLASS,CODE,DESCRIPTION,
  // BASE_ENCOUNTER_COST,TOTAL_CLAIM_COST,PAYER_COVERAGE,
  // REASONCODE,REASONDESCRIPTION

  encountersCSV.forEach((e) => {
    const encounterId = e.Id || e.ID || uuidv4();
    const encounterFHIR = {
      resourceType: 'Encounter',
      id: encounterId,
      class: {
        code: e.ENCOUNTERCLASS,
      },
      type: [
        {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: e.CODE,
              display: e.DESCRIPTION,
            },
          ],
          text: e.DESCRIPTION,
        },
      ],
      subject: {
        reference: patientURI,
      },
      period: {
        start: e.START,
        end: e.STOP,
      },
    };

    bundle.entry.push({ fullUrl: `urn:uuid:${encounterId}`, resource: encounterFHIR });
  });

  // START,STOP,PATIENT,PAYER,ENCOUNTER,CODE,DESCRIPTION,
  // BASE_COST,PAYER_COVERAGE,DISPENSES,TOTALCOST,REASONCODE,REASONDESCRIPTION

  medicationsCSV.forEach((m) => {
    const medicationId = m.Id || m.ID || uuidv4();
    const medicationFHIR = {
      resourceType: 'MedicationRequest',
      id: medicationId,
      status: m.STOP ? `stopped ${m.STOP}` : 'active',
      intent: 'order',
      medicationCodeableConcept: {
        coding: [
          {
            system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
            code: m.CODE,
            display: m.DESCRIPTION,
          },
        ],
        text: m.DESCRIPTION,
      },
      subject: {
        reference: patientURI,
      },
      encounter: {
        reference: `urn:uuid:${m.ENCOUNTER}`,
      },
      authoredOn: m.START,
    };

    bundle.entry.push({ fullUrl: `urn:uuid:${medicationId}`, resource: medicationFHIR });
  });

  // DATE,PATIENT,ENCOUNTER,CODE,DESCRIPTION,VALUE,UNITS,TYPE
  observationsCSV.forEach((o) => {
    const observationId = o.Id || o.ID || uuidv4();
    const observationFHIR = {
      resourceType: 'Observation',
      id: observationId,
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: o.CODE,
            display: o.DESCRIPTION,
          },
        ],
        text: o.DESCRIPTION,
      },
      subject: {
        reference: patientURI,
      },
      encounter: {
        reference: `urn:uuid:${o.ENCOUNTER}`,
      },
      effectiveDateTime: o.DATE,
    };

    if ((o.TYPE || o.type) === 'numeric') {
      const numericValue = Number.parseFloat(o.VALUE);
      observationFHIR.valueQuantity = {
        value: Number.isNaN(numericValue) ? o.VALUE : numericValue,
        code: o.UNITS,
        unit: o.UNITS,
      };
    } else {
      observationFHIR.valueString = o.VALUE;
    }

    bundle.entry.push({ fullUrl: `urn:uuid:${observationId}`, resource: observationFHIR });
  });

  bundle.entry.reverse();

  return bundle;
}
export default csvToFhir;

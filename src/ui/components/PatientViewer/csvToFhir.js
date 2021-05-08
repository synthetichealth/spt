import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

async function csvToFhir(id) {
  const [
    patientResp,
    conditionsResp,
    medicationsResp,
    proceduresResp,
    encountersResp
  ] = await Promise.all([
    axios.get(`/collection/patients?Id=${id}`),
    axios.get(`/collection/conditions?PATIENT=${id}`),
    axios.get(`/collection/medications?PATIENT=${id}`),
    axios.get(`/collection/procedures?PATIENT=${id}`),
    axios.get(`/collection/encounters?PATIENT=${id}`)
  ]);

  // for testing, map these into FHIR

  const patientCSV = patientResp.data[0];
  const conditionsCSV = conditionsResp.data;
  const medicationsCSV = medicationsResp.data;
  const proceduresCSV = proceduresResp.data;
  const encountersCSV = encountersResp.data;

  const bundle = {
    resourceType: 'Bundle',
    entry: []
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
        prefix: [patientCSV.PREFIX]
      }
    ],
    gender: patientCSV.GENDER,
    birthDate: patientCSV.BIRTHDATE,
    address: [
      {
        line: [patientCSV.ADDRESS],
        city: patientCSV.CITY,
        state: patientCSV.STATE,
        postalCode: patientCSV.ZIP,
        country: 'US'
      }
    ]
  };

  const patientURI = `urn:uuid:${id}`;

  bundle.entry.push({ fullUrl: patientURI, resource: patientFHIR });

  // START,STOP,PATIENT,ENCOUNTER,CODE,DESCRIPTION
  conditionsCSV.forEach(c => {
    const conditionFHIR = {
      resourceType: 'Condition',
      id: uuidv4(), // just to have something
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: c.CODE,
            display: c.DESCRIPTION
          }
        ],
        text: c.DESCRIPTION
      },
      subject: { reference: patientURI },
      encounter: { reference: `urn:uuid:${c.ENCOUNTER}` },
      onsetDateTime: c.START,
      abatementDateTime: c.STOP
    };

    bundle.entry.push({ fullUrl: `urn:uuid:${c.ID}`, resource: conditionFHIR });
  });

  // Id,START,STOP,PATIENT,ORGANIZATION,PROVIDER,PAYER,
  // ENCOUNTERCLASS,CODE,DESCRIPTION,
  // BASE_ENCOUNTER_COST,TOTAL_CLAIM_COST,PAYER_COVERAGE,
  // REASONCODE,REASONDESCRIPTION

  encountersCSV.forEach(e => {
    const encounterFHIR = {
      resourceType: 'Encounter',
      id: e.ID,
      class: {
        code: e.ENCOUNTERCLASS
      },
      type: [
        {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: e.CODE,
              display: e.DESCRIPTION
            }
          ],
          text: e.DESCRIPTION
        }
      ],
      subject: {
        reference: patientURI
      },
      period: {
        start: e.START,
        end: e.STOP
      }
    };

    bundle.entry.push({ fullUrl: `urn:uuid:${e.ID}`, resource: encounterFHIR });
  });

  // START,STOP,PATIENT,PAYER,ENCOUNTER,CODE,DESCRIPTION,
  // BASE_COST,PAYER_COVERAGE,DISPENSES,TOTALCOST,REASONCODE,REASONDESCRIPTION

  medicationsCSV.forEach(m => {
    const medicationFHIR = {
      resourceType: 'MedicationRequest',
      id: m.ID,
      status: m.STOP ? `stopped ${m.STOP}` : 'active',
      intent: 'order',
      medicationCodeableConcept: {
        coding: [
          {
            system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
            code: m.CODE,
            display: m.DESCRIPTION
          }
        ],
        text: m.DESCRIPTION
      },
      subject: {
        reference: patientURI
      },
      encounter: {
        reference: `urn:uuid:${m.ENCOUNTER}`
      },
      authoredOn: m.START
    };

    bundle.entry.push({ fullUrl: `urn:uuid:${m.ID}`, resource: medicationFHIR });
  });

  return bundle;
}
export default csvToFhir;

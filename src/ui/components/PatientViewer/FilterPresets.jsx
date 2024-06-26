
// map a list to a group of fhir ORs, eg [1,2,3] --> string "'1' | '2' | '3'"
const fhirList = (list) => list.map(i => `'${i}'`).join(' | ');


const DR_CONDITIONS = [
  '44054006', // diabetes
  '15777000', // prediabetes
  '1551000119108', // NPDR
  '1501000119109', // PDR
  '97331000119101', // DME
  '60951000119105', // blindness
];

const SDOH_CONDITIONS = [
  '314529007',
  '5251000175109',
  '424393004',
  '160903007',
  '706893006',
  '73595000',
  '160904001',
  '741062008',
  '10939881000119105',
  '422650009',
  '423315002',
  '706893006',
  '266948004',
  '5251000175109'
];

const FILTER_PRESETS = Object.freeze({
  "Hide Resolved Conditions": {
    description: "Hides conditions with an abatement date",
    mode: 'exclude',
    filterOnGroupByEncounter: false,
    filters: {
      Condition: ['Condition.abatement'] // is not null
    }
  },
  "Hide Stopped Medications": {
    description: "Hides medications with a status of 'stopped'",
    mode: 'exclude',
    filterOnGroupByEncounter: false,
    filters: {
      MedicationRequest: ["MedicationRequest.status = 'stopped'"]
    }
  },
  'Disease Focus: Diabetic Retinopathy': {
    description: 'Keeps entries relevant to Diabetic Retinopathy',
    mode: 'include',
    filterOnGroupByEncounter: true,
    filters: {
      Encounter: ["Encounter.type.coding.code = '185349003'"],
      Condition: [`Condition.code.coding.code in (${fhirList(DR_CONDITIONS)})`],
      Observation: []
    }
  },
  'Hide SDOH Conditions': {
    description: 'Hides most SDOH conditions, such as "stress", employment status, etc',
    mode: 'exclude',
    filterOnGroupByEncounter: true,
    filters: {
      Condition: [`Condition.code.coding.code in (${fhirList(SDOH_CONDITIONS)})`]
    }
  }
  // Coming soon...
  // 'Cardiology': {
  //   description: 'Keeps entries relevant to Cardiology',
  //   mode: 'include',
  //   filters: {

  //   }
  // }

});

export default FILTER_PRESETS;
import { appliesToBundle, evaluateBundle, evaluateResource } from '../fhirpath_utils';

const patient = {
  resourceType: 'Patient',
  id: 'patient-1',
  active: true,
  name: [
    {
      family: 'Doe',
      given: ['Jane'],
    },
  ],
};

const condition = {
  resourceType: 'Condition',
  id: 'condition-1',
  code: {
    text: 'Hypertension',
  },
};

const bundle = {
  resourceType: 'Bundle',
  entry: [{ resource: patient }, { resource: condition }],
};

describe('FHIRPath utilities', () => {
  test('evaluates a path against a resource', () => {
    expect(evaluateResource(patient, 'Patient.name.given')).toEqual(['Jane']);
  });

  test('evaluates resource-level paths against every bundle entry', () => {
    expect(evaluateBundle(bundle, 'id', {}, false)).toEqual(['patient-1', 'condition-1']);
  });

  test('can return resources matching a truthy FHIRPath result', () => {
    expect(evaluateBundle(bundle, 'Patient.active', {}, true)).toEqual([patient]);
    expect(appliesToBundle(bundle, 'Patient.active', {})).toBe(true);
  });
});

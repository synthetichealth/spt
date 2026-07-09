import axios from 'axios';

const PATIENT_COLLECTIONS = [
  'allergies',
  'careplans',
  'conditions',
  'devices',
  'diagnostic_reports',
  'document_references',
  'encounters',
  'imaging_studies',
  'immunizations',
  'media',
  'medications',
  'observations',
  'procedures',
  'supplies',
];

const resourceEntry = (resource) => ({
  fullUrl: resource.id ? `urn:uuid:${resource.id}` : undefined,
  resource,
});

async function fhirCollectionToBundle(id) {
  const patientResp = await axios.get(`/collection/patients?id=${encodeURIComponent(id)}`);
  const patientRow = patientResp.data.find((row) => row.sourceFormat === 'fhir');

  if (!patientRow?.resource) {
    throw new Error(`No FHIR patient found for ${id}.`);
  }

  const collectionResponses = await Promise.all(
    PATIENT_COLLECTIONS.map((collectionName) =>
      axios.get(`/collection/${collectionName}?patientId=${encodeURIComponent(id)}`),
    ),
  );

  const resources = [
    patientRow.resource,
    ...collectionResponses.flatMap((response) =>
      response.data
        .filter((row) => row.sourceFormat === 'fhir' && row.resource)
        .map((row) => row.resource),
    ),
  ];

  return {
    resourceType: 'Bundle',
    entry: resources.map(resourceEntry),
  };
}

export default fhirCollectionToBundle;

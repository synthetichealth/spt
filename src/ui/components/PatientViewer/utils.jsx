import React from 'react';

export const SPACER = { title: '', versions: '*', getter: () => '' };

const FieldIssue = ({ message, title }) => (
  <span className="fhir-field-warning" title={title || message}>
    {message}
  </span>
);

export const missingField = (fieldName = 'field') => (
  <FieldIssue message="Missing field" title={`Missing ${fieldName}`} />
);

export const unsupportedField = (fieldName = 'field') => (
  <FieldIssue message="Unsupported field" title={`Unsupported or unmapped ${fieldName}`} />
);

export const withDerivedFields = (resource, fields) => {
  const viewResource = { ...resource, ...fields };
  Object.defineProperty(viewResource, '__sourceResource', {
    value: resource,
    enumerable: false,
  });
  return viewResource;
};

export const firstCoding = (codeableConcept) => codeableConcept?.coding?.[0];

export const codeValue = (codeableConcept, fieldName = 'code') =>
  firstCoding(codeableConcept)?.code || missingField(fieldName);

export const codeDisplay = (codeableConcept, fieldName = 'display') =>
  firstCoding(codeableConcept)?.display || codeableConcept?.text || missingField(fieldName);

export const codeLabel = (codeableConcept, fieldName = 'code') => {
  const coding = firstCoding(codeableConcept);
  if (!coding) return missingField(fieldName);
  return `${coding.code || 'No code'}: ${coding.display || codeableConcept?.text || ''}`;
};

export const lastCodeableConcept = (list) =>
  Array.isArray(list) && list.length > 0 ? list[list.length - 1] : undefined;

export const dateValue = (value, fieldName = 'date') => value || missingField(fieldName);

export const periodStart = (period, fieldName = 'period.start') =>
  period?.start || missingField(fieldName);

export const effectiveTime = (entry, type) => {
  if (!entry) return missingField(type);
  return entry[`${type}DateTime`] || entry[`${type}Period`] || missingField(type);
};

export const encounterTitle = (encounter) => {
  const start = encounter?.period?.start || 'Missing start';
  const coding = firstCoding(encounter?.type?.[0]);
  const code = coding?.code || 'Missing code';
  const display = coding?.display || encounter?.type?.[0]?.text || '';
  return `${start} - ${code} ${display}`.trim();
};

export const attachImagingStudy = (media, allResources) => {
  const partOfReference = media?.partOf?.[0]?.reference;
  if (!partOfReference) return media;

  const partOf = allResources.find((r) => `urn:uuid:${r.id}` === partOfReference);
  if (partOf?.resourceType !== 'ImagingStudy') return media;

  const partOfWithResource = media.partOf.map((part, index) =>
    index === 0 ? { ...part, resource: partOf } : part,
  );
  return withDerivedFields(media, { partOf: partOfWithResource });
};

export const mediaTitle = (media) => {
  const identifier = media?.identifier?.[0]?.value;
  const instances = media?.partOf?.[0]?.resource?.series?.[0]?.instance;
  if (!identifier || !Array.isArray(instances)) return '';

  const instance = instances.find((i) => `urn:oid:${i.uid}` === identifier);
  return instance?.title || '';
};

export const round = function (num, digits) {
  return Number.parseFloat(num).toFixed(digits);
};

export const obsValue = (entry) => {
  if (entry == null) {
    return '';
  } else if (entry.valueQuantity) {
    return round(entry.valueQuantity.value, 2) + ' ' + entry.valueQuantity.code;
  } else if (entry.valueCodeableConcept) {
    return codeDisplay(entry.valueCodeableConcept, 'Observation.valueCodeableConcept');
  } else if (entry.valueString) {
    return entry.valueString;
  }

  if (firstCoding(entry.code)?.code === '85354-9') {
    if (!entry.component?.[0]?.valueQuantity || !entry.component?.[1]?.valueQuantity) {
      return missingField('Observation.component.valueQuantity');
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

  return missingField('Observation.value');
};

export const isMatchingReference = (entry, reference, resourceType) => {
  if (!entry || !reference) return false;

  return (
    entry.id === reference ||
    'urn:uuid:' + entry.id === reference ||
    resourceType + '/' + entry.id === reference
  );
};

export const getNoteText = (dr) => {
  const data = dr?.content?.[0]?.attachment?.data;
  if (!data) return missingField('DocumentReference.content.attachment.data');

  try {
    return atob(data);
  } catch (_e) {
    return unsupportedField('DocumentReference.content.attachment.data');
  }
};

export const extractMedia = (m) => {
  if (!m || !m.content) return undefined;

  const contentType = m.content.contentType;
  const data = m.content.data;
  const url = `data:${contentType};base64, ${data}`;
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {' '}
      <img src={url} className="imagemedia" title="Click to open full-size" />{' '}
    </a>
  );
};

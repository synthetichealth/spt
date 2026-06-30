const fs = require('fs');
const readline = require('readline');
const glob = require('glob');
const path = require('path');
const { promisify } = require('util');

const collections = require('../storage/collections');
const db = require('../storage/DataAccess');

const globAsync = promisify(glob);

const RESOURCE_COLLECTIONS = {
  AllergyIntolerance: collections.ALLERGIES,
  CarePlan: collections.CAREPLANS,
  Condition: collections.CONDITIONS,
  Device: collections.DEVICES,
  DiagnosticReport: collections.DIAGNOSTIC_REPORTS,
  DocumentReference: collections.DOCUMENT_REFERENCES,
  Encounter: collections.ENCOUNTERS,
  ImagingStudy: collections.IMAGING_STUDIES,
  Immunization: collections.IMMUNIZATIONS,
  Media: collections.MEDIA,
  Medication: collections.MEDICATIONS,
  MedicationRequest: collections.MEDICATIONS,
  Observation: collections.OBSERVATIONS,
  Organization: collections.ORGANIZATIONS,
  Patient: collections.PATIENTS,
  Practitioner: collections.PROVIDERS,
  Procedure: collections.PROCEDURES,
  SupplyDelivery: collections.SUPPLIES,
};

function stripReferencePrefix(reference) {
  if (!reference || typeof reference !== 'string') return undefined;
  if (reference.startsWith('urn:uuid:')) return reference.slice('urn:uuid:'.length);

  const parts = reference.split('/');
  return parts[parts.length - 1] || undefined;
}

function firstCoding(codeableConcept) {
  return codeableConcept?.coding?.[0];
}

function codeValue(codeableConcept) {
  return firstCoding(codeableConcept)?.code || '';
}

function codeDisplay(codeableConcept) {
  return firstCoding(codeableConcept)?.display || codeableConcept?.text || '';
}

function firstCodeableConcept(list) {
  return Array.isArray(list) && list.length > 0 ? list[0] : undefined;
}

function patientReference(resource) {
  return (
    resource.subject?.reference ||
    resource.patient?.reference ||
    resource.beneficiary?.reference ||
    resource.individual?.reference
  );
}

function patientIdForResource(resource) {
  if (resource.resourceType === 'Patient') return resource.id;
  return stripReferencePrefix(patientReference(resource));
}

function encounterIdForResource(resource) {
  return stripReferencePrefix(resource.encounter?.reference || resource.context?.reference);
}

function patientName(resource) {
  const name = resource.name?.[0] || {};
  const given = Array.isArray(name.given) ? name.given.join(' ') : '';
  return {
    first: given,
    last: name.family || '',
    prefix: Array.isArray(name.prefix) ? name.prefix.join(' ') : '',
  };
}

function addressFields(resource) {
  const address = resource.address?.[0] || {};
  const line = Array.isArray(address.line) ? address.line.join(' ') : '';

  return {
    ADDRESS: line,
    CITY: address.city || '',
    STATE: address.state || '',
    ZIP: address.postalCode || '',
  };
}

function telecomPhone(resource) {
  return resource.telecom?.find((telecom) => telecom.system === 'phone')?.value || '';
}

function observationValue(resource) {
  if (resource.valueQuantity) {
    return {
      VALUE: resource.valueQuantity.value == null ? '' : `${resource.valueQuantity.value}`,
      UNITS: resource.valueQuantity.unit || resource.valueQuantity.code || '',
      TYPE: 'numeric',
    };
  }

  if (resource.valueString) return { VALUE: resource.valueString, UNITS: '', TYPE: 'text' };
  if (resource.valueCodeableConcept) {
    return { VALUE: codeDisplay(resource.valueCodeableConcept), UNITS: '', TYPE: 'text' };
  }

  return { VALUE: '', UNITS: '', TYPE: '' };
}

function rowFromResource(resource, sourceFile) {
  const patientId = patientIdForResource(resource);
  const encounterId = encounterIdForResource(resource);
  const row = {
    id: resource.id,
    Id: resource.id,
    resourceType: resource.resourceType,
    sourceFormat: 'fhir',
    sourceFile,
    patientId,
    PATIENT: patientId,
    encounterId,
    ENCOUNTER: encounterId,
    resource,
  };

  switch (resource.resourceType) {
    case 'Patient': {
      const name = patientName(resource);
      Object.assign(row, {
        BIRTHDATE: resource.birthDate || '',
        DEATHDATE: resource.deceasedDateTime || '',
        FIRST: name.first,
        LAST: name.last,
        PREFIX: name.prefix,
        GENDER: resource.gender || '',
        ...addressFields(resource),
      });
      break;
    }
    case 'Observation':
      Object.assign(row, {
        DATE: resource.effectiveDateTime || resource.issued || '',
        CODE: codeValue(resource.code),
        DESCRIPTION: codeDisplay(resource.code),
        ...observationValue(resource),
      });
      break;
    case 'Condition':
      Object.assign(row, {
        START: resource.onsetDateTime || resource.recordedDate || '',
        STOP: resource.abatementDateTime || '',
        CODE: codeValue(resource.code),
        DESCRIPTION: codeDisplay(resource.code),
      });
      break;
    case 'Encounter':
      Object.assign(row, {
        START: resource.period?.start || '',
        STOP: resource.period?.end || '',
        ENCOUNTERCLASS: resource.class?.code || '',
        CODE: codeValue(firstCodeableConcept(resource.type)),
        DESCRIPTION: codeDisplay(firstCodeableConcept(resource.type)),
      });
      break;
    case 'MedicationRequest':
      Object.assign(row, {
        START: resource.authoredOn || '',
        STOP: '',
        CODE: codeValue(resource.medicationCodeableConcept),
        DESCRIPTION: codeDisplay(resource.medicationCodeableConcept),
      });
      break;
    case 'Procedure':
      Object.assign(row, {
        DATE: resource.performedDateTime || resource.performedPeriod?.start || '',
        CODE: codeValue(resource.code),
        DESCRIPTION: codeDisplay(resource.code),
      });
      break;
    case 'CarePlan':
      Object.assign(row, {
        START: resource.period?.start || '',
        STOP: resource.period?.end || '',
        CODE: codeValue(firstCodeableConcept(resource.category)),
        DESCRIPTION: codeDisplay(firstCodeableConcept(resource.category)),
      });
      break;
    case 'AllergyIntolerance':
      Object.assign(row, {
        START: resource.onsetDateTime || resource.recordedDate || '',
        STOP: '',
        CODE: codeValue(resource.code),
        DESCRIPTION: codeDisplay(resource.code),
      });
      break;
    case 'Immunization':
      Object.assign(row, {
        DATE: resource.occurrenceDateTime || '',
        CODE: codeValue(resource.vaccineCode),
        DESCRIPTION: codeDisplay(resource.vaccineCode),
      });
      break;
    case 'Device':
      Object.assign(row, {
        CODE: codeValue(firstCodeableConcept(resource.type ? [resource.type] : [])),
        DESCRIPTION: codeDisplay(resource.type),
        UDI: resource.udiCarrier?.[0]?.deviceIdentifier || '',
      });
      break;
    case 'DiagnosticReport':
      Object.assign(row, {
        DATE: resource.effectiveDateTime || resource.issued || '',
        CODE: codeValue(resource.code),
        DESCRIPTION: codeDisplay(resource.code),
      });
      break;
    case 'DocumentReference':
      Object.assign(row, {
        DATE: resource.date || '',
        CODE: codeValue(resource.type),
        DESCRIPTION: codeDisplay(resource.type),
      });
      break;
    case 'ImagingStudy':
      Object.assign(row, {
        DATE: resource.started || '',
      });
      break;
    case 'Media':
      Object.assign(row, {
        DATE: resource.createdDateTime || '',
        CODE: codeValue(resource.type),
        DESCRIPTION: codeDisplay(resource.type),
      });
      break;
    case 'Organization':
      Object.assign(row, {
        NAME: resource.name || '',
        PHONE: telecomPhone(resource),
        ...addressFields(resource),
      });
      break;
    case 'Practitioner':
      Object.assign(row, {
        NAME: `${patientName(resource).first} ${patientName(resource).last}`.trim(),
        GENDER: resource.gender || '',
        ...addressFields(resource),
      });
      break;
    default:
      break;
  }

  return row;
}

function insertResource(resource, sourceFile, summary) {
  if (!resource?.resourceType) {
    summary.skippedResources += 1;
    return;
  }

  const collectionName = RESOURCE_COLLECTIONS[resource.resourceType] || collections.FHIR_RESOURCES;
  db.insert(collectionName, rowFromResource(resource, sourceFile));
  summary.resourceCount += 1;
  summary.resourceCounts[resource.resourceType] =
    (summary.resourceCounts[resource.resourceType] || 0) + 1;
}

async function loadJsonFile(filePath, summary) {
  const parsed = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));

  if (parsed.resourceType === 'Bundle') {
    for (const entry of parsed.entry || []) {
      insertResource(entry.resource, filePath, summary);
    }
  } else {
    insertResource(parsed, filePath, summary);
  }
}

async function loadNdjsonFile(filePath, summary) {
  const stream = fs.createReadStream(filePath);
  const reader = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let lineNumber = 0;
  for await (const line of reader) {
    lineNumber += 1;
    if (!line.trim()) continue;

    try {
      insertResource(JSON.parse(line), filePath, summary);
    } catch (error) {
      throw new Error(`${filePath}:${lineNumber} is not valid JSON: ${error.message}`);
    }
  }
}

async function discoverFhirFiles(fhirPath) {
  const stats = await fs.promises.stat(fhirPath);
  if (stats.isFile()) return [fhirPath];
  if (!stats.isDirectory()) throw new Error('FHIR path must be a file or directory.');

  const [jsonFiles, ndjsonFiles] = await Promise.all([
    globAsync(path.join(fhirPath, '**', '*.json')),
    globAsync(path.join(fhirPath, '**', '*.ndjson')),
  ]);

  return [...jsonFiles, ...ndjsonFiles].sort();
}

async function loadFhirFile(filePath, summary) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === '.ndjson') {
    await loadNdjsonFile(filePath, summary);
  } else if (extension === '.json') {
    await loadJsonFile(filePath, summary);
  }
}

async function loadFhirFromPath(fhirPath) {
  const files = await discoverFhirFiles(fhirPath);
  const summary = {
    loadedFiles: [],
    resourceCount: 0,
    resourceCounts: {},
    skippedResources: 0,
  };

  for (const file of files) {
    await loadFhirFile(file, summary);
    summary.loadedFiles.push(file);
  }

  return summary;
}

module.exports = {
  loadFhirFromPath,
  rowFromResource,
};

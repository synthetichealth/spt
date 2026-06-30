import React from 'react';

import FhirDataGrid from './FhirDataGrid';

import {
  codeDisplay,
  codeValue,
  extractMedia,
  getNoteText,
  mediaTitle,
  obsValue,
  periodStart,
} from './utils';
import {
  SECOND_PRECISION_FORMATTERS,
  applyColumns,
  attributeXTime,
  createViewFhirColumn,
  renderNote,
} from './tableUtils';

const COLUMNS = [
  { key: 'type', name: 'Type' },
  { key: 'code', name: 'Code' },
  {
    key: 'description',
    name: 'Description',
    colSpan: (args) => {
      if (args.type === 'ROW' && args.row.type === 'Note') {
        return 3;
      }
      return 1;
    },
  },
  {
    key: 'details',
    name: 'Details',
    colSpan: (args) => {
      if (args.type === 'ROW') {
        return args.row?.additional ? 1 : 2;
      }
      if (args.type === 'HEADER') {
        return 2;
      }
      return 1;
    },
  },
  { key: 'additional', name: '' },
  { key: 'fhir', name: 'View FHIR', sortable: false },
];

const VIEW_FHIR = {
  ...createViewFhirColumn(),
};

const ROW_FUNCTIONS = [
  {
    getter: (e) => [e.encounter],
    keyFn: (e) => e.id,
    columns: [
      {
        key: 'type',
        getter: () => 'Encounter',
      },
      {
        key: 'code',
        getter: (n) => codeValue(n.type?.[0], 'Encounter.type'),
      },
      {
        key: 'description',
        getter: (n) => codeDisplay(n.type?.[0], 'Encounter.type'),
      },
      {
        key: 'details',
        format: 'date',
        getter: (n) => periodStart(n.period, 'Encounter.period.start'),
      },
      VIEW_FHIR,
    ],
  },
  {
    getter: (r) => r.conditions,
    keyFn: (o) => o.id,
    columns: [
      {
        key: 'type',
        getter: () => 'Condition',
      },
      {
        key: 'code',
        getter: (c) => codeValue(c.code, 'Condition.code'),
      },
      {
        key: 'description',
        getter: (c) => codeDisplay(c.code, 'Condition.code'),
      },
      VIEW_FHIR,
    ],
  },
  {
    getter: (r) => r.procedures,
    keyFn: (o) => o.id,
    columns: [
      {
        key: 'type',
        getter: () => 'Procedure',
      },
      {
        key: 'code',
        getter: (p) => codeValue(p.code, 'Procedure.code'),
      },
      {
        key: 'description',
        getter: (p) => codeDisplay(p.code, 'Procedure.code'),
      },
      {
        key: 'details',
        format: 'dateTime',
        getter: (p) => p.performedDateTime || p.performedPeriod?.start,
      },
      VIEW_FHIR,
    ],
  },
  {
    getter: (r) => r.medications,
    keyFn: (o) => o.id,
    columns: [
      {
        key: 'type',
        getter: () => 'Medication',
      },
      {
        key: 'code',
        getter: (c) =>
          codeValue(c.medicationCodeableConcept, 'MedicationRequest.medicationCodeableConcept'),
      },
      {
        key: 'description',
        getter: (c) =>
          codeDisplay(c.medicationCodeableConcept, 'MedicationRequest.medicationCodeableConcept'),
      },
      {
        key: 'details',
        format: 'dateTime',
        getter: (c) => c.authoredOn,
      },
      {
        key: 'additional',
        getter: (c) => c.status,
      },
      VIEW_FHIR,
    ],
  },
  {
    getter: (r) => r.observations,
    keyFn: (o) => o.id,
    columns: [
      {
        key: 'type',
        getter: () => 'Observation',
      },
      {
        key: 'code',
        getter: (o) => codeValue(o.code, 'Observation.code'),
      },
      {
        key: 'description',
        getter: (o) => codeDisplay(o.code, 'Observation.code'),
      },
      {
        key: 'details',
        getter: (o) => obsValue(o),
      },
      VIEW_FHIR,
    ],
  },
  {
    getter: (r) => r.reports,
    keyFn: (dr) => dr.id,
    columns: [
      {
        key: 'type',
        getter: () => 'Report',
      },
      {
        key: 'code',
        getter: (dr) => codeValue(dr.code, 'DiagnosticReport.code'),
      },
      {
        key: 'description',
        getter: (dr) => codeDisplay(dr.code, 'DiagnosticReport.code'),
      },
      {
        key: 'details',
        getter: (dr) => attributeXTime(dr, 'effective', SECOND_PRECISION_FORMATTERS),
      },
      VIEW_FHIR,
    ],
  },
  {
    getter: (r) => r.reports.flatMap((report) => report.observations || []),
    keyFn: (o) => o.id,
    columns: [
      {
        key: 'type',
        getter: () => 'Report Observation',
      },
      {
        key: 'code',
        getter: (o) => codeValue(o.code, 'Observation.code'),
      },
      {
        key: 'description',
        getter: (o) => codeDisplay(o.code, 'Observation.code'),
      },
      {
        key: 'details',
        getter: (o) => obsValue(o),
      },
      VIEW_FHIR,
    ],
  },
  {
    getter: (r) => r.notes,
    keyFn: (dr) => dr.id,
    columns: [
      {
        key: 'type',
        getter: () => 'Note',
      },
      {
        key: 'description',
        getter: (dr) => renderNote(getNoteText(dr)),
      },
      VIEW_FHIR,
    ],
  },
  {
    getter: (r) => r.medias,
    keyFn: (m) => m.id,
    columns: [
      {
        key: 'type',
        getter: () => 'Media',
      },
      {
        key: 'description',
        getter: (m) => {
          const procedureDisplay = codeDisplay(
            m.partOf?.[0]?.resource?.procedureCode?.[0],
            'Media.partOf.ImagingStudy.procedureCode',
          );
          const title = mediaTitle(m);
          if (React.isValidElement(procedureDisplay)) return title || procedureDisplay;
          return [procedureDisplay, title].filter(Boolean).join('\n');
        },
      },
      {
        key: 'details',
        getter: (m) => extractMedia(m),
      },
      // VIEW_FHIR // temporarily disabled
    ],
  },
];

const rowHeightFn = (row) => {
  switch (row.type) {
    case 'Media':
      return 200;
    case 'Note':
      return 'auto'; // makes it fit to content when expanded
    default:
      return 'auto';
  }
};

const EncounterSection = ({ encounterData }) => {
  const rows = [];

  for (const rowDef of ROW_FUNCTIONS) {
    const rawRows = rowDef.getter(encounterData);

    for (const [rawRowIndex, rawRow] of rawRows.entries()) {
      const row = applyColumns(rawRow, rowDef.columns, {
        context: encounterData,
        formatters: SECOND_PRECISION_FORMATTERS,
      });
      const rowId = rowDef.keyFn ? rowDef.keyFn(rawRow) : rawRowIndex;
      row.id = `${row.type}-${rowId ?? rawRowIndex}-${rows.length}`;
      rows.push(row);
    }
  }

  return (
    <FhirDataGrid columns={COLUMNS} rows={rows} getRowHeight={({ model }) => rowHeightFn(model)} />
  );
};

export default EncounterSection;

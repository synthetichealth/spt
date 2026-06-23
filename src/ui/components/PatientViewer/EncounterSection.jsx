import React from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

import moment from 'moment';

import ViewFhirModal from './ViewFhirModal';

import {
  codeDisplay,
  codeValue,
  effectiveTime,
  extractMedia,
  getNoteText,
  mediaTitle,
  missingField,
  obsValue,
  periodStart,
  unsupportedField,
} from './utils';

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
  { key: 'fhir', name: 'View FHIR' },
];

const formatDate = (value, format, fieldName) => {
  if (!value) return missingField(fieldName);
  const date = moment(value);
  return date.isValid() ? date.format(format) : unsupportedField(fieldName);
};

const FORMATTERS = {
  date: (str) => formatDate(str, 'YYYY-MM-DD', 'date'),
  time: (str) => formatDate(str, 'HH:mm:ss', 'time'),
  dateTime: (str) => formatDate(str, 'YYYY-MM-DD - h:mm:ss a', 'dateTime'),
  numberWithCommas: (str) => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  code: (code) => `${code.code}: ${code.display ? code.display : ''}`,
  period: (period) => {
    if (!period?.start && !period?.end) return missingField('period');
    const start = period?.start ? FORMATTERS.dateTime(period.start) : missingField('period.start');
    const end = period?.end ? FORMATTERS.dateTime(period.end) : missingField('period.end');
    return (
      <>
        {start} -&gt; {end}
      </>
    );
  },
};

const VIEW_FHIR = {
  key: 'fhir',
  getter: (resource) => <ViewFhirModal resource={resource} />,
};

const COMPACT_ROW_HEIGHT = 35;
const WRAPPED_ROW_HEIGHT = 56;

const rowNeedsWrapHeight = (row) =>
  Object.values(row).some(
    (value) => typeof value === 'string' && (value.length > 48 || value.includes('\n')),
  );

const attributeXTime = (entry, type) => {
  const value = effectiveTime(entry, type);
  if (React.isValidElement(value)) return value;
  if (typeof value === 'string') {
    return FORMATTERS.dateTime(value);
  }
  return FORMATTERS.period(value);
};

const renderNote = (text) => {
  return (
    <Accordion allowZeroExpanded>
      <AccordionItem key={text}>
        <AccordionItemHeading>
          <AccordionItemButton>View Note</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div style={{ textAlign: 'left', whiteSpace: 'pre' }}>{text}</div>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
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
        getter: (dr) => attributeXTime(dr, 'effective'),
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
        // TODO: use <ViewNoteModal text={getNoteText(dr)} />
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
      return null; // makes it fit to content when expanded
    default:
      // Undefined makes the app hang; null makes the row smaller.
      return rowNeedsWrapHeight(row) ? WRAPPED_ROW_HEIGHT : COMPACT_ROW_HEIGHT;
  }
};

const EncounterSection = ({ encounterData }) => {
  const rows = [];

  for (const rowDef of ROW_FUNCTIONS) {
    const rawRows = rowDef.getter(encounterData);

    for (const rawRow of rawRows) {
      const row = {};

      for (const c of rowDef.columns) {
        const formatter = FORMATTERS[c.format];
        let result;
        try {
          result = c.getter(rawRow, encounterData);
        } catch (e) {
          console.error(e);
          result = unsupportedField(c.key);
        }
        if (result && formatter && !React.isValidElement(result)) {
          result = formatter(result);
        }
        if ((result == null || result === '') && c.defaultValue) {
          result = c.defaultValue;
        } else if (result == null) {
          result = missingField(c.key);
        }

        row[c.key] = result;
      }

      rows.push(row);
    }
  }

  return (
    <DataGrid
      columns={COLUMNS}
      rows={rows}
      style={{ blockSize: '100%' }} // otherwise it defaults to some fixed size and has a scrollbar
      rowHeight={rowHeightFn}
    />
  );
};

export default EncounterSection;

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
import ViewNoteModal from './ViewNoteModal';

import { obsValue, SPACER, isMatchingReference, getNoteText, extractMedia } from './utils';

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

const FORMATTERS = {
  date: (str) => moment(str).format('YYYY-MM-DD'),
  time: (str) => moment(str).format('HH:mm:ss'),
  dateTime: (str) => moment(str).format('YYYY-MM-DD - h:mm:ss a'),
  numberWithCommas: (str) => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  code: (code) => `${code.code}: ${code.display ? code.display : ''}`,
  period: (period) =>
    `${moment(period.start).format('YYYY-MM-DD - h:mm:ss a')} -> ${moment(period.end).format(
      'YYYY-MM-DD - h:mm:ss a',
    )}`,
};

const VIEW_FHIR = {
  key: 'fhir',
  getter: (resource) => <ViewFhirModal resource={resource} />,
};

const renderNote = (text) => {
  return (
    <Accordion allowZeroExpanded>
      <AccordionItem key={text}>
        <AccordionItemHeading>
          <AccordionItemButton>View Note</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <div
            style={{
              textAlign: 'left',
              whiteSpace: 'pre-wrap', // preserve whitespace and line breaks, but allow wrapping
              overflowWrap: 'break-word', // break long words when necessary
              wordBreak: 'break-word', // fall-back to break words if needed
              hyphens: 'auto',
            }}
          >
            {text.trim()}
          </div>
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
        getter: (n) => n.type[0].coding[0].code,
      },
      {
        key: 'description',
        getter: (n) => n.type[0].coding[0].display,
      },
      {
        key: 'details',
        format: 'date',
        getter: (n) => n.period.start,
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
        getter: (c) => c.code.coding[0].code,
      },
      {
        key: 'description',
        getter: (c) => c.code.coding[0].display,
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
        getter: (p) => p.code.coding[0].code,
      },
      {
        key: 'description',
        getter: (p) => p.code.coding[0].display,
      },
      {
        key: 'details',
        format: 'dateTime',
        getter: (p) => p.performedPeriod.start,
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
        getter: (c) => c.medicationCodeableConcept.coding[0].code,
      },
      {
        key: 'description',
        getter: (c) => c.medicationCodeableConcept.coding[0].display,
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
        getter: (o) => o.code.coding[0].code,
      },
      {
        key: 'description',
        getter: (o) => o.code.coding[0].display,
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
        getter: (dr) => renderNote(getNoteText(dr)), // <ViewNoteModal text={getNoteText(dr)} />
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
          let codeDisplay = '';
          try {
            codeDisplay = m.partOf[0].resource.procedureCode[0].coding[0].display + '\n';
          } catch (e) {}

          let title = '';
          try {
            const myIdentifer = m.identifier[0].value; // "urn:oid:1.2.840.99999999.1.1.33607723.407560999967"
            const instance = m.partOf[0].resource.series[0].instance.find(
              (i) => `urn:oid:${i.uid}` === myIdentifer,
            );
            if (instance?.title) {
              title = instance.title;
            }
          } catch (e) {}

          return codeDisplay + title;
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
      return 35; // seems to be the default if not set. undefined here makes the app hang. null makes it smaller
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
          result = undefined;
        }
        if (result && formatter) {
          result = formatter(result);
        }
        if (!result && c.defaultValue) {
          result = c.defaultValue;
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

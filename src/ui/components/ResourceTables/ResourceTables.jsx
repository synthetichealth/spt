import React from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

import moment from 'moment';

import ViewFhirModal from '../PatientViewer/ViewFhirModal';
import { obsValue, getNoteText, extractMedia } from '../PatientViewer/utils';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

const FORMATTERS = {
  date: (str) => moment(str).format('YYYY-MM-DD'),
  time: (str) => moment(str).format('HH:mm:ss'),
  dateTime: (str) => moment(str).format('YYYY-MM-DD - h:mm a'), // to re-add seconds: 'YYYY-MM-DD - h:mm:ss a'
  numberWithCommas: (str) => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  code: (code) => `${code.code}: ${code.display ? code.display : ''}`,
  period: (period) =>
    `${moment(period.start).format('YYYY-MM-DD - h:mm a')} -> ${moment(period.end).format(
      'YYYY-MM-DD - h:mm a',
    )}`,
};

const WIDTHS = {
  date: 145,
  dateTime: 300,
  snomed: 125,
};

const VIEW_FHIR = {
  key: 'fhir',
  name: 'View FHIR',
  width: 100,
  getter: (resource) => <ViewFhirModal resource={resource} />,
};

const attributeXTime = (entry, type) => {
  if (entry == null) {
    return '';
  } else if (entry[`${type}DateTime`]) {
    return FORMATTERS['dateTime'](entry[`${type}DateTime`]);
  } else if (entry[`${type}Period`]) {
    return FORMATTERS['period'](entry[`${type}Period`]);
  }
  return '';
};

const duration = (period) => {
  if (!period.end) {
    return '';
  }
  const start = moment(period.start);
  const end = moment(period.end);
  return moment.duration(start.diff(end)).humanize();
};

function applyColumns(resource, columns) {
  const row = {};

  for (const c of columns) {
    if (!c.key) {
      c.key = c.name;
    }

    const formatter = FORMATTERS[c.format];
    let result;
    try {
      result = c.getter(resource);
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

  return row;
}

class GenericTable extends React.Component {
  render() {
    const rows = [];

    for (const rawRow of this.props.rows.slice().reverse()) {
      const row = applyColumns(rawRow, this.props.columns);
      rows.push(row);

      if (this.props.nestedRows) {
        for (const nestedRow of this.props.nestedRows) {
          let subRowLines;
          try {
            subRowLines = nestedRow.getter(rawRow);
          } catch (e) {
            subRowLines = undefined;
          }
          if (!subRowLines) continue;
          const subColumns = nestedRow.columns;

          for (const subRowLine of subRowLines) {
            const nestedRow = applyColumns(subRowLine, subColumns);
            rows.push(nestedRow);
          }
        }
      }
    }

    return (
      <React.Fragment>
        <div className="health-record__header">
          <div className="header-title">
            <a id={this.props.title}>{this.props.title}</a>
          </div>
          <div className="header-divider"></div>
        </div>
        <DataGrid
          columns={this.props.columns}
          rows={rows}
          style={{ blockSize: '100%' }} // otherwise it defaults to some fixed size and has a scrollbar
          rowHeight={this.props.rowHeight || 35}
        />
      </React.Fragment>
    );
  }
}

class ConditionsTable extends GenericTable {
  static defaultProps = {
    title: 'Conditions',
    columns: [
      { name: 'SNOMED', getter: (c) => c.code.coding[0].code, width: WIDTHS.snomed },
      { name: 'Condition', getter: (c) => c.code.coding[0].display },
      { name: 'Date of Onset', format: 'date', getter: (c) => c.onsetDateTime, width: WIDTHS.date },
      {
        name: 'Date Resolved',
        format: 'date',
        getter: (c) => c.abatementDateTime,
        width: WIDTHS.date,
      },
      VIEW_FHIR,
    ],
    keyFn: (c) => c.id,
  };
}

class ObservationsTable extends GenericTable {
  static defaultProps = {
    title: 'Observations',
    columns: [
      { name: 'LOINC', getter: (o) => o.code.coding[0].code },
      { name: 'Observation', getter: (o) => o.code.coding[0].display },
      { name: 'Value', getter: (o) => obsValue(o) },
      { name: 'Date Recorded', getter: (o) => attributeXTime(o, 'effective') },
      VIEW_FHIR,
    ],
    keyFn: (o) => o.id,
  };
}

class ReportsTable extends GenericTable {
  static defaultProps = {
    title: 'Reports',
    columns: [
      { name: 'LOINC', getter: (r) => r.code.coding[0].code },
      {
        name: 'Report/Observation',
        getter: (r) => r.code.coding[0].display,
        colSpan: (args) => {
          if (args.type === 'ROW' && args.row.type === 'Note') {
            return 3;
          }
          return 1;
        },
      },
      { name: 'Value', getter: () => '' },
      { name: 'Effective', getter: (r) => attributeXTime(r, 'effective'), defaultValue: 'N/A' },
      // VIEW_FHIR // temporarily disabled
    ],
    rowClass: 'report-line',
    nestedRows: [
      {
        getter: (rpt) => rpt.observations,
        keyFn: (o) => o.id,
        columns: [
          { name: 'LOINC', getter: (o) => o.code.coding[0].code },
          { name: 'Report/Observation', getter: (o) => o.code.coding[0].display },
          { name: 'Value', getter: (o) => obsValue(o) },
          VIEW_FHIR,
        ],
      },
      {
        getter: (rpt) => rpt.presentedForm,
        keyFn: (p) => Math.floor(Math.random() * 100), // TODO, pass in index
        columns: [
          { name: 'Content', key: 'Report/Observation', getter: (r) => renderNote(getNoteText(r)) },
          { key: 'type', getter: () => 'Note' },
          VIEW_FHIR,
        ],
      },
    ],
    rowHeight: (row) => (row.type === 'Note' ? null : 35), // makes the row height dynamic when the note is opened/closed
    keyFn: (r) => r.id,
  };
}

class AllergiesTable extends GenericTable {
  static defaultProps = {
    title: 'Allergies',
    columns: [
      { name: 'Allergy', format: 'code', getter: (a) => a.code.coding[0] },
      { name: 'Date Recorded', getter: (a) => a.recordedDate },
      { name: 'Date Recorded', format: 'date', getter: (a) => a.assertedDate },
      { name: 'Onset', format: 'date', getter: (a) => a.onsetDateTime },
      { name: 'Resolution Age', format: 'date', getter: (a) => a.extension.resolutionAge },
      VIEW_FHIR,
    ],
    keyFn: (c) => c.id,
  };
}

const goalDescriptionDSTU2 = (goal) => {
  if (goal.description) return goal.description;
  return '';
};

const goalDescriptionSTU3R4 = (goal) => {
  if (goal.description) return goal.description.text;
  return '';
};

class CarePlansTable extends GenericTable {
  static defaultProps = {
    title: 'CarePlans',
    columns: [
      // note the -1, us core category "assess-plan" gets added at slot 0
      // but us core is not always active
      // so we want the last one not necessarily always 0 or 1
      { name: 'SNOMED', getter: (c) => c.category.at(-1).coding[0].code },
      { name: 'Care Plan', getter: (c) => c.category.at(-1).coding[0].display },
      { name: 'StartDate', format: 'date', getter: (c) => c.period.start },
      VIEW_FHIR,
    ],
    nestedRows: [
      {
        getter: (cp) => cp.goals,
        keyFn: (g) => g.id,
        columns: [
          { name: 'Goal', key: 'Care Plan', getter: (g) => `Goal: ${goalDescriptionSTU3R4(g)}` },
          VIEW_FHIR,
        ],
      },
      {
        getter: (cp) => cp.activity,
        keyFn: (a) => Math.random(),
        columns: [
          {
            name: 'Activity',
            key: 'Care Plan',
            getter: (a) => `Activity: ${a.detail.code.coding[0].display}`,
          },
          VIEW_FHIR,
        ],
      },
    ],
    keyFn: (c) => c.id,
  };
}

class ProceduresTable extends GenericTable {
  static defaultProps = {
    title: 'Procedures',
    columns: [
      { name: 'SNOMED', getter: (p) => p.code.coding[0].code },
      { name: 'Procedure', getter: (p) => p.code.coding[0].display },
      {
        name: 'Performed',
        format: 'dateTime',
        getter: (p) => p.performedDateTime || p.performedPeriod.start,
      },
      VIEW_FHIR,
    ],
    keyFn: (c) => c.id,
  };
}

class EncountersTable extends GenericTable {
  static defaultProps = {
    title: 'Encounters',
    columns: [
      { name: 'SNOMED', getter: (e) => e.type[0].coding[0].code },
      { name: 'Encounter', getter: (e) => e.type[0].coding[0].display },
      { name: 'Start Time', format: 'dateTime', getter: (e) => e.period.start },
      { name: 'Duration', getter: (e) => duration(e.period) },
      VIEW_FHIR,
    ],
    keyFn: (c) => c.id,
  };
}

class ImmunizationsTable extends GenericTable {
  static defaultProps = {
    title: 'Immunizations',
    columns: [
      { name: 'CVX', getter: (i) => i.vaccineCode.coding[0].code },
      { name: 'Vaccine', getter: (i) => i.vaccineCode.coding[0].display },
      { name: 'Date Given', format: 'date', getter: (i) => i.occurrenceDateTime },
      VIEW_FHIR,
    ],
    keyFn: (c) => c.id,
  };
}

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

class DocumentReferencesTable extends GenericTable {
  static defaultProps = {
    title: 'Documents',
    columns: [
      { name: 'Date', format: 'date', getter: (d) => d.date, width: WIDTHS.date },
      { name: 'Content', getter: (d) => renderNote(getNoteText(d)) },
      VIEW_FHIR,
    ],
    rowHeight: () => null, // makes the row height dynamic when the note is opened/closed
    keyFn: (dr) => dr.id,
  };
}

class MedicationRequestsTable extends GenericTable {
  static defaultProps = {
    title: 'Medication Requests',
    columns: [
      { name: 'RxNorm', getter: (m) => m.medicationCodeableConcept.coding[0].code },
      { name: 'Medication', getter: (m) => m.medicationCodeableConcept.coding[0].display },
      { name: 'Date Prescribed', format: 'date', getter: (c) => c.authoredOn },
      { name: 'Status', getter: (c) => c.status },
      VIEW_FHIR,
    ],
    keyFn: (m) => m.id,
  };
}

class MediasTable extends GenericTable {
  static defaultProps = {
    title: 'Images',
    columns: [
      { name: 'Code', getter: (m) => m.partOf[0].resource.procedureCode[0].coding[0].display },
      {
        name: 'Title',
        getter: (m) => {
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
          return title;
        },
      },
      { name: 'Media', getter: (m) => extractMedia(m) },
      { name: 'Date', getter: (m) => m.partOf[0].resource.started },
      // VIEW_FHIR // temporarily disabled
    ],
    keyFn: (m) => m.id,
    rowHeight: () => 200,
  };
}

export {
  ConditionsTable,
  ObservationsTable,
  ReportsTable,
  AllergiesTable,
  CarePlansTable,
  ProceduresTable,
  EncountersTable,
  ImmunizationsTable,
  DocumentReferencesTable,
  MedicationRequestsTable,
  MediasTable,
};

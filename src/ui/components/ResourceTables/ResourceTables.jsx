import React from 'react';

import moment from 'moment';

import FhirDataGrid, { getColumnKey } from '../PatientViewer/FhirDataGrid';
import ViewFhirModal from '../PatientViewer/ViewFhirModal';
import {
  codeDisplay,
  codeLabel,
  codeValue,
  effectiveTime,
  extractMedia,
  lastCodeableConcept,
  mediaTitle,
  missingField,
  obsValue,
  periodStart,
  unsupportedField,
} from '../PatientViewer/utils';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';

const formatDate = (value, format, fieldName) => {
  if (!value) return missingField(fieldName);
  const date = moment(value);
  return date.isValid() ? date.format(format) : unsupportedField(fieldName);
};

const FORMATTERS = {
  date: (str) => formatDate(str, 'YYYY-MM-DD', 'date'),
  time: (str) => formatDate(str, 'HH:mm:ss', 'time'),
  dateTime: (str) => formatDate(str, 'YYYY-MM-DD - h:mm a', 'dateTime'), // to re-add seconds: 'YYYY-MM-DD - h:mm:ss a'
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

const WIDTHS = {
  date: 145,
  dateTime: 300,
  snomed: 200,
  rxNorm: 125,
  loinc: 100,
};

const VIEW_FHIR = {
  key: 'fhir',
  name: 'View FHIR',
  width: 100,
  getter: (resource) => <ViewFhirModal resource={resource} />,
  sortable: false,
};

const attributeXTime = (entry, type) => {
  const value = effectiveTime(entry, type);
  if (React.isValidElement(value)) return value;
  if (typeof value === 'string') {
    return FORMATTERS.dateTime(value);
  }
  return FORMATTERS.period(value);
};

const duration = (period) => {
  if (!period?.start || !period?.end) {
    return missingField('period');
  }
  const start = moment(period.start);
  const end = moment(period.end);
  return moment.duration(end.diff(start)).humanize();
};

function applyColumns(resource, columns) {
  const row = {};

  for (const c of columns) {
    const key = getColumnKey(c);

    const formatter = FORMATTERS[c.format];
    let result;
    try {
      result = c.getter(resource);
    } catch (e) {
      console.error(e);
      result = unsupportedField(c.name || key);
    }
    if (result && formatter && !React.isValidElement(result)) {
      result = formatter(result);
    }
    if ((result == null || result === '') && c.defaultValue) {
      result = c.defaultValue;
    } else if (result == null) {
      result = missingField(c.name || key);
    }

    row[key] = result;
  }

  return row;
}

class GenericTable extends React.Component {
  render() {
    const rows = [];

    for (const [rowIndex, rawRow] of this.props.rows.slice().reverse().entries()) {
      const row = applyColumns(rawRow, this.props.columns);
      const rowId = this.props.keyFn ? this.props.keyFn(rawRow) : rowIndex;
      row.id = `${this.props.title}-${rowId ?? rowIndex}`;
      rows.push(row);

      if (this.props.nestedRows) {
        for (const [nestedRowIndex, nestedRow] of this.props.nestedRows.entries()) {
          let subRowLines;
          try {
            subRowLines = nestedRow.getter(rawRow);
          } catch (e) {
            subRowLines = undefined;
          }
          if (!subRowLines) continue;
          const subColumns = nestedRow.columns;

          for (const [subRowIndex, subRowLine] of subRowLines.entries()) {
            const nestedRowData = applyColumns(subRowLine, subColumns);
            nestedRowData.id = `${row.id}-nested-${nestedRowIndex}-${subRowLine.id ?? subRowIndex}`;
            rows.push(nestedRowData);
          }
        }
      }
    }

    const getRowHeight = this.props.rowHeight
      ? ({ model }) => this.props.rowHeight(model) || 'auto'
      : undefined;

    return (
      <React.Fragment>
        <div className="health-record__header">
          <div className="header-title">
            <a id={this.props.title}>{this.props.title}</a>
          </div>
          <div className="header-divider"></div>
        </div>
        <FhirDataGrid columns={this.props.columns} rows={rows} getRowHeight={getRowHeight} />
      </React.Fragment>
    );
  }
}

class ConditionsTable extends GenericTable {
  static defaultProps = {
    title: 'Conditions',
    columns: [
      { name: 'SNOMED', getter: (c) => codeValue(c.code, 'Condition.code'), width: WIDTHS.snomed },
      { name: 'Condition', getter: (c) => codeDisplay(c.code, 'Condition.code') },
      { name: 'Date of Onset', format: 'date', getter: (c) => c.onsetDateTime, width: WIDTHS.date },
      {
        name: 'Date Resolved',
        format: 'date',
        getter: (c) => c.abatementDateTime || '',
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
      { name: 'LOINC', getter: (o) => codeValue(o.code, 'Observation.code'), width: WIDTHS.loinc },
      { name: 'Observation', getter: (o) => codeDisplay(o.code, 'Observation.code') },
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
      {
        name: 'LOINC',
        getter: (r) => codeValue(r.code, 'DiagnosticReport.code'),
        width: WIDTHS.loinc,
      },
      {
        name: 'Report/Observation',
        getter: (r) => codeDisplay(r.code, 'DiagnosticReport.code'),
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
          {
            name: 'LOINC',
            getter: (o) => codeValue(o.code, 'Observation.code'),
            width: WIDTHS.loinc,
          },
          { name: 'Report/Observation', getter: (o) => codeDisplay(o.code, 'Observation.code') },
          { name: 'Value', getter: (o) => obsValue(o) },
          VIEW_FHIR,
        ],
      },
      {
        getter: (rpt) => rpt.presentedForm,
        keyFn: () => Math.floor(Math.random() * 100), // TODO, pass in index
        columns: [
          {
            name: 'Content',
            key: 'Report/Observation',
            getter: (p) =>
              renderNote(
                p.data ? atob(p.data) : missingField('DiagnosticReport.presentedForm.data'),
              ),
          },
          { key: 'type', getter: () => 'Note' },
          VIEW_FHIR,
        ],
      },
    ],
    keyFn: (r) => r.id,
  };
}

class AllergiesTable extends GenericTable {
  static defaultProps = {
    title: 'Allergies',
    columns: [
      {
        name: 'Allergy',
        getter: (a) => codeLabel(a.code, 'AllergyIntolerance.code'),
        width: WIDTHS.snomed,
      },
      { name: 'Recorded', format: 'date', getter: (a) => a.recordedDate || a.assertedDate },
      { name: 'Onset', format: 'date', getter: (a) => a.onsetDateTime || '' },
      {
        name: 'Clinical Status',
        getter: (a) => codeDisplay(a.clinicalStatus, 'AllergyIntolerance.clinicalStatus'),
      },
      VIEW_FHIR,
    ],
    keyFn: (c) => c.id,
  };
}

const goalDescriptionSTU3R4 = (goal) => {
  if (goal.description) return goal.description.text;
  return '';
};

class CarePlansTable extends GenericTable {
  static defaultProps = {
    title: 'CarePlans',
    columns: [
      // note the "last", us core category "assess-plan" gets added at slot 0
      // but us core is not always active
      // so we want the last one not necessarily always 0 or 1
      {
        name: 'SNOMED',
        getter: (c) => codeValue(lastCodeableConcept(c.category), 'CarePlan.category'),
        width: WIDTHS.snomed,
      },
      {
        name: 'Care Plan',
        getter: (c) => codeDisplay(lastCodeableConcept(c.category), 'CarePlan.category'),
      },
      {
        name: 'StartDate',
        format: 'date',
        getter: (c) => periodStart(c.period, 'CarePlan.period.start'),
      },
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
        keyFn: () => Math.random(),
        columns: [
          {
            name: 'Activity',
            key: 'Care Plan',
            getter: (a) => {
              const display = codeDisplay(a.detail?.code, 'CarePlan.activity.detail.code');
              return React.isValidElement(display) ? (
                <>Activity: {display}</>
              ) : (
                `Activity: ${display}`
              );
            },
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
      { name: 'SNOMED', getter: (p) => codeValue(p.code, 'Procedure.code'), width: WIDTHS.snomed },
      { name: 'Procedure', getter: (p) => codeDisplay(p.code, 'Procedure.code') },
      {
        name: 'Performed',
        format: 'dateTime',
        getter: (p) => p.performedDateTime || p.performedPeriod?.start,
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
      {
        name: 'SNOMED',
        getter: (e) => codeValue(e.type?.[0], 'Encounter.type'),
        width: WIDTHS.snomed,
      },
      { name: 'Encounter', getter: (e) => codeDisplay(e.type?.[0], 'Encounter.type') },
      {
        name: 'Start Time',
        format: 'dateTime',
        getter: (e) => periodStart(e.period, 'Encounter.period.start'),
      },
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
      { name: 'CVX', getter: (i) => codeValue(i.vaccineCode, 'Immunization.vaccineCode') },
      { name: 'Vaccine', getter: (i) => codeDisplay(i.vaccineCode, 'Immunization.vaccineCode') },
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
          <div style={{ textAlign: 'left', whiteSpace: 'pre' }}>{text}</div>
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
      {
        name: 'Content',
        getter: (d) =>
          renderNote(
            d.content?.[0]?.attachment?.data
              ? atob(d.content[0].attachment.data)
              : missingField('DocumentReference.content.attachment.data'),
          ),
      },
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
      {
        name: 'RxNorm',
        getter: (m) =>
          codeValue(m.medicationCodeableConcept, 'MedicationRequest.medicationCodeableConcept'),
        width: WIDTHS.rxNorm,
      },
      {
        name: 'Medication',
        getter: (m) =>
          codeDisplay(m.medicationCodeableConcept, 'MedicationRequest.medicationCodeableConcept'),
      },
      { name: 'Date Prescribed', format: 'date', getter: (c) => c.authoredOn, width: WIDTHS.date },
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
      {
        name: 'Code',
        getter: (m) =>
          codeDisplay(
            m.partOf?.[0]?.resource?.procedureCode?.[0],
            'Media.partOf.ImagingStudy.procedureCode',
          ),
      },
      { name: 'Title', getter: (m) => mediaTitle(m) },
      { name: 'Media', getter: (m) => extractMedia(m) },
      {
        name: 'Date',
        getter: (m) => m.partOf?.[0]?.resource?.started || missingField('ImagingStudy.started'),
      },
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

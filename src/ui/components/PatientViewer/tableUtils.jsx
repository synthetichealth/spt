import React from 'react';
import moment from 'moment';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { getColumnKey } from './FhirDataGrid';
import ViewFhirModal from './ViewFhirModal';
import { effectiveTime, missingField, unsupportedField } from './utils';

const formatDate = (value, format, fieldName) => {
  if (!value) return missingField(fieldName);
  const date = moment(value);
  return date.isValid() ? date.format(format) : unsupportedField(fieldName);
};

const createFormatters = ({ dateTimeFormat = 'YYYY-MM-DD - h:mm a' } = {}) => {
  const formatters = {
    date: (str) => formatDate(str, 'YYYY-MM-DD', 'date'),
    time: (str) => formatDate(str, 'HH:mm:ss', 'time'),
    dateTime: (str) => formatDate(str, dateTimeFormat, 'dateTime'),
    numberWithCommas: (str) => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    code: (code) => `${code.code}: ${code.display ? code.display : ''}`,
  };

  formatters.period = (period) => {
    if (!period?.start && !period?.end) return missingField('period');
    const start = period?.start ? formatters.dateTime(period.start) : missingField('period.start');
    const end = period?.end ? formatters.dateTime(period.end) : missingField('period.end');
    return (
      <>
        {start} -&gt; {end}
      </>
    );
  };

  return formatters;
};

const DEFAULT_FORMATTERS = createFormatters();
const SECOND_PRECISION_FORMATTERS = createFormatters({
  dateTimeFormat: 'YYYY-MM-DD - h:mm:ss a',
});

const createViewFhirColumn = (column = {}) => ({
  key: 'fhir',
  getter: (resource) => <ViewFhirModal resource={resource} />,
  sortable: false,
  ...column,
});

const attributeXTime = (entry, type, formatters = DEFAULT_FORMATTERS) => {
  const value = effectiveTime(entry, type);
  if (React.isValidElement(value)) return value;
  if (typeof value === 'string') {
    return formatters.dateTime(value);
  }
  return formatters.period(value);
};

const duration = (period) => {
  if (!period?.start || !period?.end) {
    return missingField('period');
  }
  const start = moment(period.start);
  const end = moment(period.end);
  return moment.duration(end.diff(start)).humanize();
};

const renderNote = (text) => {
  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>View Note</AccordionSummary>
      <AccordionDetails>
        <div style={{ textAlign: 'left', whiteSpace: 'pre' }}>{text}</div>
      </AccordionDetails>
    </Accordion>
  );
};

function applyColumns(resource, columns, options = {}) {
  const { formatters = DEFAULT_FORMATTERS, context } = options;
  const row = {};

  for (const column of columns) {
    const key = getColumnKey(column);
    const formatter = formatters[column.format];
    let result;
    try {
      result = column.getter(resource, context);
    } catch (e) {
      console.error(e);
      result = unsupportedField(column.name || key);
    }
    if (result && formatter && !React.isValidElement(result)) {
      result = formatter(result);
    }
    if ((result == null || result === '') && column.defaultValue) {
      result = column.defaultValue;
    } else if (result == null) {
      result = missingField(column.name || key);
    }

    row[key] = result;
  }

  return row;
}

function buildRows(options) {
  const {
    rows,
    columns,
    keyPrefix,
    keyFn,
    nestedRows,
    reverse = false,
    formatters = DEFAULT_FORMATTERS,
  } = options;
  const dataRows = [];
  const sourceRows = reverse ? rows.slice().reverse() : rows;

  for (const [rowIndex, rawRow] of sourceRows.entries()) {
    const row = applyColumns(rawRow, columns, { formatters });
    const rowId = keyFn ? keyFn(rawRow) : rowIndex;
    row.id = `${keyPrefix}-${rowId ?? rowIndex}`;
    dataRows.push(row);

    if (!nestedRows) continue;

    for (const [nestedRowIndex, nestedRow] of nestedRows.entries()) {
      let subRowLines;
      try {
        subRowLines = nestedRow.getter(rawRow);
      } catch (e) {
        subRowLines = undefined;
      }
      if (!subRowLines) continue;

      for (const [subRowIndex, subRowLine] of subRowLines.entries()) {
        const nestedRowData = applyColumns(subRowLine, nestedRow.columns, { formatters });
        nestedRowData.id = `${row.id}-nested-${nestedRowIndex}-${subRowLine.id ?? subRowIndex}`;
        dataRows.push(nestedRowData);
      }
    }
  }

  return dataRows;
}

export {
  DEFAULT_FORMATTERS,
  SECOND_PRECISION_FORMATTERS,
  applyColumns,
  attributeXTime,
  buildRows,
  createViewFhirColumn,
  duration,
  renderNote,
};

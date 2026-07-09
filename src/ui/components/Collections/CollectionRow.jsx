import React from 'react';
import { Link } from 'react-router-dom';

import { TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import useStyles from './styles';

function getCellValue(data, header) {
  const value = data[header.value] ?? data[header.value?.toLowerCase()];
  if (value == null) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
}

function getPatientLink(data, header, selectedCollection) {
  const patientId = selectedCollection === 'patients' ? data.id || data.Id : data[header.value];
  if (!patientId) return undefined;

  const source = data.sourceFormat === 'fhir' ? 'fhir' : 'csv';
  return `/record_viewer?patient=${source}/${patientId}`;
}

function CollectionRow(props) {
  const classes = useStyles();

  const { headers, data, selectedCollection } = props;

  return (
    <TableRow classes={{ root: classes.tableRow }}>
      {headers.map((header, j) => {
        const cellKey = `${j}`;
        const isPatientId =
          header.value === 'PATIENT' ||
          (selectedCollection === 'patients' && header.value === 'Id');
        const patientLink = isPatientId ? getPatientLink(data, header, selectedCollection) : null;
        const cellValue = getCellValue(data, header);
        return (
          <TableCell key={cellKey} style={{ whiteSpace: 'nowrap' }}>
            {' '}
            {patientLink ? (
              <Link to={patientLink}>
                {selectedCollection === 'patients' ? data.Id || data.id : cellValue}
              </Link>
            ) : (
              cellValue
            )}{' '}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

CollectionRow.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  selectedCollection: PropTypes.string.isRequired,
};

export default CollectionRow;

import React from 'react';
import { Link } from 'react-router-dom';

import { TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import useStyles from './styles';

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
        return (
          <TableCell key={cellKey} style={{ whiteSpace: 'nowrap' }}>
            {' '}
            {isPatientId ? (
              <Link
                to={{ pathname: '/record_viewer', search: `?patient=csv/${data[header.value]}` }}
              >
                {data[header.value]}
              </Link>
            ) : (
              data[header.value || header.toLowerCase()]
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

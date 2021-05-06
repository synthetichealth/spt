import React, { useCallback } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import PropTypes from 'prop-types';

function SortedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headers } = props;
  const createSortHandler = useCallback(property => event => {
    onRequestSort(event, property);
  });

  const labels = headers.map(header => {
    if (header.value !== undefined) {
      return header;
    } else {
      return { label: header, value: header };
    }
  });
  return (
    <TableHead>
      <TableRow>
        {labels.map(headCell => (
          <TableCell
            key={headCell.value}
            align="left"
            sortDirection={orderBy === headCell.value ? order : false}
            size="small"
          >
            <TableSortLabel
              classes={{ root: classes.headerCell }}
              active={orderBy === headCell.value}
              direction={orderBy === headCell.value ? order : 'asc'}
              onClick={createSortHandler(headCell.value)}
            >
              {headCell.label.toUpperCase()}
              {orderBy === headCell.value ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

SortedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired
};

export default SortedTableHead;

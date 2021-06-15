import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Table, TableBody, TableContainer, TablePagination } from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './styles';
import SortedTableHead from './SortedTableHead';
import CollectionRow from './CollectionRow';

const Collections = props => {
  const classes = useStyles();

  const { selectedCollection } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  useEffect(() => {
    setPage(0);
  }, [selectedCollection]);

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);
    },
    [setPage]
  );

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  const handleRequestSort = useCallback((event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  });

  const handleChangeRowsPerPage = useCallback(event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  });

  const { data } = useQuery(['collections', { selectedCollection }], () =>
    axios.get(`/collection/${selectedCollection}`)
  );

  const getInfo = () => {
    let headers = [];
    switch (selectedCollection) {
      case '':
        return [];
      case 'allergies':
        headers = [
          { value: 'START', label: 'START', edit: false },
          { value: 'STOP', label: 'STOP', edit: false },
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'ENCOUNTER', label: 'ENCOUNTER', edit: false },
          { value: 'CODE', label: 'CODE', edit: false },
          { value: 'DESCRIPTION', label: 'DESCRIPTION', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'careplans':
        headers = [
          { value: 'Id', label: 'Id', edit: false },
          { value: 'START', label: 'START', edit: false },
          { value: 'STOP', label: 'STOP', edit: false },
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'ENCOUNTER', label: 'ENCOUNTER', edit: false },
          { value: 'CODE', label: 'CODE', edit: false },
          { value: 'DESCRIPTION', label: 'DESCRIPTION', edit: false },
          { value: 'REASONCODE', label: 'REASONCODE', edit: false },
          { value: 'REASONDESCRIPTION', label: 'REASONDESCRIPTION', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'conditions':
        headers = [
          { value: 'START', label: 'START', edit: false },
          { value: 'STOP', label: 'STOP', edit: false },
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'ENCOUNTER', label: 'ENCOUNTER', edit: false },
          { value: 'CODE', label: 'CODE', edit: false },
          { value: 'DESCRIPTION', label: 'DESCRIPTION', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'devices':
        headers = [
          { value: 'START', label: 'START', edit: false },
          { value: 'STOP', label: 'STOP', edit: false },
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'ENCOUNTER', label: 'ENCOUNTER', edit: false },
          { value: 'CODE', label: 'CODE', edit: false },
          { value: 'DESCRIPTION', label: 'DESCRIPTION', edit: false },
          { value: 'UDI', label: 'UDI', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'encounters':
        headers = [
          { value: 'Id', label: 'Id', edit: false },
          { value: 'START', label: 'START', edit: false },
          { value: 'STOP', label: 'STOP', edit: false },
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'ORGANIZATION', label: 'ORGANIZATION', edit: false },
          { value: 'PROVIDER', label: 'PROVIDER', edit: false },
          { value: 'PAYER', label: 'PAYER', edit: false },
          { value: 'ENCOUNTERCLASS', label: 'ENCOUNTERCLASS', edit: false },
          { value: 'CODE', label: 'CODE', edit: false },
          { value: 'DESCRIPTION', label: 'DESCRIPTION', edit: false },
          { value: 'BASE_ENCOUNTER_COST', label: 'BASE_ENCOUNTER_COST', edit: false },
          { value: 'TOTAL_CLAIM_COST', label: 'TOTAL_CLAIM_COST', edit: false },
          { value: 'PAYER_COVERAGE', label: 'PAYER_COVERAGE', edit: false },
          { value: 'REASONCODE', label: 'REASONCODE', edit: false },
          { value: 'REASONDESCRIPTION', label: 'REASONDESCRIPTION', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'imaging_studies':
        headers = [
          { value: 'Id', label: 'Id', edit: false },
          { value: 'DATE', label: 'DATE', edit: false },
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'ENCOUNTER', label: 'ENCOUNTER', edit: false },
          { value: 'BODYSITE_CODE', label: 'BODYSITE_CODE', edit: false },
          { value: 'BODYSITE_DESCRIPTION', label: 'BODYSITE_DESCRIPTION', edit: false },
          { value: 'MODALITY_CODE', label: 'MODALITY_CODE', edit: false },
          { value: 'MODALITY_DESCRIPTION', label: 'MODALITY_DESCRIPTION', edit: false },
          { value: 'SOP_CODE', label: 'SOP_CODE', edit: false },
          { value: 'SOP_DESCRIPTION', label: 'SOP_DESCRIPTION', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'immunizations':
        headers = [
          { value: 'DATE', label: 'DATE', edit: false },
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'ENCOUNTER', label: 'ENCOUNTER', edit: false },
          { value: 'CODE', label: 'CODE', edit: false },
          { value: 'DESCRIPTION', label: 'DESCRIPTION', edit: false },
          { value: 'BASE_COST', label: 'BASE_COST', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'medications':
        headers = [
          { value: 'START', label: 'START', edit: false },
          { value: 'STOP', label: 'STOP', edit: false },
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'PAYER', label: 'PAYER', edit: false },
          { value: 'ENCOUNTER', label: 'ENCOUNTER', edit: false },
          { value: 'CODE', label: 'CODE', edit: false },
          { value: 'DESCRIPTION', label: 'DESCRIPTION', edit: false },
          { value: 'BASE_COST', label: 'BASE_COST', edit: false },
          { value: 'PAYER_COVERAGE', label: 'PAYER_COVERAGE', edit: false },
          { value: 'DISPENSES', label: 'DISPENSES', edit: false },
          { value: 'TOTALCOST', label: 'TOTALCOST', edit: false },
          { value: 'REASONCODE', label: 'REASONCODE', edit: false },
          { value: 'REASONDESCRIPTION', label: 'REASONDESCRIPTION', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'observations':
        headers = [
          { value: 'DATE', label: 'DATE', edit: false },
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'ENCOUNTER', label: 'ENCOUNTER', edit: false },
          { value: 'CODE', label: 'CODE', edit: false },
          { value: 'DESCRIPTION', label: 'DESCRIPTION', edit: false },
          { value: 'VALUE', label: 'VALUE', edit: false },
          { value: 'UNITS', label: 'UNITS', edit: false },
          { value: 'TYPE', label: 'TYPE', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'organizations':
        headers = [
          { value: 'Id', label: 'Id', edit: false },
          { value: 'NAME', label: 'NAME', edit: false },
          { value: 'ADDRESS', label: 'ADDRESS', edit: false },
          { value: 'CITY', label: 'CITY', edit: false },
          { value: 'STATE', label: 'STATE', edit: false },
          { value: 'ZIP', label: 'ZIP', edit: false },
          { value: 'LAT', label: 'LAT', edit: false },
          { value: 'LON', label: 'LON', edit: false },
          { value: 'PHONE', label: 'PHONE', edit: false },
          { value: 'REVENUE', label: 'REVENUE', edit: false },
          { value: 'UTILIZATION', label: 'UTILIZATION', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'patients':
        headers = [
          { value: 'Id', label: 'Id', edit: false },
          { value: 'BIRTHDATE', label: 'BIRTHDATE', edit: false },
          { value: 'DEATHDATE', label: 'DEATHDATE', edit: false },
          { value: 'SSN', label: 'SSN', edit: false },
          { value: 'DRIVERS', label: 'DRIVERS', edit: false },
          { value: 'PASSPORT', label: 'PASSPORT', edit: false },
          { value: 'PREFIX', label: 'PREFIX', edit: false },
          { value: 'FIRST', label: 'FIRST', edit: false },
          { value: 'LAST', label: 'LAST', edit: false },
          { value: 'SUFFIX', label: 'SUFFIX', edit: false },
          { value: 'MAIDEN', label: 'MAIDEN', edit: false },
          { value: 'MARITAL', label: 'MARITAL', edit: false },
          { value: 'RACE', label: 'RACE', edit: false },
          { value: 'ETHNICITY', label: 'ETHNICITY', edit: false },
          { value: 'GENDER', label: 'GENDER', edit: false },
          { value: 'BIRTHPLACE', label: 'BIRTHPLACE', edit: false },
          { value: 'ADDRESS', label: 'ADDRESS', edit: false },
          { value: 'CITY', label: 'CITY', edit: false },
          { value: 'STATE', label: 'STATE', edit: false },
          { value: 'COUNTY', label: 'COUNTY', edit: false },
          { value: 'ZIP', label: 'ZIP', edit: false },
          { value: 'LAT', label: 'LAT', edit: false },
          { value: 'LON', label: 'LON', edit: false },
          { value: 'HEALTHCARE_EXPENSES', label: 'HEALTHCARE_EXPENSES', edit: false },
          { value: 'HEALTHCARE_COVERAGE', label: 'HEALTHCARE_COVERAGE', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'payer_transitions':
        headers = [
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'START_YEAR', label: 'START_YEAR', edit: false },
          { value: 'END_YEAR', label: 'END_YEAR', edit: false },
          { value: 'PAYER', label: 'PAYER', edit: false },
          { value: 'OWNERSHIP', label: 'OWNERSHIP', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'payers':
        headers = [
          { value: 'Id', label: 'Id', edit: false },
          { value: 'NAME', label: 'NAME', edit: false },
          { value: 'ADDRESS', label: 'ADDRESS', edit: false },
          { value: 'CITY', label: 'CITY', edit: false },
          { value: 'STATE_HEADQUARTERED', label: 'STATE_HEADQUARTERED', edit: false },
          { value: 'ZIP', label: 'ZIP', edit: false },
          { value: 'PHONE', label: 'PHONE', edit: false },
          { value: 'AMOUNT_COVERED', label: 'AMOUNT_COVERED', edit: false },
          { value: 'AMOUNT_UNCOVERED', label: 'AMOUNT_UNCOVERED', edit: false },
          { value: 'REVENUE', label: 'REVENUE', edit: false },
          { value: 'COVERED_ENCOUNTERS', label: 'COVERED_ENCOUNTERS', edit: false },
          { value: 'UNCOVERED_ENCOUNTERS', label: 'UNCOVERED_ENCOUNTERS', edit: false },
          { value: 'COVERED_MEDICATIONS', label: 'COVERED_MEDICATIONS', edit: false },
          { value: 'UNCOVERED_MEDICATIONS', label: 'UNCOVERED_MEDICATIONS', edit: false },
          { value: 'COVERED_PROCEDURES', label: 'COVERED_PROCEDURES', edit: false },
          { value: 'UNCOVERED_PROCEDURES', label: 'UNCOVERED_PROCEDURES', edit: false },
          { value: 'COVERED_IMMUNIZATIONS', label: 'COVERED_IMMUNIZATIONS', edit: false },
          { value: 'UNCOVERED_IMMUNIZATIONS', label: 'UNCOVERED_IMMUNIZATIONS', edit: false },
          { value: 'UNIQUE_CUSTOMERS', label: 'UNIQUE_CUSTOMERS', edit: false },
          { value: 'QOLS_AVG', label: 'QOLS_AVG', edit: false },
          { value: 'MEMBER_MONTHS', label: 'MEMBER_MONTHS', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'procedures':
        headers = [
          { value: 'DATE', label: 'DATE', edit: false },
          { value: 'START', label: 'START', edit: false },
          { value: 'STOP', label: 'STOP', edit: false },
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'ENCOUNTER', label: 'ENCOUNTER', edit: false },
          { value: 'CODE', label: 'CODE', edit: false },
          { value: 'DESCRIPTION', label: 'DESCRIPTION', edit: false },
          { value: 'BASE_COST', label: 'BASE_COST', edit: false },
          { value: 'REASONCODE', label: 'REASONCODE', edit: false },
          { value: 'REASONDESCRIPTION', label: 'REASONDESCRIPTION', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'providers':
        headers = [
          { value: 'Id', label: 'Id', edit: false },
          { value: 'ORGANIZATION', label: 'ORGANIZATION', edit: false },
          { value: 'NAME', label: 'NAME', edit: false },
          { value: 'GENDER', label: 'GENDER', edit: false },
          { value: 'SPECIALITY', label: 'SPECIALITY', edit: false },
          { value: 'ADDRESS', label: 'ADDRESS', edit: false },
          { value: 'CITY', label: 'CITY', edit: false },
          { value: 'STATE', label: 'STATE', edit: false },
          { value: 'ZIP', label: 'ZIP', edit: false },
          { value: 'LAT', label: 'LAT', edit: false },
          { value: 'LON', label: 'LON', edit: false },
          { value: 'UTILIZATION', label: 'UTILIZATION', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      case 'supplies':
        headers = [
          { value: 'DATE', label: 'DATE', edit: false },
          { value: 'PATIENT', label: 'PATIENT', edit: false },
          { value: 'ENCOUNTER', label: 'ENCOUNTER', edit: false },
          { value: 'CODE', label: 'CODE', edit: false },
          { value: 'DESCRIPTION', label: 'DESCRIPTION', edit: false },
          { value: 'QUANTITY', label: 'QUANTITY', edit: false }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };

      default:
        headers = [
          { value: 'id', label: 'id', edit: false },
          { value: 'resource', label: 'resource', edit: true }
        ];
        return {
          headers,
          data: data.data,
          addButton: false,
          editable: false
        };
    }
  };

  const infoBundle = data ? getInfo() : { headers: [], data: [], addButton: true };

  const formatRows = () => {
    if (!infoBundle.data) return [];
    return stableSort(infoBundle.data, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((d, i) => {
        return (
          <CollectionRow
            key={`${d.id}-${i}`}
            headers={infoBundle.headers}
            data={d}
            selectedCollection={selectedCollection}
            editable={infoBundle.editable}
          />
        );
      });
  };

  const renderToolbar = () => {
    return (
      <>
        <div className={classes.topBar}>
          <span className={classes.topBarText}>{selectedCollection.toUpperCase()}</span>
        </div>
        <div className={classes.break}></div>
      </>
    );
  };

  return (
    <div className={classes.collection}>
      {selectedCollection !== '' && infoBundle.data && (
        <>
          {renderToolbar()}
          {infoBundle.data.length > 0 ? (
            <TableContainer>
              <Table size="small">
                <SortedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headers={infoBundle.headers}
                />
                <TableBody>{formatRows()}</TableBody>
              </Table>
              <TablePagination
                component="div"
                count={infoBundle.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                backIconButtonProps={{
                  classes: classes.backButton
                }}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          ) : (
            <div className={classes.noData}>No Data Found</div>
          )}
        </>
      )}
    </div>
  );
};

Collections.propTypes = {
  selectedCollection: PropTypes.string
};
export default Collections;

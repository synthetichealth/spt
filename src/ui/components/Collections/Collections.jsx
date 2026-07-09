import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import PropTypes from 'prop-types';
import useStyles from './styles';
import SortedTableHead from './SortedTableHead';
import CollectionRow from './CollectionRow';
import { COLLECTION_CONFIG, DEFAULT_COLLECTION_CONFIG } from './config';

const Collections = (props) => {
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
    [setPage],
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
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = useCallback((event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  });

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  });

  const { data } = useQuery(['collections', { selectedCollection }], () =>
    axios.get(`/collection/${selectedCollection}`),
  );

  const selectedConfig = COLLECTION_CONFIG[selectedCollection] || DEFAULT_COLLECTION_CONFIG;
  const infoBundle = data ? { ...selectedConfig, data: data.data } : { headers: [], data: [] };

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
                onPageChange={handleChangePage}
                backIconButtonProps={{
                  classes: classes.backButton,
                }}
                onRowsPerPageChange={handleChangeRowsPerPage}
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
  selectedCollection: PropTypes.string,
};
export default Collections;

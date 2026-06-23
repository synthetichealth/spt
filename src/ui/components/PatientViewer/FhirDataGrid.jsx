import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DEFAULT_PAGE_SIZE = 25;

const getColumnKey = (column) => column.key || column.name;

const cellText = (value) => {
  if (value == null || React.isValidElement(value)) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return JSON.stringify(value);
};

const sortCells = (a, b) => cellText(a).localeCompare(cellText(b), undefined, { numeric: true });

const boldHeader = (headerName) => <strong>{headerName}</strong>;

const toMuiColumn = (column) => {
  const field = getColumnKey(column);
  let colSpan;

  if (column.colSpan) {
    colSpan = (value, row) =>
      column.colSpan({
        type: 'ROW',
        row,
      });
  }

  const headerName = column.name ?? field;

  return {
    field,
    headerName,
    renderHeader: () => boldHeader(headerName),
    width: column.width,
    minWidth: column.width ? undefined : 120,
    flex: column.width ? undefined : 1,
    sortable: column.sortable !== false,
    sortComparator: sortCells,
    colSpan,
    renderCell: (params) => <div className="fhir-data-grid__cell-content">{params.value}</div>,
  };
};

const defaultGetRowHeight = () => 'auto';

const defaultGetEstimatedRowHeight = ({ model }) => {
  if (model.type === 'Media') return 200;
  if (model.type === 'Note') return 96;
  return 35;
};

const FhirDataGrid = ({ columns, rows, getRowHeight = defaultGetRowHeight }) => {
  const pageSize = Math.min(DEFAULT_PAGE_SIZE, Math.max(rows.length, 1));

  return (
    <DataGrid
      autoHeight
      className="fhir-data-grid"
      columns={columns.map(toMuiColumn)}
      rows={rows}
      density="compact"
      disableRowSelectionOnClick
      getRowHeight={getRowHeight}
      getEstimatedRowHeight={defaultGetEstimatedRowHeight}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize,
          },
        },
      }}
      pageSizeOptions={[10, 25, 50, 100]}
      hideFooter={rows.length <= DEFAULT_PAGE_SIZE}
      sx={{
        width: '100%',
        minWidth: 720,
      }}
    />
  );
};

export { getColumnKey };
export default FhirDataGrid;

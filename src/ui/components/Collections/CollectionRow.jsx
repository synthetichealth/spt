import React, { useReducer, useState } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import CreateIcon from '@material-ui/icons/Create';
import ReactJson from 'react-json-view';
import useStyles from './styles';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import AlertDialog from './AlertDialog';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

function CollectionRow(props) {
  const classes = useStyles();
  const queryClient = useQueryClient();

  const reducer = (state, action) => {
    return { ...state, [action.header]: action.value };
  };
  const { headers, data, selectedCollection, editable, addNew, callback } = props;
  const [edit, setEdit] = useState(addNew);
  const [state, dispatch] = useReducer(reducer, data);

  const updateData = () => {
    const bundle = {};
    headers.forEach(header => {
      if (!header.viewOnly) {
        bundle[header.value] = state[header.value];
      }
    });

    axios.put(`/collection/${selectedCollection}?id=${bundle.id}`, bundle).then(() => {
      queryClient.invalidateQueries(['collections', { selectedCollection }]);
      setEdit(false);
      if (callback) {
        callback();
      }
    });
  };

  const handleJson = event => {
    // the event is a custom object returned from
    // JSONInput, not a regular event
    if (event.jsObject) {
      dispatch({ header: 'resource', value: event.jsObject });
    }
  };

  const cancelSave = () => {
    setEdit(false);
    if (callback) {
      callback();
    }
  };

  const deleteData = () => {
    axios.delete(`/collection/${selectedCollection}?id=${state.id}`).then(() => {
      queryClient.invalidateQueries(['collections', { selectedCollection }]);
      setEdit(false);
    });
  };

  const renderNormal = () => {
    return (
      <>
        {headers.map((header, j) => {
          const cellKey = `${j}`;
          return (
            <TableCell key={cellKey} style={{ whiteSpace: 'nowrap' }}>
              {' '}
              {header.value === 'resource' ? (
                <ReactJson src={data} collapsed={true} enableClipboard={false} />
              ) : (
                data[header.value || header.toLowerCase()]
              )}{' '}
            </TableCell>
          );
        })}
        <TableCell>
          {editable && (
            <>
              <CreateIcon
                fontSize={'small'}
                color="secondary"
                classes={{ root: classes.icon }}
                onClick={() => {
                  setEdit(true);
                }}
              />
              <AlertDialog
                title={`Are you sure?`}
                content={`Delete entry ${data['id']} from ${selectedCollection}?`}
                callback={deleteData}
              ></AlertDialog>
            </>
          )}
        </TableCell>
      </>
    );
  };

  const renderEdit = () => {
    return (
      <>
        {headers.map((header, j) => {
          const cellKey = `${j}`;
          return (
            <TableCell key={`${data.id}-${cellKey}`} style={{ whiteSpace: 'nowrap' }}>
              {' '}
              {header.value === 'resource' ? (
                header.edit ? (
                  <JSONInput
                    id={'json' + j}
                    placeholder={state}
                    locale={locale}
                    height="550px"
                    onChange={handleJson}
                  />
                ) : (
                  <ReactJson src={data[header.value]} collapsed={true} enableClipboard={false} />
                )
              ) : header.edit || (addNew && !header.viewOnly) ? (
                <input
                  value={state[header.value]}
                  className={classes.editInput}
                  onChange={e => {
                    dispatch({ header: header.value, value: e.target.value });
                  }}
                />
              ) : (
                data[header.value || header.toLowerCase()]
              )}{' '}
            </TableCell>
          );
        })}
        <TableCell>
          <SaveIcon
            fontSize={'small'}
            color="secondary"
            classes={{ root: classes.icon }}
            onClick={updateData}
          />
          <CancelIcon fontSize={'small'} classes={{ root: classes.icon }} onClick={cancelSave} />
        </TableCell>
      </>
    );
  };

  return (
    <>
      <TableRow classes={edit ? { root: classes.tableRowEdit } : { root: classes.tableRow }}>
        {edit ? renderEdit() : renderNormal()}
      </TableRow>
    </>
  );
}

CollectionRow.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  selectedCollection: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  addNew: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired
};

export default CollectionRow;

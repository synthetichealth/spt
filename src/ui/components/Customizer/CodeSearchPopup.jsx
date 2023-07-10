import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import concepts from './concepts.json';


const filter = createFilterOptions();

// adapted from MUI docs https://mui.com/material-ui/react-autocomplete/#system-FreeSoloCreateOptionDialog.js
const CodeSearchPopup = (props) => {
  const { value, setValue, type } = props;
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      display: '',
      code: '',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    display: '',
    code: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      display: dialogValue.display,
      code: dialogValue.code,
    });
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                display: newValue,
                code: '',
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              display: newValue.inputValue,
              code: '',
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          let filtered = options;

          if (type === "medication") {
            filtered = filtered.filter(o => o.system === "RxNorm");
          } else {
            filtered = filtered.filter(o => o.system === "SNOMED-CT");
          }

          filtered = filter(filtered, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              display: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="code-search-popup"
        options={concepts}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return `[${option.system}] ${option.code}: ${option.display}`;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{`[${option.system}] ${option.code}: ${option.display}`}</li>}
        sx={{ width: 600 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Code search" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Adding a code</DialogTitle>
          <DialogContent>
            <DialogContentText>
              WARNING: The code you entered is not in Synthea by default! You can still add it to the keep module if you know what you're doing.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.display}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  display: event.target.value,
                })
              }
              label="Display"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.code}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  code: event.target.value,
                })
              }
              label="Code"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default CodeSearchPopup;
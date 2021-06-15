import React, { useState, memo, useCallback, useRef } from 'react';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField
} from '@material-ui/core';
import useStyles from './Dashboard/styles';
import axios from 'axios';

function CSVFileManager() {
  const classes = useStyles();

  const importFileRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
  const [planDefFullUrl, setPlanDefFullUrl] = useState('');


  const invokeClear = () => {
    axios.post(`/csv/clear`);
  };

  const invokeLoad = useCallback(
    event => {
      event.preventDefault();
      if (!fileName) {
        setAlert('Unable to trigger report: Patient or Encounter Resource required.', 'error');
        return;
      }
      axios.post(`/csv/load`, { path: fileName });
    },
    [fileName]
  );

  return (
    <div className={classes.dashboardContainer}>
      <Paper elevation={3} className={classes.dashboardCard}>
        <p>CSV File Management</p>
        <form onSubmit={invokeLoad}>
          <div id="resource-upload-container">
            <TextField
              id="choose-file-input"
              value={fileName}
              type="text"
              label="Path to patients.csv"
              onChange={e => setFileName(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={isLoading}
            disableElevation
          >
            Trigger
          </Button>
        </form>
        <hr />
        <Button variant="contained"  onClick={invokeClear}>
          Clear all loaded CSVs
        </Button>
      </Paper>
    </div>
  );
}

export default CSVFileManager;

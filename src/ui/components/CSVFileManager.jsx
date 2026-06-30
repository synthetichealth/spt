import React, { useCallback, useState } from 'react';
import axios from 'axios';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function CSVFileManager() {
  const [csvPath, setCsvPath] = useState('');
  const [fhirPath, setFhirPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [isClearAllDialogOpen, setIsClearAllDialogOpen] = useState(false);

  const invokeCsvLoad = useCallback(
    async (event) => {
      event.preventDefault();
      if (!csvPath) {
        setMessage({ severity: 'error', text: 'Enter a path to a CSV directory or patients.csv.' });
        return;
      }

      setIsLoading(true);
      setMessage(undefined);

      try {
        const response = await axios.post('/csv/load', { path: csvPath });
        const loadedCount = response.data?.loadedFiles?.length || 0;
        setMessage({
          severity: 'success',
          text: `Loaded ${loadedCount} CSV file${loadedCount === 1 ? '' : 's'}.`,
        });
      } catch (error) {
        setMessage({
          severity: 'error',
          text: error.response?.data?.error || 'Unable to load CSV files.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [csvPath],
  );

  const invokeCsvClear = useCallback(async () => {
    setIsLoading(true);
    setMessage(undefined);

    try {
      await axios.post('/csv/clear');
      setMessage({ severity: 'success', text: 'Cleared loaded CSV data.' });
    } catch (error) {
      setMessage({
        severity: 'error',
        text: error.response?.data?.error || 'Unable to clear loaded CSV data.',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const invokeFhirLoad = useCallback(
    async (event) => {
      event.preventDefault();
      if (!fhirPath) {
        setMessage({
          severity: 'error',
          text: 'Enter a path to a FHIR JSON, NDJSON, or directory.',
        });
        return;
      }

      setIsLoading(true);
      setMessage(undefined);

      try {
        const response = await axios.post('/fhir/load', { path: fhirPath });
        const loadedCount = response.data?.loadedFiles?.length || 0;
        const resourceCount = response.data?.resourceCount || 0;
        setMessage({
          severity: 'success',
          text: `Loaded ${resourceCount} FHIR resource${resourceCount === 1 ? '' : 's'} from ${loadedCount} file${loadedCount === 1 ? '' : 's'}.`,
        });
      } catch (error) {
        setMessage({
          severity: 'error',
          text: error.response?.data?.error || 'Unable to load FHIR files.',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [fhirPath],
  );

  const invokeFhirClear = useCallback(async () => {
    setIsLoading(true);
    setMessage(undefined);

    try {
      await axios.post('/fhir/clear');
      setMessage({ severity: 'success', text: 'Cleared loaded FHIR data.' });
    } catch (error) {
      setMessage({
        severity: 'error',
        text: error.response?.data?.error || 'Unable to clear loaded FHIR data.',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const invokeClearAll = useCallback(async () => {
    setIsClearAllDialogOpen(false);
    setIsLoading(true);
    setMessage(undefined);

    try {
      await Promise.all([axios.post('/csv/clear'), axios.post('/fhir/clear')]);
      setMessage({ severity: 'success', text: 'Cleared all loaded data.' });
    } catch (error) {
      setMessage({
        severity: 'error',
        text: error.response?.data?.error || 'Unable to clear all loaded data.',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Box sx={{ width: 'min(720px, 100%)', mx: 'auto', textAlign: 'left' }}>
      <Paper sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={2}>
          <Typography component="h1" variant="h5">
            Manage Data
          </Typography>
          {message && <Alert severity={message.severity}>{message.text}</Alert>}
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Typography component="h2" variant="h6">
                CSV
              </Typography>
              <Box component="form" onSubmit={invokeCsvLoad}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <TextField
                    fullWidth
                    label="CSV path"
                    value={csvPath}
                    onChange={(event) => setCsvPath(event.target.value)}
                    disabled={isLoading}
                    placeholder="/path/to/csv"
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                    startIcon={<UploadFileIcon />}
                    sx={{ minWidth: 120 }}
                  >
                    Load
                  </Button>
                </Stack>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={invokeCsvClear}
                  disabled={isLoading}
                  startIcon={<DeleteSweepIcon />}
                >
                  Clear CSV Data
                </Button>
              </Box>
            </Stack>

            <Stack spacing={1.5}>
              <Typography component="h2" variant="h6">
                Bulk FHIR
              </Typography>
              <Box component="form" onSubmit={invokeFhirLoad}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <TextField
                    fullWidth
                    label="FHIR path"
                    value={fhirPath}
                    onChange={(event) => setFhirPath(event.target.value)}
                    disabled={isLoading}
                    placeholder="/path/to/fhir"
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                    startIcon={<UploadFileIcon />}
                    sx={{ minWidth: 120 }}
                  >
                    Load
                  </Button>
                </Stack>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={invokeFhirClear}
                  disabled={isLoading}
                  startIcon={<DeleteSweepIcon />}
                >
                  Clear FHIR Data
                </Button>
              </Box>
            </Stack>

            <Box>
              <Button
                variant="contained"
                color="error"
                onClick={() => setIsClearAllDialogOpen(true)}
                disabled={isLoading}
                startIcon={<DeleteSweepIcon />}
              >
                Clear All Loaded Data
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Paper>
      <Dialog
        open={isClearAllDialogOpen}
        onClose={() => setIsClearAllDialogOpen(false)}
        aria-labelledby="clear-all-data-title"
        aria-describedby="clear-all-data-description"
      >
        <DialogTitle id="clear-all-data-title">Clear all loaded data?</DialogTitle>
        <DialogContent>
          <DialogContentText id="clear-all-data-description">
            This will permanently remove every loaded CSV and FHIR record from the local database.
            Patient browsing and record viewer links for loaded data will stop working until data is
            loaded again. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsClearAllDialogOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={invokeClearAll}
            disabled={isLoading}
            startIcon={<DeleteSweepIcon />}
          >
            Yes, Clear Everything
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CSVFileManager;

import React, { useCallback, useState } from 'react';
import axios from 'axios';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function CSVFileManager() {
  const [csvPath, setCsvPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  const invokeLoad = useCallback(
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

  const invokeClear = useCallback(async () => {
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

  return (
    <Box sx={{ width: 'min(720px, 100%)', mx: 'auto', textAlign: 'left' }}>
      <Paper sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={2}>
          <Typography component="h1" variant="h5">
            Load CSVs
          </Typography>
          {message && <Alert severity={message.severity}>{message.text}</Alert>}
          <Box component="form" onSubmit={invokeLoad}>
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
              onClick={invokeClear}
              disabled={isLoading}
              startIcon={<DeleteSweepIcon />}
            >
              Clear CSV Data
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default CSVFileManager;

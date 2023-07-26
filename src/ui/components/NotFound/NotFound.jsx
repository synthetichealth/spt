import React, { memo } from 'react';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Paper>
      <h2>Page not found; please <Link to="/">return to home</Link>.</h2>
    </Paper>
  );
};

export default memo(NotFound);

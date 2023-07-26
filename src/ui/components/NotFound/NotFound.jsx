import React, { memo } from 'react';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Paper sx={{width: "100%", minHeight: "60vh"}}>
        <br />
        <br />
        <br />
        <h2>Page not found; please <Link to="/">return to home</Link>.</h2>
    </Paper>
  );
};

export default memo(NotFound);

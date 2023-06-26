import React, { memo } from 'react';
import { Paper } from '@mui/material';
import useStyles from './styles';

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.dashboardContainer}>
      <Paper elevation={3} className={classes.dashboardCard}></Paper>
    </div>
  );
}

export default memo(Dashboard);
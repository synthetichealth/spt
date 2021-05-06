import React, { useState, memo, useCallback, useRef } from 'react';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './styles';
import axios from 'axios';

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.dashboardContainer}>
      <Paper elevation={3} className={classes.dashboardCard}></Paper>
    </div>
  );
}

export default memo(Dashboard);

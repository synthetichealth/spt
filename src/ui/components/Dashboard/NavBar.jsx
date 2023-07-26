import React, { memo } from 'react';
import useStyles from './styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function NavBar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.header}></Toolbar>
      </AppBar>
    </div>
  );
}

export default memo(NavBar);

import React, { useState, memo, useCallback } from 'react';
import useStyles from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Search from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';
function NavBar(props) {
  const [open, setOpen] = useState(false);
  const { newNotifs, setContentKey } = props;
  const classes = useStyles();

  const setNotif = useCallback(() => {
    setContentKey('notifications');
  });

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.header}></Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  newNotifs: PropTypes.bool,
  setContentKey: PropTypes.func
};

export default memo(NavBar);

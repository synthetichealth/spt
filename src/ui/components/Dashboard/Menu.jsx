import React, { useCallback, memo } from 'react';
import useStyles from './styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';

function Menu(props) {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const { open, callback } = props;

  const logout = useCallback(() => {
    axios
      .post('/auth/logout', null, { withCredentials: true })
      .then(() => queryClient.invalidateQueries('authorized-user'));
  }, [queryClient]);
  const menu = [
    { key: 'Settings', icon: <SettingsIcon fontSize="large" />, callback: null },
    { key: 'Logout', icon: <ExitToAppIcon fontSize="large" />, callback: logout }
  ];

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={callback}>
        <div className={classes.menu} role="presentation" onKeyDown={callback}>
          <List>
            {menu.map(item => (
              <ListItem button key={item.key} onClick={item.callback}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.key} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

Menu.propTypes = {
  open: PropTypes.bool,
  callback: PropTypes.func
};

export default memo(Menu);

import React, { memo, useState } from 'react';
import useStyles from './styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PropTypes from 'prop-types';

const offline = (process.env.FRONTEND_ONLY === 'true');

function Sidebar(props) {
  const { tabs, callback, selected } = props;
  const [open, setOpen] = useState(true);

  const classes = useStyles();
  return (
    <div style={{ visibility: open ? 'visible' : 'collapse' }}>
      <Drawer
        className={classes.drawer}
        open={open}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={`${classes.spacer} ${classes.corner}`}>
          <div className={classes.cornerText} onClick={() => setOpen(false)}>
            SPT
          </div>
        </div>
        <List component="nav" classes={{ root: classes.overflow }}>
          {tabs.map(tab => {
            // don't show tabs that require a backend if there is none
            if (offline && !tab.offline) return null;
            if (tab.component) {
              // return button
              const itemClass =
                tab.key === selected
                  ? `${classes.drawerItem} ${classes.selectedItem}`
                  : classes.drawerItem;
              return (
                <ListItem
                  button
                  key={tab.key}
                  classes={{ root: itemClass }}
                  onClick={callback.bind(this, tab.key)}
                >
                  <ListItemText primary={tab.label} classes={{ primary: classes.drawerItemText }} />
                  <ChevronRightIcon classes={{ root: classes.chevron }} />
                </ListItem>
              );
            } else {
              // return header
              return (
                <ListItem
                  key={tab.key}
                  classes={{ root: `${classes.drawerHead} ${classes.drawerItem}` }}
                >
                  <div>{tab.label.toUpperCase()}</div>
                  <div className={classes.breakLine}></div>
                </ListItem>
              );
            }
          })}
        </List>
      </Drawer>
    </div>
  );
}

Sidebar.propTypes = {
  tabs: PropTypes.array,
  callback: PropTypes.func,
  selected: PropTypes.string
};

export default memo(Sidebar);

import React, { useCallback } from 'react';
import axios from 'axios';
import { useQueryClient } from 'react-query';

import PropTypes from 'prop-types';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import HistoryIcon from '@material-ui/icons/History';
import DoneIcon from '@material-ui/icons/Done';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import useStyles from './styles';
import moment from 'moment';

const Notifications = props => {
  const classes = useStyles();
  const queryClient = useQueryClient();

  const { notifs } = props;
  const updateNotif = useCallback(notif => {
    return () => {
      notif.viewed = true;
      axios.put(`/collection/notifications?id=${notif.id}`, notif).then(() => {
        queryClient.invalidateQueries('notifications');
      });
    };
  });

  return (
    <div className={classes.collection}>
      {notifs.length > 0 ? (
        notifs.map(notif => {
          return (
            <div key={notif.id} className={classes.notificationCard}>
              <ErrorOutlineIcon fontSize="large" className={classes.errorIcon} />
              <div className={classes.notificationSection}>Error Recieved:</div>
              <div className={`${classes.notificationSection} ${classes.notificationContent}`}>
                <div className={classes.content}>{notif.notif.message || notif.notif}</div>
              </div>
              <HistoryIcon fontSize="large" className={classes.historyIcon} />
              <div className={classes.timestamp}>{moment(notif.timestamp).fromNow()}</div>
              <DoneIcon
                className={classes.doneIcon}
                fontSize="large"
                onClick={updateNotif(notif)}
              />
              <OpenInNewIcon className={classes.openIcon} color="secondary" fontSize="large" />
            </div>
          );
        })
      ) : (
        <div className={classes.collection}>
          <div className={classes.notificationCard}>No New Notifications</div>
        </div>
      )}
    </div>
  );
};

Notifications.propTypes = {
  notifs: PropTypes.array
};
export default Notifications;

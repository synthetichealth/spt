import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(
  theme => ({
    collection: {
      color: 'red'
    },
    content: {
      float: 'left',
      padding: '5px 10px',
      backgroundColor: theme.palette.common.redLight,
      fontSize: '14px',
      fontFamily: 'monospace',
      fontWeight: '600'
    },
    doneIcon: {
      padding: '5px',
      color: theme.palette.common.grayLighter,
      cursor: 'pointer',
      fontSize: '50px'
    },
    openIcon: {
      cursor: 'pointer'
    },
    errorIcon: {
      color: theme.palette.common.maroon,
      padding: '5px'
    },
    historyIcon: {
      fontSize: '40px',
      padding: '5px'
    },
    timestamp: {
      fontSize: '16px',
      flexGrow: '.15',
      width: 0,
      textAlign: 'left',
      paddingLeft: '5px',
      fontWeight: 100
    },
    notificationCard: {
      margin: '25px 35px',
      backgroundColor: theme.palette.common.white,
      height: '115px',
      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.10)',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '15px',
      fontSize: '18px',
      color: theme.palette.common.grayDark
    },
    notificationSection: {
      padding: '5px'
    },
    notificationContent: {
      flexGrow: '.8',
      width: 0,
      justifyContent: 'left'
    },
    spacer: {
      flexGrow: '.2'
    }
  }),

  { name: 'Notifications', index: 1 }
);

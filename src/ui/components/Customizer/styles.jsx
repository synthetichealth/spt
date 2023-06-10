import { makeStyles } from '@mui/styles';
export default makeStyles(
  theme => ({
    addButton: {
      float: 'right',
      marginRight: '25px',
      marginTop: '17px',
      color: theme.palette.common.white
    },
    break: {
      width: '100%',
      height: '0',
      borderTop: '1px solid',
      borderColor: theme.palette.common.grayHighlight
    },
    collection: {
      margin: '60px auto',
      width: '75vw',
      backgroundColor: 'white'
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    },
    greenIcon: {
      border: '2px solid white',
      backgroundColor: theme.palette.common.turquoise,
      width: '12px',
      height: '12px',
      display: 'flex',
      borderRadius: '100px',
      marginLeft: '12px'
    },
    redIcon: {
      border: '2px solid white',
      backgroundColor: theme.palette.common.red,
      width: '12px',
      height: '12px',
      display: 'flex',
      borderRadius: '100px',
      marginLeft: '12px'
    },
    icon: {
      marginRight: '10px',
      cursor: 'pointer'
    },
    headerCell: {
      color: 'black'
    },
    noData: {
      height: '60px',
      lineHeight: '60px'
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.common.grayHighlight
      }
    },
    tableRowEdit: {
      backgroundColor: theme.palette.common.turquoiseLight
    },
    topBar: {
      height: '70px',
      lineHeight: '70px'
    },
    topBarText: {
      float: 'left',
      marginLeft: '20px'
    },
    backButton: {
      color: 'red',
      backgroundColor: 'red'
    },
    editInput: {
      width: '100%',
      border: '1px solid',
      borderColor: theme.palette.common.grayHighlight,
      padding: '2px',
      color: 'inherit'
    },
    customizerContainer: {
      padding: '15px 35px'
    },
    dashboardCard: {
      padding: 10
    }
  }),

  { name: 'Customizer', index: 1 }
);

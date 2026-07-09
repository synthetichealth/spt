import { styled } from '@mui/material/styles';
export default styled(
  (theme) => ({
    break: {
      width: '100%',
      height: '0',
      borderTop: '1px solid',
      borderColor: theme.palette.common.grayHighlight,
    },
    collection: {
      margin: '60px auto',
      width: 'min(1200px, 100%)',
      overflowX: 'auto',
      backgroundColor: 'white',
      [theme.breakpoints.down('sm')]: {
        margin: '24px auto',
      },
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
      width: 1,
    },
    headerCell: {
      color: 'black',
    },
    noData: {
      height: '60px',
      lineHeight: '60px',
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.common.grayHighlight,
      },
    },
    topBar: {
      height: '70px',
      lineHeight: '70px',
    },
    topBarText: {
      float: 'left',
      marginLeft: '20px',
    },
    backButton: {
      color: 'red',
      backgroundColor: 'red',
    },
  }),

  { name: 'Collection', index: 1 },
);

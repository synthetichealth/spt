import { makeStyles } from '@mui/styles';
const drawerWidth = 20.8;
const toolbarHeight = 95;
export default makeStyles(
  theme => ({
    appBar: {
      width: `${100 - drawerWidth}%`,
      paddingLeft: '10px',
      backgroundColor: theme.palette.common.white
    },
    avatar: {
      backgroundColor: theme.palette.common.turquoise,
      width: '45px',
      height: '45px',
      fontSize: '20px',
      color: 'white',
      fontWeight: 'bold',
      margin: '0 15px 0 15px'
    },
    badge: {
      backgroundColor: theme.palette.common.maroon,
      top: '35%',
      right: '35%',
      border: '2px solid',
      borderColor: theme.palette.common.white,
      borderRadius: '15px',
      height: '13px',
      width: '13px'
    },
    badgeRoot: {
      cursor: 'pointer'
    },
    breakLine: {
      flexGrow: 1,
      borderBottom: `1px solid ${theme.palette.common.grayMedium}`,
      height: `.25em`,
      display: 'flex',
      margin: '0 15px 0 10px'
    },
    chevron: {
      marginRight: '10px',
      fontSize: '28px'
    },
    container: {
      display: 'flex',
      WebkitFontSmoothing: 'antialiased',
      fontFamily: 'Verdana'
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      color: 'black'
    },
    corner: {
      backgroundColor: theme.palette.common.blueDark,
      verticalAlign: 'middle',
      cursor: 'pointer'
    },
    cornerText: {
      fontSize: '20px',
      fontFamily: 'Verdana',
      textAlign: 'center',
      color: theme.palette.common.white
    },

    drawer: {
      width: `${drawerWidth}vw`,
      flexShrink: 0
    },
    drawerHead: {
      backgroundColor: theme.palette.background.primary,
      color: theme.palette.text.gray,
      fontSize: '13px',
      fontWeight: 600
    },
    drawerItem: {
      textAlign: 'left',
      paddingLeft: '35px',
      display: 'flex',
      height: '70px',
      color: 'white'
    },
    drawerItemText: {
      fontFamily: 'Verdana',
      fontSize: '18px',
      fontWeight: 500
    },
    drawerPaper: {
      width: `${drawerWidth}vw`,
      borderRight: '0px',
      backgroundColor: theme.palette.background.primary
    },
    header: {
      height: `${toolbarHeight}px`,
      color: theme.palette.common.grayVeryDark
    },
    icon: {
      margin: '0 12px 0 12px',
      cursor: 'pointer'
    },
    menu: {
      width: '300px',
      fontSize: '25px',
      paddingTop: '35px',
      color: theme.palette.common.grayVeryDark
    },
    overflow: {
      overflowY: 'scroll',
      scrollbarWidth: 'thin',
      scrollbarColor: `${theme.palette.common.grayVeryLight} ${theme.palette.common.grayVeryDark}`
    },
    searchInput: {
      '&::placeholder': {
        fontStyle: 'italic'
      },
      fontSize: '20px',
      color: theme.palette.common.grayVeryDark
    },
    selectedItem: {
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.main
      }
    },
    // make sure things don't appear behind the nav bar
    spacer: {
      minHeight: `${toolbarHeight}px`,
      lineHeight: `${toolbarHeight}px`
    },
    dashboardContainer: {
      padding: '15px 35px'
    },
    dashboardCard: {
      padding: 10
    },
    fullWidth: {
      display: 'inline-block',
      width: '100%'
    },
    input: {
      display: 'none'
    },
    chooseFileInput: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      margin: 10
    },
    inputButton: {
      whiteSpace: 'nowrap',
      marginRight: '1em'
    },
    fileName: {
      fontStyle: 'italic'
    }
  }),

  { name: 'Dashboard', index: 1 }
);

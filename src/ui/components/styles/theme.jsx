import { createTheme, adaptV4Theme } from "@mui/material/styles";

const colors = {
  white: '#fff',
  offWhite: '#f5f5fa',
  black: '#222',
  red: '#d95d77',
  redDark: '#bb3551',
  redLight: '#ffeded',
  blue: '#5d89a1',
  blueDark: '#386883',
  blueLighter: '#9ad2f0',
  gray: '#4a4a4a',
  grayMedium: '#676a70',
  grayBlue: '#cbd5df',
  grayBlueDark: '#7d8892',
  grayHighlight: '#eaeaeb',
  grayLight: '#4e5258',
  grayLighter: '#b5b6ba',
  grayLightest: '#eaeef2',
  grayDark: '#444',
  grayVeryDark: '#3a3a3a',
  grayLightText: '#87878e',
  green: '#2fa874',
  maroon: '#a83048',
  purple: '#8b72d6',
  turquoise: '#37c0ae',
  turquoiseLight: '#e6f7f5'
};

const paletteBase = {
  primary: {
    main: colors.blueDark
  },
  secondary: {
    main: colors.blue
  },
  error: {
    main: colors.red
  },
  common: colors,
  background: {
    default: colors.grayLightest,
    primary: colors.grayLight
  },
  text: {
    primary: colors.black,
    secondary: colors.black,
    gray: colors.grayLighter
  },
  grey: {
    800: colors.gray
  },
  purple: {
    main: colors.purple
  }
};

const materialUiOverridesBase = {
  MuiTableCell: {
    body: {
      color: '#575b62'
    },
    head: {
      color: '#575b62',
      fontWeight: '600',
      fontSize: '12px'
    },
    sizeSmall: {
      padding: '5px 24px 5px 16px',
      '&:last-child': {
        paddingRight: '0px',
        width: '80px'
      }
    }
  },
  MuiTableContainer: {
    root: {
      width: '70vw',
      margin: '0 20px 0 20px',
      overflowY: 'visible',
      overflowX: 'scroll',
      backgroundColor: 'white'
    }
  },
  MuiTableSortLabel: {
    root: {
      color: 'black',
      '&$active': {
        color: 'black'
      }
    }
  }
};

const theme = createTheme(adaptV4Theme({
  palette: { ...paletteBase },
  overrides: { ...materialUiOverridesBase }
}));

export default theme;

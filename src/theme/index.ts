import { responsiveFontSizes, createMuiTheme } from '@material-ui/core/styles';

export const appTheme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'rgb(160,160,255)',
        },
      },
    },
  },  
  typography: {
    fontFamily: ['Montserrat', 'san-serif'].join(','),
    h4: {
      fontWeight: 300,
      fontSize: 20,
    },
    h1: {
      fontWeight: 600,
      fontSize: '1.15rem',
    },
    h2: {
      fontWeight: 300,
      fontSize: 18,
    },
    h3: {
      fontWeight: 400,
      fontSize: 13,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default responsiveFontSizes(appTheme);

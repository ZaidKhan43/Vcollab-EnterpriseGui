import { PaletteType } from '@material-ui/core';

const darMode = {
    palette: {
      type: 'dark' as PaletteType,
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
  }

 export default darMode; 
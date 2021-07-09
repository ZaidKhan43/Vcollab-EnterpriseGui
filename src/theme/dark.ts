import { PaletteType } from '@material-ui/core';
import appTheme from './index';

const darMode = {
  ...appTheme,
  palette: {
    type: 'dark' as PaletteType,
    primary: {
      light: '#7986cb',
      main: '#4882c9',
      dark: '#303f9f'
    }
  },
} 

export default darMode; 
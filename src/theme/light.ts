import { PaletteType } from '@material-ui/core';
import appTheme from './index';

const lightMode = {
    ...appTheme,
    palette: {
      type: 'light' as PaletteType,
    },
  } 

 export default lightMode;
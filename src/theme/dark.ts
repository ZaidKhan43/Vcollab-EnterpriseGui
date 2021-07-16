import { PaletteType } from '@material-ui/core';
import appTheme from './index';

const darMode = {
  ...appTheme,
  overrides: {
      ...appTheme.overrides,
      MuiListItem: {
        root: {
          '&$selected': {
            backgroundColor: "#4882c9",
            '&:hover': {
              backgroundColor: "rgba(72, 130, 201, 0.74)"
            }
          }
        }
      },
      },
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
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
      main: '#4882c9',
    },
    action: {
      selected: "#4882c9"
    }
  },
} 

export default darMode; 
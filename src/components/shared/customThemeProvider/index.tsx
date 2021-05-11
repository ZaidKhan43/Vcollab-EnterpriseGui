import { responsiveFontSizes, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider} from '@material-ui/core/styles';

//Custom theme 
import darkMode from '../../../theme/dark';
import lightMode from  '../../../theme/light';

// Redux Selector
import {  selectDarkModeEnable } from '../../../store/appSlice';
import { useAppSelector } from '../../../store/storeHooks';


//Enabling darkmode and light mode
export default function CustomThemeProvider(props : any) {

  const isDarkModeEnable = useAppSelector(selectDarkModeEnable);
  const selectedTheme = createMuiTheme( isDarkModeEnable ? darkMode : lightMode);
  const responsiveTheme = responsiveFontSizes(selectedTheme);

  return (
      <ThemeProvider theme={ responsiveTheme }> 
        { props.children }
      </ThemeProvider>
  )
}
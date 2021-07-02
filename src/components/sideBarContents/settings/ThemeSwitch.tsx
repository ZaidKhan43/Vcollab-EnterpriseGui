
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/core/styles';


import {setDarkModeEnable , selectDarkModeEnable} from '../../../store/appSlice';
import {useAppSelector, useAppDispatch} from '../../../store/storeHooks';


import style from './ThemeSwitchstyle';

const ThemchangeButton = withStyles((theme) => ({

    root:{
      textTransform: 'none'
    },
    label: {
      color: theme.palette.text.primary,
    },
    sizeSmall:{

      width:100,
      height:30
    }
  }))(ToggleButton);

export default function ToggleButtons() {


    const classes = style();
    const isDarkModeEnable = useAppSelector(selectDarkModeEnable);
    const dispatch = useAppDispatch();  

    const handleDarkTheme= function() {
        dispatch(setDarkModeEnable (true));
      }

      const handleLightTheme= function() {
        dispatch(setDarkModeEnable (false));
      }

  return (

    <div className={classes.toggleContainer}>  
    <div className={classes.toggleHeading}>
      Color Theme
    </div>
    <br></br>
    <div className={classes.toggleButtons}>
    <ToggleButtonGroup
    size='small'
    >
      <ThemchangeButton  value="darktheme-button" onClick={handleDarkTheme} selected={isDarkModeEnable ? true: false}>
           Dark

      </ThemchangeButton>
      <ThemchangeButton value="lighttheme-button" onClick={handleLightTheme} selected={ isDarkModeEnable ? false: true}>
           Light
      </ThemchangeButton>
    </ToggleButtonGroup>
    </div>
    </div>
  );
}

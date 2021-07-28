import { useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/core/styles';

import style from './tooglebuttonstyle';


const ThemchangeButton = withStyles((theme) => ({

    root:{
      textTransform: 'none'
    },
    label: {
      color: theme.palette.text.primary,
    },
    sizeSmall:{

      width:60,
      height:30
    }
  }))(ToggleButton);

export default function ToggleButtons() {


const [toogleSelect , setToggleSelect] = useState(false);

const classes = style();
 

const handleDarkTheme= function() {

  setToggleSelect(true);

}

const handleLightTheme= function() {

  setToggleSelect(false);

}

  return (

    <div className={classes.toggleContainer}>  
    <div className={classes.toggleButtons}>
      Show
    </div> 
    <ToggleButtonGroup
    size='small'
    >
      <ThemchangeButton  value="darktheme-button" onClick={handleDarkTheme} selected={toogleSelect? true : false}>
           On
      </ThemchangeButton>
      <ThemchangeButton value="lighttheme-button" onClick={handleLightTheme} selected={toogleSelect? false : true}>
           Off
      </ThemchangeButton>
    </ToggleButtonGroup>
   
    </div>
  );
}
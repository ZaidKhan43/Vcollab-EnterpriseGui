import MuiTypgraphy from '@material-ui/core/Typography';
import MuiGrid from '@material-ui/core/Grid';
import MuiSlider from '@material-ui/core/Slider';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';
import NumericInput from 'react-numeric-input';
import styles from './style';
import MuiExpandLessIcon from '@material-ui/icons/ExpandLess';
import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiInput from '@material-ui/core/Input';
import {useState, useEffect} from 'react';
import { translate } from '../../../store/sideBar/clipSlice';

export default function TranslateSlider( props : any ){
    const classes = styles();
    const [value, setValue] = useState(props.value)
      useEffect(() => {
        setValue(props.value)
      },[props.value]);

    const [stepValue, setStepValue] = useState(props.stepValue)

return(
    <div>
    <MuiTypography className={classes.listSub}  >
    {props.name}
  </MuiTypography>
  <MuiGrid container spacing={1} >
    <MuiGrid item xs={12} sm={7} className={classes.translate}>
      <MuiSlider className={classes.translate} style={ props.editMode ? {color:"cuttentColor", opacity:"50%"} : {color:"currentColor",}}
        disabled={props.editMode}
        value={props.value}
        step={stepValue}
        min={props.valueMin}
        max={props.valueMax}
        onChange={props.onHandleChange}
        onChangeCommitted={props.onHandleCommited}
        aria-labelledby="input-slider"
      />
    </MuiGrid>
  <MuiGrid item xs={12} sm={3} style={{marginTop:"-17px"}} >
  <MuiIconButton disabled={props.editMode} style={{height:10, width:10, marginLeft:"5px"}}><MuiExpandLessIcon  onClick={() => props.value < props.valueMax && props.onHandleButton( Number(props.value + stepValue))} className={`${classes.translateButton} + ${props.editMode && classes.disabledButton}`}/></MuiIconButton>
  <MuiInput 
    readOnly={props.editMode}
    inputProps={{style: { textAlign: 'center', padding:"1px" }, step: stepValue, min: props.translateMin , max: props.translateMax}} 
    className={`${classes.inputTranslate} + ${props.editMode && classes.disabled}`} 
    style={{width: "70px", }} 
    type="number" 
    value={value} 
    onChange={(e) => setValue(e.target.value)} 
    onBlur={props.onHandleType} 
  />
    
    {/* <NumericInput
      readOnly={props.editMode}
      className={`${classes.inputTranslate} + ${props.editMode && classes.disabled}`}
      format={() => props.value}
      value={props.value}
      margin="dense"
      step= {props.stepValue}
        min= {props.valueMin}
        precision={4}
        max= {props.valueMax}
      noStyle
      // onChange={onHandleTranslateType}
      onBlur={props.onHandleType}
    /> */}
     <MuiIconButton disabled={props.editMode} style={{height:10, width:10,marginLeft:"5px"}}><MuiExpandMoreIcon  onClick={() =>  props.value > props.valueMin && props.onHandleButton(Number(props.value - stepValue))} className={`${classes.translateButton} + ${props.editMode && classes.disabledButton}`}/></MuiIconButton>
  </MuiGrid>
</MuiGrid>
<div style={{marginLeft: "20px"}}> 
  <MuiGrid container spacing={1}>
    <MuiGrid item xs={12} sm={4}>
      <MuiTypgraphy style={{ fontSize: "14px",}}>Step Value :</MuiTypgraphy>
    </MuiGrid>

    <MuiGrid item xs={12} sm={4} >
    <MuiInput
    readOnly={props.editMode}
    inputProps={{style: { textAlign: 'center', padding:"1px" }, }} 
    className={`${classes.inputTranslate} + ${props.editMode && classes.disabled}`} 
    style={{width: "70px",}} 
    type="number" 
    value={stepValue} 
    onChange={(e) => setStepValue(Number(e.target.value))}  
  />
    </MuiGrid>
  </MuiGrid>

  </div>
</div>
)
}
import MuiTypgraphy from '@material-ui/core/Typography';
import MuiGrid from '@material-ui/core/Grid';
import MuiSlider from '@material-ui/core/Slider';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';
import NumericInput from 'react-numeric-input';
import styles from './style';
import MuiExpandLessIcon from '@material-ui/icons/ExpandLess';
import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function TranslateSlider( props : any ){
    const classes = styles();
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
        min={props.valueMin}
        max={props.valueMax}
        onChange={props.onHandleChange}
        onChangeCommitted={props.onHandleCommited}
        aria-labelledby="input-slider"
      />
    </MuiGrid>
  <MuiGrid item xs={12} sm={3} style={{marginTop:"-17px"}} >
  <MuiIconButton disabled={props.editMode} style={{height:10, width:10, marginLeft:"5px"}}><MuiExpandLessIcon  onClick={() => props.value < props.valueMax && props.onHandleButton( props.value + 1)} className={`${classes.translateButton} + ${props.editMode && classes.disabledButton}`}/></MuiIconButton>
    <NumericInput
      readOnly={props.editMode}
      className={`${classes.inputTranslate} + ${props.editMode && classes.disabled}`}
      value={props.value}
      margin="dense"
        min= {props.valueMin}
        max= {props.valueMax}
      noStyle
      // onChange={onHandleTranslateType}
      onBlur={props.onHandleType}
    />
     <MuiIconButton disabled={props.editMode} style={{height:10, width:10,marginLeft:"5px"}}><MuiExpandMoreIcon  onClick={() =>  props.value > props.valueMin && props.onHandleButton(props.value - 1)} className={`${classes.translateButton} + ${props.editMode && classes.disabledButton}`}/></MuiIconButton>
  </MuiGrid>
</MuiGrid>
</div>
)
}
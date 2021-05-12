import { useState} from "react";
import styles from './style';
import clsx from 'clsx';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../components/icons/back';

import {useAppDispatch } from '../../../store/storeHooks';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

import Triangle from '../../../components/icons/triangle'
import ThreePoints from '../../../components/icons/threePoints'

import NumericInput from '../../shared/numericInput'

import MuiInput from '@material-ui/core/Input';
import MuiButton from '@material-ui/core/Button';
// import MuiTextField from '@material-ui/core/TextField';
import FlipDirectionLeft from "../../../components/icons/flipDirectionLeft";
import FlipDirectionRight from "../../../components/icons/flipDirectionRight";

import { editPlane } from '../../../store/sideBar/clipSlice';
import RotateSlider from './rotateSlider'


export default function ClipPlanes(props : any){

  const classes = styles();
  const dispatch = useAppDispatch();  

  const [clipNormalInverted, setClipNormalInverted] = useState(props.clicked.clipNormalInverted);
  const [translate, setTranslate] = useState(props.clicked.translate);
  const [rotate, setRotate] = useState(props.clicked.rotate);
  const [axisX, setXAxis] = useState(props.clicked.axisX);
  const [axisY, setAxisY] = useState(props.clicked.axisY); 
  const [clipCordX, setClipCordX] = useState(props.clicked.clipCordX);
  const [clipCordY, setClipCordY] = useState(props.clicked.clipCordY);
  const [clipCordZ, setClipCordZ] = useState(props.clicked.clipCordZ);
  const [clipConstD, setClipConstD] = useState(props.clicked.clipConstD);

  const [clipPlaneMode, setClipPlaneMode] = useState(props.clicked.clipPlaneMode);

  const OnHandleEquation:(value : number, variable: string) => any = (value,variable) => {
    switch(variable){
      case "clipCordX" :
        setClipCordX(value);
      break;
      case "clipCordY" :
        setClipCordY(Number(value));
      break;
      case "clipCordZ" :
        setClipCordZ(Number(value));
      break;
      case "clipConstD" :
        setClipConstD(Number(value));
      break;
    }
  }

  const onHandleDirection = () => {
    setClipNormalInverted(!clipNormalInverted)
  
  }

  const onHandleTranslate= (e : any,newValue : any) => {
    setTranslate(newValue)
  }

  const onHandleTranslateType= (e : any) => {
    setTranslate(Number(e.target.value))
  }

  const onHandleRotate = (fun : any, value : any) => {
    fun(value)
  }

  const onHandleRotateType = (value : any) => {
    setRotate(value)
  }

  const onHandleRotateYType = ( value : any) => {
    setAxisY(value)
  }

  const onHandleRotateXType = (value : any) => {
    setXAxis(value)
  }

  const onHandleReset = () => {
    setClipCordX(props.clicked.clipCordX)
    setClipCordY(props.clicked.clipCordY)
    setClipCordZ(props.clicked.clipCordY)
    setClipConstD(props.clicked.clipConstD)
    setClipNormalInverted(props.clicked.clipNormalInverted);
    setTranslate(props.clicked.translate);
    setRotate(props.clicked.rotate);
    //console.log("handleReset props", props.clicked.rotate)
    setXAxis(props.clicked.axisX);
    setAxisY(props.clicked.axisY);
    
  }

  const onHandleSave = () => {
    const id= props.clicked.id
    const clip = {id, clipCordX, clipCordY, clipCordZ, clipConstD, clipNormalInverted, translate, rotate, axisX, axisY}
    dispatch(editPlane(clip));
    props.editSave();
  }

  const getHeaderLeftIcon= () => {
    return (
      <MuiIconButton onClick={() => props.onHandleEdit()}><BackButton/></MuiIconButton>
    );
  }
  const getHeaderContent = () => {
    return (
      <div className={classes.heading}>
        <Grid container spacing={2} alignItems="center">
          <Grid item >
            <MuiTypography  variant="h1" noWrap>
              Clip Plates -
            </MuiTypography>
          </Grid>
          <Grid item xs>
            <MuiTypography variant="h2" noWrap style={{marginLeft :"-10px"}}> 
              {props.clicked.name}
            </MuiTypography>
          </Grid>
        </Grid>
      </div>
    )
  }
    
  const getBody = () => {
    //console.log("getBody",rotate)
    return (
      <div>
        <MuiTypography className={classes.listSub} noWrap>
          Plane Equation
        </MuiTypography>
        <form noValidate autoComplete="off">
          <div style={{ display: "flex",alignItems: "center",
            justifyContent: "flex-start", marginLeft:"5%", marginRight:"5%",
            marginTop:"5px", }}
          >
            <NumericInput
             className={classes.inputEquation}
              value={clipCordX}
              button={"no"}
              format={() => clipCordX + "X"}
              margin="dense"
              inputProps={{
                'aria-labelledby': 'input-slider', 
                type: 'number',
              }}
              onChange={(value : any) => OnHandleEquation(value,"clipCordX")} 
              />
              <MuiTypography className={classes.buttonIcon}>
                +
              </MuiTypography>
             <NumericInput
             className={classes.inputEquation}
              value={clipCordY}
              button={"no"}
              format={() => clipCordY + "Y"}
              margin="dense"
              inputProps={{
                'aria-labelledby': 'input-slider', 
                type: 'number',
              }}
              onChange={(value : any) => OnHandleEquation(value,"clipCordY")} 
            />
            <MuiTypography className={classes.buttonIcon}>
              +
            </MuiTypography>
            <NumericInput
             className={classes.inputEquation}
              value={clipCordZ}
              button={"no"}
              format={() => clipCordZ + "Z"}
              margin="dense"
              inputProps={{
                'aria-labelledby': 'input-slider',
                type: 'number', 
              }}
              onChange={(value : any) => OnHandleEquation(value, "clipCordZ")} 
            />
            <MuiTypography className={classes.buttonIcon}>
              =
            </MuiTypography>
            <NumericInput
             className={classes.inputEquation}
              value={clipConstD}
              button={"no"}
              margin="dense"
              inputProps={{
                'aria-labelledby': 'input-slider', 
                type: 'number',
              }}
              onChange={(value : any) => OnHandleEquation(value, "clipConstD")} 
            />
          </div>
          <Grid container  spacing={3} style={{marginTop:"-4px", marginLeft:"-10px"}}>
        <Grid item xs={12} sm={6} >
          <MuiButton className={clsx({ [classes.button]: clipPlaneMode==="Surface" })} size="small"  startIcon={<Triangle />}  onClick={() => {setClipPlaneMode("Surface")}}>
            <MuiTypography style={{fontSize:"12px",textTransform:"none"}} >
            Select Surface
            </MuiTypography>
           
          </MuiButton>
        </Grid>
        <Grid item xs={12} sm={6} style={{position:"absolute",left: "50%",}} >
          <MuiButton className={clsx({ [classes.button]: clipPlaneMode==="Points" })} size="small" startIcon={<ThreePoints/>}   onClick={() => {setClipPlaneMode("Points")}}>
          <MuiTypography  style={{fontSize:"12px",textTransform:"none"}}>
           Select Points
            </MuiTypography>
           
            </MuiButton>
        </Grid>
      </Grid>

          <MuiTypography className={classes.listSub}  style={{marginTop:"10%"}} noWrap>
            Coordinate System
          </MuiTypography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MuiIconButton style={{width:"60px",height: "90px", }}   onClick={() => onHandleDirection()}>
               {clipNormalInverted === false 
               ? 
               <FlipDirectionLeft/>
               :
                <FlipDirectionRight/>
                }
              </MuiIconButton>
              <MuiTypography className={classes.caption}  noWrap>Flip Direction</MuiTypography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <RotateSlider value={rotate} functionOne={onHandleRotate} functionTwo={onHandleRotateType}  setFunction={setRotate} label={"Rotate"}/>
            </Grid>
          </Grid>
          <MuiTypography className={classes.listSub} style={{marginTop:"10%"}} >
            Translate
          </MuiTypography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs className={classes.translate}>
              <Slider className={classes.translate} style={{color:"currentColor",}}
                value={translate}
                min={-200}
                max={200}
                onChange={onHandleTranslate}
                aria-labelledby="input-slider"
              />
            </Grid>
          <Grid item style={{marginRight:"5%"}}>
            <MuiInput
              className={classes.inputOne}
              value={translate}
              margin="dense"
              inputProps={{
                step: 1,
                min: -200,
                max: 200,
                type: 'number',
                'aria-labelledby': 'input-slider', 
              }}
              onChange={onHandleTranslateType}
            />
          </Grid>
        </Grid>
        <MuiTypography className={classes.listSub} style={{marginTop:"10%"}} noWrap>Rotate</MuiTypography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <RotateSlider value={axisX} functionOne={onHandleRotate} functionTwo={onHandleRotateXType}  setFunction={setXAxis} label={"X-Axis"}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <RotateSlider value={axisY} functionOne={onHandleRotate} functionTwo={onHandleRotateYType}  setFunction={setAxisY} label={"Y-Axis"}/>
            </Grid>
          </Grid>         
        </form>
       
        
      </div>
    )
  } 

    const getFooter = () => {
      let edited = false;
      if( clipCordX !== props.clicked.clipCordX || clipCordY !== props.clicked.clipCordY ||
          clipCordZ !== props.clicked.clipCordZ || clipConstD !== props.clicked.clipConstD ||
          clipNormalInverted !== props.clicked.clipNormalInverted || 
          translate !== props.clicked.translate || 
          rotate !== props.clicked.rotate || 
          axisX !== props.clicked.axisX || 
          axisY !== props.clicked.axisY
        )
        edited = true;

      return (
        <div style={{marginBottom:"10px", marginTop:"10px"}} >
        {edited === false ? <Grid container spacing={3} >
        <Grid item xs={12} sm={4}  style={{marginLeft:"60px"}}>
          <MuiButton disabled style={{backgroundColor:"#8C8BFF"}} variant="contained" color="primary" onClick={onHandleSave}>
            Save
          </MuiButton>
        </Grid>
        <Grid item xs={12} sm={6} style={{position:"absolute",left: "50%",}}>
          <MuiButton disabled style={{color:"#8C8BFF",}} color="primary" onClick={onHandleReset} >Reset</MuiButton>
        </Grid>
      </Grid> 
      
      :
       <Grid container spacing={3} >
        <Grid item xs={12} sm={4} style={{marginLeft:"60px"}}>
          <MuiButton  style={{backgroundColor:"#8C8BFF"}} variant="contained" color="primary" onClick={onHandleSave}>
            Save
          </MuiButton>
        </Grid>
        <Grid item xs={12} sm={6} style={{position:"absolute",left: "50%",}}>
          <MuiButton  style={{color:"#8C8BFF",}} color="primary" onClick={onHandleReset} >Reset</MuiButton>
        </Grid>
      </Grid>} 
      </div>  
      )
    }
   

    return(
        <SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      body ={ getBody() }
      footer = { getFooter() }
    />
    )
}
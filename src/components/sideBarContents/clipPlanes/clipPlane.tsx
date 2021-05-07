import React, { useState, useEffect } from "react";
import styles from './style';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackButton from '../../../assets/images/back';

import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

import Triangle from '../../../assets/images/triangle'
import ThreePoints from '../../../assets/images/threePoints'

import NumericInput from '../../common/numericInput'

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FlipDirectionLeft from "../../../assets/images/flipDirectionLeft";
import FlipDirectionRight from "../../../assets/images/flipDirectionRight";

import { editPlane } from '../../../store/clipSlice';
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
    console.log("handleReset props", props.clicked.rotate)
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
      <IconButton onClick={() => props.onHandleEdit()}><BackButton/></IconButton>
    );
  }

  // const onHandleClick = (value : any , func : any) => {
  //     switch(func){
  //       case setRotate:
  //         setRotate(value)
  //       break;
  //       case setXAxis:
  //         setXAxis(value)
  //       break;
  //       case setAxisY:
  //         setAxisY(value)
  //       break;
  //     }
  //     switch(func){
  //       case setRotate:
  //         setRotate(value)
  //       break;
  //       case setXAxis:
  //         setXAxis(value)
  //       break;
  //       case setAxisY:
  //         setAxisY(value)
  //       break;
  //   }
  // }

    
  const getHeaderContent = () => {
    return (
      <div className={classes.heading}>
        <Grid container spacing={2} alignItems="center">
          <Grid item >
            <Typography  variant="h1" noWrap>
              Clip Plates -
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h2" noWrap style={{marginLeft :"-10px"}}> 
              {props.clicked.name}
            </Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
    
  const getBody = () => {
    console.log("getBody",rotate)
    return (
      <div>
        <Typography className={classes.listSub} noWrap>
          Plane Equation
        </Typography>
        <form noValidate autoComplete="off">
          <div style={{ display: "flex",
    alignItems: "center",
    justifyContent: "flex-start", marginLeft:"5%", marginRight:"5%",
    marginTop:"5px", }}>
            {/* <TextField
              inputProps={{className : classes.input}}
              value={equation}
              onChange={OnHandleEquation} 
              variant="outlined"
              size="small"
            /> */}
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
              /> +
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
            /> +
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
            /> =
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
          <Grid container spacing={3} style={{marginTop:"-4px", marginLeft:"-10px"}}>
        <Grid item xs={12} sm={6} >
          <Button size="small"  startIcon={<Triangle />} style={clipPlaneMode=="Surface" ? {background:"grey"} : null} onClick={() => {setClipPlaneMode("Surface")}}>
          
            <Typography style={{fontSize:"12px",textTransform:"none"}} >
            Select Surface
            </Typography>
           
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} style={{position:"absolute",left: "50%",}}>
          <Button size="small" startIcon={<ThreePoints/>} style={clipPlaneMode=="Points" ? {background:"grey"} : null}  onClick={() => {setClipPlaneMode("Points")}}>
          <Typography style={{fontSize:"12px",textTransform:"none"}}>
           Select Points
            </Typography>
           
            </Button>
        </Grid>
      </Grid>

          <Typography className={classes.listSub}  style={{marginTop:"10%"}} noWrap>
            Coordinate System
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <IconButton style={{width:"60px",height: "90px", }}   onClick={() => onHandleDirection()}>
               {clipNormalInverted== false 
               ? 
               <FlipDirectionLeft/>
               :
                <FlipDirectionRight/>
                }
              </IconButton>
              <Typography className={classes.caption}  noWrap>Flip Direction</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <RotateSlider value={rotate} functionOne={onHandleRotate} functionTwo={onHandleRotateType}  setFunction={setRotate} label={"Rotate"}/>
            </Grid>
          </Grid>
          <Typography className={classes.listSub} style={{marginTop:"10%"}} >
            Translate
          </Typography>
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
            <Input
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
        <Typography className={classes.listSub} style={{marginTop:"10%"}} noWrap>Rotate</Typography>
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
        <div style={{marginBottom:"10px"}} >
        {edited == false ? <Grid container spacing={3} >
        <Grid item xs={12} sm={4}  style={{marginLeft:"60px"}}>
          <Button disabled style={{backgroundColor:"#8C8BFF"}} variant="contained" color="primary" onClick={onHandleSave}>
            Save
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} style={{position:"absolute",left: "50%",}}>
          <Button disabled style={{color:"#8C8BFF",}} color="primary" onClick={onHandleReset} >Reset</Button>
        </Grid>
      </Grid> 
      
      :
       <Grid container spacing={3} >
        <Grid item xs={12} sm={4} style={{marginLeft:"60px"}}>
          <Button  style={{backgroundColor:"#8C8BFF"}} variant="contained" color="primary" onClick={onHandleSave}>
            Save
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} style={{position:"absolute",left: "50%",}}>
          <Button  style={{color:"#8C8BFF",}} color="primary" onClick={onHandleReset} >Reset</Button>
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
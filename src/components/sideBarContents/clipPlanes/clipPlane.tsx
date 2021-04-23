import React, { useState, useEffect } from "react";
import styles from './style';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '../../../assets/images/back.svg';

import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FlipDirectionLeft from "../../../assets/images/flipDirectionLeft.svg";
import FlipDirectionRight from "../../../assets/images/flipDirectionRight.svg";

import { editPlane } from '../../../store/clipSlice';
import RotateSlider from './rotateSlider'

export default function ClipPlanes(props : any){

  const classes = styles();
  const dispatch = useAppDispatch();  

  const [equation,setEquation] = useState(props.clicked.equation)
  const [clipDirection, setClipDirection] = useState(props.clicked.clipDirection);
  const [translate, setTranslate] = useState(props.clicked.translate);
  const [rotate, setRotate] = useState(props.clicked.rotate);
  const [xAxis, setXAxis] = useState(props.clicked.xAxis);
  const [yAxis, setYAxis] = useState(props.clicked.yAxis); 

  const OnHandleEquation:(e : any) => any = e => {
    setEquation(e.target.value)

  }

  const onHandleDirection = () => {
    setClipDirection(!clipDirection)
  
  }

  const onHandleTranslate= (e : any,newValue : any) => {
    setTranslate(newValue)
  }

  const onHandleTranslateType= (e : any) => {
    setTranslate(e.target.value)
  }

  const onHandleRotate = (fun : any, value : any) => {
    fun(value)
  }

  const onHandleRotateType = (e : any) => {
    setRotate(e.target.value)
  }

  const onHandleRotateYType = ( value : any) => {
    setYAxis(value)
  }

  const onHandleRotateXType = (value : any) => {
    setXAxis(value)
  }

  const onHandleReset = () => {
    setEquation(props.clicked.equation);
    setClipDirection(props.clicked.clipDirection);
    setTranslate(props.clicked.translate);
    setRotate(props.clicked.rotate);
    setXAxis(props.clicked.xAxis);
    setYAxis(props.clicked.yAxis);
  }

  const onHandleSave = () => {
    const name= props.clicked.name
    const clip = {name, equation, clipDirection, translate, rotate, xAxis, yAxis}
    dispatch(editPlane(clip));
    props.editSave();
  }

  const getHeaderLeftIcon= () => {
    return (
      <IconButton className={classes.headerIcon} >
        <img src={ BackIcon } alt={'BackIcon'} onClick={() => props.onHandleEdit()}/> 
      </IconButton>
    );
  }

  const onHandleClick = (value : any , func : any, operation : any) => {
    if(operation === "Add"){
      switch(func){
        case setRotate:
          setRotate(value + 1)
        break;
        case setXAxis:
          setXAxis(value + 1)
        break;
        case setYAxis:
          setYAxis(value + 1)
        break;
      }
    }
    if(operation === "Sub"){
      switch(func){
        case setRotate:
          setRotate(value - 1)
        break;
        case setXAxis:
          setXAxis(value - 1)
        break;
        case setYAxis:
          setYAxis(value - 1)
        break;
      }
    }
  }

    
  const getHeaderContent = () => {
    return (
      <div className={classes.heading}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Typography  variant="h1" noWrap>
              Clip Plates -
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h2" noWrap>
              {`Plane ${props.clicked.name}`}
            </Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
    
  const getBody = () => {
    let edited = false;
    if(equation !== props.clicked.equation || clipDirection !== props.clicked.clipDirection || translate !== props.clicked.translate || rotate !== props.clicked.rotate || xAxis !== props.clicked.xAxis || yAxis !== props.clicked.yAxis)
      edited = true;

    return (
      <div>
        <Typography className={classes.listSub} noWrap>
          Plane Equation
        </Typography>
        <form noValidate autoComplete="off">
          <div className={classes.listSub}>
            <Input
              inputProps={{style: {width: "200px",height: "20px",color:"#DFDEDE",border: "1px solid #DFDEDE",paddingLeft:"3%"}}}
              value={equation}
              onChange={OnHandleEquation}
            />
          </div>
          <Typography className={classes.listSub} noWrap>
            Coordinate System
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <IconButton style={{width:"39px",height: "90px"}}>
                <img src =  {clipDirection== false ? FlipDirectionLeft : FlipDirectionRight} alt={"Clip Direction"} 
                  onClick={() => onHandleDirection()}
                />
              </IconButton>
              <Typography style={{fontSize:"14px"}}   noWrap>Flip Direction</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <RotateSlider value={rotate} functionOne={onHandleRotate} functionTwo={onHandleRotateType} functionClick={onHandleClick} setFunction={setRotate} label={"Rotate"}/>
            </Grid>
          </Grid>
          <Typography className={classes.listSub} >
            Translate
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={translate}
                min={-200}
                max={200}
                onChange={onHandleTranslate}
                aria-labelledby="input-slider"
              />
            </Grid>
          <Grid item style={{marginRight:"5%"}}>
            <Input
              style={{color:"#DFDEDE",  border: "1px solid #DFDEDE", paddingLeft:"10%"}}
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
        <Typography className={classes.listSub} variant="h2" noWrap>Rotate</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <RotateSlider value={xAxis} functionOne={onHandleRotate} functionTwo={onHandleRotateXType} functionClick={onHandleClick} setFunction={setXAxis} label={"X-Axis"}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <RotateSlider value={yAxis} functionOne={onHandleRotate} functionTwo={onHandleRotateYType} functionClick={onHandleClick} setFunction={setYAxis} label={"Y-Axis"}/>
            </Grid>
          </Grid>         
        </form>
        {edited == false ? <Grid container spacing={3} style={{position:"absolute",left: "2.85%",right: "94.86%",top: "85%",bottom: "13.11%",}}>
          <Grid item xs={12} sm={4}>
            <Button disabled style={{backgroundColor:"#8C8BFF"}} variant="contained" color="primary" onClick={onHandleSave}>
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} style={{position:"absolute",left: "30%",}}>
            <Button disabled style={{color:"#8C8BFF",}} color="primary" onClick={onHandleReset} >Reset</Button>
          </Grid>
        </Grid> 
        
        :
         <Grid container spacing={3} style={{position:"absolute",left: "2.85%",right: "94.86%",top: "85%",bottom: "13.11%",}}>
          <Grid item xs={12} sm={4}>
            <Button  style={{backgroundColor:"#8C8BFF"}} variant="contained" color="primary" onClick={onHandleSave}>
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} style={{position:"absolute",left: "30%",}}>
            <Button  style={{color:"#8C8BFF",}} color="primary" onClick={onHandleReset} >Reset</Button>
          </Grid>
        </Grid>}   
        
      </div>
    )
  } 

    const getFooter = () => {
      return null
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
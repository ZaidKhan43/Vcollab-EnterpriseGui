import React, { useState, useEffect } from "react";
import styles from './style';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '../../../assets/images/back.svg';

import CircularSlider from '@fseehawer/react-circular-slider';

import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FlipDirectionLeft from "../../../assets/images/flipDirectionLeft.svg";
import FlipDirectionRight from "../../../assets/images/flipDirectionRight.svg";

import { editPlane } from '../../../store/clipSlice';

export default function ClipPlanes(props : any){

  const classes = styles();
  const dispatch = useAppDispatch();  

  const [equation,setEquation] = useState(props.clicked.equation)
  const [clipDirection, setClipDirection] = useState(props.clicked.clipDirection);
  const [translate, setTranslate] = useState(props.clicked.translate);
  const [rotate, setRotate] = useState(props.clicked.rotate);
  const [xAxis, setXAxis] = useState(props.clicked.xAxis);
  const [yAxis, setYAxis] = useState(props.clicked.yAxis);
  // const [edited, setEdited] = useState(false)


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

  const onHandleRotateYType = ( e : any) => {
    setYAxis(e.target.value)
  }

  const onHandleRotateXType = (e : any) => {
    setXAxis(e.target.value)
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
              <CircularSlider
                dataIndex={rotate}
                width={90}
                knobRadius={10}
                progressWidth={20}
                direction={-1}
                circleWidth={3}
                max={359}
                knobPosition= "right"
                knobColor="#ffffff"
                knobSize={24}
                tooltipColor="#6ab6e1"
                labelColor="#DFDEDE"
                labelFontSize="12px"
                label="Rotate"
                valueFontSize="20px"
                showTooltip={true}
                tooltipSize={26}
                onChange={ (value : any) => onHandleRotate(setRotate,value)}
              />
              <div style={{marginRight:"4%"}}>
                	<Input
                    style={{color:"#DFDEDE",  border: "1px solid #DFDEDE", paddingLeft:"5%",width:"45%"}}
                    value={rotate}
                    margin="dense"
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 359,
                      type: 'number',
                      'aria-labelledby': 'input-slider', 
                    }}
                    onChange={onHandleRotateType}
                  />
              </div>
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
              <CircularSlider
                dataIndex={xAxis}
                width={90}
                knobRadius={15}
                progressWidth={20}
                direction={-1}
                circleWidth={3}
                max={359}
                knobPosition= "right"
                knobColor="#ffffff"
                knobSize={24}
                tooltipColor="#6ab6e1"
                labelColor="#DFDEDE"
                labelFontSize="12px"
                label="X-Axis"
                valueFontSize="20px"
                showTooltip={true}
                tooltipSize={26}
                onChange={ (value :any) => onHandleRotate(setXAxis,value)}
              />
              <div style={{marginRight:"4%"}}>
              	<Input
                  style={{color:"#DFDEDE",  border: "1px solid #DFDEDE", paddingLeft:"5%",width:"45%"}}
                  value={xAxis}
                  margin="dense"
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 359,
                    type: 'number',
                    'aria-labelledby': 'input-slider', 
                  }}
                  onChange={onHandleRotateXType}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CircularSlider
                dataIndex={yAxis}
                width={90}
                knobRadius={15}
                progressWidth={20}
                direction={-1}
                circleWidth={3}
                max={359}
                knobPosition= "right"
                knobColor="#ffffff"
                knobSize={24}
                tooltipColor="#6ab6e1"
                labelColor="#DFDEDE"
                labelFontSize="12px"
                label="Y-Axis"
                valueFontSize="20px"
                showTooltip={true}
                tooltipSize={26}
                onChange={ (value :any) => onHandleRotate(setYAxis,value)}
              />
              <div style={{marginRight:"4%"}}>
                <Input
                  style={{color:"#DFDEDE",  border: "1px solid #DFDEDE", paddingLeft:"5%",width:"45%"}}
                  value={yAxis}
                  margin="dense"
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 359,
                    type: 'number',
                    'aria-labelledby': 'input-slider', 
                  }}
                  onChange={onHandleRotateYType}
                />
              </div>
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
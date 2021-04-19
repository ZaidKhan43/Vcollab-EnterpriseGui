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
          <IconButton >
            <img src={ BackIcon } alt={'BackIcon'} onClick={() => props.onHandleEdit()}/> 
          </IconButton>
        );
    }
    
    const getHeaderContent = () => {
            return (
              <div>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Typography className={classes.listSub} variant="h1" noWrap>
                      Clip Plates -
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography className={classes.listSub} variant="h2" noWrap>
                      {`Plane ${props.clicked.name}`}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            )
    }

    const getBody = () => {
      return (
        <div>
         <Typography className={classes.listSub} noWrap>
         Plane Equation
       </Typography>
       <form  noValidate autoComplete="off">
         <div className={classes.listSub}>
         <TextField
        inputProps={{style: {color:"white"}}}
        variant="outlined"
        value={equation}
        onChange={OnHandleEquation}
      />
         </div>
      
     <Typography className={classes.listSub} noWrap>
         Coordinate System
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <IconButton>
         <img src =  {clipDirection ? FlipDirectionLeft : FlipDirectionRight} alt={"Clip Direction"} 
            onClick={() => onHandleDirection()}
          />
          </IconButton>
           
          <Typography  variant="h2" noWrap>Flip Direction</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CircularSlider
            dataIndex={rotate}
            width={100}
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
            label="Rotate"
            valueFontSize="20px"
            showTooltip={true}
            tooltipSize={26}
            onChange={ (value : any) => onHandleRotate(setRotate,value)}
          />
          
        </Grid>
      </Grid>
      <br/>
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
            <Grid item>
              <Input
                style={{color:"white"}}
                value={translate}
                margin="dense"
                // onChange={handleInputChange}
                // onBlur={handleBlur}
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
          <br/>
          <Typography className={classes.listSub} variant="h2" noWrap>Rotate</Typography>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
          <CircularSlider
            dataIndex={xAxis}
            width={100}
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
        </Grid>
        <Grid item xs={12} sm={6}>
        <CircularSlider
            dataIndex={yAxis}
            width={100}
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
        </Grid>
          </Grid>
          
    </form>
       
        </div>
      )
    }

    const getFooter = () => {
      return (
        <Grid container spacing={3} >
        <Grid item xs={12} sm={4}>
        <Button style={{backgroundColor:"#8C8BFF"}} variant="contained" color="primary" onClick={onHandleSave}>
          Save
        </Button>
        </Grid>
      <Grid item xs={12} sm={6}>
      <Button style={{color:"#8C8BFF", backgroundColor:"#353535"}} variant="contained" onClick={onHandleReset} >Reset</Button>
      </Grid>
        </Grid>
      )
    }
   

    return(
        <SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
    //   headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
    />
    )
}
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


import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FlipDirectionLeft from "../../../assets/images/flipDirectionLeft";
import FlipDirectionRight from "../../../assets/images/flipDirectionRight";

import { editPlane } from '../../../store/clipSlice';
import RotateSlider from './rotateSlider'
import { Z_BLOCK } from "node:zlib";

export default function ClipPlanes(props : any){

  const classes = styles();
  const dispatch = useAppDispatch();  

  const [equation,setEquation] = useState(`${props.clicked.xCord}X+${props.clicked.yCord}Y+${props.clicked.zCord}Z=${props.clicked.constant}`)
  const [clipDirection, setClipDirection] = useState(props.clicked.clipDirection);
  const [translate, setTranslate] = useState(props.clicked.translate);
  const [rotate, setRotate] = useState(props.clicked.rotate);
  const [xAxis, setXAxis] = useState(props.clicked.xAxis);
  const [yAxis, setYAxis] = useState(props.clicked.yAxis); 
  const [clipPlaneMode, setClipPlaneMode] = useState(props.clicked.clipPlaneMode);
  const [xCord, setXCord] = useState(props.clicked.xCord);
  const [yCord, setYCord] = useState(props.clicked.yCord);
  const [zCord, setZCord] = useState(props.clicked.zCord);
  const [constant, setConstant] = useState(props.clicked.yCord);


  const OnHandleEquation:(e : any) => any = e => {
    setEquation(e.target.value)

    // var result = e.targer.value.match(/([0-9])/g)

    var re = /\d+/g, 
        result : any= [],
        temp;
      while ((temp = re.exec(e.target.value)) !== null)
        result.push(temp[0]);

        setXCord(parseInt(result[0]))
        setYCord(parseInt(result[1]))
        setZCord(parseInt(result[2]))
        setConstant(parseInt(result[3]))

      //   var sed =-?[0-9.]*[Xx];
      //   const xValue = sed.exec(e.target.value)
      //  console.log("x", xValue)

    // const xValue = parseInt(e.target.value.split("X")[0]);
    // const yValue = parseInt(e.target.value.split("+")[1].split("Y")[0]);
    // const zValue = parseInt(e.target.value.split("Y")[1].split("Z")[0]);
    // const consta = parseInt(e.target.value.split("=")[1]);

    // setXCord(xValue)
    // setYCord(yValue)
    // setZCord(zValue)
    // setConstant(consta)
    
   
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

  const onHandleRotateType = (value : any) => {
    setRotate(value)
  }

  const onHandleRotateYType = ( value : any) => {
    setYAxis(value)
  }

  const onHandleRotateXType = (value : any) => {
    setXAxis(value)
  }

  const onHandleReset = () => {
    setXCord(props.clicked.xCord)
    setYCord(props.clicked.yCord)
    setZCord(props.clicked.yCord)
    setConstant(props.clicked.consta)
    setEquation(`${props.clicked.xCord}X+${props.clicked.yCord}Y+${props.clicked.zCord}Z=${props.clicked.constant}`);
    setClipDirection(props.clicked.clipDirection);
    setTranslate(props.clicked.translate);
    setRotate(props.clicked.rotate);
    console.log("handleReset props", props.clicked.rotate)
    setXAxis(props.clicked.xAxis);
    setYAxis(props.clicked.yAxis);
    
  }

  const onHandleSave = () => {
    const name= props.clicked.name
    const clip = {name, xCord, yCord, zCord, constant, clipDirection, translate, rotate, xAxis, yAxis}
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
  //       case setYAxis:
  //         setYAxis(value)
  //       break;
  //     }
  //     switch(func){
  //       case setRotate:
  //         setRotate(value)
  //       break;
  //       case setXAxis:
  //         setXAxis(value)
  //       break;
  //       case setYAxis:
  //         setYAxis(value)
  //       break;
  //   }
  // }

    
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
    console.log("getBody",rotate)
    return (
      <div>
        <Typography className={classes.listSub} noWrap>
          Plane Equation
        </Typography>
        <form noValidate autoComplete="off">
          <div style={{ display: "flex",
    alignItems: "center",
    justifyContent: "flex-start", marginLeft:"5%",
    marginTop:"5px"}}>
            <TextField
              inputProps={{className : classes.input}}
              value={equation}
              onChange={OnHandleEquation} 
              variant="outlined"
              size="small"
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
               {clipDirection== false 
               ? 
               <FlipDirectionLeft />
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
            <RotateSlider value={xAxis} functionOne={onHandleRotate} functionTwo={onHandleRotateXType}  setFunction={setXAxis} label={"X-Axis"}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <RotateSlider value={yAxis} functionOne={onHandleRotate} functionTwo={onHandleRotateYType}  setFunction={setYAxis} label={"Y-Axis"}/>
            </Grid>
          </Grid>         
        </form>
       
        
      </div>
    )
  } 

    const getFooter = () => {
      let edited = false;
      if( equation !== `${props.clicked.xCord}X+${props.clicked.yCord}Y+${props.clicked.zCord}Z=${props.clicked.constant}` || clipDirection !== props.clicked.clipDirection || translate !== props.clicked.translate || rotate !== props.clicked.rotate || xAxis !== props.clicked.xAxis || yAxis !== props.clicked.yAxis)
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
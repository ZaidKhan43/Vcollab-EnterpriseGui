import {useState, useEffect} from "react";
import styles from './style';
import clsx from 'clsx';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../components/icons/back';

import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';


import MuiGrid from '@material-ui/core/Grid';
//import MuiSlider from '@material-ui/core/Slider';

import Triangle from '../../../components/icons/triangle'
import ThreePoints from '../../../components/icons/threePoints'

//import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
//import MuiSwitch from '@material-ui/core/Switch';
// import NumericInput from '../../shared/numericInput'

//import NumericInput from 'react-numeric-input';

import MuiCheckbox from '@material-ui/core/Checkbox';

import MuiInput from '@material-ui/core/Input';
import MuiButton from '@material-ui/core/Button';
// import MuiTextField from '@material-ui/core/TextField';
import FlipDirectionLeft from "../../../components/icons/flipDirectionLeft";
import FlipDirectionRight from "../../../components/icons/flipDirectionRight";

import {selectActiveViewerID} from "../../../store/appSlice";
import { setSectionPlaneData, editEquation , editNormalInverted,editTranslate, editRotate, editAxisX, editAxisY, updateMinMax, sliceEditEnable, editSliceTranslate} from '../../../store/sideBar/clipSlice';
import RotateSlider from './rotateSlider';
import TranslateSlider from './translateSlider';

//import MuiExpandLessIcon from '@material-ui/icons/ExpandLess';
//import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MuiEditIcon from '@material-ui/icons/Edit';

import MuiToggleButton from '@material-ui/lab/ToggleButton';

export default function ClipPlanes(props : any){

  const classes = styles();
  const dispatch = useAppDispatch();  

  const viewerId = useAppSelector(selectActiveViewerID);
  const planes = useAppSelector((state) => state.clipPlane.planes);
  const index : any = planes.findIndex((item) => item.id === props.clicked.id);
  const clipNormalInverted = planes[index].clipNormalInverted;

  const translate = planes[index].translate;
  const translateMin = planes[index].translateMin;
  const translateMax = planes[index].translateMax;
  const rotate = planes[index].rotate;
  const axisX = planes[index].axisX;
  const axisY = planes[index].axisY;
  
  const clipCordX = planes[index].clipCordX;
  const clipCordY = planes[index].clipCordY;
  const clipCordZ = planes[index].clipCordZ;
  const clipConstD = planes[index].clipConstD;
  
  const slicePlaneEnabled = planes[index].slicePlane?.enabled;
  const sliceTranslate = planes[index].slicePlane?.translate;
  const sliceTranslateMin = planes[index].slicePlane?.translateMin;
  const sliceTranslateMax = planes[index].slicePlane?.translateMax;

  const [clipInputX, setClipInputX] = useState(planes[index].userInputEquation[0]);
  const [clipInputY, setClipInputY] = useState(planes[index].userInputEquation[1]);
  const [clipInputZ, setClipInputZ] = useState(planes[index].userInputEquation[2]);
  const [clipInputD, setClipInputD] = useState(planes[index].userInputEquation[3]);

  const [editMode, setEditMode] = useState(false)

  const [clipPlaneMode, setClipPlaneMode] = useState<string | null>(null);

  useEffect(() => {
    setClipInputX(planes[index].userInputEquation[0])
    setClipInputY(planes[index].userInputEquation[1])
    setClipInputZ(planes[index].userInputEquation[2])
    setClipInputD(planes[index].userInputEquation[3])
  },[planes, index])

  const OnHandleEquation:(value : any, variable: string) => any = (value,variable) => {
    // switch(variable){
    //   case "clipCordX" :
    //     setClipCordX(Number(e.target.value));
    //   break;
    //   case "clipCordY" :
    //     setClipCordY(Number(e.target.value));
    //   break;
    //   case "clipCordZ" :
    //     setClipCordZ(Number(e.target.value));
    //   break;
    //   case "clipConstD" :
    //     setClipConstD(Number(e.target.value));
    //   break;
    // }

    switch(variable){
      case "clipCordX" :
        setClipInputX(Number(value));
      break;
      case "clipCordY" :
        setClipInputY(Number(value));
      break;
      case "clipCordZ" :
        setClipInputZ(Number(value));
      break;
      case "clipConstD" :
        setClipInputD(Number(value));
      break;
    }
  }

  const handleEditShow = () => {
    if(editMode === true){
      setEditMode(false)
      if (clipInputX === 0 && clipInputY === 0 && clipInputZ === 0){
        setClipInputX(planes[index].userInputEquation[0])
        setClipInputY(planes[index].userInputEquation[1])
        setClipInputZ(planes[index].userInputEquation[2])
      }
  
      else {
        const id= props.clicked.id
        const clip = {id, clipInputX,clipInputY, clipInputZ, clipInputD}
        dispatch(editEquation({planeData:clip, viewerId}));
        dispatch(setSectionPlaneData({id}));
      }
    }
      
    else{
      setEditMode(true)
    }
  }
 
  // const handleValidation  = ()  => {
  //   if (clipCordX === 0 && clipCordY === 0 && clipCordZ === 0){
  //     setClipCordX(planes[index].clipCordX)
  //     setClipCordY(planes[index].clipCordY)
  //     setClipCordZ(planes[index].clipCordZ)
  //   }

  //   else {
  //     const id= props.clicked.id
  //     const clip = {id, clipCordX, clipCordY, clipCordZ, clipConstD}
  //     dispatch(editEquation(clip));
  //   }
  // }

  const onHandleDirection = () => {
    const id= props.clicked.id
    dispatch(editNormalInverted(id))
    dispatch(setSectionPlaneData({id}));
   
  }

  const onHandleTranslateCommitted= (e:any,newValue:any) => {
    const id = props.clicked.id;
    dispatch(updateMinMax({id}));
  }

  const onHandleTranslate= (e: any, newValue : any) => {
    if (translate === newValue)
    {
      console.log("event",e);
      return;
    }

    console.log(newValue)
    const update= {id : props.clicked.id, translate : newValue};
    dispatch(editTranslate(update))
    dispatch(setSectionPlaneData({id:props.clicked.id}))
  }

  const onHandleTranslateType= (e: any ) => {
    const update= {id : props.clicked.id, translate : Number(e.target.value)};
    dispatch(editTranslate(update))
    if(update.translate >= translateMax || update.translate <= translateMin) {
      dispatch(updateMinMax({id:props.clicked.id}));
    }
    dispatch(setSectionPlaneData({id:props.clicked.id}))
  }

  const onHandleTranslateButton = (newValue : any) => {
    const update= {id : props.clicked.id, translate : Number(newValue)};
    dispatch(editTranslate(update))
    if(update.translate >= translateMax || update.translate <= translateMin) {
      dispatch(updateMinMax({id:props.clicked.id}));
    }
    dispatch(setSectionPlaneData({id:props.clicked.id}))
  }

  const onHandleRotate = (value : any) => {
    const update= {id : props.clicked.id, rotate : value};
    dispatch(editRotate(update))
    dispatch(setSectionPlaneData({id:props.clicked.id}))
  }
  
  const onHandleRotateX = (value : any) => {
    const update= {id : props.clicked.id, axisX : value };
    dispatch(editAxisX(update));
    dispatch(setSectionPlaneData({id:props.clicked.id}))
  }

  const onHandleRotateY = (value : any) => {
    const update= {id : props.clicked.id, axisY : value};
    dispatch(editAxisY(update));
    dispatch(setSectionPlaneData({id:props.clicked.id}))
  }

  const onHandleSliceCheck = () => {
    dispatch(sliceEditEnable(props.clicked.id))
    dispatch(setSectionPlaneData({id:props.clicked.id}))
  }

  const onHandleSliceTranslate= (e: any, newValue : any) => {
    if (sliceTranslate === newValue)
    {
      return;
    }
    const update= {id : props.clicked.id, translate : newValue};
    dispatch(editSliceTranslate(update))
    dispatch(setSectionPlaneData({id:props.clicked.id}))
  }

  const onHandleSliceTranslateType= (e: any ) => {
    const update= {id : props.clicked.id, translate : Number(e.target.value)};
    dispatch(editSliceTranslate(update))
    dispatch(setSectionPlaneData({id:props.clicked.id}))
  }

  const onHandleSliceTranslateButton = (newValue : any) => {
    const update= {id : props.clicked.id, translate : Number(newValue)};
    dispatch(editSliceTranslate(update))
    dispatch(setSectionPlaneData({id:props.clicked.id}))
  }


  // const onHandleReset = () => {
  //   // setClipCordX(props.clicked.clipCordX)
  //   // setClipCordY(props.clicked.clipCordY)
  //   // setClipCordZ(props.clicked.clipCordZ)
  //   // setClipConstD(props.clicked.clipConstD)
  //   // setClipNormalInverted(props.clicked.clipNormalInverted);
  //   // setTranslate(props.clicked.translate);
  //   // setRotate(props.clicked.rotate);
  //   // console.log("handleReset props", props.clicked.rotate)
  //   // setXAxis(props.clicked.axisX);
  //   // setAxisY(props.clicked.axisY);
    
  // }

 

  // const onHandleSave = () => {
  //   const id= props.clicked.id
  //   const clip = {id, clipCordX, clipCordY, clipCordZ, clipConstD, clipNormalInverted, translate, rotate, axisX, axisY}
  //   // dispatch(editPlane(clip));
  //   // props.editSave();
  // }

  const getHeaderLeftIcon= () => {
    return (
      <MuiIconButton onClick={() => props.onHandleEdit()}><BackButton/></MuiIconButton>
    );
  }
  const getHeaderContent = () => {
    return (
      <div className={classes.heading}>
        <MuiGrid container spacing={2} alignItems="center">
          <MuiGrid item >
            <MuiTypography  variant="h1" noWrap>
              Clip Plates -
            </MuiTypography>
          </MuiGrid>
          <MuiGrid item xs>
            <MuiTypography variant="h2" noWrap className={classes.listItemAsHeading}> 
              {props.clicked.name}
            </MuiTypography>
          </MuiGrid>
        </MuiGrid>
      </div>
    )
  }
    
  const getBody = () => {
    //console.log("getBody",rotate)
    return (
      <div 
      className={classes.scrollBar}
      style={{position:"relative"}}
      >
        <MuiTypography className={classes.listSub} noWrap>
          Plane Equation
          <MuiToggleButton
            className={classes.editButton}
            value="check"
            selected={!editMode}
            onChange={handleEditShow}>
          <MuiEditIcon style={{fontSize:"15px"}}/>
      </MuiToggleButton>
        </MuiTypography>
        <div style={{ display: "flex",alignItems: "center",
          justifyContent: "flex-start",marginLeft:"5px", marginRight:"5%",
          marginTop:"5px", }}
          // onBlur={handleValidation}
        >
          {editMode === false 
          ?
          <MuiInput disabled inputProps={{style: { textAlign: 'center' },}} style={{marginLeft:"5px", marginTop:"-5px"}} className={`${classes.disabledTextBox} + ${classes.disabled}`} value={`${clipCordX}X ${Math.sign(clipCordY)===1 || Math.sign(clipCordY) === 0 ? "+" : "-"} ${Math.abs(clipCordY)}Y ${Math.sign(clipCordZ) === 1 || Math.sign(clipCordZ) === 0 ? "+" : "-"} ${Math.abs(clipCordZ)}Z = ${clipConstD}`}/>
        :
        <div className={classes.inputEqnBorder}>
          <MuiInput inputProps={{style: { textAlign: 'center' },}} className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputX} onChange={(e : any) => OnHandleEquation(e.target.value,"clipCordX")}/>X+
          <MuiInput inputProps={{style: { textAlign: 'center' },}} className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputY} onChange={(e : any) => OnHandleEquation(e.target.value,"clipCordY")}/>Y+
          <MuiInput inputProps={{style: { textAlign: 'center' },}} className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputZ} onChange={(e : any) => OnHandleEquation(e.target.value, "clipCordZ")}/>Z =
          <MuiInput inputProps={{style: { textAlign: 'center' },}} className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputD}  onChange={(e : any) => OnHandleEquation(e.target.value, "clipConstD")} />
        </div>
        }


        {/* <NumericInput
            className={`${classes.inputEquation} + ${editMode=== false && classes.disabled}`}
            disabled={editMode ? false : true}
            value={clipInputX}
            format={() => clipInputX + "X"}
            button={"no"}
            // format={() => clipCordX + "X"}
            margin="dense"
            noStyle
            onChange={(value : any) => OnHandleEquation(value,"clipCordX")} 
            />+
           <NumericInput
            className={`${classes.inputEquation} + ${editMode=== false && classes.disabled}`}
            readOnly={editMode ? false : true}
            value={clipInputY}
            button={"no"}
            format={() => clipInputY + "Y"}
            margin="dense"
            noStyle
            onChange={(value : any) => OnHandleEquation(value,"clipCordY")} 
          />+
          <NumericInput
            className={`${classes.inputEquation} + ${editMode=== false && classes.disabled}`}
            readOnly={editMode ? false : true}
            value={clipInputZ}
            button={"no"}
            format={() => clipInputZ + "Z"}
            margin="dense"
            noStyle
            onChange={(value : any) => OnHandleEquation(value, "clipCordZ")} 
          />=
          <NumericInput
            className={`${classes.inputEquation} + ${editMode=== false && classes.disabled}`}
            readOnly={editMode ? false : true}
            value={clipInputD}
            button={"no"}
            format={() => clipInputD + " "}
            margin="dense"
            noStyle
            onChange={(value : any) => OnHandleEquation(value, "clipConstD")} 
          /> */}
          </div>
          <div>
        </div>
        
        
        
          {editMode 
            ?
            <MuiGrid container  spacing={3} style={{marginTop:"-4px", marginLeft:"-10px"}}>
            <MuiGrid item xs={12} sm={6} >
              <MuiButton className={clsx({ [classes.button]: clipPlaneMode==="Surface" })} size="small"  startIcon={<Triangle />}  onClick={() => {clipPlaneMode==="Surface" ? setClipPlaneMode(null) : setClipPlaneMode("Surface")}}>
                <MuiTypography style={{fontSize:"12px",textTransform:"none"}} >
                Select Surface
                </MuiTypography>
               
              </MuiButton>
            </MuiGrid>
            <MuiGrid item xs={12} sm={6} style={{position:"absolute",left: "50%",}} >
              <MuiButton className={clsx({ [classes.button]: clipPlaneMode==="Points" })} size="small" startIcon={<ThreePoints/>}   onClick={() => {clipPlaneMode==="Points" ? setClipPlaneMode(null) : setClipPlaneMode("Points")}}>
              <MuiTypography  style={{fontSize:"12px",textTransform:"none"}}>
               Select Points
                </MuiTypography>
               
                </MuiButton>
            </MuiGrid>
          </MuiGrid>
        :
        <div>
        <MuiInput disabled inputProps={{style: { textAlign: 'center' },}} className={classes.disabledTextBox} value={`${Math.round(clipCordX*1000)/1000}X ${Math.sign(clipCordY)===1 || Math.sign(clipCordY) === 0 ? "+" : "-"} ${Math.abs(Math.round(clipCordY*1000)/1000)}Y ${Math.sign(clipCordZ) === 1 || Math.sign(clipCordZ) === 0 ? "+" : "-"} ${Math.abs(Math.round(clipCordZ*1000)/1000)}Z = ${Math.round(clipConstD*1000)/1000}`}/>
         </div> 
          }

          <MuiTypography style={{marginLeft:"-170px", marginTop:"10px"}}  noWrap>
            <MuiCheckbox color="default" onClick={onHandleSliceCheck}  checked={slicePlaneEnabled} />
              Slice Plane
          </MuiTypography>

          {slicePlaneEnabled 
            &&
                  <TranslateSlider 
                    name={"Slice translate"} editMode={editMode}
                    value={sliceTranslate} valueMin={sliceTranslateMin} 
                    valueMax={sliceTranslateMax} onHandleChange={onHandleSliceTranslate}
                    onHandleType={onHandleSliceTranslateType} onHandleCommited={null}
                    onHandleButton={onHandleSliceTranslateButton}
                  />
          }

          <MuiTypography className={classes.listSub}  style={{marginTop:"10%"}} noWrap>
            Coordinate System
          </MuiTypography>
          <MuiGrid container spacing={3}>
            <MuiGrid item xs={12} sm={6}>
              <MuiIconButton disabled={editMode && true} style={{width:"60px",height: "90px", }}   onClick={() => onHandleDirection()}>
               {clipNormalInverted === false 
               ? 
               <FlipDirectionLeft/>
               :
                <FlipDirectionRight/>
                }
              </MuiIconButton>
              <MuiTypography className={classes.caption}  noWrap>Flip Direction</MuiTypography>
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
              <RotateSlider disable={editMode} value={rotate} handleChange={onHandleRotate} label={"Rotate"}/>
            </MuiGrid>
          </MuiGrid>
          <div style={{marginTop:"10%"}}>
            <TranslateSlider 
              name={"Translate"} editMode={editMode}
              value={translate} valueMin={translateMin} 
              valueMax={translateMax} onHandleChange={onHandleTranslate}
              onHandleType={onHandleTranslateType} onHandleCommited={onHandleTranslateCommitted}
              onHandleButton={onHandleTranslateButton}
            />
          </div>
        <MuiTypography className={classes.listSub} noWrap>Rotate</MuiTypography>
          <MuiGrid container spacing={3}>
            <MuiGrid item xs={12} sm={6}>
            <RotateSlider disable={editMode} value={axisX} handleChange={onHandleRotateX}  label={"X-Axis"}/>
            </MuiGrid>
            <MuiGrid item xs={12} sm={6}>
            <RotateSlider disable={editMode} value={axisY} handleChange={onHandleRotateY}  label={"Y-Axis"}/>
            </MuiGrid>
          </MuiGrid>         
       
        
      </div>
    )
  } 

    const getFooter = () => {
      // let edited = false;
      // if( clipCordX !== props.clicked.clipCordX || clipCordY !== props.clicked.clipCordY ||
      //     clipCordZ !== props.clicked.clipCordZ || clipConstD !== props.clicked.clipConstD ||
      //     clipNormalInverted !== props.clicked.clipNormalInverted || 
      //     translate !== props.clicked.translate || 
      //     rotate !== props.clicked.rotate || 
      //     axisX !== props.clicked.axisX || 
      //     axisY !== props.clicked.axisY
      //   )
      //   edited = true;

      // return (
      //   <div
      //   // className={classes.footerCard} 
      //   style={{marginBottom:"5px", marginTop:"5px",}} 
      //    >
      //   {edited === false ? <MuiGrid container spacing={3} >
      //   <MuiGrid item xs={12} sm={4}  style={{marginLeft:"60px"}}>
      //     <MuiButton disabled style={{backgroundColor:"#8C8BFF", zIndex:10}} variant="contained" color="primary" onClick={onHandleSave}>
      //       Save
      //     </MuiButton>
      //   </MuiGrid>
      //   <MuiGrid item xs={12} sm={6} style={{position:"absolute",left: "50%",}}>
      //     <MuiButton disabled style={{color:"#8C8BFF", zIndex:10}} color="primary" onClick={onHandleReset} >Reset</MuiButton>
      //   </MuiGrid>
      // </MuiGrid> 
      
      // :
      //  <MuiGrid container spacing={3} >
      //   <MuiGrid item xs={12} sm={4} style={{marginLeft:"60px"}}>
      //     <MuiButton  style={{backgroundColor:"#8C8BFF", zIndex:10}} variant="contained" color="primary" onClick={onHandleSave}>
      //       Save
      //     </MuiButton>
      //   </MuiGrid>
      //   <MuiGrid item xs={12} sm={6} style={{position:"absolute",left: "50%",}}>
      //     <MuiButton  style={{color:"#8C8BFF", zIndex:10}} color="primary" onClick={onHandleReset} >Reset</MuiButton>
      //   </MuiGrid>
      // </MuiGrid>} 
      // </div>  
      // )
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
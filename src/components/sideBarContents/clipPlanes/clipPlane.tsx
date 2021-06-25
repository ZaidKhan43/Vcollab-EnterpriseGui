import {useState, useEffect} from "react";
import styles from './style';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../components/icons/back';

import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';

import MuiGrid from '@material-ui/core/Grid';
// import MuiSlider from '@material-ui/core/Slider';

//import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
//import MuiSwitch from '@material-ui/core/Switch';
// import NumericInput from '../../shared/numericInput'

// import NumericInput from 'react-numeric-input';
// import MuiCheckbox from '@material-ui/core/Checkbox';

// import MuiTextField from '@material-ui/core/TextField';
import FlipDirectionLeft from "../../../components/icons/flipDirectionLeft";
import FlipDirectionRight from "../../../components/icons/flipDirectionRight";

import {selectActiveViewerID} from "../../../store/appSlice";
import { setSectionPlaneData, editEquation , editNormalInverted,editTranslate, editRotate, editAxisX, editAxisY, updateMinMaxGUI, setMasterPlane , setChildPlane} from '../../../store/sideBar/clipSlice';
import RotateSlider from './rotateSlider';
import TranslateSlider from './translateSlider';

// import MuiExpandLessIcon from '@material-ui/icons/ExpandLess';
// import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import parse from "autosuggest-highlight/parse";

export default function ClipPlanes(props : any){

  const classes = styles();
  const dispatch = useAppDispatch();  

  const planes = useAppSelector((state) => state.clipPlane.planes);
  const index : any = planes.findIndex((item) => item.id === props.clicked.id);
  const clipNormalInverted = planes[index].clipNormalInverted;

  const masterPlaneList = planes.filter((item) => (item.id !== props.clicked.id && item.masterPlane.id === -1)).map((item) => ({id:item.id, name: item.name}));
  const planeNames = masterPlaneList.unshift({id:-1,name:"Global"})

  const masterPlane = planes[index].masterPlane;
  const name = planes[index].name;
  const translate = planes[index].translate;
  const translateMin = planes[index].translateMin;
  const translateMax = planes[index].translateMax;
  const rotate = planes[index].rotate;
  const axisX = planes[index].axisX;
  const axisY = planes[index].axisY;
  
  const stepValue = (translateMax - translateMin) / 100;

  const [clipInputX, setClipInputX] = useState(planes[index].userInputEquation[0]);
  const [clipInputY, setClipInputY] = useState(planes[index].userInputEquation[1]);
  const [clipInputZ, setClipInputZ] = useState(planes[index].userInputEquation[2]);
  const [clipInputD, setClipInputD] = useState(planes[index].userInputEquation[3]);

  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    setClipInputX(planes[index].userInputEquation[0])
    setClipInputY(planes[index].userInputEquation[1])
    setClipInputZ(planes[index].userInputEquation[2])
    setClipInputD(planes[index].userInputEquation[3])
  },[planes, index])


  const onHandleDirection = () => {
    const id= props.clicked.id
    dispatch(editNormalInverted(id))
    dispatch(setSectionPlaneData({id}));
   
  }

  const onHandleTranslateCommitted= (newValue:any) => {
    const id = props.clicked.id;
    dispatch(updateMinMaxGUI({id}));
  }

  const onHandleTranslate= ( newValue : any) => {
    // if (translate === newValue)
    // {
    //   console.log("event",e);
    //   return;
    // }

    console.log(newValue)
    const update= {id : props.clicked.id, translate : Number(newValue)};
    dispatch(editTranslate(update))
    dispatch(setSectionPlaneData({id:props.clicked.id}))
  }

  const onHandleTranslateTextbox= (newValue : number ) => {
    const update= {id : props.clicked.id, translate : newValue};
    dispatch(editTranslate(update))
    if(update.translate >= translateMax || update.translate <= translateMin) {
      dispatch(updateMinMaxGUI({id:props.clicked.id}));
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
              {name}
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
        <MuiTypography className={classes.listSub}  style={{marginTop:"10%"}} noWrap>
          Coordinate System
        </MuiTypography>
        <MuiGrid container spacing={3}>
          <MuiGrid item xs={12} sm={6}>
            <MuiIconButton disabled={editMode && true} style={{width:"60px",height: "90px", }}   onClick={() => onHandleDirection()}>
              { clipNormalInverted === false 
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
            stepValue= {stepValue}
            onHandleTextbox={onHandleTranslateTextbox} onHandleCommited={onHandleTranslateCommitted}
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
      return(
        null
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
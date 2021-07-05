import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackButton from '../../../components/icons/back';
import styles from './style';
import { sideBarContentTypes } from '../../../config';
import { setSidebarActiveContent } from '../../../store/appSlice';
import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';
import { useState} from "react";

import MuiInput from '@material-ui/core/Input';

import MuiCheckbox from '@material-ui/core/Checkbox';

import Switch from "react-switch";
import Toggle from 'react-toggle';
import "react-toggle/style.css";

import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

import AddIcon from "../../../components/icons/plus";

import DialogBox from "../../../components/shared/dialogBox"

import MuiEditIconEquation from '@material-ui/icons/Edit';

import MuiToggleButton from '@material-ui/lab/ToggleButton';

// import Edit from "../../../assets/images/edit.svg";
// import Copy from "../../../assets/images/copy.svg";
// import ClipPlates from "../../../assets/images/clipboard.svg";
// import Delete from "../../../assets/images/trash.svg";
// import WarningCircle from "../../../assets/images/warningCircle.svg";
// import { PlayCircleOutlineSharp } from '@material-ui/icons';

import ClipPlane from "./clipPlane"
import {plane,SelectionMode,selectActivePlane, setSectionPlaneData, addPlane, editEnabled, setActive, editShowClip, editEdgeClip, editShowCap, editPlaneName, removePlane, duplicatePlane, saveSelectedPlane , editEquation , setChildPlane , setMasterPlane, setSelectionMode} from "../../../store/sideBar/clipSlice";

//Plane Equation
import {selectActiveViewerID} from "../../../store/appSlice";
import clsx from 'clsx';
import MuiGrid from '@material-ui/core/Grid';
import MuiButton from '@material-ui/core/Button';
import Triangle from '../../../components/icons/triangle'
import ThreePoints from '../../../components/icons/threePoints'
import MuiFormControl from '@material-ui/core/FormControl'
import MuiInputLabel from '@material-ui/core/InputLabel'
import MuiSelect from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { isTypeNode } from 'typescript';
import { useEffect } from 'react';
//palne Equation

export default function ClipPlanes(){

  const dispatch = useAppDispatch();  
  const classes = styles();
  const planes = useAppSelector((state) => state.clipPlane.planes);
  const limit = useAppSelector((state) => state.clipPlane.settings.maxAllowedPlanes);
  const activePlaneId = useAppSelector(selectActivePlane);
  // const clickedVal = useAppSelector<any>((state) => state.clipPlane.settings.clickedVal);
  const clickedValues = useAppSelector((state) => state.clipPlane.planes.filter(item => item.selected === true));

  // plane Equation 
  const clickedValuesCount = clickedValues.length;
  const [clipInputX, setClipInputX] = useState<number>(clickedValuesCount === 1 ? clickedValues[0].userInputEquation[0] : 0);
  const [clipInputY, setClipInputY] = useState<number>(clickedValuesCount === 1 ? clickedValues[0].userInputEquation[1] : 0);
  const [clipInputZ, setClipInputZ] = useState<number>(clickedValuesCount === 1 ? clickedValues[0].userInputEquation[2] : 0);
  const [clipInputD, setClipInputD] = useState<number>(clickedValuesCount === 1 ? clickedValues[0].userInputEquation[3] : 0);
  
  useEffect(() => {
    if(clickedValuesCount === 1){
      setClipInputX(clickedValues[0] && clickedValues[0].userInputEquation[0]);
      setClipInputY(clickedValues[0] && clickedValues[0].userInputEquation[1]);
      setClipInputZ(clickedValues[0] && clickedValues[0].userInputEquation[2]);
      setClipInputD(clickedValues[0] && clickedValues[0].userInputEquation[3]);
    }
  },[planes]);

  const viewerId = useAppSelector(selectActiveViewerID);
// plane Equation
  

  const [copied, setCopied] = useState<boolean>(false); 
  const [copy, setCopy] = useState<plane | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [editPlane, setEditPlane] = useState<number>(-1)
  const [editName, SetEditName] = useState<string>("");

  const [deleteMessage, setDeleteMessage] = useState<string>("");

  const [editMode, setEditMode] = useState(false)

  const clipPlaneMode = useAppSelector((state) => state.clipPlane.settings.selectionMode);      

  const onClickBackIcon = () =>{
    dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu))
  }

  const onHandleClick :(e: any, click: any) => any = (e, click)=> {
  
    //Plane Equation

    // Set SelectionMode to None when mupliple item selected. 
    dispatch(setSelectionMode({activeId : -1 , selectionMode : 0}))

    setEditMode(false);
    setOpenDelete(false);

    console.log("clicked", clickedValues)
    if(clickedValues.length === 0) {
      const index = planes.findIndex(item => item.id === click.id)
      setClipInputX(planes[index].userInputEquation[0])
      setClipInputY(planes[index].userInputEquation[1])
      setClipInputZ(planes[index].userInputEquation[2])
      setClipInputD(planes[index].userInputEquation[3])
    }

    if(clickedValues.length === 2 && clickedValues.findIndex(item => item.id === click.id) !== -1){
      const id = clickedValues.map(item => item.id).filter(item => item !== click.id)
      const index = planes.findIndex(item => item.id === id[0])
      console.log(index)
      setClipInputX(planes[index].userInputEquation[0])
      setClipInputY(planes[index].userInputEquation[1])
      setClipInputZ(planes[index].userInputEquation[2])
      setClipInputD(planes[index].userInputEquation[3])
    }
   
    //Plane Equation

    dispatch(setActive({clicked: click}))
    
    if(click.id !== editPlane)
      setEditPlane(-1)
  }

  
    const onClickAddItem = () => {
    dispatch(addPlane());
  }


  const onHandleCheck = (toCheck:boolean, item: plane) => {
    // if(clickedVal && clickedVal.id === item.id)
    // setEnabledOption(!item.enabled)
    dispatch(editEnabled({id:item.id,isEnabled:toCheck}));
    dispatch(setSectionPlaneData({id:item.id}));

  }

  const onHandleClip: ( functionName: any , indeterminate : boolean , boolean : boolean) => any = (functionName, indeterminate, boolean) => {
    switch (functionName){ 
      case "showClip":
        clickedValues.forEach((item :any) => {
          if(item.enabled === true){
            if(indeterminate)          
              dispatch(editShowClip({id:item.id,value:false}));
            else{
              if(boolean)
                dispatch(editShowClip({id:item.id,value:false}));
              else
              dispatch(editShowClip({id:item.id,value:true}));
            }  
            dispatch(setSectionPlaneData({id:item.id}));         
          }
        })
      break;

      case "showEdge":
        clickedValues.forEach((item :any) => { 
          if(item.enabled === true){
            if(indeterminate)          
              dispatch(editEdgeClip({id:item.id, value:false}));
            else{
              if(boolean)
                dispatch(editEdgeClip({id:item.id, value:false}));
              else
              dispatch(editEdgeClip({id:item.id, value:true}));
            }
          dispatch(setSectionPlaneData({id:item.id}));
          }
        })
      break;
      
      case "showCap":
        clickedValues.forEach((item :any) => {  
          if(item.enabled === true){
            if(indeterminate)         
              dispatch(editShowCap({id:item.id, value:false}));
            else{
              if(boolean)
                dispatch(editShowCap({id:item.id, value:false}));
              else
                dispatch(editShowCap({id:item.id, value:true}));
            }
            dispatch(setSectionPlaneData({id:item.id}));
          }
        })
      break;
    } 
  }

  // Equation
  const OnHandleEquation:(value : number, variable: string) => any = (value,variable) => {
    switch(variable){
      case "clipCordX" :
        setClipInputX(value);
      break;
      case "clipCordY" :
        setClipInputY(value);
      break;
      case "clipCordZ" :
        setClipInputZ(value);
      break;
      case "clipConstD" :
        setClipInputD(value);
      break;
    }
  }

  const onHandleEquationBlur = () => {
    if(!clipInputX)
      setClipInputX(clickedValues[0].userInputEquation[0])
    if(!clipInputY)
      setClipInputY(clickedValues[0].userInputEquation[1])
    if(!clipInputZ)
      setClipInputZ(clickedValues[0].userInputEquation[2])
    if(!clipInputD)
      setClipInputD(clickedValues[0].userInputEquation[3])
  }

  const handleEditShow = () => {
    if(editMode === true){
      setEditMode(false)

      // Set SelectionMode None in showMode 
      dispatch(setSelectionMode({activeId : -1 , selectionMode : 0}))

        if (Number(clipInputX) === 0 && Number(clipInputY) === 0 && Number(clipInputZ) === 0){
          setClipInputX(clickedValues[0].userInputEquation[0])
          setClipInputY(clickedValues[0].userInputEquation[1])
          setClipInputZ(clickedValues[0].userInputEquation[2])
        }
    
        else{
          const id= clickedValues[0].id
          dispatch(editEquation({id:id,eqn:{clipInputX,clipInputY,clipInputZ,clipInputD},}));
          dispatch(setSectionPlaneData({id}));
        }
      }

    else{
      setEditMode(true)
    }
  }

  const onHandleSlicePlane = (masterId : any , masterPlaneList: any) => {
    const newMaster :any = masterPlaneList.find((item : any) => item.id === masterId)
    console.log("hell0", newMaster)
    dispatch(setChildPlane({masterId: newMaster.id, childId : clickedValues[0].id}));
    dispatch(setMasterPlane({masterId : newMaster.id , masterName: newMaster.name, childId : clickedValues[0].id}));
  }
  //Equation

  const onHandleCopy: (item: any) => any = (item) => {
    setCopied(true);
    setCopy(item);
  }

  const onHandlePaste:(item: any)=> any = (item) => {
    if(planes.length < limit)
    {
      // dispatch(pastePlane(item))
      dispatch(duplicatePlane({pastedPlane: item}));
    }
  }

 const onHandleDeleteButton = () => {
    setOpenDelete(true); 
    setEditMode(false)
    setDeleteMessage("Are you sure want to delete the selected plane?")
 }

  const onHandleDelete = () => {
    clickedValues.forEach(item => 
      {
        setOpenDelete(false);
        // setOpenMasterDelete(true);
        dispatch(editEnabled({id:item.id,isEnabled:false}));
        // SetDeleted(item.name);
        dispatch(removePlane({id:item.id}))
        // dispatch(saveSelectedPlane({clicked: item}))
      })
  }

  const onHandleEdit = () => {
    setEdit(!edit);  
  }
  
  const onHandleSave = () => {
    setEdit(!edit);
    // setClickedVal(null);
  }

  const handleCloseDialog = () => {
    setOpenDelete(false)
  }

  const onHandlePlateNameEdit = (e : any) => {
   SetEditName(e.target.value)
  
  }

  const onHandlePlateKey = (e : any, item : any) => {
    if (e.key === 'Enter') {
      setEditPlane(-1)
      if(editName === "")
        setEditPlane(-1)
      else{
      const editPlane = {id : item.id, editName : editName}
      dispatch(editPlaneName(editPlane))
      }
   
    }
    if (e.keyCode === 27) {
      e.preventDefault();
      setEditPlane(-1)
    }
  }

  // Set SelectionMode
  const onHandleSelectMode  = (clickedSelection : SelectionMode) => {

    let select = SelectionMode.NONE;
    let id = activePlaneId;

    console.log("ActiveId", id)

    if(clickedSelection === clipPlaneMode)
      select = SelectionMode.NONE
    
    else
        select = clickedSelection

      const data = {activeId: id, selectionMode : select}
      dispatch(setSelectionMode(data))
  }

  const displayClicked = () => {

    let enabledCountOne = false;
    let enableCount = 0;
    let displayShowClip = false;
    let displayShowEdge = false;
    let displayShowCap = false;
    let indeterminateShowClip = false;
    let indeterminateShowEdge = false;
    let indeterminateShowCap = false;


    if(clickedValues.length > 0){
      // console.log("suran", clickedValues)
      clickedValues.forEach((item : any) => {
        enableCount = item.enabled ? enableCount + 1 : enableCount ; 
      })
      enabledCountOne = enableCount >= 1 ? true : false;
    }
    
    if(enableCount === 1){
      const index = clickedValues.findIndex((item : any) =>  item.enabled === true)
      displayShowClip = clickedValues[index].showClip
      displayShowEdge = clickedValues[index].showEdge
      displayShowCap = clickedValues[index].showCap
    }

    if(enableCount > 1){
      let countShowClip = 0;
      let countShowEdge = 0;
      let countShowCap = 0;

      clickedValues.forEach((item : any) => {
          countShowClip = item.showClip ? countShowClip + 1 : countShowClip ;
          countShowEdge = item.showEdge ? countShowEdge + 1 : countShowEdge ;
          countShowCap = item.showCap ? countShowCap + 1 : countShowCap ;
      })
        
      displayShowClip = countShowClip === clickedValues.length && true ;
      displayShowEdge = countShowEdge === clickedValues.length && true ;
      displayShowCap = countShowCap === clickedValues.length && true ;
 
      indeterminateShowClip = (countShowClip > 0) && (countShowClip < clickedValues.length) && true;
      indeterminateShowEdge = (countShowEdge > 0) && (countShowEdge < clickedValues.length) && true;
      indeterminateShowCap = (countShowCap > 0) && (countShowCap < clickedValues.length) && true;

    }

    let masterPlaneList=[{id:-2, name:"None"}]
    let masterPlane = {id:-2 , name: "None"};
    
    if(clickedValues.length === 1){
    let masterPlaneSet = planes.filter((item) => (item.id !== clickedValues[0].id))
    let removed : any[] = []

      masterPlaneSet.forEach( item => {
        if(item.masterPlane.id === clickedValues[0].id) {
          removed.push(item.id)
          masterPlaneSet = masterPlaneSet.filter(element => element.id !== item.id)
        }
      })

      if(removed.length > 0){
        for(let i=0; i < planes.length; i++ ){
          let newlyRemoved : any[] = [];
          masterPlaneSet.forEach( item => {
            if(removed.includes(item.masterPlane.id)) {
              newlyRemoved.push(item.id)
              masterPlaneSet = masterPlaneSet.filter(element => element.id !== item.id)
            }
            console.log(removed.length)
            // removed = removed.filter(element => element !== item.masterPlane.id)
          })

          removed = [];
          if(newlyRemoved.length === 0)
            break;
          
          removed =[...newlyRemoved]
        }
      }
      


      console.log("removed" , removed)
      console.log("resa" , masterPlaneSet)
    

    // .map((item) => ({id:item.id, name: item.name}));

    
    // let removed = masterPlaneSet.filter(item => item.masterPlane.id === clickedValues[0].id).map(item =>item.id);
    // masterPlaneSet = masterPlaneSet.filter(item => item.masterPlane.id !== clickedValues[0].id)
    //   console.log(removed)
    // masterPlaneSet.forEach(item => {
    //   if(removed.includes(item.masterPlane.id)){
    //     removed = masterPlaneSet.filter(element => element.id === item.id).map(item =>item.id)
    //     masterPlaneSet = masterPlaneSet.filter(element => (element.id !== item.id)) 
    //   }
    // })

    masterPlaneList = masterPlaneSet.map((item) => ({id:item.id, name: item.name}))

      // masterPlaneList = masterPlaneList.filter((item) => item.masterPlane.id.include())

      masterPlaneList.unshift({id:-1,name:"Global"})
      masterPlane = clickedValues[0].masterPlane
    }

    return(
      <div>
      { clickedValues && enabledCountOne 
        ? 
          <div>
            <MuiTypography className={classes.heading} style={{ marginBottom:"-10px"}} variant='h1' noWrap>
                Options
            </MuiTypography> 
            <div>
              <MuiTypography className={classes.listSub} style={{marginLeft:"10px"}} noWrap>
                Plane Equation 
                { clickedValues.length === 1 
                  ?
                    <MuiToggleButton
                      className={classes.editButton}
                      value="check"
                      selected={!editMode}
                      onChange={handleEditShow}
                    >
                      <MuiEditIconEquation style={{fontSize:"15px"}}/>
                    </MuiToggleButton>
                  :
                    null
                }
              </MuiTypography>
         
              <div style={{ display: "flex",alignItems: "center",
                justifyContent: "flex-start",marginLeft:"5px", marginRight:"5%",
                marginTop:"5px", }}
                // onBlur={handleValidation}
              >
                <div>
                  { editMode === false
                    ?
                      <MuiInput disabled inputProps={{style: { textAlign: 'center' },}} style={{marginLeft:"5px",marginTop:"-5px"}} className={clickedValues.length > 1 ? `${classes.disabledTextBox}` : `${classes.disabledTextBox} + ${classes.disabled}`} 
                        value={clickedValues.length>1 ?"":`${Math.round(clipInputX*1000)/1000}X ${Math.sign(clipInputY)===1 || Math.sign(clipInputY) === 0 ? "+" : "-"} ${Math.abs(Math.round(clipInputY*1000)/1000)}Y ${Math.sign(clipInputZ) === 1 || Math.sign(clipInputZ) === 0 ? "+" : "-"} ${Math.abs(Math.round(clipInputZ*1000)/1000)}Z = ${Math.round(clipInputD*1000)/1000}`}
                      />

                    :
                      <div className={classes.inputEqnBorder}>
                        <input  className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputX} onChange={(e : any) => OnHandleEquation(e.target.value,"clipCordX")} onBlur={onHandleEquationBlur}/>X+
                        <input className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputY} onChange={(e : any) => OnHandleEquation(e.target.value,"clipCordY")} onBlur={onHandleEquationBlur}/>Y+
                        <input className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputZ} onChange={(e : any) => OnHandleEquation(e.target.value, "clipCordZ")} onBlur={onHandleEquationBlur}/>Z =
                        <input  className={classes.inputEqn} style={{width: "40px"}} type="number" value={clipInputD}  onChange={(e : any) => OnHandleEquation(e.target.value, "clipConstD")} onBlur={onHandleEquationBlur} />
                      </div>
                  }
                  <MuiGrid container  spacing={3} style={{marginTop:"-4px", marginLeft:"-10px"}}>
                    <MuiGrid item xs={12} sm={6} >
                      <MuiButton disabled={editMode ? false : true}  className={clsx({ [classes.button]: clipPlaneMode === SelectionMode.FACE  })} size="small"  startIcon={<Triangle />}  onClick={() => onHandleSelectMode(SelectionMode.FACE)}>
                        <MuiTypography style={{fontSize:"12px",textTransform:"none"}} >
                          Select Surface
                        </MuiTypography> 
                      </MuiButton>
                    </MuiGrid>
                    <MuiGrid item xs={12} sm={6} style={{position:"absolute",left: "50%",}} >
                      <MuiButton disabled={editMode ? false : true}  className={clsx({ [classes.button]: clipPlaneMode === SelectionMode.THREE_PT })} size="small" startIcon={<ThreePoints/>}   onClick={() => onHandleSelectMode(SelectionMode.THREE_PT)}>
                        <MuiTypography  style={{fontSize:"12px",textTransform:"none"}}>
                          Select Points
                        </MuiTypography>  
                      </MuiButton>
                    </MuiGrid>
                  </MuiGrid>
                  <MuiFormControl style={{width:"100%", marginTop:"20px", marginLeft:"10px"}}>
                    <MuiInputLabel id="demo-simple-select-helper-label" style={{color:"currentcolor", marginLeft:"5px",}}>Master corodinate system</MuiInputLabel>
                      	<MuiSelect 
                           disabled={editMode ? false : true} 
                          MenuProps={{
                            disablePortal: true,
                            anchorOrigin: {
                              vertical:"bottom",
                              horizontal:"left",
                           },
                           getContentAnchorEl: null
                          }}
                          style={{width:"95%", marginLeft:"0px", marginTop:"24px",border: "1px solid currentColor",}}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={masterPlane.id}
                          onChange={(e) => onHandleSlicePlane(e.target.value , masterPlaneList)}
                        >
                          {
                            masterPlaneList.map((item) => 
                              <MuiMenuItem value={item.id}>{item.name}</MuiMenuItem>  
                          )}
                       </MuiSelect>
                      </MuiFormControl>
                    </div>
                </div>
              </div>
              <div style={{marginTop:"15px"}}>
                <MuiTypography className={classes.listItemOption} noWrap onClick={() =>onHandleClip("showClip",indeterminateShowClip,displayShowClip)}>
                  <MuiCheckbox color="default" indeterminate={indeterminateShowClip} checked ={displayShowClip} />
                    Show Clip Plane
                  </MuiTypography>
                  <MuiTypography className={classes.listItemOption} onClick={() =>onHandleClip("showEdge",indeterminateShowEdge,displayShowEdge)} noWrap>
                    <MuiCheckbox color="default" indeterminate={indeterminateShowEdge} checked={displayShowEdge} />
                    Show Edge
                  </MuiTypography>
                  <MuiTypography  className={classes.listItemOption} onClick={() =>onHandleClip("showCap",indeterminateShowCap,displayShowCap)}  noWrap>
                    <MuiCheckbox color="default" indeterminate={indeterminateShowCap} checked={displayShowCap} />
                    Show Cap
                  </MuiTypography>
                </div>
              </div> 
            : 
              null
          }
        </div>
      ) 
    }

  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderContent = () => {
    return <MuiTypography className={classes.heading}  variant='h1' noWrap>Clip Planes</MuiTypography>;
  }

  const getHeaderRightIcon = () => {
    return (
      null
    )
  }
    
  const getBody = () => {

    // console.log("selected",clickedValues)
    return (
      <div className={classes.scrollBar}>
        <div className={classes.heading} style={{marginBottom:"-20px", marginTop:"-10px"}}>
          <MuiTypography  variant='h1' noWrap>List</MuiTypography>
          <span style={{marginRight: "6.5%",}}>
           {planes.length === limit 
                    ?  
                      <MuiIconButton disabled onClick={() => onClickAddItem()}>
                        <AddIcon/>
                      </MuiIconButton> 
                    : 
                      <MuiIconButton onClick={() => onClickAddItem()}>
                        <AddIcon/>
                      </MuiIconButton>    
                  }
                </span>
        </div>
        <div>
          {
            planes.map((item, index : number) => 
              <div key={ 'divRoot_' + index }>
                { editPlane !== item.id 
                  ?
                  <div key={ 'divChild_' + index }  
                    className={
                                  item.selected && editPlane === -1
                                    ? 
                                    classes.listItemClicked 
                                    :
                                    classes.listItem      
                              }  
                  >
                    {/* <MuiCheckbox color="default"  checked={item.enabled} onChange={() => onHandleCheck(item)}/> */}
                    <div style={{ display: "flex", alignItems: "left", width:"65%"}} onClick={(event)=> onHandleClick(event,item)}>
                      <MuiTypography className={classes.listItemText} onDoubleClick={() => {setEditPlane(item.id); SetEditName(item.name);}} >
                        {item.name}
                      </MuiTypography>
                    </div>    
                    <Toggle
                      checked={item.enabled}
                      trackColor={{true: 'red', false: 'grey'}}
                      // icons={false}
                      onChange={() => onHandleCheck(!item.enabled,item)}/>
                    {/* <Switch
                      borderRadius={8}
                      onColor='#2E2E33'
                      offColor='#2E2E33'
                      boxShadow={item.enabled ?"-12px 0px  0px 0px #707070" : "12px 0px  0px 0px #707070" }
                      offHandleColor="#707070"
                      onHandleColor="#707070"
                      activeBoxShadow="0px 0px  px 2px #fffc35"
                      height={25}
                      width={70}
                      checked={item.enabled} onChange={(toCheck:boolean) => onHandleCheck(toCheck,item)}
                      uncheckedIcon={<div style={{display: "flex",justifyContent: "center",alignItems: "center",color:"grey"}}>On</div>}
                      uncheckedHandleIcon={<div style={{ display: "flex",justifyContent: "center",alignItems: "center",color:"white",marginLeft:"10px"}}>Off</div>}
                      checkedIcon={<div style={{display: "flex",justifyContent: "center",alignItems: "center",color:"grey"}}>On</div>}
                      checkedHandleIcon={<div style={{ display: "flex",justifyContent: "center",alignItems: "center",color:"white",marginLeft:"-10px"}}>Off</div>}
                    /> */}
                  </div>
                :
                  <div key={ 'divChild_' + index } className={classes.listItemClicked}>
                 <MuiTypography className={classes.listItemText} >
                  <MuiInput value={editName}
                  onChange={onHandlePlateNameEdit}
                  onKeyDown={(e) => onHandlePlateKey(e, item)}/>
                </MuiTypography>
               </div>

                }
                
              </div>
            )
          }
        </div>
        <div>
            <div style={{position:"absolute", marginTop:"20px" , width:"100%"}}> 
              {editPlane >= 0
              ?
              null
              :
              displayClicked()}
            </div> 
        </div>
      </div>
    )
  }


  const getFooter = () => {

    let deleteMaster = false;

    const count = clickedValues.filter(item => item.childPlane.length !== 0)

    if(count.length > 0)
      deleteMaster = true;

    return(
        <div style={{marginLeft:"10px", marginRight:"10px"}}>
          { !openDelete
            ?
              <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",}}>
                { clickedValues.length ===  1 && clickedValues[0].enabled && editPlane === -1
                  ?
                    <MuiIconButton  onClick={() => onHandleEdit()}> 
                      <MuiEditIcon/>
                    </MuiIconButton>
                  :
                    <MuiIconButton disabled> 
                      <MuiEditIcon/>
                    </MuiIconButton>
                }

                { clickedValues.length === 1 && editPlane === -1
                  ?
                    <MuiIconButton onClick={() => onHandleCopy(planes.find((item : any )=> 
                      item.id === clickedValues[0].id))}
                    > 
                      <MuiFileCopyOutlinedIcon />
                    </MuiIconButton>
                  :
                    <MuiIconButton disabled> 
                      <MuiFileCopyOutlinedIcon />  
                    </MuiIconButton>
                }

                { copied && planes.length !== limit 
                  ?
                    <MuiIconButton onClick={() => onHandlePaste(copy)}>
                      <MuiPaste/>
                    </MuiIconButton>  
                  :
                    <MuiIconButton disabled>
                      <MuiPaste/>
                    </MuiIconButton> 
                }
          
                { clickedValues.length >= 1 && deleteMaster === false && editPlane === -1
                  ?
                    <MuiIconButton style={{ }}  onClick={onHandleDeleteButton} > 
                      <MuiDeleteForeverOutlinedIcon/>
                    </MuiIconButton>  
                  :
                    <MuiIconButton disabled > 
                      <MuiDeleteForeverOutlinedIcon/>
                    </MuiIconButton>  
                }
              </div>
            :
              <div style={{marginBottom:"5px", marginTop:"5px"}}>
                <MuiTypography style={{marginBottom:"5px", fontSize:"14px"}}>
                  {deleteMessage}
                </MuiTypography>
                <div style={{alignContent:"center",}}>
                  <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                    autoFocus 
                    onClick={onHandleDelete} 
                    // color="primary"
                  >
                    Confirm
                  </MuiButton>
                <MuiButton style={{width:"20%", fontSize:"9px"}}
                  onClick={handleCloseDialog} 
                  // color="primary"
                >
                  Cancel
              </MuiButton>
            </div>
          </div>
        }
      </div>
    ) 
  }

  return (
    <div>
      { edit 
        ?  
          <ClipPlane clicked ={clickedValues[0]} onHandleEdit={onHandleEdit} editSave={onHandleSave}/>
        :
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ getHeaderContent() }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          /> 
      }
      
      {/* <DialogBox 
        openDelete={openDelete} 
        dialogBox={classes.dialogBox} 
        clickedVal={clickedValues[0]} 
        onHandleDelete={onHandleDelete} 
        handleCloseDialog={handleCloseDialog} 
        snackBar={classes.snackBar} 
        openMasterDelete={openMasterDelete} 
        handleCloseAlert={handleCloseAlert} 
        confirmationMessage={clickedValues[0] ?  `Are you sure want to delete ${clickedValues.map(item => item.name)}?` : null} 
        confirmedMessage={`${deleted} deleted`}
        confirmationIcon={ <MuiErrorOutlineOutlinedIcon className={classes.dialogBox}/>}
        confirmedIcon={<MuiDeleteForeverOutlinedIcon/>}
  />  */}

</div>
  )
}
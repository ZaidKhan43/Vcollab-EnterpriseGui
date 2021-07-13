
import MuiIconButton from '@material-ui/core/IconButton';
import {goBack, push} from 'connected-react-router/immutable';
import {Routes} from "../../../../routes"
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import MuiTypography from '@material-ui/core/Typography';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';
import styles from './style';
// import { sideBarContentTypes } from '../../../../config';
// import { setSidebarActiveContent } from '../../../../store/appSlice';
import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';
import { useState} from "react";

import MuiInput from '@material-ui/core/Input';
import MuiGrid from '@material-ui/core/Grid';

// import MuiCheckbox from '@material-ui/core/Checkbox';

// import Switch from "react-switch";
import Toggle from 'react-toggle';
import "react-toggle/style.css";

import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import TransformIcon from '../../../icons/transform';
// import MuiErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

import AddIcon from "../../../icons/plus";

// import DialogBox from "../../../shared/dialogBox"

// import MuiEditIconEquation from '@material-ui/icons/Edit';

// import MuiToggleButton from '@material-ui/lab/ToggleButton';

// import Edit from "../../../assets/images/edit.svg";
// import Copy from "../../../assets/images/copy.svg";
// import ClipPlates from "../../../assets/images/clipboard.svg";
// import Delete from "../../../assets/images/trash.svg";
// import WarningCircle from "../../../assets/images/warningCircle.svg";
// import { PlayCircleOutlineSharp } from '@material-ui/icons';

// import ClipPlane from "../clipPlane"
import {plane,SelectionMode,selectActivePlane, setSectionPlaneData, addPlane, editEnabled, setActive, editShowClip, editEdgeClip, editShowCap, editPlaneName, removePlane, duplicatePlane, saveSelectedPlane , editEquation , setChildPlane , setMasterPlane, setSelectionMode} from "../../../../store/sideBar/clipSlice";
import {mainMenuSlice, selectMainMenu, setChildItem} from "../../../../store/mainMenuSlice";
//Plane Equation
// import {selectActiveViewerID} from "../../../../store/appSlice";
// import clsx from 'clsx';
// import MuiGrid from '@material-ui/core/Grid';
import MuiButton from '@material-ui/core/Button';
// import Triangle from '../../../icons/triangle'
// import ThreePoints from '../../../icons/threePoints'
// import MuiFormControl from '@material-ui/core/FormControl'
// import MuiInputLabel from '@material-ui/core/InputLabel'
// import MuiSelect from '@material-ui/core/Select';
// import MuiMenuItem from '@material-ui/core/MenuItem';
// import { isTypeNode } from 'typescript';
import { useEffect } from 'react';
// import { TypeDivider } from '@material-ui/core/styles/createPalette';
//palne Equation

export default function List(){

  const dispatch = useAppDispatch();  
  const classes = styles();
  const planes = useAppSelector((state) => state.clipPlane.planes);
  const limit = useAppSelector((state) => state.clipPlane.settings.maxAllowedPlanes);

  // const clickedVal = useAppSelector<any>((state) => state.clipPlane.settings.clickedVal);
  const clickedValues = useAppSelector((state) => state.clipPlane.planes.filter(item => item.selected === true));

  // plane Equation 
  const clickedValuesCount = clickedValues.length;  

  const [copied, setCopied] = useState<boolean>(false); 
  const [copy, setCopy] = useState<plane | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [editPlane, setEditPlane] = useState<number>(-1)
  const [editName, SetEditName] = useState<string>("");

  const [deleteMessage, setDeleteMessage] = useState<string>("");

  const mainMenu = useAppSelector(selectMainMenu);
   
  // disable and inable the clipPlane menu items
  useEffect(() => {
      const enabledPlanes = planes.filter(item => item.enabled === true);
      
      if(planes.length === 0)
          dispatch(setChildItem({panelId:'5',childId:'52', boolean: true}))

        else
          dispatch(setChildItem({panelId:'5',childId:'52', boolean: false}))

        
        if(enabledPlanes.length === 0)
        dispatch(setChildItem({panelId:'5',childId:'53', boolean: true}))

        else
          dispatch(setChildItem({panelId:'5',childId:'53', boolean: false}))

      },[planes]);

  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleClick :(e: any, click: any) => any = (e, click)=> {
  
    //Plane Equation

    // Set SelectionMode to None when mupliple item selected. 
    dispatch(setSelectionMode({activeId : -1 , selectionMode : 0}))

    setOpenDelete(false);
   
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
    dispatch(push(Routes.CLIPPLANES_SETTINGS)); 
  }

  const onHandleTransform = () => {
    dispatch(push(Routes.CLIPPLANES_TRANSFORMATION));
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



  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderRightIcon = () => {
    return (
      <div>
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
           </div>
    )
  }
    
  const getBody = () => {

    // console.log("selected",clickedValues)
    return (
      <div className={classes.scrollBar}>
        <div className={classes.heading} style={{marginBottom:"-10px", marginTop:"-10px"}}>
          
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
                    <div style={{ display: "flex", alignItems: "left", width:"75%"}} onClick={(event)=> onHandleClick(event,item)}>
                      <MuiTypography className={classes.listItemText} onDoubleClick={() => {setEditPlane(item.id); SetEditName(item.name);}} >
                        {item.name}
                      </MuiTypography>
                    </div>    
                    <Toggle
                      checked={item.enabled}
                      // trackColor={{true: 'red', false: 'grey'}}
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
      </div>
    )
  }


  const getFooter = () => {

    let deleteMaster = false;

    const count = clickedValues.filter(item => item.childPlane.length !== 0)

    if(count.length > 0)
      deleteMaster = true;

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
          { !openDelete
            ?
            
              <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",}}>
                  <MuiGrid container item direction='column' justify='flex-start'>
                    <MuiGrid item>
                    <MuiIconButton disabled={clickedValues.length ===  1 && editPlane === -1 ? false : true} onClick={() => onHandleEdit()}> 
                  <MuiEditIcon/>
                </MuiIconButton>
                    </MuiGrid>
                    <MuiGrid item>
                        <MuiTypography  variant='h5'>Settings</MuiTypography>    
                    </MuiGrid>
                  </MuiGrid>

                  <MuiGrid container item direction='column' justify='flex-start'>
                    <MuiGrid item>
                    <MuiIconButton disabled = {clickedValues.length ===  1 && clickedValues[0].enabled && editPlane === -1 ? false : true}  onClick={() => onHandleTransform()}> 
                    <TransformIcon/>
                </MuiIconButton>
                    </MuiGrid>
                    <MuiGrid item>
                        <MuiTypography  variant='h5'>Transformation</MuiTypography>    
                    </MuiGrid>
                  </MuiGrid>

                  <MuiGrid container item direction='column' justify='flex-start'>
                    <MuiGrid item>
                    <MuiIconButton disabled = {clickedValues.length === 1 && editPlane === -1 ? false : true} onClick={() => onHandleCopy(planes.find((item : any )=> 
                  item.id === clickedValues[0].id))}
                > 
                  <MuiFileCopyOutlinedIcon />
                </MuiIconButton>
                    </MuiGrid>
                    <MuiGrid item>
                        <MuiTypography  variant='h5'>Copy</MuiTypography>    
                    </MuiGrid>
                  </MuiGrid>

                  <MuiGrid container item direction='column' justify='flex-start'>
                    <MuiGrid item>
                    <MuiIconButton  disabled = {copied && planes.length !== limit ? false : true} onClick={() => onHandlePaste(copy)}>
                  <MuiPaste/>
                </MuiIconButton> 
                    </MuiGrid>
                    <MuiGrid item>
                        <MuiTypography  variant='h5'>Paste</MuiTypography>    
                    </MuiGrid>
                  </MuiGrid>

                  <MuiGrid container item direction='column' justify='flex-start'>
                    <MuiGrid item>
                    <MuiIconButton disabled ={clickedValues.length === 1 && deleteMaster === false && editPlane === -1 ? false : true} style={{ }}  onClick={onHandleDeleteButton} > 
                  <MuiDeleteForeverOutlinedIcon/>
                </MuiIconButton>  
                    </MuiGrid>
                    <MuiGrid item>
                        <MuiTypography  variant='h5'>Delete</MuiTypography>    
                    </MuiGrid>
                  </MuiGrid>
                
                 
               
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
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ <Title text={"List" } group="Clip Planes"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}

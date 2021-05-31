import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackButton from '../../../components/icons/back';
import styles from './style';
import { sideBarContentTypes } from '../../../config';
import { setSidebarActiveContent } from '../../../store/appSlice';
import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';
import React, { useEffect, useState} from "react";

import MuiInput from '@material-ui/core/Input';

import MuiCheckbox from '@material-ui/core/Checkbox';

import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

import AddIcon from "../../../components/icons/plus";

import DialogBox from "../../../components/shared/dialogBox"

// import Edit from "../../../assets/images/edit.svg";
// import Copy from "../../../assets/images/copy.svg";
// import ClipPlates from "../../../assets/images/clipboard.svg";
// import Delete from "../../../assets/images/trash.svg";
// import WarningCircle from "../../../assets/images/warningCircle.svg";
// import { PlayCircleOutlineSharp } from '@material-ui/icons';

import ClipPlane from "./clipPlane"

import {editEnabled} from "../../../store/sideBar/clipSlice";
import {createPlane, editShowClip, editEdgeClip, editShowCap, pastePlane, deletePlane, editPlaneName, saveClickedVal} from "../../../store/sideBar/clipSlice";


export default function ClipPlanes(){

  const dispatch = useAppDispatch();  
  const classes = styles();
  const planes = useAppSelector((state) => state.clip.planes);
  const limit = useAppSelector((state) => state.clip.settings.maxAllowedPlanes);
  const clickedVal = useAppSelector<any>((state) => state.clip.settings.clickedVal);
  const [copied, setCopied] = useState<any>(false); 
  const [copy, setCopy] = useState(null);
  const [edit, setEdit] = useState<any>(false);
  const [openDialog, setOpenDialog] = useState<any>(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<any>(false);
  
  const [editPlane, setEditPlane] = useState(null)
  const [editName, SetEditName] = useState(null);

  const onClickBackIcon = () =>{
    dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu))
  }

  const onHandleClick :(click: any) => any = (click)=> {
    if(clickedVal){
      if(click.id === clickedVal.id)
        dispatch(saveClickedVal(null))
      else
        dispatch(saveClickedVal(click))
    }
    else 
      dispatch(saveClickedVal(click))

    if(click.id !== editPlane)
      setEditPlane(null)
  }

  const onClickAddItem = () => {
    dispatch(createPlane());
  }

  const onHandleCheck: (item: any) => any = (item) => {
    dispatch(editEnabled(item.id))
  }

  const onHandleClip: (item: any, functionName: any) => any = (item, functionName) => {
    switch (functionName){
      case "showClip":
        dispatch(editShowClip(item.id));
      break;
      case "showEdge":
        dispatch(editEdgeClip(item.id));
      break;
      case "showCap":
        dispatch(editShowCap(item.id));
      break;
    } 
  }

  const onHandleCopy: (item: any) => any = (item) => {
    setCopied(true);
    setCopy(item);
  }

  const onHandlePaste:(item: any)=> any = (item) => {
    dispatch(pastePlane(item))
  }

  const onHandleDelete = () => {
    setOpenDialog(false);
    setOpenDeleteConfirm(true);

    dispatch(editEnabled(clickedVal.id))

    dispatch(deletePlane(clickedVal.id))
    dispatch(saveClickedVal(null))
  }

  const onHandleEdit = () => {
    setEdit(!edit);  
  }
  
  const onHandleSave = () => {
    setEdit(!edit);
    // setClickedVal(null);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleCloseAlert = () => {
    setOpenDeleteConfirm(false)
  }

  const onHandlePlateNameEdit = (e : any) => {
   SetEditName(e.target.value)
  
  }

  const onHandlePlateKey = (e : any, item : any) => {
    if (e.key === 'Enter') {
      setEditPlane(null)
      if(editName === "")
        setEditPlane(null)
      else{
      const editPlane = {id : item.id, editName : editName}
      dispatch(editPlaneName(editPlane))
      }
    }
    if (e.keyCode === 27) {
      e.preventDefault();
      setEditPlane(null)
    }
}

  const displayClicked = () => {
    const displayClick :any = planes.find((item : any )=> item.id === clickedVal.id);
    return(
      <div  className={classes.displayList}> 
        <MuiTypography className={classes.listItem} noWrap onClick={() =>onHandleClip(clickedVal, "showClip")}>
          <MuiCheckbox color="default" checked ={displayClick.showClip} />
          Show Clip Plate
        </MuiTypography>
        <MuiTypography className={classes.listItem} onClick={() =>onHandleClip(clickedVal,"showEdge")} noWrap>
          <MuiCheckbox color="default"  checked={displayClick.showEdge} />
          Show Edge
        </MuiTypography>
        <MuiTypography  className={classes.listItem} onClick={() =>onHandleClip(clickedVal,"showCap")}  noWrap>
          <MuiCheckbox color="default"  checked={displayClick.showCap} />
          Show Cap
        </MuiTypography>
      </div>
    )
  }

  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderContent = () => {
    return <MuiTypography className={classes.heading} variant='h1' noWrap>Clip Planes</MuiTypography>;
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
    return (
      <div>
        {/* <div className={classes.heading}>
          <MuiTypography  variant='h1' noWrap>Clip Planes</MuiTypography>
          <MuiIconButton style={{right: "6.5%",}} onClick={() => onClickAddItem()}><AddIcon/></MuiIconButton>

        </div> */}
        <div className={clickedVal ? classes.listClick : classes.listClickNo}>
          {
            planes.map((item : any, index : number) =>
              <div key={ 'divRoot_' + index }>
                { editPlane !== item.id 
                  ?
                  <div key={ 'divChild_' + index }  
                    className={clickedVal 
                                ? 
                                  item.id === clickedVal.id 
                                    ? 
                                      classes.listItemClicked 
                                    : 
                                      classes.listItem 
                                    : classes.listItem} 
                  >
                    <MuiCheckbox color="default"  checked={item.enabled} onChange={() => onHandleCheck(item)}/>
                    <span>
                      <MuiTypography className={classes.listItemText} onClick={() => onHandleClick(item)} onDoubleClick={() => {setEditPlane(item.id);dispatch(saveClickedVal(null)); SetEditName(item.name)}} >
                      {item.name}
                   </MuiTypography>
                    </span>    
                  </div>
                :
                  <div key={ 'divChild_' + index } className={classes.listItemClicked}>
                 <MuiTypography className={classes.listItemText} >
                  <MuiCheckbox color="default"  checked={item.enabled} onChange={() => onHandleCheck(item)}/>
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
          {clickedVal ? 
            <div style={{position:"fixed",top:"50%",marginTop:"10px",}}>
              <MuiTypography className={classes.heading} variant='h1' noWrap>
                Display Options
              </MuiTypography>
              {displayClicked()}
            </div> 
          :
            null
          }
        </div>
      </div>
    )
  }

  const getFooter = () => {
    return (
      <div>
        {
          clickedVal 
          ? 
            <div style={{marginLeft:"10px", marginRight:"10px"}}>
              <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",}}>
              <MuiIconButton  onClick={() => onHandleEdit()} style={{}}> 
                <MuiEditIcon/>
              </MuiIconButton>
              <MuiIconButton style={{ }} onClick={() => onHandleCopy(planes.find((item : any )=> 
                item.id === clickedVal.id))}> 
              <MuiFileCopyOutlinedIcon />
              </MuiIconButton>
              {copied 
                ? 
                <div>
                  { planes.length === limit 
                    ?
                      <MuiIconButton disabled style={{ }} onClick={() => onHandlePaste(copy)}>
                        <MuiPaste />
                      </MuiIconButton>  
                    :
                      <MuiIconButton style={{ }} onClick={() => onHandlePaste(copy)}>
                        <MuiPaste/>
                      </MuiIconButton>  
                  }
                 </div>
                : 
                  <MuiIconButton disabled style={{}}>
                     <MuiPaste/>
                  </MuiIconButton>
              }
              
              <MuiIconButton  onClick={() => setOpenDialog(!openDialog)}  style={{ }}> 
                <MuiDeleteForeverOutlinedIcon/>
              </MuiIconButton>  
              </div>
            </div>
          : 
          <div style={{marginLeft:"10px", marginRight:"10px"}}>
          <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",}}>
          <MuiIconButton disabled style={{}} onClick={() => onHandleEdit()} > 
            <MuiEditIcon />
          </MuiIconButton>
          <MuiIconButton disabled style={{ }} onClick={() => onHandleCopy(planes.find((item : any )=> 
            item.id === clickedVal.id))}> 
          <MuiFileCopyOutlinedIcon />
          </MuiIconButton>
          {copied 
                ? 
                <div>
                { planes.length === limit 
                  ?
                    <MuiIconButton disabled style={{ }} onClick={() => onHandlePaste(copy)}>
                      <MuiPaste />
                    </MuiIconButton>  
                  :
                    <MuiIconButton style={{ }} onClick={() => onHandlePaste(copy)}>
                      <MuiPaste />
                    </MuiIconButton>  
                }
               </div>
                : 
                  <MuiIconButton disabled style={{}}>
                     <MuiPaste/>
                  </MuiIconButton>
              }
          <MuiIconButton disabled style={{ }}  onClick={() => setOpenDialog(!openDialog)} > 
                <MuiDeleteForeverOutlinedIcon/>
              </MuiIconButton>  
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
          <ClipPlane clicked ={clickedVal} onHandleEdit={onHandleEdit} editSave={onHandleSave}/>
        :
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ getHeaderContent() }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          /> 
      }
      
      <DialogBox 
        openDialog={openDialog} 
        dialogBox={classes.dialogBox} 
        clickedVal={clickedVal} 
        onHandleDelete={onHandleDelete} 
        handleCloseDialog={handleCloseDialog} 
        snackBar={classes.snackBar} 
        openDeleteConfirm={openDeleteConfirm} 
        handleCloseAlert={handleCloseAlert} 
        confirmationMessage={clickedVal ?  `Are you sure want to delete ${clickedVal.name}?` : null} 
        confirmedMessage="ClipPlane deleted"
        confirmationIcon={ <MuiErrorOutlineOutlinedIcon className={classes.dialogBox}/>}
        confirmedIcon={<MuiDeleteForeverOutlinedIcon/>}
  /> 

</div>
  )
}
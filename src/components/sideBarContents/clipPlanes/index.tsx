import MuiIconButton from '@material-ui/core/IconButton';
import MuiTypography from '@material-ui/core/Typography';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackButton from '../../../assets/images/back';
import styles from './style';
import { sideBarContentTypes } from '../../../config';
import { setSidebarActiveContent } from '../../../store/appSlice';
import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';
import React, { useState, useEffect } from "react";

import MuiInput from '@material-ui/core/Input';

import MuiCheckbox from '@material-ui/core/Checkbox';

import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

import AddIcon from "../../../assets/images/plus";
// import Edit from "../../../assets/images/edit.svg";
import Copy from "../../../assets/images/copy.svg";
import ClipPlates from "../../../assets/images/clipboard.svg";
import Delete from "../../../assets/images/trash.svg";
import WarningCircle from "../../../assets/images/warningCircle.svg";
import { PlayCircleOutlineSharp } from '@material-ui/icons';

import ClipPlane from "./clipPlane"

import {editEnabled} from "../../../store/clipSlice";
import {createPlane, editShowClip, editEdgeClip, editShowCap, pastePlane, deletePlane, editPlaneName} from "../../../store/clipSlice";

import MuiButton from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiCloseIcon from '@material-ui/icons/Close';
import { spawn } from 'node:child_process';
import MuiIcon from '@material-ui/core/Icon';

import MuiAlert from '@material-ui/lab/Alert';
import { isNonNullExpression } from 'typescript';

export default function ClipPlanes(){

  const dispatch = useAppDispatch();  
  const classes = styles();
  const planes = useAppSelector((state) => state.clip.planes);
  const [clickedVal, setClickedVal] = useState<any>(null); 
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
    if ( clickedVal) {
      setClickedVal(null)
      
    }
    else{
      setClickedVal(click);
    if(click.id !== editPlane)
      setEditPlane(null)
    }
    
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
    dispatch(deletePlane(clickedVal.id))
    setClickedVal(null);
  }

  const onHandleEdit = () => {
    setEdit(!edit);  
  }
  
  const onHandleSave = () => {
    setEdit(!edit);
    setClickedVal(null);
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
    {
      if (e.key === 'Enter') {
        setEditPlane(null)
        console.log(item, editName)
        const hello = {id : item.id, editName : editName}
        dispatch(editPlaneName(hello))
      }
      if (e.keyCode === 27) {
        e.preventDefault();
        setEditPlane(null)
      }
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
      <MuiIconButton onClick={() => onClickAddItem()}><AddIcon/></MuiIconButton>
    )
  }
    
  const getBody = () => {
    return (
      <div>
        {/* <div className={classes.heading}>
          <MuiTypography  variant='h1' noWrap>Clip Planes</MuiTypography>
          <MuiIconButton style={{right: "6.5%",}} onClick={() => onClickAddItem()}><AddIcon/></MuiIconButton>

        </div> */}
        <div className={classes.list}>
          {
            planes.map((item : any) =>
              <div 
                onDoubleClick={() => {setEditPlane(item.id);setClickedVal(null); SetEditName(item.name)}} 
                className={clickedVal 
                            ? 
                              item.id === clickedVal.id 
                                ? 
                                  classes.listItemClicked 
                                : classes.listItem 
                            : classes.listItem} 
              >
                { editPlane !== item.id 
                  ?
                  <MuiTypography className={classes.listItemText} onClick={() => onHandleClick(item)}  >
                  <MuiCheckbox color="default"  checked={item.enabled} onChange={() => onHandleCheck(item)}/>
                  {item.name}
                </MuiTypography>

                :

                 <MuiTypography className={classes.listItemText} >
                  <MuiCheckbox color="default"  checked={item.enabled} onChange={() => onHandleCheck(item)}/>
                  <MuiInput value={editName}
                  onChange={onHandlePlateNameEdit}
                  onKeyDown={(e) => onHandlePlateKey(e, item)}/>
                </MuiTypography>
               

                }
                
              </div>
            )
          }
        </div>
        <div style={{paddingTop:"110%"}}>
          {clickedVal ? 
            <div>
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
      <div className={classes.footerCard}>
        {
          clickedVal 
          ? 
            <div style={{ position:"absolute",left:"8%",right:"10%"}}>
              <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",}}>
              <MuiIconButton style={{}}> 
                <MuiEditIcon onClick={() => onHandleEdit()}/>
              </MuiIconButton>
              <MuiIconButton style={{ }}> 
              <MuiFileCopyOutlinedIcon onClick={() => onHandleCopy(planes.find((item : any )=> 
                item.id === clickedVal.id))}/>
              </MuiIconButton>
              {copied 
                ? 
                  <MuiIconButton style={{ }}>
                    <MuiPaste onClick={() => onHandlePaste(copy)}/>
                  </MuiIconButton>  
                : 
                  <MuiIconButton disabled style={{}}>
                     <MuiPaste/>
                  </MuiIconButton>
              }
              
              <MuiIconButton style={{ }}> 
                <MuiDeleteForeverOutlinedIcon onClick={() => setOpenDialog(!openDialog)} />
              </MuiIconButton>  
              </div>
            </div>
          : 
          <div style={{ position:"absolute",left:"8%",right:"10%"}}>
          <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",}}>
          <MuiIconButton disabled style={{}}> 
            <MuiEditIcon onClick={() => onHandleEdit()}/>
          </MuiIconButton>
          <MuiIconButton disabled style={{ }}> 
          <MuiFileCopyOutlinedIcon onClick={() => onHandleCopy(planes.find((item : any )=> 
            item.id === clickedVal.id))}/>
          </MuiIconButton>
          {copied 
                ? 
                  <MuiIconButton style={{ }}>
                    <MuiPaste onClick={() => onHandlePaste(copy)}/>
                  </MuiIconButton>  
                : 
                  <MuiIconButton disabled style={{}}>
                     <MuiPaste/>
                  </MuiIconButton>
              }
          <MuiIconButton disabled style={{ }}> 
                <MuiDeleteForeverOutlinedIcon onClick={() => setOpenDialog(!openDialog)} />
              </MuiIconButton>  
          </div>
          </div>
        }
      </div>
    )          
  }

  return (
    <div>
      {edit ?  <ClipPlane clicked ={clickedVal} onHandleEdit={onHandleEdit} editSave={onHandleSave}/>
      :
      <SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
    /> }

      <MuiDialog
        open={openDialog}
        aria-labelledby="draggable-dialog-title"
      >
        <MuiDialogContent className={classes.dialogBox}>
          <MuiDialogContentText >
            <MuiIcon style={{marginLeft: "40%"}}><MuiErrorOutlineOutlinedIcon className={classes.dialogBox}/></MuiIcon>
            
            <MuiTypography color="inherit">
              {clickedVal ?  `Are you sure want to delete ${clickedVal.name}?` : null}
             
            </MuiTypography>
          </MuiDialogContentText>
        </MuiDialogContent>
        <MuiDialogActions >
          <div>
          <MuiButton style={{backgroundColor:"#8C8BFF", marginLeft:"-50%"}} 
            autoFocus 
            onClick={onHandleDelete} 
            color="primary"
          >
            Confirm
          </MuiButton>
          <MuiButton style={{color: "#8C8BFF"}}
            onClick={handleCloseDialog} 
            color="primary"
          >
            Cancel
          </MuiButton>
          </div>
        </MuiDialogActions>
      </MuiDialog>
      <div>
        <MuiSnackbar className={classes.snackBar}
          anchorOrigin={{vertical:"top", horizontal:'center'}}
          autoHideDuration={2000}
          open={openDeleteConfirm}
          onClose={handleCloseAlert} >
            <MuiAlert icon={false}>
            <div style={{display: "flex",
              alignItems: "center",
              justifyContent: "space-between",}}>
              <MuiIcon><MuiDeleteForeverOutlinedIcon/></MuiIcon>
              <MuiTypography color="inherit">ClipPlane deleted</MuiTypography>
            </div>
            </MuiAlert>
          </MuiSnackbar>
      </div>
    </div>
  )
}
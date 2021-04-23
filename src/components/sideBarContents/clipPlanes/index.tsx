import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackIcon from '../../../assets/images/back.svg';
import styles from './style';
import { sideBarContentTypes } from '../../../config';
import { setSidebarActiveContent } from '../../../store/appSlice';
import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';
import React, { useState, useEffect } from "react";

import Checkbox from '@material-ui/core/Checkbox';

import AddIcon from "../../../assets/images/plus.svg";
import Edit from "../../../assets/images/edit.svg";
import Copy from "../../../assets/images/copy.svg";
import ClipPlates from "../../../assets/images/clipboard.svg";
import Delete from "../../../assets/images/trash.svg";
import WarningCircle from "../../../assets/images/warningCircle.svg";
import { PlayCircleOutlineSharp } from '@material-ui/icons';

import ClipPlane from "./clipPlane"

import { addItem } from '../../../store/clipSlice';
import {editCheck} from "../../../store/clipSlice";
import {editShowClip, editEdgeClip, editShowCap, pastePlane, deletePlane} from "../../../store/clipSlice";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { spawn } from 'node:child_process';
import {Icon} from '@material-ui/core';

export default function ClipPlanes(){

  const dispatch = useAppDispatch();  
  const classes = styles();
  const planes = useAppSelector((state) => state.clip.planes);
  const [clickedVal, setClickedVal] = useState<any>(null); 
  const [copied, setCopied] = useState<any>(false); 
  const [copy, setCopy] = useState<any>(null);
  const [edit, setEdit] = useState<any>(false);
  const [openDialog, setOpenDialog] = useState<any>(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<any>(false);

  const onClickBackIcon = () =>{
    dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu))
  }

  const onHandleClick :(click: any) => any = (click)=> {
    setClickedVal(click);
  }

  const onClickAddItem = () => {
    dispatch(addItem());
  }

  const onHandleCheck: (item: any) => any = (item) => {
    dispatch(editCheck(item.name))
  }

  const onHandleClip: (item: any, functionName: any) => any = (item, functionName) => {
    switch (functionName){
      case "showClip":
        dispatch(editShowClip(item.name));
      break;
      case "showEdge":
        dispatch(editEdgeClip(item.name));
      break;
      case "showCap":
        dispatch(editShowCap(item.name));
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
    dispatch(deletePlane(clickedVal.name))
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

  const displayClicked = () => {
    const displayClick :any = planes.find((item : any )=> item.name === clickedVal.name);
    return(
      <div  className={classes.displayList}>
        <Typography className={classes.listItem} noWrap onClick={() =>onHandleClip(clickedVal, "showClip")}>
          <Checkbox style={{color:"#DFDEDE"}} checked ={displayClick.showClip} />
          Show Clip Plate
        </Typography>
        <Typography className={classes.listItem} onClick={() =>onHandleClip(clickedVal,"showEdge")} noWrap>
          <Checkbox style={{color:"#DFDEDE"}} checked={displayClick.showEdge} />
          Show Edge
        </Typography>
        <Typography  className={classes.listItem} onClick={() =>onHandleClip(clickedVal,"showCap")}  noWrap>
          <Checkbox style={{color:"#DFDEDE"}} checked={displayClick.showCap} />
          Show Cap
        </Typography>
      </div>
    )
  }

  const getHeaderLeftIcon= () => {
    return (
      <IconButton className={classes.headerIcon} onClick={() => onClickBackIcon()}>
        <img src={ BackIcon } alt={'BackIcon'}/> 
      </IconButton>
    );
  }

  const getHeaderContent = () => {
    return <Typography className={classes.heading} variant='h1' noWrap>Clip Planes</Typography>;
  }
    
  const getBody = () => {
    return (
      <div>
        <div className={classes.heading}>
          <Typography  variant='h1' noWrap>Clip Planes</Typography>
          <IconButton style={{right: "6.5%",}}><img src={AddIcon} alt={'Add'} onClick={() => onClickAddItem()}/></IconButton>
        </div>
        <div className={classes.list}>
          {
            planes.map((item : any) =>
              <div className={clickedVal ? item.name === clickedVal.name ? classes.listItemClicked : classes.listItem : classes.listItem} >
                <Typography className={classes.listItemText} onClick={() => onHandleClick(item)}>
                  <Checkbox style={{color:"#DFDEDE"}}  checked={item.checkbox} onChange={() => onHandleCheck(item)}/>
                  {`Plane ${item.name}`}
                </Typography>
              </div>
            )
          }
           <div>
          {clickedVal ? 
            <div>
              <Typography className={classes.displayOption} noWrap>
                Display Options
              </Typography>
              {displayClicked()}
            </div> 
          :
            null
          }
        </div>
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
            <div>
              <IconButton style={{ position:"absolute",left:"10%",}}> <img src={Edit} alt={'Edit'} onClick={() => onHandleEdit()}/></IconButton>
              <IconButton style={{ position:"absolute",left:"30%",}}> <img src={Copy} alt={'Copy'} onClick={() => onHandleCopy(planes.find((item : any )=> item.name === clickedVal.name))}/></IconButton>
              {copied ? <IconButton style={{ position:"absolute",left:"55%",}}> <img src={ClipPlates} alt={'Paste'} onClick={() => onHandlePaste(copy)}/></IconButton>  : <IconButton disabled style={{ position:"absolute",left:"55%",}}> <img src={ClipPlates} alt={'Paste'} onClick={() => onHandlePaste(copy)}/></IconButton>}
              
              <IconButton style={{ position:"absolute",right:"10%",}}> <img src={Delete} alt={'Delete'} onClick={() => setOpenDialog(!openDialog)}/></IconButton>  
            </div>
          : 
            null 
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
      body ={ getBody() }
      footer = { getFooter() }
    /> }

      <Dialog
        open={openDialog}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent style={{backgroundColor: "#171727"}}>
          <DialogContentText style={{color:"#DFDEDE"}}>
            <Icon > <img style={{marginLeft: "40%"}} src={ WarningCircle } alt={'Warning Icon'}/> </Icon>
            <div>
              Are you sure want to delete this clip ? 
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{backgroundColor: "#171727",display: "flex",alignItems: "center",justifyContent: "center",}}>
          <Button style={{backgroundColor:"#8C8BFF"}} 
            autoFocus 
            onClick={onHandleDelete} 
            color="primary"
          >
            Confirm
          </Button>
          <Button style={{color: "#8C8BFF"}}
            onClick={handleCloseDialog} 
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Snackbar style={{backgroundColor:"#DFDEDE", opacity:"50%",}}
          anchorOrigin={{vertical:"top", horizontal:'center'}}
          autoHideDuration={2000}
          open={openDeleteConfirm}
          onClose={handleCloseAlert}
          message={
            <div>
              <IconButton> <img src={Delete} alt={'Delete'}/></IconButton>
              <span style={{color:"#DFDEDE"}}> Clip Plane Deleted</span>
            </div>
          }
        />
      </div>
    </div>
  )
}
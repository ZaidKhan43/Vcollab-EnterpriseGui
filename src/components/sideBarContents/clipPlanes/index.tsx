import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackButton from '../../../assets/images/back';
import styles from './style';
import { sideBarContentTypes } from '../../../config';
import { setSidebarActiveContent } from '../../../store/appSlice';
import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';
import React, { useState, useEffect } from "react";

import Input from '@material-ui/core/Input';

import Checkbox from '@material-ui/core/Checkbox';

import EditIcon from '@material-ui/icons/EditOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Paste from '@material-ui/icons/AssignmentOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

import AddIcon from "../../../assets/images/plus";
// import Edit from "../../../assets/images/edit.svg";
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

import Alert from '@material-ui/lab/Alert';
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

  const [editName, setEditName] = useState(null);
  const [editOne, setEditOne] = useState(null);

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
    dispatch(editCheck(item.id))
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

  const onHandlePlateName = (e : any) => {
   setEditOne(e.target.value)
   console.log(e.target.value)
   console.log(editOne)
  }

  const displayClicked = () => {
    const displayClick :any = planes.find((item : any )=> item.id === clickedVal.id);
    return(
      <div  className={classes.displayList}>
        <Typography className={classes.listItem} noWrap onClick={() =>onHandleClip(clickedVal, "showClip")}>
          <Checkbox color="default" checked ={displayClick.showClip} />
          Show Clip Plate
        </Typography>
        <Typography className={classes.listItem} onClick={() =>onHandleClip(clickedVal,"showEdge")} noWrap>
          <Checkbox color="default"  checked={displayClick.showEdge} />
          Show Edge
        </Typography>
        <Typography  className={classes.listItem} onClick={() =>onHandleClip(clickedVal,"showCap")}  noWrap>
          <Checkbox color="default"  checked={displayClick.showCap} />
          Show Cap
        </Typography>
      </div>
    )
  }

  const getHeaderLeftIcon= () => {
    return (
     <IconButton  onClick={() => onClickBackIcon()}><BackButton/></IconButton> 
    );
  }

  const getHeaderContent = () => {
    return <Typography className={classes.heading} variant='h1' noWrap>Clip Planes</Typography>;
  }

  const getHeaderRightIcon = () => {
    return (
      <IconButton onClick={() => onClickAddItem()}><AddIcon/></IconButton>
    )
  }
    
  const getBody = () => {
    return (
      <div>
        {/* <div className={classes.heading}>
          <Typography  variant='h1' noWrap>Clip Planes</Typography>
          <IconButton style={{right: "6.5%",}} onClick={() => onClickAddItem()}><AddIcon/></IconButton>

        </div> */}
        <div className={classes.list}>
          {
            planes.map((item : any) =>
              <div onClick={() => onHandleClick(item)} onDoubleClick={() => {setEditPlane(item.id); setEditOne(item.name)}} className={clickedVal ? item.id === clickedVal.id ? classes.listItemClicked : classes.listItem : classes.listItem} >
                { editPlane !== item.id 
                  ?
                  <Typography className={classes.listItemText} >
                  <Checkbox color="default"  checked={item.checkbox} onChange={() => onHandleCheck(item)}/>
                  {item.name}
                </Typography>

                :

                 <Typography className={classes.listItemText} >
                  <Checkbox color="default"  checked={item.checkbox} onChange={() => onHandleCheck(item)}/>
                  <Input value={editOne}
                  onChange={onHandlePlateName}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      setEditPlane(null)
                    }
                    
                    if (event.keyCode === 27) {
                      event.preventDefault();
                      setEditPlane(null)
                    }}}
                   />
                </Typography>
               

                }
                
              </div>
            )
          }
        </div>
        <div style={{paddingTop:"110%"}}>
          {clickedVal ? 
            <div>
              <Typography className={classes.heading} variant='h1' noWrap>
                Display Options
              </Typography>
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
              <div style={{display: "flex",
    alignItems: "center",
    justifyContent: "space-between",}}>
              <IconButton style={{}}> 
              <EditIcon onClick={() => onHandleEdit()}/>
              {/* <img src={Edit} alt={'Edit'} onClick={() => onHandleEdit()}/> */}
              </IconButton>
              <IconButton style={{ }}> 
              <FileCopyOutlinedIcon onClick={() => onHandleCopy(planes.find((item : any )=> 
                item.id === clickedVal.id))}/>
              </IconButton>
              {copied 
                ? 
                  <IconButton style={{ }}>
                    <Paste onClick={() => onHandlePaste(copy)}/>
                  </IconButton>  
                : 
                  <IconButton disabled style={{}}>
                     <Paste/>
                  </IconButton>
              }
              
              <IconButton style={{ }}> 
                <DeleteForeverOutlinedIcon onClick={() => setOpenDialog(!openDialog)} />
              </IconButton>  
              </div>
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
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
    /> }

      <Dialog
        open={openDialog}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent className={classes.dialogBox}>
          <DialogContentText >
            <Icon style={{marginLeft: "40%"}}><ErrorOutlineOutlinedIcon className={classes.dialogBox}/></Icon>
            
            <Typography color="inherit">
              Are you sure want to delete this clip ? 
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <div>
          <Button style={{backgroundColor:"#8C8BFF", marginLeft:"-50%"}} 
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
          </div>
        </DialogActions>
      </Dialog>
      <div>
        <Snackbar className={classes.snackBar}
          anchorOrigin={{vertical:"top", horizontal:'center'}}
          autoHideDuration={2000}
          open={openDeleteConfirm}
          onClose={handleCloseAlert} >
            <Alert icon={false}>
            <div style={{display: "flex",
              alignItems: "center",
              justifyContent: "space-between",}}>
              <Icon><DeleteForeverOutlinedIcon/></Icon>
              <Typography color="inherit">Clip Plane Deleted</Typography>
            </div>
            </Alert>
          </Snackbar>
      </div>
    </div>
  )
}
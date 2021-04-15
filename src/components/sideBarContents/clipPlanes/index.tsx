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
import { PlayCircleOutlineSharp } from '@material-ui/icons';

import ClipPlane from "./clipPlane"

import { addItem } from '../../../store/clipSlice';
import {editCheck} from "../../../store/clipSlice";
import {editShowClip, editEdgeClip, editShowCap, pastePlane, deletePlane} from "../../../store/clipSlice";

export default function ClipPlanes(){

//   type clicked = {
//     // planes: object[],
//     name: number,
//     checkbox: boolean,
//     showClip: boolean,
//     showEdge: boolean,
//     showCap: boolean,
//     equation: string,
//     clipDirection: boolean,
//     translate: string,
//     rotate: number,
//     xAxis: number,
//     yAxis: number,
// }

  const dispatch = useAppDispatch();  
  const classes = styles();
  const planes = useAppSelector((state) => state.clip.planes);
  const [clickedVal, setClickedVal] = useState<any>(null); 
  const [copied, setCopied] = useState<any>(false); 
  const [copy, setCopy] = useState<any>(null);
  const [edit, setEdit] = useState<any>(false);
  // const [showClip, setShowClip] = useState(false) 
  // const[clicked, setClicked] =  useState(false)

  const onClickBackIcon = () =>{
    dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu))
  }



  const onHandleClick :(click: any) => any = (click)=> {
    setClickedVal(click);
    // setShowClip(click.showClip)
  }

  const onClickAddItem = () => {
    dispatch(addItem());
  }

  const onHandleCheck: (item: any) => any = (item) => {
    dispatch(editCheck(item.name))
  }



  const onHandleClip: (item: any, functionName: any) => any = (item, functionName) => {
    // setShowClip(!showClip)
    switch (functionName){
      case "showClip":
        dispatch(editShowClip(item.name));
        break;
      case "showEdge":
        dispatch(editEdgeClip(item.name));
        break;
      case "showCap":
        dispatch(editShowCap(item.name));
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
    dispatch(deletePlane(clickedVal.name))
    setClickedVal(null);
  }

  const onHandleEdit = () => {
    setEdit(!edit);
  }
  
  const onHandleSave = () => {
    setEdit(!edit);
  }

  const displayClicked = () => {
    const displayClick :any = planes.find((item : any )=> item.name == clickedVal.name);
    return(
      <div>
      <Typography noWrap onClick={() =>onHandleClip(clickedVal, "showClip")}>
      <Checkbox checked ={displayClick.showClip} />
      Show Clip Plate
    </Typography>
    <Typography onClick={() =>onHandleClip(clickedVal,"showEdge")} noWrap>
      <Checkbox checked={displayClick.showEdge} />
      Show Edge
    </Typography>
    <Typography onClick={() =>onHandleClip(clickedVal,"showCap")}  noWrap>
      <Checkbox checked={displayClick.showCap} />
      Show Cap
    </Typography>
    </div>
    )
  }

    const getHeaderLeftIcon= () => {
    return (
      <IconButton onClick={() => onClickBackIcon()}>
        <img src={ BackIcon } alt={'BackIcon'}/> 
      </IconButton>
    );
  }

  const getHeaderContent = () => {
    return <Typography noWrap>Clip Planes</Typography>;
  }

  const getHeaderRightIcon = () => {
    return  <IconButton><img src={AddIcon} alt={'Add'} onClick={() => onClickAddItem()}/></IconButton>;
  }
    
  const getBody = () => {
    return (
      <div>
        <div>
          {
            planes.map((item : any) =>
              <div>
              <Typography onClick={() => onHandleClick(item)}>
                <Checkbox  checked={item.checkbox} onChange={() => onHandleCheck(item)}/>
                {`Plane ${item.name}`}
              </Typography>
              
              </div>
            )
          }
        </div>
        <div>
         {clickedVal ? 
           <div>
           <Typography noWrap>
             Display Options
           </Typography>
            { displayClicked()}
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
            <div>
              <IconButton> <img src={Edit} alt={'Edit'} onClick={() => onHandleEdit()}/></IconButton>
              <IconButton> <img src={Copy} alt={'Copy'} onClick={() => onHandleCopy(planes.find((item : any )=> item.name == clickedVal.name))}/></IconButton>
              {copied ? <IconButton> <img src={ClipPlates} alt={'Paste'} onClick={() => onHandlePaste(copy)}/></IconButton>  : null}
              
              <IconButton> <img src={Delete} alt={'Delete'} onClick={() => onHandleDelete()}/></IconButton>  
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
    </div>
    
  )
}
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
import {setSectionPlaneData, addPlane, editEnabled, setActive, editShowClip, editEdgeClip, editShowCap, pastePlane, editPlaneName, saveClickedVal, removePlane, duplicatePlane, saveSelectedPlane} from "../../../store/sideBar/clipSlice";
import { isTemplateExpression } from 'typescript';
import { useEffect } from 'react';


export default function ClipPlanes(){

  const dispatch = useAppDispatch();  
  const classes = styles();
  const planes = useAppSelector((state) => state.clipPlane.planes);
  const limit = useAppSelector((state) => state.clipPlane.settings.maxAllowedPlanes);
  const clickedVal = useAppSelector<any>((state) => state.clipPlane.settings.clickedVal);

  const [clickedValues , setClickedValues] = useState<any>([]); 

  const [copied, setCopied] = useState<any>(false); 
  const [copy, setCopy] = useState(null);
  const [edit, setEdit] = useState<any>(false);
  const [openDialog, setOpenDialog] = useState<any>(false);
  const [deleted,SetDeleted] = useState<any>(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<any>(false);
  
  const [enabledOption, setEnabledOption] = useState(false)

  const [editPlane, setEditPlane] = useState(null)
  const [editName, SetEditName] = useState(null);



  const onClickBackIcon = () =>{
    dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu))
  }

  const onHandleClick :(e: any, click: any) => any = (e, click)=> {
      dispatch(saveSelectedPlane(click))
      
      if(click.enabled === true)
        setEnabledOption(true)
     
     
        // if(newArray.length === 1){
      //   setEnabledOption(newArray[0].enabled)
      // }

      // if(click.enabled=== true){
      //   setEnabledOption(true)
      // }

      // if(click.enabled=== false){
      //   setEnabledOption(false)
      // }

    }

   

    if((clickedValues.findIndex((item: any) => item.id === click.id)) >= 0){
      const newArray = clickedValues.filter((item: any )=> item.id !== click.id);
      setClickedValues(newArray);
      if(newArray.length !==0){  
        let count : number =0;
        newArray.forEach((item : any) => {
          if(item.enabled === true)
            count++;
          })
          if(count >= 1)
              setEnabledOption(true)
          if(count === 0)
            setEnabledOption(false)
      
      }
      else{
        setEnabledOption(false)
      }
      // }
      
      // if(clickedValues.length >1){
      //   let count : number;
      //   clickedValues.forEach((item : any) => {
      //     if(item.enabled === true)
      //       count++;
      //     if(count >= 1)
      //         setEnabledOption(true)
      //     if(count === 0)
      //       setEnabledOption(false)
      //   })
      }

    // if(clickedValues.length === 1){
    //   setEnabledOption(
    //   clickedValues[0].enabled)
    // }

    if(clickedVal){
      if(click.id === clickedVal.id)
      {
        dispatch(saveClickedVal(null))
        dispatch(setActive({id:-1}))
      }
    else{
        // setEnabledOption(click.enabled)
        dispatch(saveClickedVal(click))
      }
    }
    else 
    {
      // setEnabledOption(click.enabled)
      dispatch(saveClickedVal(click))
      dispatch(setActive({id:click.id}))
    }

    if(click.id !== editPlane)
      setEditPlane(null)

  
    // const vsar= e.ctrlKey && true
  }

  const onClickAddItem = () => {
    dispatch(addPlane());
  }

  const onHandleCheck: (item: any) => any = (item) => {
    // if(clickedVal && clickedVal.id === item.id)
    // setEnabledOption(!item.enabled)
 
 
    if(clickedValues.length > 0){
      const index= clickedValues.findIndex((element : any) => element.id === item.id)
      if ( index >= 0 ) {
        let newArray : any = [...clickedValues];
        let changeItem : any = {...newArray[index]};
        changeItem.enabled = !changeItem.enabled
        newArray[index] = changeItem;
        let count = 0;
        newArray.forEach((item : any) => {
          if(item.enabled === true)
            count++;
        })
      if(count >= 1){
        setEnabledOption(true)
      }
      else{
        setEnabledOption(false)
      }
        setClickedValues(newArray)
      }    
   }

    dispatch(editEnabled(item.id))
    dispatch(setSectionPlaneData({id:item.id}));
  }

  const onHandleClip: ( functionName: any) => any = (functionName) => {
    switch (functionName){
      case "showClip":
        clickedValues.forEach((item :any) => {          
                dispatch(editShowClip(item.id));
          })
        
        for (let i=0 ; i< clickedValues.length ; i++) {
        
          if(clickedValues[i].enabled === true){
            let newArray
            let changeItem
                 newArray = [...clickedValues];
                changeItem  = {...newArray[i]};
                changeItem.showClip = !changeItem.showClip
                newArray[i] = changeItem; 
                setClickedValues(newArray)
        }}
         
        
      break;
      // case "showEdge":
      //   dispatch(editEdgeClip(item.id));
      // break;
      // case "showCap":
      //   dispatch(editShowCap(item.id));
      // break;
    } 
    // dispatch(setSectionPlaneData({id:item.id}));
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

  const onHandleDelete = () => {
    setOpenDialog(false);
    setOpenDeleteConfirm(true);

    dispatch(editEnabled(clickedVal.id))
    SetDeleted(clickedVal.name);
    dispatch(removePlane({id:clickedVal.id}))
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

    console.log("varub", clickedValues)
    console.log("arun", planes)
    let count= 0;
    let displayShowClip = false;
    let displayShowEdge = false;
    let displayShowCap = false;
    let indeterminate = false;
    if (clickedValues.length === 1){
      const index = planes.findIndex((item) => item.id === clickedValues[0].id)
      displayShowClip = planes[index].showClip
      displayShowEdge = planes[index].showEdge
      displayShowCap = planes[index].showCap
    }
    
    
    if(clickedValues.length > 1){
      clickedValues.forEach((item : any) => {
        if(item.enabled === true)
          count++;
      })
    
    if(count === 1){
      const toBePrinted = clickedValues.find((item : any) => item.enabled === true)
      const index = planes.findIndex((item) => item.id === toBePrinted.id)
      displayShowClip = planes[index].showClip
      displayShowEdge = planes[index].showEdge
      displayShowCap = planes[index].showCap
      // displayClip = displayClick.showClip;  
    }

    if(count > 1){
      let countShowClip = 0;
      let countShowEdge = 0;
      let countShowCap = 0;
      

      if(clickedValues.length > 1){

        clickedValues.forEach((item : any) => {
          if(item.showClip === true)
            countShowClip++;
          if(item.showEdge === true)
            countShowEdge++;
        })}
      if(countShowClip === clickedValues.length){
        displayShowClip = true; 
      }
      if(countShowClip === 0){
        displayShowClip = false; 
      }

      if(countShowClip < clickedValues.length && countShowClip !== 0){
        displayShowClip = true; 
        indeterminate= true;
      }
    }

    }
    console.log("sasd",clickedValues)

    // console.log("sa",displayClick)
    console.log("enabled number",count)

    return(
      <div>
      {clickedValues && enabledOption ? 
      <div>
        <MuiTypography className={classes.heading} style={{marginTop:"15px", marginBottom:"-10px"}} variant='h1' noWrap>
                Options
              </MuiTypography> 
              <div   className={classes.displayList}>
        <MuiTypography className={classes.listItemOption} noWrap onClick={() =>onHandleClip("showClip")}>
          <MuiCheckbox color="default" indeterminate={indeterminate} checked ={displayShowClip} />
          Show Clip Plate
        </MuiTypography>
        <MuiTypography className={classes.listItemOption} onClick={() =>onHandleClip("showEdge")} noWrap>
          <MuiCheckbox color="default"  checked={displayShowEdge} />
          Show Edge
        </MuiTypography>
        <MuiTypography  className={classes.listItemOption} onClick={() =>onHandleClip("showCap")}  noWrap>
          <MuiCheckbox color="default"  checked={displayShowCap} />
          Show Cap
        </MuiTypography>
        </div>
      </div> : null}</div>
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
    return (
      <div>
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
        <div className={clickedValues ? classes.listClick : classes.listClickNo}>
          {
            planes.map((item : any, index : number) => 
              <div key={ 'divRoot_' + index }>
                { editPlane !== item.id 
                  ?
                  <div key={ 'divChild_' + index }  
                    className={clickedValues 
                                ?

                                  clickedValues.map((item :any) => item.id).includes(item.id)
                                    ? 
                                    classes.listItemClicked 
                                     
                                    :
                                    
                                    classes.listItem
                                    
                                : classes.listItem
                              }  
                  >
                    {/* <MuiCheckbox color="default"  checked={item.enabled} onChange={() => onHandleCheck(item)}/> */}
                    <div style={{ display: "flex", alignItems: "left", width:"65%"}} onClick={(event)=> onHandleClick(event,item)}>
                      <MuiTypography className={classes.listItemText} onDoubleClick={() => {setEditPlane(item.id);dispatch(saveClickedVal(null)); SetEditName(item.name)}} >
                        {item.name}
                      </MuiTypography>
                    </div>    
                    <Switch
                      borderRadius={8}
                      onColor='#2E2E33'
                      offColor='#2E2E33'
                      boxShadow={item.enabled ?"-12px 0px  0px 0px #707070" : "12px 0px  0px 0px #707070" }
                      offHandleColor="#707070"
                      onHandleColor="#707070"
                      activeBoxShadow="0px 0px  px 2px #fffc35"
                      height={25}
                      width={70}
                      checked={item.enabled} onChange={() => onHandleCheck(item)}
                      uncheckedIcon={<div style={{display: "flex",justifyContent: "center",alignItems: "center",color:"grey"}}>On</div>}
                      uncheckedHandleIcon={<div style={{ display: "flex",justifyContent: "center",alignItems: "center",color:"white",marginLeft:"10px"}}>Off</div>}
                      checkedIcon={<div style={{display: "flex",justifyContent: "center",alignItems: "center",color:"grey"}}>Off</div>}
                      checkedHandleIcon={<div style={{ display: "flex",justifyContent: "center",alignItems: "center",color:"white",marginLeft:"-10px"}}>On</div>}
                    />
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
            <div style={{position:"fixed",top:"55%",marginTop:"10px",}}> 
              {displayClicked()}
            </div> 
        </div>
      </div>
    )
  }

  const getFooter = () => {
    return (
      <div>
        {
          clickedValues 
          ? 
            <div style={{marginLeft:"10px", marginRight:"10px"}}>
              <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",}}>
                { enabledOption 
                  ?
                    <MuiIconButton  onClick={() => onHandleEdit()} style={{}}> 
                      <MuiEditIcon/>
                    </MuiIconButton>
                  :
                    <MuiIconButton disabled  onClick={() => onHandleEdit()} style={{}}> 
                      <MuiEditIcon/>
                    </MuiIconButton>
                }
                
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
        confirmedMessage={`${deleted} deleted`}
        confirmationIcon={ <MuiErrorOutlineOutlinedIcon className={classes.dialogBox}/>}
        confirmedIcon={<MuiDeleteForeverOutlinedIcon/>}
  /> 

</div>
  )
}
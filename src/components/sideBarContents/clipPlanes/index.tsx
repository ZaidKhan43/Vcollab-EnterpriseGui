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
import {plane, setSectionPlaneData, addPlane, editEnabled, setActive, editShowClip, editEdgeClip, editShowCap, editPlaneName, removePlane, duplicatePlane, saveSelectedPlane} from "../../../store/sideBar/clipSlice";


export default function ClipPlanes(){

  const dispatch = useAppDispatch();  
  const classes = styles();
  const planes = useAppSelector((state) => state.clipPlane.planes);
  const limit = useAppSelector((state) => state.clipPlane.settings.maxAllowedPlanes);
  // const clickedVal = useAppSelector<any>((state) => state.clipPlane.settings.clickedVal);

  const clickedValues = useAppSelector((state) => state.clipPlane.planes.filter(item => item.selected === true))

  const [copied, setCopied] = useState<boolean>(false); 
  const [copy, setCopy] = useState<plane | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deleted,SetDeleted] = useState<string | null>(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState<boolean>(false);

  const [editPlane, setEditPlane] = useState<number | null>(null)
  const [editName, SetEditName] = useState<string | null>(null);



  const onClickBackIcon = () =>{
    dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu))
  }

  const onHandleClick :(e: any, click: any) => any = (e, click)=> {
    dispatch(setActive({clicked: click}))

    if(click.id !== editPlane)
      setEditPlane(null)

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
    clickedValues.forEach(item => 
      {
        if(item.childPlane.length === 0){
          setOpenDialog(false);
          setOpenDeleteConfirm(true);
          dispatch(editEnabled({id:item.id,isEnabled:false}));
          SetDeleted(item.name);
          dispatch(removePlane({id:item.id}))
          dispatch(saveSelectedPlane({clicked: item}))
        } 
        else{
          setOpenDeleteConfirm(false);
          alert("Its a master Plane. You can't delete a master plane")
        }
      }
      
      )


    
  
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

    let enabledOptionOne = false;
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
      enabledOptionOne = enableCount >= 1 ? true : false;
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

    return(
      <div>
      {clickedValues && enabledOptionOne ? 
      <div>
        <MuiTypography className={classes.heading} style={{marginTop:"15px", marginBottom:"-10px"}} variant='h1' noWrap>
                Options
              </MuiTypography> 
              <div   className={classes.displayList}>
        <MuiTypography className={classes.listItemOption} noWrap onClick={() =>onHandleClip("showClip",indeterminateShowClip,displayShowClip)}>
          <MuiCheckbox color="default" indeterminate={indeterminateShowClip} checked ={displayShowClip} />
          Show Clip Plate
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

    // console.log("selected",clickedValues)

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
            planes.map((item, index : number) => 
              <div key={ 'divRoot_' + index }>
                { editPlane !== item.id 
                  ?
                  <div key={ 'divChild_' + index }  
                    className={
                                  item.selected
                                    ? 
                                    classes.listItemClicked 
                                    :
                                    classes.listItem
                                    
                              }  
                  >
                    {/* <MuiCheckbox color="default"  checked={item.enabled} onChange={() => onHandleCheck(item)}/> */}
                    <div style={{ display: "flex", alignItems: "left", width:"65%"}} onClick={(event)=> onHandleClick(event,item)}>
                      <MuiTypography className={classes.listItemText} onDoubleClick={() => {setEditPlane(item.id); SetEditName(item.name)}} >
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
                      checked={item.enabled} onChange={(toCheck:boolean) => onHandleCheck(toCheck,item)}
                      uncheckedIcon={<div style={{display: "flex",justifyContent: "center",alignItems: "center",color:"grey"}}>On</div>}
                      uncheckedHandleIcon={<div style={{ display: "flex",justifyContent: "center",alignItems: "center",color:"white",marginLeft:"10px"}}>Off</div>}
                      checkedIcon={<div style={{display: "flex",justifyContent: "center",alignItems: "center",color:"grey"}}>Off</div>}
                      checkedHandleIcon={<div style={{ display: "flex",justifyContent: "center",alignItems: "center",color:"white",marginLeft:"-10px"}}>On</div>}
                    />
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
            <div style={{position:"fixed",top:"55%",marginTop:"10px",}}> 
              {displayClicked()}
            </div> 
        </div>
      </div>
    )
  }


  const getFooter = () => {
    return(
      <div>
        <div style={{marginLeft:"10px", marginRight:"10px"}}>
          <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",}}>
            { clickedValues.length ===  1 && clickedValues[0].enabled
              ?
                <MuiIconButton  onClick={() => onHandleEdit()}> 
                  <MuiEditIcon/>
                </MuiIconButton>
              :
                <MuiIconButton disabled> 
                 <MuiEditIcon/>
                </MuiIconButton>
            }

            { clickedValues.length === 1
              ?
                <MuiIconButton onClick={() => onHandleCopy(planes.find((item : any )=> 
                  item.id === clickedValues[0].id))}> 
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
          
          {clickedValues.length >= 1
            ?
            <MuiIconButton style={{ }}  onClick={() => setOpenDialog(!openDialog)} > 
               <MuiDeleteForeverOutlinedIcon/>
             </MuiIconButton>  
            :
            <MuiIconButton disabled > 
              <MuiDeleteForeverOutlinedIcon/>
            </MuiIconButton>  
          }

            </div>
          </div>
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
      
      <DialogBox 
        openDialog={openDialog} 
        dialogBox={classes.dialogBox} 
        clickedVal={clickedValues[0]} 
        onHandleDelete={onHandleDelete} 
        handleCloseDialog={handleCloseDialog} 
        snackBar={classes.snackBar} 
        openDeleteConfirm={openDeleteConfirm} 
        handleCloseAlert={handleCloseAlert} 
        confirmationMessage={clickedValues[0] ?  `Are you sure want to delete ${clickedValues.map(item => item.name)}?` : null} 
        confirmedMessage={`${deleted} deleted`}
        confirmationIcon={ <MuiErrorOutlineOutlinedIcon className={classes.dialogBox}/>}
        confirmedIcon={<MuiDeleteForeverOutlinedIcon/>}
  /> 

</div>
  )
}
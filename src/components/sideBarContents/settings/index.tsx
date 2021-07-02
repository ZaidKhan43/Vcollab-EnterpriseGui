import {useState } from 'react';

import MuiIconButton from '@material-ui/core/IconButton';
import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeletIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiButton from '@material-ui/core/Button';
import SyncIcon from '@material-ui/icons/Sync';
import MuiErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';


import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BackIcon from '../../../components/icons/back';


import {sideBarContentTypes} from "../../../config";
import { setSidebarActiveContent} from '../../../store/appSlice';
import { useAppDispatch} from '../../../store/storeHooks';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import styles from './style';

//Components
import ThemeSwitch from './ThemeSwitch';
import MouseControls from'./MouseControl';
import ApplicationSettings from './ApplicationSettings';
import DialogBox from'../../shared/dialogBox';


import {
  setApplyItem,
  selectmenuItems,
  selectcopyItem,
  setcopyItem,
  pasteItem,
  deleteItem,
  selectcurrentPage,
  setcurrentPage,
  MouseSettingsType,

} from '../../../store/sideBar/settings';
import { useAppSelector } from '../../../store/storeHooks';
import { string } from 'prop-types';



export default function Settings(){

const [dialogOpen , setDialogOpen]=useState(false);  
const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

const classes = styles();
const dispatch = useAppDispatch();    

const currentpage =useAppSelector(selectcurrentPage);

const isitemcopyed = useAppSelector(selectcopyItem);

const menuItems = useAppSelector(selectmenuItems);


const onClickBackIcon = () => {

    switch(currentpage) {
      case "ApplicationSettings":
      dispatch(setSidebarActiveContent(sideBarContentTypes.mainMenu));
      break;
      case "MouseControls" :
        dispatch(setcurrentPage("ApplicationSettings"));
       break; 

       default:
          break;
    }
    

}  


const handleCloseDialog = () => {
  
  setDialogOpen(false)
 
}

const handleCloseAlert = () => {
  setOpenDeleteConfirm(false)
  //dispatch(setcurrentlySelectedUserProvidedList(null));
}

const onHandleApply= () => {

 dispatch(setApplyItem());
}
const onHandleDelete= ()=> {

  setDialogOpen(false);
  setOpenDeleteConfirm(true);

  menuItems.find((item)=> {

    if(item.selected === true) {

      dispatch(deleteItem({id:item.id}));

    }
})
  
   
 }

const getHeaderLeftIcon= () => {
    return (
    <ToolTip title='Back'>
    <IconButton
    className={classes.backIcon}
    onClick={() => onClickBackIcon()}><BackIcon/> </IconButton>
    </ToolTip>
    );
  }

const getHeaderContent = () => {
    
      switch (currentpage) {
        case "ApplicationSettings":
          return (<Typography  variant='h1' noWrap>
          ApplicationSettings
        </Typography>)
        case "MouseControls":
          return (<Typography  variant='h1' noWrap>
          MouseControls
        </Typography>)
        default:
          return null;
      }

}  

const getBody = () => {

  switch(currentpage) {
    case "ApplicationSettings":
      return(<div>
      <ThemeSwitch/>
      <MouseControls/>
    </div>)
      case "MouseControls":
        return (
       <div>
         <ApplicationSettings/>
       </div>)
       default:
        return null;
  }
   
  }

  const getFooter =() => {

    const onHandleEdit=() => {
     
    dispatch(setcurrentPage("MouseControls"));

    }


    const onHandleCopy = () => {

      menuItems.find((item)=> {

           if(item.selected === true) {

            dispatch(setcopyItem(true));

           }
      })

    }

    const onHandlePaste = () => {

      if(isitemcopyed === true) {

        menuItems.find((item)=> {

          if(item.selected === true) {

            dispatch(pasteItem(item.id));

          }
     })

      } 

      else {

        dispatch(setcopyItem(false));
      }

     
    }

    switch(currentpage){

      case "ApplicationSettings" :
        return(

          <div>
            {menuItems.find((item)=>{

              return(
                item.selected === true
              )

            }) ? 

            <div>
            <div style={{paddingTop:"10px",paddingBottom:"10px"}}><MuiButton  variant="contained" color="primary" onClick={()=> onHandleApply()}>Apply</MuiButton></div>
            <div style={{display: "flex",alignItems: "center",justifyContent: "space-between",}}>

              <MuiIconButton disabled={menuItems.find((item)=>{

                if(item.type === MouseSettingsType.USER) {

                  return (
                    item.selected === true
                    )
                }

              }) ? false: true }  onClick={() => onHandleEdit()}>   
                <MuiEditIcon/>
              </MuiIconButton>
              <MuiIconButton disabled={menuItems.find((item)=>{
                return(
                  item.selected === true
                )

                }) ? false: true } onClick={() => onHandleCopy()}> 
                <MuiFileCopyIcon />
              </MuiIconButton>
              <MuiIconButton disabled={isitemcopyed ? false:true} onClick={() => onHandlePaste()}> 
                <MuiPaste/>
              </MuiIconButton>
              
              <MuiIconButton disabled={menuItems.find((item)=>{

                if(item.type === MouseSettingsType.USER) {

                  return(
                    item.selected === true
                  )
                }

                }) ?  false: true } onClick={() => setDialogOpen(!dialogOpen)}> 
                <MuiDeletIcon />
              </MuiIconButton>
              </div> 
            </div>
            
            :null}
           
            </div>
            
        )

       case "MouseControls" :
         return (

          <div style={{display: "flex",alignItems: "center",justifyContent: "space-around",height:"60px"}}>
          
          <MuiIconButton >
          <SyncIcon />
          </MuiIconButton>
          <div>
            <MuiButton variant="contained" color="primary" >Save</MuiButton>
          </div>
          </div>


         )

    }

  }

    return ( 
      <div>
        <SideBarContainer
        headerLeftIcon = { getHeaderLeftIcon() }
        headerContent={ getHeaderContent() }
        body ={ getBody() }
        footer={getFooter()}
        />
        <DialogBox 
        openDialog={dialogOpen}
        dialogBox={classes.dialogBox} 
        handleCloseDialog={handleCloseDialog} 
        onHandleDelete={onHandleDelete}
        snackBar={classes.snackBar} 
        openDeleteConfirm={openDeleteConfirm} 
        handleCloseAlert={handleCloseAlert} 
        confirmationMessage={`Are you sure want to delete custom ${  menuItems.filter((item)=> {

          if(item.selected === true) {

          return (
            item.text
          )
                    
          }
                 
        })} ?`}  
        confirmationIcon={ <MuiErrorOutlineOutlinedIcon className={classes.dialogBox}/>}
        confirmedMessage={'Deleted'}
        >
        </DialogBox>
        </div>

        
    )
}


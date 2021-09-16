import {useState,useEffect} from 'react';

//buttons

import MuiButton from '@material-ui/core/Button';

//icons 

import MuiIconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MuiAddIcon from '@material-ui/icons/Add';
import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeletIcon from '@material-ui/icons/DeleteForeverOutlined';


import {Routes} from '../../../../routes/index'
import BackIcon from'../shared/BackIcon'

//components

import MouseControl , {Source} from '../../../../components/shared/List/List';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from'../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title'
import FooterOptionsContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import FooterOption from'../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import Delete from '../components/Delete';


import {goBack,push} from 'connected-react-router/immutable';

import {
    selectmenuItems,
    setSelectedItem,
    addItemToMenuItems,
    selectcopyItem,
    selectActiveMenuId,
    setcopyItem,
    pasteItem,
    applyMouseData,
    deleteItem,
    setMenuItemEditable,
    setMenuItemEditableText,
    setControlReadOnly
} from '../../../../store/sideBar/settings';

import { useAppSelector, useAppDispatch } from '../../../../store/storeHooks';

import useStyles from'./MouseControlStyle';

export default function MouseControlPanel() {


const [deletDialogOpen , setDeletDialogOpen] = useState(false);  
  
const classes = useStyles();
const dispatch = useAppDispatch();    

  
const isitemcopyed = useAppSelector(selectcopyItem);

const menuItems = useAppSelector(selectmenuItems);

const activeUserId = useAppSelector(selectActiveMenuId);

const onClickBackIcon = () =>{
  dispatch(goBack());
}    


const getHeaderRightIcon=()=> {

  const onhandleAdd= () => {

    dispatch(addItemToMenuItems());
  
  }

  return (

    <MuiIconButton onClick={(event) => onhandleAdd()}><MuiAddIcon/></MuiIconButton>
  )


} 

const getBody=()=> {

    const items = menuItems

    const onSelectMenuList = (
      id:string,
      isSelected:boolean

    ) => {

      dispatch(setSelectedItem({id,isSelected}));

    };

    const onClickSetMenuListEditable =(id:string , edit:boolean) =>{

      dispatch(setMenuItemEditable({edit:edit,activeMenuId:id}));

    }
    const onClickUpdateListName=(id:string ,value:string)=>{

    
      dispatch(setMenuItemEditableText({text:value,activeMenuId:id}));
      
    };

    return (

      <MouseControl items={items} onSelectMenuList={onSelectMenuList} onClickSetListEditable={onClickSetMenuListEditable} onClickUpdateListName={onClickUpdateListName}></MouseControl>

    )

}


const getFooter =() => {

const onHandleApply =() => {

    dispatch(applyMouseData());
}  

const onHandleEdit=() => {
   
  dispatch(push(Routes.SETTINGS_MOUSE_CONTROLS_EDIT));

  dispatch(setControlReadOnly(activeUserId));

}

const onHandleCopy =() => {

  menuItems.find((item)=> {

        if(item.selected === true) {

        dispatch(setcopyItem(true));

        }
  })

}

const onHandlePaste =() => {

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

const onClickDelete= ()=> {


  menuItems.find((item)=> {

    if(item.selected === true) {

      dispatch(deleteItem(item.id));

    }
}) 

setDeletDialogOpen(false);
   
}

const onClickDeleteCancel =() =>{

 setDeletDialogOpen(false);

}

 return (

  <div>

  {menuItems.map((item)=>{

    if(item.selected === true && deletDialogOpen === false) {

       return (
          
           <div>
           <div style={{paddingTop:"10px",paddingBottom:"10px"}}><MuiButton  variant="contained" color="primary" onClick={()=> onHandleApply()}>Apply</MuiButton></div>
          <FooterOptionsContainer>

          {menuItems.map((item)=>{

              if(item.type === Source.USER && item.selected === true) {
                    
                return (

                  <FooterOption label={"Edit"}  icon={<MuiIconButton  onClick={() => onHandleEdit()}><MuiEditIcon/></MuiIconButton>}></FooterOption>
                
                  )
              }
              else if(item.type === Source.SYSTEM && item.selected === true){

                return (
                  <FooterOption label={"View"}  icon={<MuiIconButton  onClick={() => onHandleEdit()}><VisibilityIcon/></MuiIconButton>}></FooterOption>

                )
              }
          })}
            <FooterOption label={"Copy"} 
            icon={<MuiIconButton disabled={menuItems.find((item)=>{
                    return(
                      item.selected === true
                    )
      
                    }) ? false: true } onClick={() => onHandleCopy()}> 
                    <MuiFileCopyIcon />
            </MuiIconButton>}></FooterOption>
      
            <FooterOption label={"Paste"} 
            icon={<MuiIconButton disabled={isitemcopyed ? false:true} onClick={() => onHandlePaste()}> 
                    <MuiPaste/>
            </MuiIconButton>}></FooterOption>
      
            <FooterOption label={"Delete"} 
            icon={<MuiIconButton disabled={menuItems.find((item)=>{
      
              if(item.type === Source.USER) {
      
                return(
                  item.selected === true
                )
              }
      
            }) ?  false: true } onClick={() => setDeletDialogOpen(true)}> 
            <MuiDeletIcon />
            </MuiIconButton>}></FooterOption>
        </FooterOptionsContainer>

           </div>

       )

    }   
    else if(item.selected === true && deletDialogOpen === true){
      return (

        <div>
              <Delete onClickConfirm={onClickDelete} onClickCancel={onClickDeleteCancel}></Delete>  

        </div>  
      )
    }     
  })}
</div>)

}

return (
          <>
           <SideBarContainer
            headerLeftIcon = { <BackIcon onClick={onClickBackIcon}/> }
            headerRightIcon = {getHeaderRightIcon()}
            headerContent={ <Title text={"Mouse Controls"} group="Application Settings"/> }
            body ={ getBody() }
            footer = { getFooter() }
          />
          </>

)

}
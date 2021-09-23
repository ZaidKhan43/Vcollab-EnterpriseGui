import MuiIconButton from '@material-ui/core/IconButton';
import {goBack,push} from 'connected-react-router/immutable';
import {Routes} from "../../../../routes"
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import styles from './style'

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';

import AddIcon from "../../../icons/plus";
import { useState} from "react";

import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiCheckbox from '@material-ui/core/Checkbox';

import MuiVisibilityIcon from '@material-ui/icons/Visibility';
import MuiVisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'

import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiEditIcon from '@material-ui/icons/EditOutlined';

import {createNote, editSelect, editShow, delete2DNote} from '../../../../store/sideBar/labelSlice';
import { useSelector } from 'react-redux';

export default function Notes2D(){
    
    const classes = styles();
    const dispatch = useAppDispatch(); 
    
    const noteList= useAppSelector((state) =>  state.label.note2D.note2DList);
    const listLimit = useAppSelector((state) => state.label.note2D.note2DSettings.limit)
        
    const selectedNotes = noteList.filter(item => item.selected === true)
    
    const onClickBackIcon = () =>{
        dispatch(goBack());
    }

    const getHeaderLeftIcon= () => {
        return (
            <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
        );
    }

  const getHeaderRightIcon = () => {
    return (
        <MuiIconButton disabled={noteList.length >= listLimit} onClick={onHandleAdd}>
                   <AddIcon/>
                 </MuiIconButton> 
    )
  }

  const onHandleAdd = () => {
    dispatch(createNote());
  }

    const onHandledSelect = (id : number, value : boolean) => {
      dispatch(editSelect({id : id,value :!value}))
    }

    const onHandleShow = (id: number , value : boolean) => {
        dispatch(editShow({id : id,value :!value}))
    }

    const onHandleDeleteButton = ()=> {
      dispatch(delete2DNote())
    }
    
    const onHandleEdit = () => {
      dispatch(push(Routes.LABEL_2D_EDITS))
    }

  const getBody = () => {

    // console.log("selected",clickedValues)
    return (
      <div className={classes.scrollBar}>
        <div style={{marginLeft:"20px"}}>
           <MuiList>
               {
                   noteList.map(item => 
                    <div key={'divParent_' + item.id}>
                        <MuiListItem key={item.id} role={undefined}>
            <MuiListItemIcon>
              <MuiCheckbox edge="start" checked={item.selected} color="primary" onChange={() => onHandledSelect(item.id, item.selected)}/>
            </MuiListItemIcon>
            <MuiListItemText primary={item.name} />
            <MuiListItemSecondaryAction>
              <MuiIconButton edge="end" aria-label="comments" onClick={() => onHandleShow(item.id, item.show)}>
                {item.show ?
                <MuiVisibilityIcon/>
            :
            <MuiVisibilityOffIcon/>}
              </MuiIconButton>
            </MuiListItemSecondaryAction>
          </MuiListItem>
                    </div>
                   )
               }
            </MuiList> 
        </div>
      </div>
    )
  }


  const getFooter = () => {

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
            <OptionContainer>
            <Option label="Edit" icon={<MuiIconButton disabled={selectedNotes.length ===  1 ? false : true} onClick={onHandleEdit}>
                <MuiEditIcon/>
              </MuiIconButton>} 
            />
             <Option label="Delete" icon={<MuiIconButton disabled ={selectedNotes.length >= 1 ? false : true} style={{ }}  onClick={onHandleDeleteButton} > 
                  <MuiDeleteForeverOutlinedIcon/>
                </MuiIconButton> }
            />
            </OptionContainer>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ <Title text={"2D Notes" } group="Labels"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}

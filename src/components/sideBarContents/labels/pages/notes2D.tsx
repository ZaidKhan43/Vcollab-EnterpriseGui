import MuiIconButton from '@material-ui/core/IconButton';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
import VisibilityOptions from '../components/shared/Footer/Options/VisibilityOption';

import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiEditIcon from '@material-ui/icons/EditOutlined';
import PanToolIcon from '@material-ui/icons/PanTool';

import {createNote, editSelect, editShow, delete2DNote, windowPrefixId} from '../../../../store/sideBar/labelSlice/label2DSlice';
import { setEditMode, setHiddenState, selectActiveLayer, setActiveLayer, Layers } from '../../../../store/windowMgrSlice';

export default function Notes2D(){
    
    const classes = styles();
    const dispatch = useAppDispatch(); 
    
    const noteList= useAppSelector((state) =>  state.label2D.list);
    const listLimit = useAppSelector((state) => state.label2D.settings.limit)
    const activeLayer = useAppSelector(selectActiveLayer);
    const isPanBtnPressed = activeLayer === Layers.LABEL2D;
        
    const selectedNotes = noteList.filter(item => item.selected === true)
    
    const onClickBackIcon = () =>{
        dispatch(goBack());
    }

    const handlePanChange = () => {
      noteList.forEach(e => {
          dispatch(setEditMode({
            uid: windowPrefixId+e.id,
            isEdit: !isPanBtnPressed
          }))
      })
      dispatch(setActiveLayer(!isPanBtnPressed ? Layers.LABEL2D : Layers.VIEWER));
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
        dispatch(setHiddenState({uid:windowPrefixId+id,isHidden: value}))
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
                        <MuiListItem dense key={item.id} role={undefined}>
            <MuiListItemIcon>
              <MuiCheckbox edge="start" checked={item.selected} color="primary" onChange={() => onHandledSelect(item.id, item.selected)}/>
            </MuiListItemIcon>
            <MuiListItemText primary={item.name} />
            <MuiListItemSecondaryAction>
              <MuiIconButton size="small" edge="end" aria-label="comments" onClick={() => onHandleShow(item.id, item.show)}>
                {item.show ?
                <MuiVisibilityIcon fontSize="small" />
            :
            <MuiVisibilityOffIcon fontSize="small" />}
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
            <Option label="Visibility" 
            icon={
              <VisibilityOptions 
              disabled={selectedNotes.length < 1}
              showClick={() => {}}
              hideClick={() => {}}
              invertClick={() => {}}
              />
            }/>
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
            headerContent={ 
            <div style={{display:'flex'}}>
            <Title text={"2D Notes" } group="Labels"/> <MuiToggleButton selected={isPanBtnPressed} onChange={handlePanChange}>
            <PanToolIcon/>
            </MuiToggleButton>
            </div>
            }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}

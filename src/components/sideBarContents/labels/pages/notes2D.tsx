import MuiIconButton from '@material-ui/core/IconButton';
import {goBack} from 'connected-react-router/immutable';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import styles from './styles'

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch} from '../../../../store/storeHooks';
import MuiTypography from '@material-ui/core/Typography';
import MuiGrid from '@material-ui/core/Grid';

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
import { SignalCellularConnectedNoInternet3BarSharp } from '@material-ui/icons';

export default function Notes2D(){
    
    const classes = styles();
    const dispatch = useAppDispatch(); 
    
    const [noteList, setNoteList] = useState([
        {
            id: 0,
            name: "Note 1",
            show: true,
            select: false,
        },
        {
            id: 1,
            name: "Note 2",
            show: true,
            select: false,
        },
        {
            id: 2,
            name: "Note 3",
            show: false,
            select: false,
        },
        {
            id: 3,
            name: "Note 4",
            show:   false,
            select: true,
        },
    ])

    const selectedNotes = noteList.filter(item => item.select === true)
    
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
        <MuiIconButton onClick={onHandleAdd}>
                   <AddIcon/>
                 </MuiIconButton> 
    )
  }

  const onHandleAdd = () => {
    const newId = noteList[noteList.length - 1].id + 1;
      const newNote = {
          id: newId,
          name:`Note ${newId + 1}`,
          select: false,
          show: false,
      }

      setNoteList([...noteList, newNote])
  }

    const onHandleCheckbox = (id : number, value : boolean) => {
      const index = noteList.findIndex( item => item.id === id);
      if(index >= 0){
            let newArray = [...noteList];
            let changeItem = noteList[index];
            changeItem.select = !value;
            newArray[index] = changeItem;    
            setNoteList([...newArray])
        }
    }

    const onHandleShow = (id: number , value : boolean) => {
        const index = noteList.findIndex( item => item.id === id);
        if(index >= 0){
              let newArray = [...noteList];
              let changeItem = noteList[index];
              changeItem.show = !value;
              newArray[index] = changeItem;    
              setNoteList([...newArray])
          }
    }

    const onHandleDeleteButton = ()=> {
      const afterDeletion = noteList.filter(item => item.select !== true);
      setNoteList([...afterDeletion])
    }
    
  const getBody = () => {

    // console.log("selected",clickedValues)
    return (
      <div className={classes.scrollBar}>
        <div style={{marginLeft:"20px"}}>
           <MuiList>
               {
                   noteList.map(item => 
                    <div>
                        <MuiListItem key={item.id} role={undefined}>
            <MuiListItemIcon>
              <MuiCheckbox edge="start" checked={item.select} color="primary" onChange={() => onHandleCheckbox(item.id, item.select)}/>
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
            <Option label="Edit" icon={<MuiIconButton disabled={selectedNotes.length ===  1 ? false : true} onClick={() => alert("Edit Page")}>
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

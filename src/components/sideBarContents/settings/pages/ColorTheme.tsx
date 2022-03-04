
import CheckIcon from '@material-ui/icons/Check';
import {goBack} from 'connected-react-router/immutable';

import MuiList from '@material-ui/core/List';
import MuiListItem  from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';



import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import {selectThems,setSelectedThemeItem,setThemeApply} from '../../../../store/sideBar/settings';
import {useAppSelector, useAppDispatch} from '../../../../store/storeHooks';

import BackIcon from'../shared/BackIcon'
import Title from'../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title'


import style from './ColorThemeStyle';


export default function ColorTheme() {

const dispatch = useAppDispatch();  

const thems = useAppSelector(selectThems);


const classes = style();
    
const onClickBackIcon = () =>{
  dispatch(goBack());
} 

const getLeftIcon =()=>{

  return (
     <BackIcon onClick={onClickBackIcon}/>

  )
}

const getHeaderContent=()=>{

  return (

     <Title text={"Color Theme"} group="Application Settings"/>
  )

}

const getBody=()=>{

const handleThemeItemClick = (
  id:string,
  isSelected:boolean

) => {

  dispatch(setSelectedThemeItem({id,isSelected}));
  dispatch(setThemeApply());

};

  return (

        <div>
          <MuiList>
                    
          {thems.map((item)=>{

            return(

              <MuiListItem button  onClick={(event)=>handleThemeItemClick(item.id,!item.selected)} selected={item.selected}>

                   <MuiListItemText primary={item.name}></MuiListItemText>
                   { item.applied == true  ? <ListItemSecondaryAction><CheckIcon/></ListItemSecondaryAction>:null}

              </MuiListItem>
            )


          })} 

          </MuiList>

        </div>

  )
}

  return (

    <SideBarContainer
    headerContent={  getHeaderContent()}
    body ={ getBody() }
  />

  )
}

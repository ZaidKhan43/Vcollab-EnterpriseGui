import {useState} from 'react'

import MuiGrid from'@material-ui/core/Grid';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
//import MuiButton from '@material-ui/core/Button';


//icons

import MuiRemoveIcon from '@material-ui/icons/Remove';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AddAlertIcon from '@material-ui/icons/AddAlert';

import { createStyles, withStyles, makeStyles,Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import {useAppSelector ,useAppDispatch} from '../../../../../store/storeHooks';

import {
    selectactions,
    selectcontrols,
    mouseControlsList,
    setControls,
    setActions,
    deleteItemToMouseControlList

} from '../../../../../store/sideBar/settings';

const CustomizedInput = withStyles((theme: Theme) =>
    createStyles({

      input: {
        border:'none'
      },

   
    }),
  )(InputBase);   


  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
        backgroundColor: 'white',
      }
  }),
)

export default  function Input(props:mouseControlsList) {
    

const dispatch = useAppDispatch();
const controls = useAppSelector(selectcontrols);
const actions  = useAppSelector(selectactions);    

const classes = useStyles();


const [leftItemOpen, setleftItemOpen] = useState(false);

const [RightItemOpen, setRightItemOpen] = useState(false);

 const createActionsIcon =(iconName:any)=> {

    switch(iconName) {

        case 'Pan':
        
         return <AcUnitIcon/>;

        case 'Rotate':

         return <AccessAlarmIcon/>;
        
        case 'Zoom in':

         return <AccessTimeIcon/>;

        case 'Zoom out' :
            
          return <AccountBalanceIcon/>;

        case 'Highlight' :
            
          return <AddAlertIcon/>;

        default:
        
        return null; 
    }

 }

 const handleControlChange = (event: React.ChangeEvent<{ value: unknown }>,id:number) => {
    dispatch(setControls({text:event.target.value as string,id}));

 };

 const handleActionsChange = (event: React.ChangeEvent<{ value: unknown }>,id:number) => {
    dispatch(setActions({text:event.target.value as string,id}));

 };
 
const handleMouseControlListDelete = (id:number)=> {


dispatch(deleteItemToMouseControlList(id));

} 


const handleLeftClose = () => {
    setleftItemOpen(false);
};

const handleLeftOpen = () => {
    setleftItemOpen(true);
};

const handleRightClose = () => {
    setRightItemOpen(false);
};

const handleRightOpen = () => {
    setRightItemOpen(true);
};

const EmpetyDiv=() => {

    return(

        <div></div>
    )
}

    return (

        <>
      <MuiList >      
        <MuiListItem button key={props.id} >  
        <MuiGrid container spacing={8}
>
            <MuiGrid item xs={6} >
                    <MuiSelect
                    open={leftItemOpen}
                    onClose={handleLeftClose}
                    onOpen={handleLeftOpen}
                    input={<CustomizedInput />}
                    value={props.column1}
                    onChange={(e)=>handleControlChange(e,props.id)}
                    IconComponent={EmpetyDiv}
                    

                    >
                        {controls?.map((item)=>
                       
                        <MuiMenuItem value={item.text} 
                        classes={{
                            selected:classes.selected
                           }}
                        >{item.text}</MuiMenuItem>
                        )}

                    </MuiSelect>
            </MuiGrid>

            <MuiGrid item xs={3} style={{textAlign:'left'}} >

                    <MuiSelect
                    open={RightItemOpen}
                    onClose={handleRightClose}
                    onOpen={handleRightOpen}
                    input={<CustomizedInput />}
                    value={props.column2}
                    renderValue ={(value)=> createActionsIcon(value) }
                    onChange={(e)=>handleActionsChange(e,props.id)}
                    IconComponent={EmpetyDiv}
                    >
                        {actions?.map((item)=>

                            <MuiMenuItem  value={item.text}>
                                {createActionsIcon(item.text)}
                                {item.text}
                            </MuiMenuItem>
                        
                        )}

                    </MuiSelect>

            </MuiGrid>

            <MuiGrid item xs={3}>
                 <div onClick={()=>handleMouseControlListDelete(props.id)}><MuiRemoveIcon></MuiRemoveIcon></div>
            </MuiGrid>

        </MuiGrid>
        </MuiListItem>
        </MuiList>
        </>

    )


}
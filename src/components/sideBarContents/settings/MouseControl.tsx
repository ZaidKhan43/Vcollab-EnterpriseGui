import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiAddIcon from '@material-ui/icons/Add';
import MuiRadio from '@material-ui/core/Radio';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';



import {
    MenuItem,
    MouseSettingsType,
    selectmenuItems,
    setSelectedItem,
    addItemToMenuItems,
    setcopyItem
} from '../../../store/sideBar/settings';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';

import  React, {useState}  from 'react';


import useStyles from'./MouseControlsStyle';
import { number, string } from 'prop-types';





export default function MouseControlsPanelList() {

    const dispatch = useAppDispatch();
    const classes = useStyles();


    const menuItems = useAppSelector(selectmenuItems);

    const handleMenuItemClick = (
        id:string,
        isSelected:boolean

      ) => {

        dispatch(setSelectedItem({id,isSelected}));

      };



    const onhandleAdd= () => {

      dispatch(addItemToMenuItems());

    }


    return (

        <div className={classes.rootDiv}>
            <MuiAccordion defaultExpanded={true}>
                <MuiAccordionSummary
                expandIcon={<MuiExpandMoreIcon/>}

                >
                <MuiTypography >Mouse Controls</MuiTypography>
                </MuiAccordionSummary>
                
                <List component="div" disablePadding >  
                <ListItemText classes={{primary:classes.MuiListItemText}} primary="System Provided" />
                
                {menuItems?.map((item:MenuItem,menuIndex:number) => ( 
               
                  item.type === MouseSettingsType.SYSTEM ?
                       
                   (<ListItem button dense={true}
                        onClick={(event)=>handleMenuItemClick(item.id,!item.selected)}
                        selected={item.selected}>

                        <ListItemText classes={{primary:classes.MuiListItemTextinset}} inset primary={item.text} />
                        { item.applied == true  ? <ListItemSecondaryAction><CheckIcon/></ListItemSecondaryAction>:null}
                     
                    </ListItem>):null
                        
                  ))}

                <ListItem > 
                <ListItemText classes={{primary:classes.userProvidedText}} primary="User Provided" ></ListItemText>
                <ListItemSecondaryAction><MuiIconButton onClick={(event) => onhandleAdd()}><MuiAddIcon/></MuiIconButton></ListItemSecondaryAction>
                </ListItem> 

                 {menuItems?.map((item:MenuItem,menuIndex:number)=>(


                     item.type === MouseSettingsType.USER ?

                    (<ListItem button dense={true} 
                    onClick={(event) => handleMenuItemClick(item.id,!item.selected)}
                    selected={ item.selected }>
                    <ListItemText classes={{primary:classes.MuiListItemTextinset}} inset primary={item.text} />
                    { item.applied == true  ? <ListItemSecondaryAction><CheckIcon/></ListItemSecondaryAction>:null}
                    </ListItem>):null 
                 ))} 
                </List>

            </MuiAccordion>

            
        </div>
    )


}


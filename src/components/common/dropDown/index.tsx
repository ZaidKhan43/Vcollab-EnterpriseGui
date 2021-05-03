import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Popover,Popper } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';


import {Icon} from '@material-ui/core';

import styles from './style';

import React, { useState, useEffect } from "react";
import { SettingsRemoteTwoTone } from "@material-ui/icons";

export default function DropDown (props : any) {
  const [openAlert, setOpenAlert] = useState<any>(false);
  const [itemImage, setItemImage] = useState<any>(null)
  const [itemMessage, setItemMessage] = useState<any>(null);

  const classes = styles();

  const showAlert = (item: any) => {
    setItemImage(item.icon);
    setItemMessage(`${item.title} is applied`)
    setOpenAlert(true);     
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  return (
    <div>
      <Popper className={classes.popper} disablePortal id="display-menu" open={props.open} anchorEl={props.anchorEl} >
        <MenuList id="simple-menu"  >
          {props.items.map((item :any,index : any)=>(
            <div>
              <MenuItem className={classes.icon}  key={index} onClick={() => showAlert(item)} disabled = {item.disabled === true}>
                <Icon><item.icon/></Icon>
                <Typography  className={classes.listItem} variant="h2">{item.title} </Typography>
                {props.size ?  <Typography  className={classes.listItemSize} variant="subtitle1">0 B</Typography> : null}
              </MenuItem>
            </div> 
          ))}
        </MenuList>
      </Popper>   
      
      <Snackbar className={classes.snackBar}
        anchorOrigin={{vertical:"top", horizontal:'center'}}
        autoHideDuration={2000}
        open={openAlert}
        onClose={handleCloseAlert} >
          <Alert icon={false}>
          <span>
          {/* <Icon>{itemImage}</Icon> */}
            <span>{itemMessage} </span>
          </span>
          </Alert>
        </Snackbar>
    </div>
  )
}
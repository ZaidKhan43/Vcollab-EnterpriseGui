import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import clsx from 'clsx';
import IconButton from '../../common/iconbutton';
import React, { useState, useEffect } from "react";

//import Capture from '../../../assets/images/capture.svg';
import Displaymodes from '../../../assets/images/displaymodes.svg';
import Fitview from '../../../assets/images/fitview.svg';
import Fullscreen from '../../../assets/images/fullscreen.svg';
import FullscreenClose from '../../../assets/images/fullscreen_exit.svg';
import Hamburger from '../../../assets/images/hamburger.svg';
import More from '../../../assets/images/more.svg';
import {selectFullscreenStatus,selectSidebarVisibility, setFullscreenState, setSidebarVisibility } from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';

import Shaded from "../../../assets/views/shaded.svg";
import ShadedMesh from "../../../assets/views/shadedMesh.svg";
import BoundingBox from "../../../assets/views/boundingBox.svg";
import HiddenLine from "../../../assets/views/hiddenLine.svg";
import Wireframe from "../../../assets/views/wireframe.svg";
import Point from "../../../assets/views/point.svg";
import Transparent from "../../../assets/views/transparent.svg";

import Capture from "../../../assets/images/capture.svg";
import Clock from "../../../assets/images/clock.svg";

import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Popover,Popper } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DropDown from '../../../components/common/dropDown';

import  styles from './style';

function AppBar() {
    
    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const dispatch = useAppDispatch();  

    const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const [displayAnchorEl, setDisplayAnchorEl] = useState(null);
  const [clickedMenu, setClickedMenu] = useState<any>(null);

  const displayMenuItems = [
    { title: "Bounding Box", icon: BoundingBox,id:"DM_1", disabled : false },
    { title: "Feature Edge", icon: Shaded,id:"DM_8", disabled : true},
    { title: "Simplified Mesh", icon: Shaded,id:"DM_9", disabled : true},
    { title: "Shaded", icon: Shaded,id:"DM_5", disabled : false},
    { title: "Wireframe", icon: Wireframe,id:"DM_3", disabled : false},
    { title: "Shaded Mesh", icon: ShadedMesh,id:"DM_6", disabled : false},  
    { title: "Hidden Line", icon: HiddenLine,id:"DM_4", disabled : false},
    { title: "Transparent", icon: Transparent,id:"DM_7", disabled : false},
    { title: "Point", icon: Point,id:"DM_2", disabled : false},   
  ];

  const moreMenuItems = [
    { title: "Status", icon: Clock },
    { title: "Capture", icon: Capture },
  ];

    const OnClickFullscreen = function(){
      dispatch(setFullscreenState(!isFullscreenEnabled));
    }

    const onClickHamburger = function(){
      dispatch(setSidebarVisibility(!isSidebarVisible));
    }  

    const handleClick = (e: any, name : any) => {
      if(name === "display"){
        setClickedMenu("display");
      setDisplayAnchorEl(displayAnchorEl ? null : e.currentTarget)
      setMoreAnchorEl(null);
      
      }
      
      else if (name === "more"){
        setClickedMenu("more");
        setMoreAnchorEl(moreAnchorEl ? null : e.currentTarget)
        setDisplayAnchorEl(null);
      }
      
    }

    // const id = open ? 'spring-popper' : undefined;

    return (
        <MuiAppBar 
          className = { clsx( classes.appBar , {[classes.appBarwithSideBar]: isSidebarVisible}) }
          position='fixed'
        >
        <MuiToolbar className={classes.toolBar}>

          <div className={classes.toolBarLeftContent}>            
            <div onClick ={ onClickHamburger }
            className={ clsx( classes.divIcon, classes.hamburgerIcon, { [classes.hamburgerIconHidden]: isSidebarVisible }) }>
              <IconButton edge={false} src={Hamburger} />
            </div>
            
            <div className={clsx( classes.leftTitle, { [classes.leftTitleHidden]: isSidebarVisible })}>
              <MuiTypography variant='h1' noWrap>
                ModelName 
              </MuiTypography>
            </div>

          </div>
     
          <div className={classes.toolBarRightContent}>
              <div className={classes.divIcon} >
                  <IconButton edge={false} src={Displaymodes} onClick={(e : any) => handleClick(e, "display") }/>
              </div>
              <div className={classes.divIcon} >
                  <IconButton edge={false} src={Fitview} />
              </div>
              <div className={classes.divIcon} >
                  <IconButton edge={false} src={More}  onClick={(e : any) => handleClick(e, "more") } />
              </div>
             
              <div className={classes.divIcon} onClick={ OnClickFullscreen }>
                {(isFullscreenEnabled ?
                  <IconButton edge={false} src={FullscreenClose } /> 
                   :
                  <IconButton edge={false} src={Fullscreen} />
                )}
              </div>
              <ClickAwayListener onClickAway={() => {  
          if(clickedMenu === "more" || clickedMenu === "display")
            setClickedMenu(null);
          else{
            setDisplayAnchorEl(null);
            setMoreAnchorEl(null);
          }
          }}>
          <div  className={classes.toolBarRightContent}>

          <DropDown open={Boolean(displayAnchorEl)} ancgorEl={displayAnchorEl} items={displayMenuItems} style={{backgroundColor: "#171727",opacity:"70%", borderRadius: "0px",marginTop: "58px",marginLeft:"80%",boxShadow: "none",}} size={true}/>
          <DropDown open={Boolean(moreAnchorEl)} ancgorEl={moreAnchorEl} items={moreMenuItems}  style={{backgroundColor: "#171727",opacity:"70%", borderRadius: "0px",marginTop: "58px",marginLeft:"85%",boxShadow: "none",}} size={false}/>
                  </div>
                  </ClickAwayListener>
          </div>
         
        </MuiToolbar>     
      </MuiAppBar>
    );
}

export default AppBar;

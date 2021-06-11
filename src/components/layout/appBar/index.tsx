import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import clsx from 'clsx';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTooltip from '@material-ui/core/Tooltip';

import Displaymodes from '../../icons/displaymodes';
import Fitview from '../../icons/fitview';
import Fullscreen from '../../icons/fullscreen';
import FullscreenClose from '../../icons/fullscreen_exit';
import Hamburger from '../../icons/hamburger';
import More from '../../icons/more';

import { selectModelName, selectFullscreenStatus,selectSidebarVisibility,selectDarkModeEnable, selectActiveViewerID,setFullscreenState, setSidebarVisibility , setDarkModeEnable} from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';
//import { popupMenuContentTypes } from '../../../config';

import * as viewerAPIProxy from '../../../backend/viewerAPIProxy';

import Shaded from "../../icons/shaded";
import ShadedMesh from "../../icons/shadedMesh";
import BoundingBox from "../../icons/boundingBox";
import HiddenLine from "../../icons/hiddenLine";
import Wireframe from "../../icons/wireframe";
import Point from "../../icons/point";
import Transparent from "../../icons/transparent";

import MuiCameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import MuiUpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';

import MuiClickAwayListener from '@material-ui/core/ClickAwayListener';
import DropDown from '../../../components/shared/dropDown';
//toggle button
import MuiSwitch from "@material-ui/core/Switch";

import {useState} from "react";

import MuiToggleButton from '@material-ui/lab/ToggleButton';
import MuiRoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { flagUpdate } from '../../../store/probeSlice';

import  styles from './style';

function AppBar() {
    
    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const isDarkModeEnable = useAppSelector(selectDarkModeEnable);
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const modelName = useAppSelector(selectModelName);
    const dispatch = useAppDispatch();  

    const [moreAnchorEl, setMoreAnchorEl] = useState(null);
    const [displayAnchorEl, setDisplayAnchorEl] = useState(null);
    const [clickedMenu, setClickedMenu] = useState<any>(null);
    
    const showProbeFlag = useAppSelector((state) => state.probe.showFlag)

    const displayMenuItems = [
      { title: "Bounding Box", icon: BoundingBox,id:"DM_1", disabled : false },
      { title: "Feature Edge", icon: Shaded,id:"DM_8", disabled : true},
      { title: "Simplified Mesh", icon: Shaded,id:"DM_9", disabled : true},
      { title: "Shaded", icon: Shaded,id:"DM_5", disabled : false},
      { title: "Wireframe", icon: Wireframe,id:"DM_3", disabled : false},
      { title: "Shaded Mesh", icon: ShadedMesh,id:"DM_6", disabled : false},  
      { title: "Hidden Line", icon: HiddenLine,id:"DM_4", disabled : false},
      { title: "Transparant", icon: Transparent,id:"DM_7", disabled : false},
      { title: "Point", icon: Point,id:"DM_2", disabled : false},   
    ];

    const moreMenuItems = [
      { title: "Status", icon: MuiUpdateOutlinedIcon },
      { title: "Capture", icon: MuiCameraAltOutlinedIcon },
    ];

    const OnClickFullscreen = function(){
      dispatch(setFullscreenState(!isFullscreenEnabled));
    }
    /*
    const OnClickDisplaymode = function(){
      dispatch(setPopupMenuActiveContent(popupMenuContentTypes.displayModes));
    }
    const OnClickMore= function(){
      dispatch(setPopupMenuActiveContent(popupMenuContentTypes.more));
    }
    */
    const OnClickFitview = function(){
      viewerAPIProxy.fitView(activeViewerID);
    }

    const onClickHamburger = function(){
      dispatch(setSidebarVisibility(!isSidebarVisible));
    }  
  
// Toggleing theme

    const handleThemeChange = function() {
      dispatch(setDarkModeEnable (!isDarkModeEnable));
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

    const handleProbeFlag = function(){
      dispatch(flagUpdate());
    }

    return (
        <MuiAppBar 
          className = { clsx( classes.appBar , {[classes.appBarwithSideBar]: isSidebarVisible}) }
          position='fixed'
        >
        <MuiToolbar className={classes.toolBar}>

          <div className={classes.toolBarLeftContent}>            
            <div onClick ={ onClickHamburger }
            className={ clsx( classes.divIcon, classes.hamburgerIcon, { [classes.hamburgerIconHidden]: isSidebarVisible }) }>
              <MuiIconButton> <Hamburger /></MuiIconButton> 
            </div>
            
            <div className={clsx( classes.leftTitle, { [classes.leftTitleHidden]: isSidebarVisible })}>
              <MuiTooltip title={ modelName } aria-label="ModelName">
                <MuiTypography variant='h1' style ={{ width : '150px', display: 'inline-block' }} noWrap>
                  { modelName } 
                </MuiTypography>         
              </MuiTooltip>
            </div>
          </div>
     
          <div className={classes.toolBarRightContent}>
          
            <div className={classes.divIcon}  >
               <MuiIconButton> <MuiSwitch checked={isDarkModeEnable} onChange={handleThemeChange} /> </MuiIconButton>
            </div>
              <MuiToggleButton
                className={classes.showProbeFlagButton}
                value="check"
                selected={showProbeFlag}
                onChange={handleProbeFlag}>
                <MuiRoomOutlinedIcon style={{fontSize:"15px"}}/>
                </MuiToggleButton>
            <div>

            </div>

              <div className={classes.divIcon}  >
                    <MuiIconButton onClick={(e) => handleClick(e,"display") }><Displaymodes /></MuiIconButton> 
              </div>
              <div className={classes.divIcon} onClick={ OnClickFitview }>
                 <MuiIconButton><Fitview/></MuiIconButton>
              </div>
              <div className={classes.divIcon} >
                  <MuiIconButton onClick={(e) => handleClick(e,"more") }><More /></MuiIconButton>
              </div>
             
              <div className={classes.divIcon} onClick={ OnClickFullscreen }>
                {(isFullscreenEnabled ?
                  <MuiIconButton><FullscreenClose  /></MuiIconButton>  :
                 <MuiIconButton><Fullscreen /> </MuiIconButton> 
                )}
              </div>
              <MuiClickAwayListener onClickAway={() => {  
                if(clickedMenu === "more" || clickedMenu === "display")
                  setClickedMenu(null);
                else{
                  setDisplayAnchorEl(null);
                  setMoreAnchorEl(null);
                }
              }}>
                <div>
                  <DropDown  open={Boolean(displayAnchorEl)} ancgorEl={displayAnchorEl} items={displayMenuItems}  size={true}/>
                  <DropDown open={Boolean(moreAnchorEl)} ancgorEl={moreAnchorEl} items={moreMenuItems}  style={{backgroundColor: "#171727",opacity:"70%", borderRadius: "0px",marginTop: "58px",marginLeft:"85%",boxShadow: "none",}} size={false}/>
                </div>
         </MuiClickAwayListener>
          </div>
          
        
         
        </MuiToolbar>     
      </MuiAppBar>
    );
}

export default AppBar;

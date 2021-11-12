import { useState } from "react";
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTooltip from '@material-ui/core/Tooltip';
import MuiClickAwayListener from '@material-ui/core/ClickAwayListener';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
//import MuiSwitch from "@material-ui/core/Switch";

import clsx from 'clsx';
import Displaymodes from '../../icons/displaymodes';
import Fitview from '../../icons/fitview';
import Fullscreen from '../../icons/fullscreen';
import PickAndMoveIcon from '@material-ui/icons/ThreeDRotation';
import ProbeLabelIcon from "@material-ui/icons/Room";
import ProbeIcon from '@material-ui/icons/Colorize'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import FullscreenClose from '../../icons/fullscreen_exit';
import Hamburger from '../../icons/hamburger';
import More from '../../icons/more';

import { selectModelName, selectFullscreenStatus,selectSidebarVisibility, 
  selectActiveViewerID,setFullscreenState, setSidebarVisibility ,  
  setPopupMenuActiveContent, setPopupMenuDisplayMode , setInteractionModeAsync, InteractionMode, selectInteractionMode } from '../../../store/appSlice';
import {enableProbe,selectProbeEnabled} from '../../../store/probeSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';


import * as viewerAPIProxy from '../../../backend/viewerAPIProxy';
import { popupMenuContentTypes } from '../../../config';
import PopupMenu from '../popupMenu';
import  styles from './style';

function AppBar() {
    
    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const isContinousProbeEnabled = useAppSelector(selectProbeEnabled);
    const interactionMode = useAppSelector(selectInteractionMode); 
    const isPinLabel3DEnabled = interactionMode === InteractionMode.PROBE_LABEL; 
    const isPickAndMoveEnabled = interactionMode === InteractionMode.PICK_AND_MOVE;
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const modelName = useAppSelector(selectModelName);
    const dispatch = useAppDispatch();  

    const [anchorEl, setAnchorEl] = useState(null);
    const [clickedMenu, setClickedMenu] = useState<string>(popupMenuContentTypes.none);
    const popupMenuDisplayMode = useAppSelector(state => state.app.popupMenuActiveContent);
    
    const OnClickFullscreen = function(){
      dispatch(setFullscreenState(!isFullscreenEnabled));
    }

    const OnClickPickAndMove = function(){
        dispatch(setInteractionModeAsync( !isPickAndMoveEnabled ? InteractionMode.PICK_AND_MOVE : InteractionMode.DEFAULT));

    }

    const resetPickAndMove = () => {
        viewerAPIProxy.resetPickAndMove(activeViewerID);
    }

    const onClickPin = () => {
      dispatch(setInteractionModeAsync( !isPinLabel3DEnabled ? InteractionMode.PROBE_LABEL : InteractionMode.DEFAULT));
      
    }
    const onClickProbe = () => {
      dispatch(setInteractionModeAsync( !isContinousProbeEnabled ? InteractionMode.CONTINUOUS_PROBE : InteractionMode.DEFAULT));
    }

    const OnClickFitview = function(){
      viewerAPIProxy.fitView(activeViewerID);
    }

    const onClickHamburger = function(){
      dispatch(setSidebarVisibility(!isSidebarVisible));
    } 

    const OnClickAwayMenuPopup = function(){
      if(clickedMenu === popupMenuContentTypes.displayModes || clickedMenu === popupMenuContentTypes.more)
        setClickedMenu(popupMenuContentTypes.none);
      else{
        dispatch(setPopupMenuActiveContent(popupMenuContentTypes.none)); 
      }
    }

    const OnClickMenuIcon= (evt: any, selectedMode : string) => {
      if(selectedMode === popupMenuContentTypes.displayModes)
      {
        viewerAPIProxy.getDisplayModes(activeViewerID, []) 
          .then((response : any)=>{
            dispatch(setPopupMenuDisplayMode(response));
          });         
      }

      // Inactive the dropdown while click the active dropdown menu button

      if(selectedMode !== popupMenuContentTypes.none && selectedMode === popupMenuDisplayMode){
        setClickedMenu(popupMenuContentTypes.none);
        // setAnchorEl( evt.currentTarget );
        dispatch(setPopupMenuActiveContent(popupMenuContentTypes.none)); 
      }

      else{
      setClickedMenu(selectedMode);
      setAnchorEl( evt.currentTarget );
      dispatch(setPopupMenuActiveContent(selectedMode)); 
      }
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
          
            <div className={classes.divIcon} onClick={ onClickPin}>
              <MuiToggleButton value='probe label' selected={isPinLabel3DEnabled}>
                  <ProbeLabelIcon></ProbeLabelIcon>
              </MuiToggleButton>
            </div>
            <div className={classes.divIcon} onClick={ OnClickPickAndMove } >
                  <MuiToggleButton value='pick & move' selected={ isPickAndMoveEnabled } ><PickAndMoveIcon /></MuiToggleButton> 
            </div>
            
            <div className={classes.divIcon} onClick={ resetPickAndMove } >
                  <MuiIconButton><RotateLeftIcon /></MuiIconButton> 
            </div>

            <div className={classes.divIcon} onClick={ onClickProbe } >
            <MuiToggleButton value='cont probe' selected={ isContinousProbeEnabled } ><ProbeIcon /></MuiToggleButton> 
            </div>

            <div className={classes.divIcon}  onClick={(evt) => OnClickMenuIcon(evt, popupMenuContentTypes.displayModes) }>
              <MuiIconButton><Displaymodes /></MuiIconButton> 
            </div>
            
            <div className={classes.divIcon} onClick={ OnClickFitview }>
              <MuiIconButton><Fitview/></MuiIconButton>
            </div>
            
            <div className={classes.divIcon} onClick={(evt) => OnClickMenuIcon(evt,  popupMenuContentTypes.more) }>
              <MuiIconButton><More /></MuiIconButton>
            </div>
             
            <div className={classes.divIcon} onClick={ OnClickFullscreen }>
              {(isFullscreenEnabled ?
                <MuiIconButton><FullscreenClose  /></MuiIconButton>  :
                <MuiIconButton><Fullscreen /> </MuiIconButton> 
              )}
            </div>

          </div>
        
        </MuiToolbar>     

        <MuiClickAwayListener onClickAway= {() => OnClickAwayMenuPopup() }>
            <div>
              <PopupMenu anchorEl={ anchorEl }/>
            </div> 
        </MuiClickAwayListener>
      </MuiAppBar>
    );
}

export default AppBar;

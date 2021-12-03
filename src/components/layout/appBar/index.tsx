import { useEffect, useState } from "react";
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTooltip from '@material-ui/core/Tooltip';
import MuiClickAwayListener from '@material-ui/core/ClickAwayListener';
import MuiToggleButton from '@material-ui/lab/ToggleButton';


import clsx from 'clsx';
import Displaymodes from '../../icons/displaymodes';
import Fitview from '../../icons/fitview';
import Fullscreen from '../../icons/fullscreen';
import MeasureP2PIcon from '@material-ui/icons/Straighten';
import MeasureArcIcon from '@material-ui/icons/Looks';
import PickAndMoveIcon from '@material-ui/icons/ThreeDRotation';
import ProbeLabelIcon from "@material-ui/icons/Room";
import ProbeIcon from '@material-ui/icons/Colorize'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import FullscreenClose from '../../icons/fullscreen_exit';
import Hamburger from '../../icons/hamburger';
import More from '../../icons/more';

import { selectModelName, selectFullscreenStatus,selectSidebarVisibility, 
  selectActiveViewerID,setFullscreenState, setSidebarVisibility ,  
  setPopupMenuActiveContent, setPopupMenuDisplayMode , setInteractionModeAsync, selectInteractionMode } from '../../../store/appSlice';
import {enableProbe,selectProbeEnabled} from '../../../store/probeSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';


import * as viewerAPIProxy from '../../../backend/viewerAPIProxy';
import { InteractionMode } from '../../../backend/viewerAPIProxy';
import { popupMenuContentTypes } from '../../../config';
import PopupMenu from '../popupMenu';
import  styles from './style';

function AppBar() {
    
    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const interactionMode = useAppSelector(selectInteractionMode); 
    const isMeasureP2PEnabled = interactionMode === InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT;
    const isMeasureArcEnabled = interactionMode === InteractionMode.LABEL_MEASUREMENT_3PT_ARC;
    const isContinousProbeEnabled = interactionMode === InteractionMode.CONTINUOUS_PROBE;
    const isPinLabel3DEnabled = interactionMode === InteractionMode.LABEL3D_POINT; 
    const isPickAndMoveEnabled = interactionMode === InteractionMode.PICK_AND_MOVE;
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const modelName = useAppSelector(selectModelName);
    const dispatch = useAppDispatch();  

    const [anchorEl, setAnchorEl] = useState(null);
    const [clickedMenu, setClickedMenu] = useState<string>(popupMenuContentTypes.none);
    const popupMenuDisplayMode = useAppSelector(state => state.app.popupMenuActiveContent);
    
    const onClickFullscreen = () => {
      dispatch(setFullscreenState(!isFullscreenEnabled));
    }

    const onClickMeasureP2P = () => {
      viewerAPIProxy.setInteractionMode( activeViewerID,!isMeasureP2PEnabled ? InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT : InteractionMode.DEFAULT);
    }

    const onClickMeasureArc = () => {
      viewerAPIProxy.setInteractionMode(activeViewerID,!isMeasureArcEnabled ? InteractionMode.LABEL_MEASUREMENT_3PT_ARC : InteractionMode.DEFAULT);
    }

    const onClickPickAndMove = () => {
        viewerAPIProxy.setInteractionMode( activeViewerID,!isPickAndMoveEnabled ? InteractionMode.PICK_AND_MOVE : InteractionMode.DEFAULT);
    }

    const resetPickAndMove = () => {
        viewerAPIProxy.resetPickAndMove(activeViewerID);
    }

    const onClickPin = () => {
      viewerAPIProxy.setInteractionMode( activeViewerID, !isPinLabel3DEnabled ? InteractionMode.LABEL3D_POINT : InteractionMode.DEFAULT);
    }

    const onClickProbe = () => {
      viewerAPIProxy.setInteractionMode( activeViewerID, !isContinousProbeEnabled ? InteractionMode.CONTINUOUS_PROBE : InteractionMode.DEFAULT);
    }

    const onClickFitview = function(){
      viewerAPIProxy.fitView(activeViewerID);
    }

    const onClickHamburger = function(){
      dispatch(setSidebarVisibility(!isSidebarVisible));
    } 

    const onClickAwayMenuPopup = function(){
      if(clickedMenu === popupMenuContentTypes.displayModes || clickedMenu === popupMenuContentTypes.more)
        setClickedMenu(popupMenuContentTypes.none);
      else{
        dispatch(setPopupMenuActiveContent(popupMenuContentTypes.none)); 
      }
    }

    const onClickMenuIcon= (evt: any, selectedMode : string) => {
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
            <div className={classes.divIcon} onClick={ onClickMeasureP2P}>
              <MuiToggleButton value='measure p2p label' selected={isMeasureP2PEnabled}>
                  <MeasureP2PIcon></MeasureP2PIcon>
              </MuiToggleButton>
            </div>
            <div className={classes.divIcon} onClick={ onClickMeasureArc}>
              <MuiToggleButton value='measure arc label' selected={isMeasureArcEnabled}>
                  <MeasureArcIcon></MeasureArcIcon>
              </MuiToggleButton>
            </div>
            <div className={classes.divIcon} onClick={ onClickPin}>
              <MuiToggleButton value='probe label' selected={isPinLabel3DEnabled}>
                  <ProbeLabelIcon></ProbeLabelIcon>
              </MuiToggleButton>
            </div>
            <div className={classes.divIcon} onClick={ onClickPickAndMove } >
                  <MuiToggleButton value='pick & move' selected={ isPickAndMoveEnabled } ><PickAndMoveIcon /></MuiToggleButton> 
            </div>
            
            <div className={classes.divIcon} onClick={ resetPickAndMove } >
                  <MuiIconButton><RotateLeftIcon /></MuiIconButton> 
            </div>

            <div className={classes.divIcon} onClick={ onClickProbe } >
            <MuiToggleButton value='cont probe' selected={ isContinousProbeEnabled } ><ProbeIcon /></MuiToggleButton> 
            </div>

            <div className={classes.divIcon}  onClick={(evt) => onClickMenuIcon(evt, popupMenuContentTypes.displayModes) }>
              <MuiIconButton><Displaymodes /></MuiIconButton> 
            </div>
            
            <div className={classes.divIcon} onClick={ onClickFitview }>
              <MuiIconButton><Fitview/></MuiIconButton>
            </div>
            
            <div className={classes.divIcon} onClick={(evt) => onClickMenuIcon(evt,  popupMenuContentTypes.more) }>
              <MuiIconButton><More /></MuiIconButton>
            </div>
             
            <div className={classes.divIcon} onClick={ onClickFullscreen }>
              {(isFullscreenEnabled ?
                <MuiIconButton><FullscreenClose  /></MuiIconButton>  :
                <MuiIconButton><Fullscreen /> </MuiIconButton> 
              )}
            </div>

          </div>
        
        </MuiToolbar>     

        <MuiClickAwayListener onClickAway= {() => onClickAwayMenuPopup() }>
            <div>
              <PopupMenu anchorEl={ anchorEl }/>
            </div> 
        </MuiClickAwayListener>
      </MuiAppBar>
    );
}

export default AppBar;

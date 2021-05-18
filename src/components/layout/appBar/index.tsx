import { useState } from "react";
import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTooltip from '@material-ui/core/Tooltip';
import MuiClickAwayListener from '@material-ui/core/ClickAwayListener';
import MuiSwitch from "@material-ui/core/Switch";
import clsx from 'clsx';

import Displaymodes from '../../icons/displaymodes';
import Fitview from '../../icons/fitview';
import Fullscreen from '../../icons/fullscreen';
import FullscreenClose from '../../icons/fullscreen_exit';
import Hamburger from '../../icons/hamburger';
import More from '../../icons/more';

import { selectModelName, selectFullscreenStatus,selectSidebarVisibility,selectDarkModeEnable, 
  selectActiveViewerID,setFullscreenState, setSidebarVisibility , setDarkModeEnable, 
  setPopupMenuActiveContent, setPopupMenuDisplayMode } from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';

import * as viewerAPIProxy from '../../../backend/viewerAPIProxy';
import { popupMenuContentTypes } from '../../../config';
import PopupMenu from '../popupMenu';
import  styles from './style';

function AppBar() {
    
    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const isDarkModeEnable = useAppSelector(selectDarkModeEnable);
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const modelName = useAppSelector(selectModelName);
    const dispatch = useAppDispatch();  

    const [anchorEl, setAnchorEl] = useState(null);
    const [clickedMenu, setClickedMenu] = useState<string>(popupMenuContentTypes.none);
  
    const OnClickFullscreen = function(){
      dispatch(setFullscreenState(!isFullscreenEnabled));
    }

    const OnClickFitview = function(){
      viewerAPIProxy.fitView(activeViewerID);
    }

    const onClickHamburger = function(){
      dispatch(setSidebarVisibility(!isSidebarVisible));
    }  
  
    const OnChangeTheme = function() {
      dispatch(setDarkModeEnable (!isDarkModeEnable));
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
          .then((response)=>{
            dispatch(setPopupMenuDisplayMode(response));
          });         
      }
      setClickedMenu(selectedMode);
      setAnchorEl( evt.currentTarget );
      dispatch(setPopupMenuActiveContent(selectedMode)); 
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
              <MuiIconButton> <MuiSwitch checked={isDarkModeEnable} onChange={OnChangeTheme} /> </MuiIconButton>
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

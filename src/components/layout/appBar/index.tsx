import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import clsx from 'clsx';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiTooltip from '@material-ui/core/Tooltip';
import ToggleButton from '@material-ui/lab/ToggleButton';

import Displaymodes from '../../icons/displaymodes';
import Fitview from '../../icons/fitview';
import Fullscreen from '../../icons/fullscreen';
import PickAndMoveIcon from '@material-ui/icons/ThreeDRotation';
import FullscreenClose from '../../icons/fullscreen_exit';
import Hamburger from '../../icons/hamburger';
import More from '../../icons/more';

import { selectModelName, selectFullscreenStatus,selectSidebarVisibility,selectDarkModeEnable, selectActiveViewerID,setFullscreenState, setSidebarVisibility , setDarkModeEnable, setPopupMenuActiveContent} from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';
import { popupMenuContentTypes } from '../../../config';

//toggle button
import Switch from "@material-ui/core/Switch";

import * as viewerAPIProxy from '../../../backend/viewerAPIProxy';

import  styles from './style';
import { useState } from 'react';

function AppBar() {
    
    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const isDarkModeEnable = useAppSelector(selectDarkModeEnable);
    let [isPickAndMoveEnabled,setIsPickAndMoveEnabled] = useState(false);
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const modelName = useAppSelector(selectModelName);
    const dispatch = useAppDispatch();  

    const OnClickFullscreen = function(){
      dispatch(setFullscreenState(!isFullscreenEnabled));
    }

    const OnClickPickAndMove = function(){
        viewerAPIProxy.enablePickAndMove(activeViewerID,!isPickAndMoveEnabled)
        setIsPickAndMoveEnabled(!isPickAndMoveEnabled);
    }
    const OnClickDisplaymode = function(){
      dispatch(setPopupMenuActiveContent(popupMenuContentTypes.displayModes));
    }
    const OnClickMore= function(){
      dispatch(setPopupMenuActiveContent(popupMenuContentTypes.more));
    }

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
               <MuiIconButton> <Switch checked={isDarkModeEnable} onChange={handleThemeChange} /> </MuiIconButton>
          </div>
              <div className={classes.divIcon} onClick={ OnClickPickAndMove } >
                    <ToggleButton value='rotate move' selected={isPickAndMoveEnabled} onChange={() => OnClickPickAndMove}><PickAndMoveIcon /></ToggleButton> 
              </div>
              <div className={classes.divIcon} onClick={ OnClickDisplaymode } >
                    <MuiIconButton><Displaymodes /></MuiIconButton> 
              </div>
              <div className={classes.divIcon} onClick={ OnClickFitview }>
                 <MuiIconButton><Fitview/></MuiIconButton>
              </div>
              <div className={classes.divIcon} onClick={ OnClickMore }>
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
      </MuiAppBar>
    );
}

export default AppBar;

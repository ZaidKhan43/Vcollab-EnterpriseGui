import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';

import Displaymodes from '../../../assets/images/displaymodes';
import Fitview from '../../../assets/images/fitview';
import Fullscreen from '../../../assets/images/fullscreen';
import FullscreenClose from '../../../assets/images/fullscreen_exit';
import Hamburger from '../../../assets/images/hamburger';
import More from '../../../assets/images/more';

import {selectFullscreenStatus,selectSidebarVisibility,selectDarkModeEnable, selectActiveViewerID,setFullscreenState, setSidebarVisibility , setDarkModeEnable} from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';

//toggle button
import Switch from "@material-ui/core/Switch";

import * as viewerAPIProxy from '../../../backend/viewerAPIProxy';

import  styles from './style';

function AppBar() {
    
    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const isDarkModeEnable = useAppSelector(selectDarkModeEnable);
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const dispatch = useAppDispatch();  

    const OnClickFullscreen = function(){
      dispatch(setFullscreenState(!isFullscreenEnabled));
    }

    const OnClickCapture = function(){
      viewerAPIProxy.captureScreen(activeViewerID);
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
          //color='default'
        >
        <MuiToolbar className={classes.toolBar} >

          <div className={classes.toolBarLeftContent}>            
            <div onClick ={ onClickHamburger }
            className={ clsx( classes.divIcon, classes.hamburgerIcon, { [classes.hamburgerIconHidden]: isSidebarVisible }) }>
              <IconButton> <Hamburger /></IconButton> 
            </div>
            
            <div className={clsx( classes.leftTitle, { [classes.leftTitleHidden]: isSidebarVisible })}>
              <MuiTypography variant='h1' noWrap>
                ModelName 
              </MuiTypography>
            </div>

          </div>
     
          <div className={classes.toolBarRightContent}>
          
          <div className={classes.divIcon}  >
               <IconButton> <Switch checked={isDarkModeEnable} onChange={handleThemeChange} /> </IconButton>
          </div>
              <div className={classes.divIcon} onClick={ OnClickCapture } >
                    <IconButton><Displaymodes /></IconButton> 
              </div>
              <div className={classes.divIcon} onClick={ OnClickFitview }>
                 <IconButton><Fitview/></IconButton>
              </div>
              <div className={classes.divIcon} >
                  <IconButton><More /></IconButton>
              </div>
             
              <div className={classes.divIcon} onClick={ OnClickFullscreen }>
                {(isFullscreenEnabled ?
                  <IconButton><FullscreenClose  /></IconButton>  :
                 <IconButton><Fullscreen /> </IconButton> 
                )}
              </div>
          </div>
        
        </MuiToolbar>     
      </MuiAppBar>
    );
}

export default AppBar;

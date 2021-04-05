import MuiAppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import MuiTypography from '@material-ui/core/Typography';
import clsx from 'clsx';
import IconButton from '../../common/iconbutton';

//import Capture from '../../../assets/images/capture.svg';
import Displaymodes from '../../../assets/images/displaymodes.svg';
import Fitview from '../../../assets/images/fitview.svg';
import Fullscreen from '../../../assets/images/fullscreen.svg';
import FullscreenClose from '../../../assets/images/fullscreen_exit.svg';
import Hamburger from '../../../assets/images/hamburger.svg';
import More from '../../../assets/images/more.svg';
import {selectFullscreenStatus,selectSidebarVisibility, setFullscreenState, setSidebarVisibility } from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';

import  styles from './style';

function AppBar() {
    
    const classes = styles();
    const isFullscreenEnabled = useAppSelector(selectFullscreenStatus);
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const dispatch = useAppDispatch();  

    const OnClickFullscreen = function(){
      dispatch(setFullscreenState(!isFullscreenEnabled));
    }

    const onClickHamburger = function(){
      dispatch(setSidebarVisibility(!isSidebarVisible));
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
                  <IconButton edge={false} src={Displaymodes} />
              </div>
              <div className={classes.divIcon} >
                  <IconButton edge={false} src={Fitview} />
              </div>
              <div className={classes.divIcon} >
                  <IconButton edge={false} src={More}  />
              </div>
             
              <div className={classes.divIcon} onClick={ OnClickFullscreen }>
                {(isFullscreenEnabled ?
                  <IconButton edge={false} src={FullscreenClose } />  :
                  <IconButton edge={false} src={Fullscreen} />
                )}
              </div>
          </div>
        
        </MuiToolbar>     
      </MuiAppBar>
    );
}

export default AppBar;
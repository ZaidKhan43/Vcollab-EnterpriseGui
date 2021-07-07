import { useLayoutEffect } from 'react';
import {Switch, Route} from 'react-router';
import {Routes} from '../../../routes';
import MuiDrawer from '@material-ui/core/Drawer';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import  styles  from "./style";
import {selectSidebarVisibility,
        setSidebarVisibility } from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';
import { sideBarContentTypes } from '../../../config';

import MainMenu from '../../sideBarContents/mainMenu';
import ProductExplorer from '../../sideBarContents/productExplorer';
import Colormaps from '../../sideBarContents/colormaps';
import ClipPlanes from '../../sideBarContents/clipPlanes';
import Views from '../../sideBarContents/views';
import Annotations from '../../sideBarContents/annotations';
import Settings from '../../sideBarContents/settings';
import Notifications from '../../sideBarContents/notifications';

export default function Sidebar(){
    
    const classes = styles();
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const dispatch = useAppDispatch();  
    const theme = useTheme();
    const smMatches = useMediaQuery(theme.breakpoints.down('sm'));
    const xsMatches = useMediaQuery(theme.breakpoints.down('xs'));

    const handleClickAway = (event : any) => {
      if (isSidebarVisible && smMatches) {
        dispatch(setSidebarVisibility(false));
      }
    };

    const renderContent = () => {
      return(<Switch>  
        <Route exact path={Routes.HOME}>
          <MainMenu />;
        </Route>
        <Route path={Routes.GEOMETRY}>
        <ProductExplorer />
        </Route>
        <Route>
        <Colormaps />
        </Route>
        <Route>
        <ClipPlanes />
        </Route>
        <Route>
        <Views />
        </Route>
        <Route>
        <Annotations />
        </Route>
        <Route>
        <Settings />
        </Route>
        <Route>
        <Notifications />     
        </Route>
      </Switch>)
      
    };

    useLayoutEffect(() => {
      if(xsMatches) dispatch(setSidebarVisibility(false));
    }, [dispatch, xsMatches]);

    return (
      <ClickAwayListener  
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}>
        <MuiDrawer
        className={ classes.drawer}
        variant= { smMatches ? "temporary" : "persistent"}
        ModalProps={{
          hideBackdrop : true,
          disablePortal : true
        }}
        transitionDuration = {{ appear: 0, enter: 0, exit: 250 }}
        anchor="left"
        open={ isSidebarVisible }
        classes={{
          paper: classes.drawerPaper,
        }}
        >  
         {renderContent()}
        </MuiDrawer>
      </ClickAwayListener>)
}
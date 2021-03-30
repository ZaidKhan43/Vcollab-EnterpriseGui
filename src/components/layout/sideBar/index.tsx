import { useLayoutEffect } from 'react';
import MuiDrawer from '@material-ui/core/Drawer';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import  styles  from "./style";
import {selectSidebarVisibility, selectSideBarActiveContent,
        setSidebarVisibility } from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';
import { sideBarContents } from '../../../config';

import ProductExplorer from '../../core/productExplorer';
import MainMenu from '../../core/mainMenu';

export default function Sidebar(){
    
    const classes = styles();
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const sidebarActiveContent = useAppSelector(selectSideBarActiveContent);
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
      switch (sidebarActiveContent) {
        case sideBarContents.productExplorer:
          return <ProductExplorer />;
        case sideBarContents.mainMenu:
          return <MainMenu />;
        default:
          return null;
      }
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
        className={classes.drawer}
        variant="persistent"
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
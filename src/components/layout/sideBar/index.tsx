import MuiDrawer from '@material-ui/core/Drawer';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import  styles  from "./style";
import { selectSidebarVisibility, setSidebarVisibilityState } from '../../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../../store/storeHooks';
import { useLayoutEffect } from 'react';

export default function Sidebar(){
    
    const classes = styles();
    const isSidebarVisible = useAppSelector(selectSidebarVisibility);
    const dispatch = useAppDispatch();  
    const theme = useTheme();
    const smMatches = useMediaQuery(theme.breakpoints.down('sm'));
    const xsMatches = useMediaQuery(theme.breakpoints.down('xs'));

    const handleClickAway = (event : any) => {
      if (isSidebarVisible && smMatches) {
        dispatch(setSidebarVisibilityState(false));
      }
    };

    useLayoutEffect(() => {
      if(xsMatches) dispatch(setSidebarVisibilityState(false));
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
        </MuiDrawer>
      </ClickAwayListener>)
}
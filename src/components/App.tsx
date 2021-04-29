import { useRef,  useCallback,useEffect } from 'react';
import clsx from 'clsx';
import { useResizeDetector } from 'react-resize-detector';
import FullScreen from 'react-fullscreen-crossbrowser';

import styles from './App.style';
import AppLoader from './appLoader/appLoader';
import Sidebar from './layout/sideBar';
import AppBar from './layout/appBar';
import FullscreenIcon from './layout/fullscreenIcon';
import { useAppSelector, useAppDispatch } from '../store/storeHooks';
import {selectAppBarVisibility,selectFullscreenStatus,selectSidebarVisibility,
        setAppBarVisibility, setFullscreenState ,selectModelLoadedState} from '../store/appSlice';
import { appBarMinHeight } from '../config';
import SnackBar from "./sideBarContents/notifications/SnackBar";

import Viewer from './viewer';
import CustomWindow from "./common/CustomWindow"
import Legend from "./common/ColorPlot"

function App() {

  const isModelLoaded = useAppSelector(selectModelLoadedState);
      
  const classes = styles();
  const isAppBarVisible  = useAppSelector(selectAppBarVisibility);
  const isFullscreenOn = useAppSelector(selectFullscreenStatus);
  const isSidebarVisible = useAppSelector(selectSidebarVisibility);
  const dispatch = useAppDispatch();  
  const targetRef = useRef(null);
  const viewerContainerRef = useRef(null);

  //===========================================================================
  const onResize = useCallback((width ?:number, height ?: number) => {
    if(height && height > appBarMinHeight)
          dispatch(setAppBarVisibility(true));
      else 
          dispatch(setAppBarVisibility(false));
  }, [ dispatch]);

  useResizeDetector({ 
    refreshMode: 'debounce',
    refreshRate: 400,
    refreshOptions :{trailing : true, leading : false },
    onResize,
    targetRef
  });

  const handleFullscreen = (isFullscreenEnabled : any) =>{
    if(isFullscreenEnabled !== isFullscreenOn) // To avoid unnecessary dispatch and handle exit fullscreen by pressing esc key
      dispatch(setFullscreenState(isFullscreenEnabled));
  }

  return (    
    <FullScreen
    enabled={ isFullscreenOn }
    onChange={(isFullscreenEnabled: any) => handleFullscreen(isFullscreenEnabled)}
    >
      <div className={classes.root} ref = { targetRef }> 
      
      {isModelLoaded === false ? (
        <AppLoader />
      ) : null} 

        <FullscreenIcon />
        { ( isAppBarVisible ?  <AppBar /> : null ) }
        <Sidebar />
        <main  className={ clsx(classes.content , {[classes.contentWithSideBar]: isSidebarVisible} , {[classes.contentWithTopBar]: isAppBarVisible}) }>
          <div ref = {viewerContainerRef} className={ clsx(classes.viewerContainer , {[classes.viewerContainerWithTopBar]: isAppBarVisible})}>
            <Viewer />
            <CustomWindow uid="window" parentRef={viewerContainerRef}>
            <Legend></Legend>
            </CustomWindow>
          </div>        
        </main>
        <SnackBar/>
      </div>
    </FullScreen>
  );
}

export default App;

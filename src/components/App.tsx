import { useRef,  useCallback } from 'react';
import clsx from 'clsx';
import { useResizeDetector } from 'react-resize-detector';
import FullScreen from 'react-fullscreen-crossbrowser';

import styles from './App.style';
import Sidebar from './layout/sideBar';
import AppBar from './layout/appBar';
import FullscreenIcon from './layout/fullscreenIcon';
import { useAppSelector, useAppDispatch } from '../store/storeHooks';
import {selectAppBarVisibility,selectFullscreenStatus,selectSidebarVisibility,
        setAppBarVisibility, setFullscreenState } from '../store/appSlice';
import { appBarMinHeight } from '../config';

function App() {
      
  const classes = styles();
  const isAppBarVisible  = useAppSelector(selectAppBarVisibility);
  const isFullscreenOn = useAppSelector(selectFullscreenStatus);
  const isSidebarVisible = useAppSelector(selectSidebarVisibility);
  const dispatch = useAppDispatch();  
  const targetRef = useRef(null);

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
        <FullscreenIcon />
        { ( isAppBarVisible ?  <AppBar /> : null ) }
        <Sidebar />
        <main  className={ clsx(classes.content , {[classes.contentWithSideBar]: isSidebarVisible} , {[classes.contentWithTopBar]: isAppBarVisible}) }>
          <div className={ clsx(classes.viewerContainer , {[classes.viewerContainerWithTopBar]: isAppBarVisible})}></div>        
        </main>
      </div>
    </FullScreen>
  );
}

export default App;
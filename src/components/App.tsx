import { useRef,  useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { useResizeDetector } from 'react-resize-detector';
import FullScreen from 'react-fullscreen-crossbrowser';

import styles from './App.style';
import FileLoadingOverlay from './layout/fileLoadingOverlay';
import Sidebar from './layout/sideBar';
import AppBar from './layout/appBar';
import FullscreenIcon from './layout/fullscreenIcon';
import { useAppSelector, useAppDispatch } from '../store/storeHooks';
import {selectAppBarVisibility,selectFullscreenStatus,selectSidebarVisibility,
        setAppBarVisibility, setFullscreenState ,selectModelLoadedState, setPopupMenuActiveContent } from '../store/appSlice';
import { appBarMinHeight, popupMenuContentTypes } from '../config';
import SnackBar from "./sideBarContents/messages/SnackBar";

import Viewer from './viewer';
import { fetchCameraStdViews } from '../store/sideBar/sceneSlice';

function App() {

  const isModelLoaded = useAppSelector(selectModelLoadedState);
     
  const classes = styles();
  const isAppBarVisible  = useAppSelector(selectAppBarVisibility);
  const isFullscreenOn = useAppSelector(selectFullscreenStatus);
  const isSidebarVisible = useAppSelector(selectSidebarVisibility);
  const dispatch = useAppDispatch();  
  const targetRef = useRef(null);

  //===========================================================================
  const onResize = useCallback((width ?:number, height ?: number) => {
    dispatch(fetchCameraStdViews());
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

  useEffect(() => {
    if(isAppBarVisible === false)
      dispatch(setPopupMenuActiveContent(popupMenuContentTypes.none)); 
  },[isAppBarVisible, dispatch]);

  return (
    <FullScreen
    enabled={ isFullscreenOn }
    onChange={(isFullscreenEnabled: any) => handleFullscreen(isFullscreenEnabled)}
    >
      <div className={classes.root} ref = { targetRef }> 
      
      {isModelLoaded === false ? (
        <FileLoadingOverlay />
      ) : null} 

        {( !isAppBarVisible ? 
        <FullscreenIcon />
        : null ) }

        { ( isAppBarVisible ?   
        <><AppBar /><Sidebar /></>
        : null ) }
        <main  className={ clsx(classes.content , {[classes.contentWithSideBar]: isSidebarVisible} , {[classes.contentWithTopBar]: isAppBarVisible}) }>
          <div className={ clsx(classes.viewerContainer , {[classes.viewerContainerWithTopBar]: isAppBarVisible})}>
            <Viewer />
          </div>     
        </main>
        <SnackBar/>
      </div>
    </FullScreen>

  );
}

export default App;

import { useRef,  useCallback } from 'react';
import clsx from 'clsx';
import { useResizeDetector } from 'react-resize-detector';
import FullScreen from 'react-fullscreen-crossbrowser';

import styles from './App.style';
import AppBar from './layout/appBar';
import FullscreenIcon from './layout/fullscreenIcon';
import { useAppSelector, useAppDispatch } from '../store/storeHooks';
import { selectVisible, setVisible, setInvisible } from '../store/appBarSlice';
import { selectFullscreen, setFullscreenState } from '../store/appSlice';
import { appBarMinHeight } from '../config';


function App() {
      
  const classes = styles();
  const isVisible = useAppSelector(selectVisible);
  const isFullscreenOn = useAppSelector(selectFullscreen);
  const dispatch = useAppDispatch();  
  const targetRef = useRef(null);

  const onResize = useCallback((width ?:number, height ?: number) => {
    if(height && height > appBarMinHeight)
          dispatch(setVisible());
      else 
          dispatch(setInvisible());

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
      { ( isVisible ?  <AppBar /> : null ) }
      <FullscreenIcon />
      <main  className={ clsx(classes.content , {[classes.contentWithTopBar]: isVisible}) }>
        <div className={ clsx(classes.viewerContainer , {[classes.viewerContainerWithTopBar]: isVisible})}></div>        
      </main>
    </div>
    </FullScreen>
  );
}

export default App;

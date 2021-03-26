import { useRef,  useCallback } from 'react';
import { styles } from './App.style';
import AppBar from './layout/appBar';
import clsx from 'clsx';
import { useAppSelector, useAppDispatch } from '../store/storeHooks';
import { selectVisible, setVisible, setInvisible } from '../store/appBarSlice';
import { useResizeDetector } from 'react-resize-detector';

function App() {
      
  const classes = styles();
  const isVisible = useAppSelector(selectVisible);
  const dispatch = useAppDispatch();  
  const targetRef = useRef(null);

  const onResize = useCallback((width ?:number, height ?: number) => {
    if(height && height > 300)
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

  return (    
    <div className={classes.root} ref = { targetRef }>
      { ( isVisible ?  <AppBar /> : null ) }
      <main  className={ clsx(classes.content , {[classes.contentWithTopBar]: isVisible}) }>
        <div className={ clsx(classes.viewerContainer , {[classes.viewerContainerWithTopBar]: isVisible})}></div>        
      </main>
    </div>
  );
}

export default App;

import { styles } from './App.style';
import AppBar from './layout/appBar';
import clsx from 'clsx';
import { useAppSelector } from '../store/storeHooks';
import { selectVisible } from '../store/appBarSlice';

function App() {
      
  const classes = styles();
  const isVisible = useAppSelector(selectVisible);

  return (
    <div className={classes.root}>
      { ( isVisible ?  <AppBar /> : null ) }
      <main  className={ clsx(classes.content , {[classes.contentWithTopBar]: isVisible}) }>
        <div className={ clsx(classes.viewerContainer , {[classes.viewerContainerWithTopBar]: isVisible})}></div>        
      </main>
    </div>
  );
}

export default App;

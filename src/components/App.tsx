import { styles } from "./App.style";
 import Topbar from "./layout/topbar"

function App() {
      
  const classes = styles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className= {classes.content}>
        <div className={classes.drawerHeader}></div>
        <div className={classes.viewerContainer}></div>        
      </main>
    </div>
  );
}

export default App;

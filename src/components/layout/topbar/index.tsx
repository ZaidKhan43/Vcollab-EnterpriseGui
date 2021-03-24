import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "../../common/iconbutton";

//import Capture from "../../../assets/images/capture.svg";
import Displaymodes from "../../../assets/images/displaymodes.svg";
import Fitview from "../../../assets/images/fitview.svg";
import Fullscreen from "../../../assets/images/fullscreen.svg";
//import FullscreenClose from "../../../assets/images/fullscreen_exit.svg";
import Hamburger from "../../../assets/images/hamburger.svg";
import More from "../../../assets/images/more.svg";

import { styles } from "./style";


function Topbar() {
    
    const classes = styles();

    return (
        <AppBar 
            position="fixed"
            className= { classes.appBar }
        >
        <Toolbar className={classes.toolbar}>

          <div className={classes.toolbarLeftContent}>
            <div className={classes.icondiv} >
              <IconButton edge={false} src={Hamburger} />
            </div>
            <div className={classes.leftTitle}>
              <Typography variant="h1" noWrap>
                ModelName 
              </Typography>
            </div>
          </div>
     
          <div className={classes.toolbarRightContent}>
              <div className={classes.icondiv} >
                  <IconButton edge={false} src={Displaymodes} />
              </div>
              <div className={classes.icondiv} >
                  <IconButton edge={false} src={Fitview} />
              </div>
              <div className={classes.icondiv} >
                  <IconButton edge={false} src={More}  />
              </div>
              <div className={classes.icondiv} >
                  <IconButton edge={false} src={Fullscreen} />
              </div>
          </div>
        
        </Toolbar>     
      </AppBar>
    );
}

export default Topbar;

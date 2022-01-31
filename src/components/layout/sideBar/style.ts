import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth, leftbarWidth } from '../../../config';

export default makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      opacity:0.8,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      backgroundColor: theme.palette.background.paper,
    },
    overflowX: "hidden",
    overflowY: "hidden",
  },
  anchorLeft: {
    left: leftbarWidth,
    right: 'auto'
  }
}));

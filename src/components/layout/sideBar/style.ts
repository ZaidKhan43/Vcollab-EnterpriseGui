import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from '../../../config';

export default makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "rgba(0, 0, 0, 1)",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    overflowX: "hidden",
    overflowY: "hidden",
  }
}));

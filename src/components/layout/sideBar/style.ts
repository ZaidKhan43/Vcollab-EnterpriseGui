import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth, colors } from '../../../config';

export default makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      backgroundColor: colors.secondaryTransparent,
    },
    overflowX: "hidden",
    overflowY: "hidden",
  }
}));

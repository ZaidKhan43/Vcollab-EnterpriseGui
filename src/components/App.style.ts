import { makeStyles } from '@material-ui/core/styles';
import { topbarHeight, drawerWidth } from '../config';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  }, 
  content: {
    flexGrow : 1,
    marginTop : 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft : -drawerWidth,
    width : '100%'
  },
  contentWithSideBar : {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: 0,
    }
  },
  contentWithTopBar: {
    marginTop : topbarHeight,
  },
  viewerContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    zIndex: 1000,
    background: 'linear-gradient(#a0a0ff, white)',
    //backgroundColor : 'blue'
  },
  viewerContainerWithTopBar: {
    height: `calc(100vh - ${topbarHeight}px)`,
  },
}));

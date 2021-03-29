import { makeStyles } from '@material-ui/core/styles';

export const topbarHeight = 48;

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  }, 
  content: {
    flexGrow : 1,
    marginTop : 0,
  },
  contentWithTopBar: {
    marginTop : topbarHeight,
  },
  viewerContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    zIndex: 1000,
    background: 'linear-gradient(#a0a0ff, white)'
  },
  viewerContainerWithTopBar: {
    height: `calc(100vh - ${topbarHeight}px)`,
  },
}));

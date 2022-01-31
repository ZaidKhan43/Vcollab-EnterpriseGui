import { makeStyles } from '@material-ui/core/styles';
import { topbarHeight, drawerWidth, leftbarWidth } from '../../../config';

export default makeStyles((theme) => ({
    root: {
        width: leftbarWidth,
        height: '100%',
        backgroundColor: theme.palette.background.default
    }
}));

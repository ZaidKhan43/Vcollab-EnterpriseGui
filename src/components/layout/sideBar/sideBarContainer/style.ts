import { makeStyles } from '@material-ui/core/styles';
import { colors, topbarHeight } from '../../../../config';

export default makeStyles((theme) => ({
    divider: {
        height: 2,
        width: '100%',
        backgroundColor: colors.primary,
    },
    sideBarContainer : {
      height : '100Vh'
    },
    sideBarBodyContents : {
      height : `calc(100vh - ${ topbarHeight }px)`
    }
      
}));
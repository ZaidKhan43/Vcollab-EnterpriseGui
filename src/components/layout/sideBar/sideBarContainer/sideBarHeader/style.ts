import { makeStyles } from '@material-ui/core/styles';
import { sideBarHeaderHeight } from '../../../../../config';

export default makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: sideBarHeaderHeight,
        //paddingLeft : 12,
        //paddingRight : 12,
    },
    headerLeftContent :{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start-first',
        height: sideBarHeaderHeight,
    },
    leftIcon : {
        width : 48,
        height : 48
    },
    rightIcon : {
        width : 48,
        height : 48
    },
    content : {
    }
}));
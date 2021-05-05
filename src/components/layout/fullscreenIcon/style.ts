import { makeStyles } from '@material-ui/core/styles';
//import { colors } from '../../../config';


export default makeStyles((theme) => ({
    iconPosition :{
        position : 'fixed',
        top : 5,
        right : 5,
        backgroundColor: theme.palette.background.default,
        zIndex : 20000
     }
}));

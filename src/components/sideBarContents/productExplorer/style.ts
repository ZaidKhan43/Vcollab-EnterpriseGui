import { makeStyles } from '@material-ui/core/styles';
//import { colors } from '../../../config/index';

export default makeStyles((theme) => ({
    backIcon : {
        width : 48,
        height: 48,
    },
    heading: {
        justifySelf: 'start',
        width: '100%',
       // color:colors.secondaryText,
      },

    
      active : {
        border:"2px solid",
        borderColor:theme.palette.text.primary,
        borderRadius:"5px"
    },

}));

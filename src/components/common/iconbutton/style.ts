import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../config';

export default makeStyles((theme) => ({
    btn:{
      '&:hover': {
        background: colors.primaryHover
      }
    }
}));
import { makeStyles } from '@material-ui/core/styles';
import { ColorLensTwoTone, ControlPointDuplicateSharp } from '@material-ui/icons';
import { colors } from '../../../config/index';

export default makeStyles((theme) => ({
  icon : {
   '&:hover': {
      background: colors.secondary,
    },
  },

  iconStyle:{
    width : 16,
    height: 16,
  },

  listItem:{
    color:"#DFDEDE", 
    flex: 1, 
    minWidth: "148px", 
    fontSize:"18px"
  },

  listItemSize: {
    color:"#DFDEDE",
    fontSize:"12px", 
    textDecoration: "underline",
      },

}));

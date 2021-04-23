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
  popper:
  {
    backgroundColor: "#171727",
  opacity:"70%", 
  marginTop:"58px",
  marginLeft:"80%",
  [theme.breakpoints.down(1200)]: {
    marginTop: "58px",
    marginLeft:"75%",
    boxShadow: "none",
  },
  [theme.breakpoints.down(879)]: {
    marginTop: "58px",
    marginLeft:"65%",
    boxShadow: "none",
  },
  [theme.breakpoints.down(700)]: {
    marginTop: "58px",
    marginLeft:"60%",
    boxShadow: "none",
  },
  
  [theme.breakpoints.down(602)]: {
    marginTop: "58px",
    marginLeft:"55%",
    boxShadow: "none",
},
},
  
}));

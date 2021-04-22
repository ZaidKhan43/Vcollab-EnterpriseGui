import { makeStyles } from '@material-ui/core/styles';
import { ColorLensTwoTone, ControlPointDuplicateSharp } from '@material-ui/icons';
import { colors } from '../../../config/index';

export default makeStyles((theme) => ({
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%',
    color:colors.secondaryText,
    padding: 12,
  },
      
  headerIcon:{
    width : 48,
    height: 48,
  },
      
  list:{
    position: "absolute",
    left: "5%",
    right: "-40%",
  },
    
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 1,
    color: colors.secondaryText,
    '&:hover': {
      background: colors.secondaryHover,
    },
    [theme.breakpoints.down('sm')]: {
      '&:hover': {
        background: colors.secondaryHoverTransparent,
      }
    },
  },
      
  listItemClicked: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 1,
    background: colors.secondaryHover,
  },
  
  listItemText: {
    color: colors.secondaryText,
    fontSize: "18px",
  },
  
  displayOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 12,
    marginTop:"90%",
    color:colors.secondaryText,
  },
  
  displayList:{
    position:"absolute",
    left: "5%",
    right: "-100%",     
  },

  footerCard:{
    height:"45px",
    backgroundColor: colors.secondaryHover,
    width: "100%",
    position: "absolute",
    borderRadius:"10px 10px 0 0",
    bottom: 0,
    left: 0,
    right: -20,
    padding: "5px -20px 0px 20px",
  },

  listSub: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 1,
    marginTop:"15px",
    color: colors.secondaryText,
    fontSize: "14px",
    marginLeft:"2%"
  },

  circularSlider: {
    position:"absolute",
    left:"30%",
    top:"30%"
  },

  clicularSliderInput: {
    color:"#DFDEDE",
    border: "1px solid #DFDEDE",
    paddingLeft:"20%",
    paddingTop:"10%",
    width:"90%",
    left:"-10%",
    top:"30%",
    fontSize:"10px",
    zIndex: 10
  },

}));

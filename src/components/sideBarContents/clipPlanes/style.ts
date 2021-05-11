import { makeStyles } from '@material-ui/core/styles';
// import { colors } from '../../../config/index';

export default makeStyles((theme) => (
  {
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%',
    color: theme.palette.text.primary,
    padding: 12,
  },
  
  buttonIcon : {
    color: theme.palette.text.primary,
  },

  button: {
    background: theme.palette.action.selected,
  },
  // headerIcon:{
  //   width : 48,
  //   height: 48,
  // },
      
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
    color: theme.palette.text.primary,
    '&:hover': {
      background: theme.palette.action.hover,
    },
    [theme.breakpoints.down('sm')]: {
      '&:hover': {
        background: theme.palette.action.hover,
      }
    },
  },
      
  listItemClicked: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 1,
    background: theme.palette.action.selected,
    [theme.breakpoints.down('sm')]: {
      background: theme.palette.action.hover,
    },
  },
  
  listItemText: {
    color: theme.palette.text.primary,
    fontSize: "18px",
  },
  
  displayOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 12,
    marginTop:"%",
    color: theme.palette.text.primary,
  },
  
  displayList:{
    // position:"absolute",
    paddingLeft: "5%",
    // right: "-100%",     
  },

  footerCard:{
    height:"45px",
    position: 'absolute',
    background:'transparent',
    left: 0,
    bottom: 0,
    textAlign: 'center',
    width : '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    boxShadow: theme.shadows[20],
    borderRadius:"10px 10px 0 0",
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
    color: theme.palette.text.primary,
    fontSize: "14px",
    marginLeft:"2%"
  },

  dialogBox: {
    color: theme.palette.text.primary,
    fontSize: "50px",
  },

  snackBar: {
    background: theme.palette.background.paper,
    color: theme.palette.error.light,
    opacity:"50%",
    marginTop:'40px',
  },

  dialogBoxIconCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  circularSlider: {
    position:"absolute",
    left:"20%",
    right:"20%",
    top:"15%",
    zIndex: 10,
    
  },

  clicularSliderInputOne: {
    color:theme.palette.text.primary,
    background:"none",
    border: "1px solid",
    borderColor: theme.palette.text.primary ,
    marginTop:"-50%",
    // paddingLeft:"20%",
    paddingTop:"10%",
    width:"100%",
    // left:"70%",
    // top:"10%",
    right:"10%",
    fontSize:"4px",
    zIndex: 10,
    size: 4,
  },

  input :{
    // width: "160px",
  height: "20px",
  color:theme.palette.text.primary,
  paddingLeft:"10%",
},

inputOne :{
  color: theme.palette.text.primary, 
  paddingLeft: "30%",
  textAlign: "center",
  border: "1px solid",
  boderColor: theme.palette.text.primary, 
},

inputEquation:{
  // width:"40px",
  color: theme.palette.text.primary, 
  textAlign:"center",
  border: "1px solid",
  boderColor: theme.palette.text.primary,
  paddingLeft:"10px",
  background:"none",
  borderColor: theme.palette.text.primary ,
  fontSize:"4px",
  width:"100%",
},

  caption: {
    fontSize:"14px",
    color: theme.palette.text.primary,
    opacity: 0.7,
  },

  translate:{
    color:theme.palette.text.primary,
    marginLeft:"10px",
    marginRight:"20px"
  },

  rotate: {
    color: theme.palette.text.secondary,
    secondaryColor: "red",
    
  },

  largeIcon: {
    fontSize: "3em"
  },
  
}));

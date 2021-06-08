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
  buttonNil: {
  },
      
  listClick:{
    position: "absolute",
    overflowY: "auto",
    overflowX:"hidden",
    listStyle: "none",
    height: "42%",
    width:"100%",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    },
  },

  listClickNo:{
    position: "absolute",
    overflowY: "auto",
    overflowX:"hidden",
    listStyle: "none",
    height: "70%",
    width:"100%",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    },
    
  },
    
    
  listItem: {
    display: "flex",
    alignItems: "center",
    paddingLeft:"15px",
    // justifyContent: "flex-start",
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
    // justifyContent: "flex-start",
    width: "100%",
    paddingLeft:"15px",
    padding: 1,
    background: theme.palette.action.selected,
    [theme.breakpoints.down('sm')]: {
      background: theme.palette.action.hover,
    },
  },
  
  listItemText: {
    color: theme.palette.text.primary,
    whiteSpace: "nowrap",
    overflow:"hidden",
    textOverflow:"ellipsis",
    fontSize: "18px",
  },

  listItemAsHeading: {
    color: theme.palette.text.primary,
    width:"120px",
    whiteSpace: "nowrap",
    overflow:"hidden",
    textOverflow:"ellipsis",
    fontSize: "17px",
  },
  
  displayList:{ 
    position: "fixed",
      overflowY: "auto",
    overflowX:"hidden",
    listStyle: "none",
    height: "22%",
    width:"300px",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    },    
    
    
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
    marginLeft:"2%",
    marginBottom:"10px"
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
    top:"10%",
    zIndex: 10,
    
  },

  cicularSliderInput: {
    color:theme.palette.text.primary,
    background:"none",
    border: "1px solid",
    borderColor: theme.palette.text.primary ,
    marginTop:"-60%",
    textAlign:"center",
    width:"80%",
    fontSize:"14px",
    zIndex: 10,
    size: 4,
  },

  circularSliderButton:{
    color:theme.palette.text.primary,
    fontSize:"10px",
  },

  translateButton:{
    // marginLeft:"10px",
    // marginBottom:"-5px",
    color:theme.palette.text.primary,
    fontSize:"20px",
  },

  input :{
    // width: "160px",
  height: "20px",
  color:theme.palette.text.primary,
  paddingLeft:"10%",
},

inputTranslate :{
  color:theme.palette.text.primary,
  background:"none",
  border: "1px solid",
  borderColor: theme.palette.text.primary ,
  textAlign:"center",
  width:"70px",
  fontSize:"16px",
  zIndex: 10,
  size: 4,
},

inputEquation:{
  border: "1px solid",
  color:theme.palette.text.primary,
  background:"none",
  borderColor: theme.palette.text.primary ,
  marginTop:"-60%",
  textAlign:"center",
  width:"90%",
  fontSize:"16px",
  zIndex: 10,
  size: 4,
},

disabled: {
background: theme.palette.text.disabled,
opacity:0.6,
},

disabledButton:{
color: theme.palette.text.disabled,
opacity:0.6,
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
  
  scrollBar: {
    overflowY: "auto",
    overflowX:"hidden",
    // margin: 0,
    // padding: 0,
    listStyle: "none",
    height: "99%",
    width:"100%",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    },
  },

  editButton:{
    background: theme.palette.action.selected,
    borderRadius:"5px",
    width:40,
    height:10,
    marginLeft:"120px",
  },
  
  editButtonActive:{
    background:theme.palette.action.selected,
    opacity:0.7,
  },
  
  footerCard:{
    // height:"45px",
    // position: 'absolute',
    // background:theme.palette.text.secondary,
    // left: 0,
    // bottom: 0,
    // textAlign: 'center',
    // width : '100%',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // boxShadow: theme.shadows[20],
    // borderRadius:"10px 10px 0 0",
    // right: -20,
    // padding: "5px -20px 0px 20px",

  },

  inputEqnBorder:{
    border: "1px solid",
    width:"240px",
    borderColor: theme.palette.text.primary ,
  },

  inputEqn: {
    textAlign:"center",
      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0
  }},

  disabledTextBox: {
    marginLeft:"-20px", width:"90%",marginTop:"10px",border: "1px solid",paddingLeft:"5px",paddingRight:"5px",
  },

}));

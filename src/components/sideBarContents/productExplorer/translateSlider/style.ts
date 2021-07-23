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

      inputTranslate :{
        color:theme.palette.text.primary,
         background:"none",
        border: "1px solid",
        borderColor: theme.palette.text.primary ,
        textAlign:"center",
        width:"70%",
        fontSize:"16px",
        zIndex: 10,
        size: 4,
        
        '&[type=number]': {
          '-moz-appearance': 'textfield',
        },
        '&::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        '&::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
      },
      
      disabled: {
      background: theme.palette.text.disabled,
      },

      translate:{
        color:theme.palette.text.primary,
        marginLeft:"10px",
        marginRight:"20px",
      },
      
      translateButton:{
        // marginLeft:"10px",
        // marginBottom:"-5px",
        color:theme.palette.text.primary,
        fontSize:"20px",
      },

      disabledButton:{
        color: theme.palette.text.disabled,
        opacity:0.6,
        },
      
}));

import { makeStyles } from '@material-ui/core/styles';

const useStylesDark = makeStyles((theme) => ({
    container:{
      position:'fixed',
      padding:'0px 10px 20px' ,
      marginTop:'0px',
      backgroundColor:'#424242',
      color:'#fff',
      height:'98vh',
      display:'flex',
      flexDirection:'column',
      width:'300px',
    },
    custom_button_group:{
      display: 'flex',
      justifyContent:'center',
      color: 'white',
      marginBottom:'800px'
    },
    button:{
      marginTop:'auto',
      color:'#8C8BFF',
      borderRadius:'5px'
    },
    divp:{
      textAlign:'left',
      color:'#DFDEDE',
      marginLeft:'-5px',
      marginBottom:'5px'

    }
  }
));

const useStylesLight = makeStyles((theme) => ({
    container:{
      position:'fixed',
      padding:'0px 10px 20px' ,
      marginTop:'0px',
      backgroundColor:'#fff',
      color:'#424242',
      height:'98vh',
      display:'flex',
      width:'300px',
      flexDirection:'column',
      
    },
    custom_button_group:{
      display: 'flex',
      justifyContent:'center',
      color: '#424242',
      marginBottom:'800px',

    },
    button:{
      marginTop:'auto',
      color:'#8C8BFF',
      borderRadius:'5px'

    },
    divp:{
      textAlign:'left',
      color:'#424242',
      marginLeft:'-5px',
      marginBottom:'5px'

    
    }
  }
));

export  { useStylesDark, useStylesLight };
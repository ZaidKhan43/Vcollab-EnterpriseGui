
import { makeStyles } from '@material-ui/core/styles';


const useStylesDark = makeStyles((theme) => ({
  container:{
    position:'fixed',
    padding:'0px 10px 20px' ,
    marginTop:'0px',
    height:'98vh',
    display:'flex',
    flexDirection:'column',
    width:'300px',
    fontSize:'1rem',
    zIndex:9999
  },
  custom_button_group:{
    display: 'flex',
    justifyContent:'center',
    //color: 'white',
    marginBottom:'800px'
  },
  button:{
    marginTop:'auto',
    color:'#8C8BFF',
    borderRadius:'5px'
  },
  divp:{
    textAlign:'left',
    marginLeft:'-5px',
    marginBottom:'5px',
    fontSize:'1rem',

  }
}
));

export  { useStylesDark };

  

import { makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme)=>({

    rootDiv:{
    marginTop:'5px'

    },


// Accordition overwrite css    

    accorditionHeading:{
        display:'flex'

    },    

    accordianSummaryIcon: {
        order: -1,
        paddingTop: 0,
        paddingBottom: 0
    },
    accordianSummaryExpanded: {
        minHeight: '0 !important',
    },
    accordianSummaryContent: {
        marginTop:'-20px',
        '&.Mui-expanded':{
            margin: '0px'
        }
    },

// List overwrite css

    MuiListItemTextinset:{ 
        marginLeft:'-40px'
    },
    MuiListItemText:{
      display:'flex',
      justifyContent:'left',
      marginLeft:'18px'

    },
    userProvidedText:{
        display:'flex',
        justifyContent:'left',
  
      },

}));
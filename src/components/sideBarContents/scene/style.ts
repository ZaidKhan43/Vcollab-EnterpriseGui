import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => (
    {
        listItem: {
            display: "flex",
            alignItems: "center",
            paddingLeft:"15px",
            // justifyContent: "flex-start",
            width: "100%",
            padding: 6,
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
            paddingLeft:"15px",
            // justifyContent: "flex-start",
            width: "100%",
            padding: 6,
            color: theme.palette.text.primary,
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
        
        listClick:{
            height: "42%",
           width:"100%",
          },
        
          listHead: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            padding: 1,
            marginBottom:"20px",
            color: theme.palette.text.primary,
            fontSize: "14px",
            marginLeft:"2%",
          },

          listSubHead: {
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            padding: 1,
            // marginTop:"15px",
            color: theme.palette.text.primary,
            fontSize: "12px",
          },
      
        inputEquation:{
            color:theme.palette.text.primary,
            background:"none",
            border: "1px solid",
            borderColor: theme.palette.text.primary ,
            marginTop:"-60%",
            textAlign:"center",
            width:"70%",
            fontSize:"16px",
            zIndex: 10,
            size: 4,
        },
    appTap:{
      marginRight:"20px",  
      marginLeft:"-20px",
      backgroundColor:"none",
    },
    tab:{
        backgroundColor: "none",
        },
        
    circularSliderButton:{
        color:theme.palette.text.primary,
        fontSize:"20px", 
    },

    colorPicker:{
        zIndex: 10,
    },

    active : {
        outline:"2px solid",
        outlineColor:theme.palette.text.primary,
      },
    
}
));
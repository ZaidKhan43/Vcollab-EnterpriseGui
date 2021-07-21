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
      
        // inputEquation:{
        //     color:theme.palette.text.primary,
        //     background:"none",
        //     border: "1px solid",
        //     borderColor: theme.palette.text.primary ,
        //     marginTop:"-60%",
        //     textAlign:"center",
        //     width:"70%",
        //     fontSize:"16px",
        //     zIndex: 10,
        //     size: 4,
        // },
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

      scene : {
      position: "absolute",
      overflowY: "auto",
      overflowX:"hidden",
      listStyle: "none",
      height: "90%",
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

    inputEquation :{
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

    scrollBar: {
      position:"relative",
      overflowY: "auto",
      overflowX:"hidden",
      // margin: 0,
      // padding: 0,
      listStyle: "none",
      height: "84%",
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
    
}
));
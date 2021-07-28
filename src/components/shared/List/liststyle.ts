import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({

    MuiListItemText:{ 
        marginLeft:'15px'
    },

    scrollbar:{

        height:'190px',
        overflowY:'auto',
        scrollbarColor: "rgba(0,0,0,.3) rgba(0,0,0,0.00) ",
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius:'20px',
          backgroundColor: 'rgba(0,0,0,.3)',
          outline: '1px solid slategrey'
        },
    }


}));

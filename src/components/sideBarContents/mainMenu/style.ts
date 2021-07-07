import { makeStyles } from '@material-ui/core/styles';
import { topbarHeight } from '../../../config';

export default makeStyles((theme) => ({
      header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: topbarHeight,
        paddingLeft : 12
      },
      divider: {
        height: 2,
        width: '100%',
      },
      
      listItem: {
        padding: 10,
        width:"100%",
        marginLeft:"-10px",
        // display: "flex",
        // alignItems: "center",
        '&:hover': {
          background: theme.palette.action.hover,
        },
        [theme.breakpoints.down('sm')]: {
            '&:hover': {
                background: theme.palette.action.hover,
              }
          },
      },

      
      listItemText: {
        //color: theme.palette.text.primary,
      },
}));

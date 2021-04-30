import { makeStyles } from '@material-ui/core/styles';

import { colors } from '../../../config';
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
        padding: 12,
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
        color: theme.palette.text.primary,
      },
}));

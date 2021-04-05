import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../config';

export default makeStyles((theme) => ({
      divider: {
        height: 2,
        width: '100%',
        backgroundColor: colors.primary,
      },
      listItem: {
        padding: 12,
        '&:hover': {
          background: colors.secondaryHover,
        },
        [theme.breakpoints.down('sm')]: {
            '&:hover': {
                background: colors.secondaryHoverTransparent,
              }
          },
      },
      listItemText: {
        color: colors.secondaryText,
      },
}));

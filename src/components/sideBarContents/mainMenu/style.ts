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
      accordianExpanded:{
        margin: '2px 0 !important'
      },
      accordianSummaryExpanded: {
        minHeight: '0px !important',
        height: '48px'
      },
      accordianSummary: {
        paddingLeft: '0px',
      },
      selected: {
        backgroundColor: theme.palette.primary.main
      },
      accordianSummaryContent: {
        margin: '0px !important',
      },
      accordianDetails: {
        padding: '0px !important'
      },
      list: {
        width: '100%',
        padding:0
      },
      listItem: {
        paddingLeft: '72px'
      },

      
      listItemText: {
        //color: theme.palette.text.primary,
      },
}));

import { makeStyles } from '@material-ui/core/styles';
import { ColorLensTwoTone, ControlPointDuplicateSharp } from '@material-ui/icons';
import { colors } from '../../../config/index';

export default makeStyles((theme) => ({
    heading: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
        width: '100%',
        color:colors.secondaryText,
      padding: 12,
      },
    
      listItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        padding: 1,
        color: colors.secondaryText,
        '&:hover': {
          background: colors.secondaryHover,
        },
        [theme.breakpoints.down('sm')]: {
            '&:hover': {
                background: colors.secondaryHoverTransparent,
              }
          },
      },
      listItemClicked: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        padding: 1,
        background: colors.secondaryHover,
      },

      listItemText: {
        color: colors.secondaryText,
      },
      displayOption: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 12,
        marginTop:"20px",
        color:colors.secondaryText,

      },
      footerCard:{
        height:"45px",
        backgroundColor: colors.secondaryHover,
        width: "100%",
        position: "absolute",
        borderRadius:"10px 10px 0 0",
        bottom: 0,
        left: 0,
        right: -20,
        padding: "5px -20px 0px 20px",
      },
      footerIconsContainer: {
        width: "100%",
        display:"flex",
        justifyContent:"space-between",
      },
      listSub: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        padding: 1,
        marginTop:"15px",
        color: colors.secondaryText,
      },
      planeEquation:{
        justifySelf: "start",
       width:"60%",
       marginRight: "auto",
       color: colors.secondaryText,
       fontSize: "35 px",
       inputText: colors.secondaryText,
      },
}));

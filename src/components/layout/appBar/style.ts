import { makeStyles } from '@material-ui/core/styles';
import { topbarHeight, drawerWidth, colors } from '../../../config';

export default makeStyles((theme) => ({
    appBar : {
        boxShadow: 'none',
        width: '100%',
        marginLeft: 0,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
    },
    appBarwithSideBar : {
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolBar : {
        minHeight: topbarHeight,
        height: topbarHeight,
        //background: theme.palette.background.default,
        boxShadow: 'none',
        //padding: sidebarContentLeftMargin,
        display: 'flex',
        //width: '100%',
        justifyContent: 'space-between',
        paddingLeft: '0px',
        paddingRight: '0px',
    },
    toolBarLeftContent : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolBarRightContent : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftTitle : {
        display: 'block',
        padding : 10,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    leftTitleHidden : {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    hamburgerIcon : {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    hamburgerIconHidden: {
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
    },
    divIcon : {
        textAlign: 'center'
    },
}));

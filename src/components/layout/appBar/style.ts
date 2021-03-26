import { makeStyles } from '@material-ui/core/styles';

import { topbarHeight  } from '../../App.style';

export const styles = makeStyles((theme) => ({
    appBar : {
        boxShadow: 'none',
        width: '100%',
        transition: 'none',
    },
    toolBar : {
        minHeight: topbarHeight,
        height: topbarHeight,
        background: '#000000',
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
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    divIcon : {
        textAlign: 'center'
    },
}));

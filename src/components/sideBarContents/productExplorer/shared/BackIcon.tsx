import React from 'react'
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './style';
import Back from '@material-ui/icons/ArrowBack'

function BackIcon(props:{onClick:() => void}) {
    const classes = useStyles();
    return (
        <ToolTip title='Back'>
        <IconButton
        className={classes.backIcon}
        onClick={() => props.onClick()}>
        <Back/>
        </IconButton>
        </ToolTip>
    )
}

export default BackIcon

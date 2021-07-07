import React from 'react'
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import useStyles from './style';
function SearchIcon(props:{onClick:() => void}) {
    const classes = useStyles();
    return (
        <ToolTip title='Search'>
        <IconButton
        className={classes.backIcon}
        onClick={() => props.onClick()}>
            <Search/>
        </IconButton>
      </ToolTip>
    )
}

export default SearchIcon

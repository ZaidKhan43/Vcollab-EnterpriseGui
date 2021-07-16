import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import Grid  from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import { createStyles, makeStyles } from '@material-ui/core'
interface SearchProps{
    text:string,
    placeholder:string
    onChange: (results: any[]) => void
}

const useStyles = makeStyles(createStyles({
    root: {

    }
}
))

function SearchBox(props:SearchProps) {
    const classes = useStyles();
    return (
        <Grid container alignItems='center' spacing={2} className={classes.root}>
            <Grid item>
            <InputBase
            placeholder={props.placeholder}
            inputProps={{ 'aria-label': props.placeholder }}/>
            </Grid>
            <Grid item>
            <SearchIcon />
            </Grid>
        </Grid>
    )
}

export default SearchBox

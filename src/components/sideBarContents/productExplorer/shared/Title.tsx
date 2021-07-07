import React from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from './style'

function Title(props:{text:string}) {
    const classes = useStyles();
    return (
        <Typography className={classes.heading} variant='h1' noWrap>
          {props.text}
        </Typography>
    )
}

export default Title

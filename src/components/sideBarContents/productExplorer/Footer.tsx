import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NextIcon from '@material-ui/icons/KeyboardArrowRight'
import {makeStyles} from '@material-ui/core/styles';
import FooterOptions from './FooterOptions'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles({
    selectedItemText: {
        textAlign: "center"
    }
})
function Footer(props:any) {
    const classes = useStyles();
    return (
        <>
        <Grid container justify='center'>
        <Grid item xs>
            <Grid container alignItems='center'>
                    <Grid item xs={10}>
                        <Typography className={classes.selectedItemText}> {props.selectedCount} Selected</Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip title='Next'>
                        <IconButton disabled={props.selectedCount === 0} onClick={props.handleNext}>
                            <NextIcon/>
                        </IconButton>
                        </Tooltip>
                    </Grid>
            </Grid>
        <Grid item xs>
                <FooterOptions disabled={props.selectedCount === 0} ></FooterOptions>
            </Grid>
        </Grid>
        </Grid>
        </>
    )
}

export default Footer

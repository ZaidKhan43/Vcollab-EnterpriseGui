import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NextIcon from '@material-ui/icons/KeyboardArrowRight'
import {makeStyles, createStyles} from '@material-ui/core/styles';
import FooterOptions from './FooterOptions'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip';


function Footer(props:any) {
    const events = {
        handleVisibility: props.handleVisibility,
        handleInvertVisibility: props.handleInvertVisibility
    }
    return (
        <>
        <Grid container justify='center'>
        <Grid item xs>
            <Grid container alignItems='center'>
                <Grid item xs={6}>
                <Typography> {props.selectedCount} Selected</Typography>
                </Grid>
                <Grid item>
                    <FooterOptions events={events}></FooterOptions>
                </Grid>
                <Grid item>
                    <Tooltip title='Next'>
                    <IconButton onClick={props.handleNext}>
                        <NextIcon/>
                    </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
        </>
    )
}

export default Footer

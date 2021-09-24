import React from 'react'
import EyeIcon from '../../icons/eyeIcon';
import EyeSlashIcon from '../../icons/eyeSlashIcon';
import IconButton  from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {useStyles } from './styles/TreeNodeStyle'

const VisiblilityIcon = (props:any) => {
    const classes = useStyles();
    if(props.visibility === true){
        return (
            <IconButton style={props.style} size='small' onClick = {() => props.onClick(false,props.node)}>
                <EyeIcon fontSize='small' className={props.visibility ? classes.actionShow : classes.actionHide}  width='16' height='16' />
            </IconButton>
        )
    }
    else{
        return (
            <IconButton style={props.style} size='small' onClick = {() => props.onClick(true,props.node)}>
                <EyeSlashIcon fontSize='small' className={props.visibility ? classes.actionShow : classes.actionHide}  width='16' height='16'/>
            </IconButton>
        )
    }
}

interface ShowHideProps {
  rowData: any,
  visibility:boolean,
  onChangeVisibility: (toShow:boolean,node:any) => void
}

function ShowHide(props:ShowHideProps) {
    const classes = useStyles();
    return (
        <Grid container alignItems='center' className={classes.hideText} style={{width:'100%',height:'100%'}}>
            <Grid item>
            <VisiblilityIcon 
                style={{marginLeft:10}}
                node = {props.rowData} 
                visibility={props.visibility} 
                onClick={props.onChangeVisibility}></VisiblilityIcon>
            </Grid>
        </Grid>
    )
}

export default ShowHide;


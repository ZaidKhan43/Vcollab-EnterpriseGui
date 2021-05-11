import React from 'react'
import clsx from 'clsx'
import {invertNode} from '../../../../store/sideBar/productTreeSlice';
import { useAppDispatch} from "../../../../store/storeHooks";
import SwapIcon from '@material-ui/icons/SwapHoriz';
import {useStyles } from './styles/TreeNodeStyle'
import IconButton  from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const InvertIcon = (props:any) => {
        const classes = useStyles();

        return <SwapIcon fontSize='small' className={clsx({[classes.actionShow]: props.visibility,
                                          [classes.actionHide]: !props.visibility,
                                    })} 
                width='16' height='16' />
}

function InvertCell(props:any) {
    const dispatch = useAppDispatch();
    const handleInvert = (node:any) => {
        dispatch(invertNode({nodeId:node.id}));
    }
    const classes = useStyles();
    return (
        props.rowData.children.length > 0 ? 
        <Grid container alignItems='center' className={classes.hideText} style={{height:'100%',width:'100%'}}>
            <Grid item>
                <IconButton size="small"  onClick = {() => handleInvert(props.rowData)}>
                <InvertIcon visibility = {props.rowData.state.visibility} >
                </InvertIcon>
                </IconButton>
            </Grid>
        </Grid>
        :null
    )
}

export default InvertCell;


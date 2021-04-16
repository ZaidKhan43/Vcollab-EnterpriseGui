import React from 'react'
import {invertNode} from '../../../../store/sideBar/ProductTreeSlice';
import { useAppDispatch} from "../../../../store/storeHooks";
import SwapIcon from '@material-ui/icons/SwapHoriz';
import {useStyles } from './styles/TreeNodeStyle'

const InvertIcon = (props:any) => {
        const classes = useStyles();

        return <SwapIcon className={props.visibility ? classes.actionShow : classes.actionHide} onClick = {() => props.handleInvert(props.node)} width='16' height='16' />
}

function InvertCell(props:any) {
    const dispatch = useAppDispatch();
    const handleInvert = (node:any) => {
        dispatch(invertNode({nodeId:node.id}));
    }
    return (
        <div >
                {
                    props.rowData.children.length > 0 ? <InvertIcon node = {props.rowData} visibility = {props.rowData.state.visibility} handleInvert={handleInvert}></InvertIcon> : null
                }
                
        </div>
    )
}

export default InvertCell;


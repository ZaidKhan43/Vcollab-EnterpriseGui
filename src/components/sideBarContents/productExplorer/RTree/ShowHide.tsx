import React from 'react'
import {toggleVisibilityAsync} from '../../../../store/sideBar/ProductTreeSlice';
import { useAppDispatch} from "../../../../store/storeHooks";
import EyeIcon from '../../../common/svgIcons/eyeIcon';
import EyeSlashIcon from '../../../common/svgIcons/eyeSlashIcon';
import {useStyles } from './styles/TreeNodeStyle'

const VisiblilityIcon = (props:any) => {
    const classes = useStyles();
    if(props.visibility == true){
        return <EyeIcon className={props.visibility ? classes.actionShow : classes.actionHide} onClick = {() => props.onClick(false,props.node)} width='16' height='16' />
    }
    else{
        return <EyeSlashIcon className={props.visibility ? classes.actionShow : classes.actionHide} onClick = {() => props.onClick(true,props.node)} width='16' height='16'/>
    }
}

function ShowHide(props:any) {
    const dispatch = useAppDispatch();
    const handleVisibility = (toShow:boolean,node:any) => {
        dispatch(toggleVisibilityAsync({toShow, nodeId:node.id}));

    }
    return (
        <div>
                <VisiblilityIcon 
                node = {props.rowData} 
                visibility={props.visibility} 
                onClick={handleVisibility}></VisiblilityIcon>
                
        </div>
    )
}

export default ShowHide;


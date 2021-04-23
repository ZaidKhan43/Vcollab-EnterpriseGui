import React from 'react'
import Checkbox from '../../../common/checkbox'
import Typography from '@material-ui/core/Typography'
import {useStyles} from './styles/TreeNodeStyle'
import {selectProductTreeData, TreeNode as ITreeNode } from "../../../../store/sideBar/ProductTreeSlice"
import {useAppSelector} from "../../../../store/storeHooks"
function TreeNode(props:any) {
    const {rowData, onCheck, onHighlight, checked, highlighted, partiallyChecked} = props;
    const treeData = useAppSelector(selectProductTreeData);
    const classes = useStyles({});
    const getNode = (nodeId:string): ITreeNode => {
        return treeData[nodeId]
    }
    return (
        <span className={props.visibility?classes.actionShow:classes.actionHide}>
            <Checkbox color='default' size='small' checked= {checked} indeterminate={partiallyChecked} disableRipple onChange = {(e:any) => onCheck(e.target.checked,rowData.id)}></Checkbox>
            <Typography 
                component="span" className={highlighted ? classes.hightlight : ""} 
                onDoubleClick = {() => onHighlight(!highlighted,rowData.id)}
            >
                    {rowData.title}
            </Typography>
        </span>
    )
}

export default TreeNode

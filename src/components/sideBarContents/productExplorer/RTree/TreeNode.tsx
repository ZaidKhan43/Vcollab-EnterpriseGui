import React from 'react'
import Checkbox from '../../../common/checkbox'
import Typography from '@material-ui/core/Typography'
import {useStyles} from './styles/TreeNodeStyle'
function TreeNode(props:any) {
    const {rowData, onCheck, checked, partiallyChecked} = props;
    const classes = useStyles({});
    return (
        <span className={props.visibility?classes.actionShow:classes.actionHide}>
            <Checkbox color='default' size='small' checked= {checked} indeterminate={partiallyChecked} disableRipple onChange = {(e:any) => onCheck(e.target.checked,rowData.index)}></Checkbox>
            <Typography component="span">{rowData.title}</Typography>
        </span>
    )
}

export default TreeNode

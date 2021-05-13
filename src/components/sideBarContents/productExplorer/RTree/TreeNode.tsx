import React from 'react'
import Checkbox from '../../../shared/checkbox'
import Typography from '@material-ui/core/Typography'
//import Grid from '@material-ui/core/Grid'
import {useStyles} from './styles/TreeNodeStyle'
function TreeNode(props:any) {
    const {rowData, onCheck, onHighlight, checked, highlighted, partiallyChecked} = props;
    const classes = useStyles({});

    return (
        <span className={props.visibility?classes.actionShow:classes.actionHide} style={{width:'100%',height:'100%',margin:'auto'}}>
            <Checkbox color='default' size='small' checked= {checked} indeterminate={partiallyChecked} disableRipple onChange = {(e:any) => onCheck(e.target.checked,rowData.id)}></Checkbox>
            <Typography 
                style={{verticalAlign:'middle'}}
                component="span" className={highlighted ? classes.hightlight : ""} 
                onDoubleClick = {() => onHighlight(!highlighted,rowData.id)}
            >
                    {rowData.title}
            </Typography>
        </span>
    )
}

export default TreeNode

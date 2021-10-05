import React, { FC } from 'react'
import RsTreeSearch, {RsTreeSearchProps} from '../../../shared/RsTreeWithSearch'
import Title from '../../../shared/RsTreeWithSearch/utilComponents/TitleNode'
import Grid from '@material-ui/core/Grid'
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
type LimitedTreeTableProps = Omit<RsTreeSearchProps, "renderTreeToggle" | "treeNode">;
interface SharedTreeProps extends LimitedTreeTableProps {

}

function Tree(props:SharedTreeProps) {
    return (
        <RsTreeSearch {...props}
            hover
            selectable
            treeNode={
            rowData =>
            <Grid container alignItems='center'>
                <Grid item>
                <div style={{width:10}}></div>
                </Grid>
                <Grid item>
                <Title rowData = {rowData}></Title>
                </Grid>
            </Grid>
        }
        renderTreeToggle = {(icon,rowData) => {
                    if (rowData.children && rowData.children.length === 0) {
                    return null;
                    }
                    let state = props.data[rowData.id].state;
                    return state.expanded? <TreeExpandedIcon viewBox="0 -7 24 24"/>:<TreeCollapseIcon viewBox="0 -7 24 24"/>
                }
        }
            
        />
    )
}

export default Tree

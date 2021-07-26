import React, { FC } from 'react'
import RsTreeSearch, {RsTreeSearchProps} from '../../../shared/RsTreeWithSearch'
import Title from '../../../shared/RsTreeWithSearch/utilComponents/TitleNode'
import Grid from '@material-ui/core/Grid'
function Tree(props:RsTreeSearchProps) {
    return (
        <RsTreeSearch {...props} 
            selectOnlyLeaf
            renderNode={
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
        />
    )
}

export default Tree

import React from 'react'
import Table, {Cell, Column, ColumnGroup} from '../../../shared/RsTable'
function Tree(props:any) {
    return (
        <Table {...props} >
            {
                props.children
            }
        </Table>
    )
}

export default Tree

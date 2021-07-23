import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Table, {Cell, Column, ColumnGroup, HeaderCell} from '../RsTable'
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export interface Node {
  id: string,
  pid:string,
  name: string,
  children: string[]
  state: NodeState
}
export interface NodeState {
  expanded: boolean
}

export interface TreeProps {
    rowKey:string,
    rowClassName?:string,
    defaultExpandedRowKeys?:string[],
    onExpandChange?:(expanded:boolean, rowData:object) => void,
    data: any,
    renderNode?: (rowData:any) => any,
    width:number,
    height:number
}

const useStyles = makeStyles(theme => ({
    root: {

    },
    row: {
        '& .rs-table-cell-content': {
          display: 'flex !important'
        }
      },
}))
function RsTree(props:TreeProps) {
    const classes = useStyles();
    return (
        <Table 
         {...props} 
         rowClassName = {clsx(props.rowClassName,classes.row)}
         height = {props.height-5}
         isTree
         virtualized={true}
         showHeader={false}
         rowHeight = {(rowData:any) => 40}
         rowExpandedHeight = { 40}
         onExpandChange = {props.onExpandChange}
         defaultExpandedRowKeys = {props.defaultExpandedRowKeys ? props.defaultExpandedRowKeys : []}
         renderTreeToggle={(icon:any, rowData:any,expanded:boolean) => {
            if (rowData.children && rowData.children.length === 0) {
              return <TreeExpandedIcon style={{visibility:'hidden'}}/>;
            }
            return expanded? <TreeExpandedIcon viewBox="0 -7 24 24"/>:<TreeCollapseIcon viewBox="0 -7 24 24"/>
          }}
        >
            <Column width={900} treeCol={true}>
        {/*
 // @ts-ignore */}
                <HeaderCell>RTree</HeaderCell>
                   {/*
 // @ts-ignore */}
                <Cell>
                    {
                      rowData => {
                          
                          return props.renderNode ? props.renderNode(rowData) :
                          <Grid container alignItems='center'>
                              <Grid item>
                              <div style={{width:10}}></div>
                              </Grid>
                              <Grid item>
                                <Typography>{
                                    rowData.title? rowData.title :
                                    rowData.label? rowData.label :
                                    rowData.name ? rowData.name :
                                    null}</Typography>
                              </Grid>
                          </Grid>
                      }
                    }
                </Cell>
            </Column>
        </Table>
    )
}

export default RsTree

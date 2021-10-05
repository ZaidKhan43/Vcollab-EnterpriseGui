import React, {useCallback, useEffect, useRef, useState} from 'react'
import Table, {Cell,Column,ColumnGroup,HeaderCell} from '../RsTable'
import clsx from 'clsx'
import useContainer from '../../../customHooks/useContainer';
import { makeStyles } from '@material-ui/core/styles';

export type {Cell, Column, ColumnGroup};

const useRTreeOverrideStyles = makeStyles((theme) => ({
  row: {
    '& .rs-table-cell-content': {
      display: 'flex !important'
    }
  },
  rightColumn: {
      '& .rs-table-cell-group-fixed-right': {
        background:'transparent'
      }
    },
    invertCell: {
      zIndex: '10!important' as any,
      left: '10px!important'
    }
})) 

export interface ITreeNodeState {
  checked?: boolean,
  partiallyChecked?: boolean,
  expanded?: boolean,
  highlighted?: boolean,
  visibility?: boolean,
  selected?: boolean
}

export interface ITreeNode {
  id:string,
  pid:string|null,
  title:string,
  children:string[],
  state:ITreeNodeState,
  attributes?:any
}

export interface ITreeTableProps {
  treeData: ITreeNode[],
  defaultExpandedIds: string[],
  renderTreeToggle: (icon:any, rowData:any) => any,
  onExpand: (toOpen:boolean,nodeId:string) => void,
  treeNode: (node:ITreeNode) => JSX.Element,
  column1?: (node:ITreeNode) => JSX.Element,
  column2?: (node:ITreeNode) => JSX.Element
}

function RTree(props:ITreeTableProps) {

    const containerRef = useRef(null);
    // eslint-disable-next-line
    const [containerWidth, containerHeight] = useContainer(containerRef,props.treeData);
    // eslint-disable-next-line
    const [expandedNodes,setExpandedNodes] = useState<string[]>(props.defaultExpandedIds);
    
    const overrideClasses = useRTreeOverrideStyles();
      return (
      <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
          {
            
          /*
// @ts-ignore */}
          <Table
            isTree
            defaultExpandedRowKeys = {expandedNodes}
            rowKey="id"
            rowHeight = {(rowData:any) => 40}
            rowExpandedHeight = { 40}
            width={300}
            height={containerHeight? containerHeight - 5 : 0}
            data={props.treeData}
            virtualized={true}
            showHeader={false}
            onExpandChange={(isOpen:boolean, rowData:any) => {
              props.onExpand(isOpen, rowData.id);
            }}
            rowClassName={clsx(overrideClasses.row,overrideClasses.rightColumn)}
            renderTreeToggle={(icon, rowData:any) => {
              return props.renderTreeToggle(icon,rowData);
            }}
          >
            <Column width={900} treeCol={true} align='left' verticalAlign='middle' >
            {/*
 // @ts-ignore */}
            <HeaderCell>Tree</HeaderCell>
            {/*
 // @ts-ignore */}
            <Cell align='center' verticalAlign='middle' >
              {
                rowData => {
                  return (
                    props.treeNode(rowData as unknown as ITreeNode)
                  )
                }
              }
            </Cell>
            </Column>
            <ColumnGroup fixed= { 'right'} header="Actions" align='right' verticalAlign='middle' >
            {
              props.column1 ?
              (<Column fixed={'right'} width={30} verticalAlign='middle' align='left'>
              {/*
  // @ts-ignore */}
              <HeaderCell>Invert</HeaderCell>
              {/*
  // @ts-ignore */}
              <Cell className={overrideClasses.invertCell} align='right' verticalAlign='middle' >
                {
                  rowData => {
                    return props.column1? props.column1(rowData as unknown as ITreeNode):null;
                  }
                }
              </Cell>
            </Column>) : null
            }
            {
              props.column2 ?
              <Column fixed={'right'} width={40} verticalAlign='middle' align='left'>
              {/*
 // @ts-ignore */}
              <HeaderCell>ShowHide</HeaderCell>
              {/*
 // @ts-ignore */}
              <Cell  align='right' verticalAlign='middle'>
                {
                  rowData => {
                      return props.column2? props.column2(rowData as unknown as ITreeNode):null;
                  }
                }
              </Cell>
            </Column> : null
            }
            
            </ColumnGroup>
 
          </Table>
        </div>
      );
  }

  export default RTree
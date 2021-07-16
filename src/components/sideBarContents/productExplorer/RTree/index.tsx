import React, {useCallback, useEffect, useRef, useState} from 'react'
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import Table, {Cell,Column,ColumnGroup,HeaderCell} from '../../../shared/RsTable'
import clsx from 'clsx'
import useContainer from '../../../../customHooks/useContainer';
import {useAppSelector , useAppDispatch} from '../../../../store/storeHooks'
import {selectProductTreeData, selectRootIds, setCheckedNodesAsync, setHightLightedNodesAsync, expandNode, TreeNode as ITreeNode} from '../../../../store/sideBar/productTreeSlice'
import TreeNode from "./TreeNode"
import InvertCell from "./Invert"
import ShowHideCell from "./ShowHide"
import { makeStyles } from '@material-ui/core/styles';

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

function RTree(props:any) {

    const containerRef = useRef(null);
    const treeData = useAppSelector(selectProductTreeData);
    const treeDataRef = useRef(treeData);
    // eslint-disable-next-line
    const [containerWidth, containerHeight] = useContainer(containerRef,[treeData]);
    const rootIds = useAppSelector(selectRootIds);
    const dispatch = useAppDispatch()
    const [data,setData] = useState<any[]>([]);
    // eslint-disable-next-line
    const [expandedNodes,setExpandedNodes] = useState<string[]>([]);
    
    const getNode = useCallback((id:string) => treeData[id],[treeData]);
    useEffect(() => {
      const createTreeNode = (id:string,data:Map<string,ITreeNode>) => {
        let node = treeDataRef.current[id];
        if(node) {
          if(node.state.expanded) {
            expandedNodes.push(node.id);
          }
          let children:any[] = [];
          if(node.children.length > 0)
          {
            children = node.children.map((c:string) => createTreeNode(c,data));
          }
          return {
            id: node.id,
            pid: node.pid,
            title: node.title,
            children
          }
        }
  
      }
      const convertListToTree = (data:Map<string,ITreeNode>,rootIds:string[]) => {
        let root = [createTreeNode(rootIds[0],data)];
        return root;
      }
      if(treeDataRef.current)
      setData(convertListToTree(treeDataRef.current,rootIds));
    },[rootIds,expandedNodes])
    const handleExpand = (toOpen:boolean,nodeId:string) => {
      dispatch(expandNode({toOpen,nodeId}));
    }
    const handleCheck = (toCheck:boolean, nodeId:string) => {
      dispatch(setCheckedNodesAsync({toCheck,nodeId}));
    }
    const handleHighlight = (toHighlight:boolean, nodeId:string) => {
      dispatch(setHightLightedNodesAsync({toHighlight,nodeId}))
    }
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
            data={data as any}
            virtualized={true}
            showHeader={false}
            onExpandChange={(isOpen:boolean, rowData:any) => {
              handleExpand(isOpen, rowData.id);
            }}
            rowClassName={clsx(overrideClasses.row,overrideClasses.rightColumn)}
            renderTreeToggle={(icon, rowData:any) => {
              if (rowData.children && rowData.children.length === 0) {
                return null;
              }
              let state = treeData[rowData.id].state;
              return state.expanded? <TreeExpandedIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>:<TreeCollapseIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>
            }}
            affixHorizontalScrollbar
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
                  let node = getNode(rowData.id);
                  return (
                    <TreeNode rowData={rowData} visibility= {node?.state.visibility} checked={node?.state.checked} highlighted={node?.state.highlighted} partiallyChecked={node?.state.partiallyChecked} onCheck={handleCheck} onHighlight={handleHighlight}></TreeNode>
                  )
                }
              }
            </Cell>
            </Column>
            <ColumnGroup fixed= { 'right'} header="Actions" align='right' verticalAlign='middle' >
            <Column fixed={'right'} width={30} verticalAlign='middle' align='left'>
              {/*
 // @ts-ignore */}
              <HeaderCell>Invert</HeaderCell>
              {/*
 // @ts-ignore */}
              <Cell className={overrideClasses.invertCell} align='right' verticalAlign='middle' >
                {
                  rowData => {
                    let node = getNode(rowData.id);
                    return (
                      <InvertCell rowData = {node} ></InvertCell>
                    )
                  }
                }
              </Cell>
            </Column>
            <Column fixed={'right'} width={40} verticalAlign='middle' align='left'>
              {/*
 // @ts-ignore */}
              <HeaderCell>ShowHide</HeaderCell>
              {/*
 // @ts-ignore */}
              <Cell  align='right' verticalAlign='middle'>
                {
                  rowData => {
                    let node = getNode(rowData.id);
                    return (
                      <ShowHideCell rowData = {node} visibility={node?.state.visibility}></ShowHideCell>
                    )
                  }
                }
              </Cell>
            </Column>
            </ColumnGroup>
 
          </Table>
        </div>
      );
  }

  export default RTree
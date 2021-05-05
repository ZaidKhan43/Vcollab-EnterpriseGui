import React, {useState} from 'react'
import useLoadCss from "../../../../customHooks/useLoadCss";
import useContainer from '../../../../customHooks/useContainer';
import { Table ,Column, ColumnGroup, HeaderCell, Cell, } from 'rsuite-table';
import {useAppSelector , useAppDispatch} from '../../../../store/storeHooks'
import {selectProductTreeData, selectRootIds, setCheckedNodesAsync, setHightLightedNodesAsync, expandNode, TreeNode as ITreeNode} from '../../../../store/sideBar/ProductTreeSlice'
import TreeNode from "./TreeNode"
import InvertCell from "./Invert"
import ShowHideCell from "./ShowHide"
import { makeStyles } from '@material-ui/core/styles';

const useRTreeOverrideStyles = makeStyles((theme) => ({
  tree: {
      '& .rs-table-scrollbar': {
        background: theme.palette.type === 'dark' ? 'rgba(230, 230, 230, 0.05)':'rgba(25, 25, 25, 0.05)',
        position: 'absolute'
      },
      '& .rs-table-scrollbar-active': {
        background: theme.palette.type === 'dark' ? 'rgba(230, 230, 230, 0.1)':'rgba(25, 25, 25, 0.1)'
      },
      '& .rs-table-scrollbar-handle': {
        position: 'absolute',
        background: theme.palette.type === 'dark' ? 'rgba(230, 230, 230, 0.5)':'rgba(25, 25, 25, 0.5)',
        borderRadius: '4px'
      },
      '':{

      }
  },
  rightColumn: {
      '& .rs-table-cell-group-fixed-right': {
        background: 'transparent',
        
      }
    }
})) 

function RTree(props:any) {
    // need for future use
    // eslint-disable-next-line 
    const updateCssPath = useLoadCss('./globalStyles/RTreeStylesOverrideDark.css');
    const {containerRef, containerHeight} = useContainer();
    const treeData = useAppSelector(selectProductTreeData);
    const dispatch = useAppDispatch()
    const expandedNodes:string[] = [];
    
    const getNode = (id:string) => treeData[id];
    const createTreeNode = (id:string,data:Map<string,ITreeNode>) => {
      let node = getNode(id);
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
    const rootIds = useAppSelector(selectRootIds);
    const [data] = useState(convertListToTree(treeData,rootIds));
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
          {/*
// @ts-ignore */}
          <Table
            className = {overrideClasses.tree}
            isTree
            defaultExpandedRowKeys = {expandedNodes}
            rowKey="id"
            rowHeight = {(rowData:any) => 40}
            width={300}
            height={containerHeight-5}
            data={data as any}
            virtualized={true}
            showHeader={false}
            onExpandChange={(isOpen:boolean, rowData:any) => {
              handleExpand(isOpen, rowData.index);
            }}
            rowClassName={overrideClasses.rightColumn}
            renderTreeToggle={(icon, rowData:any) => {
              if (rowData.children && rowData.children.length === 0) {
                return <div></div>;
              }
              return icon;
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
            <ColumnGroup fixed= { 'right'} header="Actions" align='left' verticalAlign='middle' >
            <Column fixed={'right'} width={30} verticalAlign='middle' align='left'>
              {/*
 // @ts-ignore */}
              <HeaderCell>Invert</HeaderCell>
              {/*
 // @ts-ignore */}
              <Cell align='left' verticalAlign='middle' >
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
            <Column fixed={'right'} width={30} verticalAlign='middle' align='left'>
              {/*
 // @ts-ignore */}
              <HeaderCell>ShowHide</HeaderCell>
              {/*
 // @ts-ignore */}
              <Cell align='left' verticalAlign='middle'>
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
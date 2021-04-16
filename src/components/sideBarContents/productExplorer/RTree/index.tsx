import React, {useState, useEffect, useRef} from 'react'
import useLoadCss from "../../../../customHooks/useLoadCss";
import useContainer from '../../../../customHooks/useContainer';
import { Table ,Column, ColumnGroup, HeaderCell, Cell, } from 'rsuite-table';
import Paper from '@material-ui/core/Paper'
import {useAppSelector , useAppDispatch} from '../../../../store/storeHooks'
import {selectProductTreeData,checkNode, expandNode} from '../../../../store/sideBar/ProductTreeSlice'
import TreeNode from "./TreeNode"
import InvertCell from "./Invert"
import ShowHideCell from "./ShowHide"


function RTree(props:any) {
    const updateCssPath = useLoadCss('./globalStyles/RTreeStylesOverrideDark.css');
    const {containerRef, containerHeight} = useContainer();
    const treeData = useAppSelector(selectProductTreeData);
    const dispatch = useAppDispatch()
    const expandedNodes:string[] = [];
    const getNodeByIndex = (index:number) => treeData[index];
    const createTreeNode = (index:number,data:any[]) => {
      let node = data[index];
      if(node.state.expanded) {
        expandedNodes.push(node.id);
      }
      let children = [];
      if(node.children.length > 0)
      {
        children = node.children.map((c:number) => createTreeNode(c,data));
      }
      return {
        id: node.id,
        index:node.index,
        pIndex: node.pIndex,
        title: node.title,
        children
      }
    }
    const convertListToTree = (data:any[]) => {
      let root = [createTreeNode(data[0].index,data)];
      return root;
    }
    const [data, setData] = useState(convertListToTree(treeData));
    const handleExpand = (toOpen:boolean,nodeIndex:number) => {
      dispatch(expandNode({toOpen,nodeIndex}));
    }
    const handleCheck = (toCheck:boolean, nodeIndex:number) => {
      dispatch(checkNode({toCheck,nodeIndex}));
    }
      return (
      <Paper ref = {containerRef} style={{height:'100%'}} variant="outlined" square >
          {/*
// @ts-ignore */}
          <Table
            isTree
            defaultExpandedRowKeys = {expandedNodes}
            rowKey="id"
            rowHeight = {(rowData:any) => 40}
            width={300}
            height={containerHeight-5}
            data={data}
            virtualized={true}
            showHeader={false}
            shouldUpdateScroll= {true}
            onExpandChange={(isOpen:boolean, rowData:any) => {
              handleExpand(isOpen, rowData.index);
            }}
            renderTreeToggle={(icon, rowData:any) => {
              if (rowData.children && rowData.children.length === 0) {
                return <div></div>;
              }
              return icon;
            }}
          >
            <Column  width={900} align='left' verticalAlign='middle' >
            {/*
 // @ts-ignore */}
            <HeaderCell>Tree</HeaderCell>
            {/*
 // @ts-ignore */}
            <Cell align='center' verticalAlign='middle' >
              {
                rowData => {
                  let node = getNodeByIndex(rowData.index);
                  return (
                    <TreeNode rowData={rowData} visibility= {node.state.visibility} checked={node.state.checked} partiallyChecked={node.state.partiallyChecked} onCheck={handleCheck}></TreeNode>
                  )
                }
              }
            </Cell>
            </Column>
            <ColumnGroup fixed='right' header="Actions" align='left' verticalAlign='middle' >
            <Column fixed='right' width={25} verticalAlign='middle' align='left'>
              {/*
 // @ts-ignore */}
              <HeaderCell>Invert</HeaderCell>
              {/*
 // @ts-ignore */}
              <Cell align='left' verticalAlign='middle' >
                {
                  rowData => {
                    let node = getNodeByIndex(rowData.index);
                    return (
                      <InvertCell rowData = {node} ></InvertCell>
                    )
                  }
                }
              </Cell>
            </Column>
            <Column fixed='right' width={25} verticalAlign='middle' align='left'>
              {/*
 // @ts-ignore */}
              <HeaderCell>ShowHide</HeaderCell>
              {/*
 // @ts-ignore */}
              <Cell align='left' verticalAlign='middle'>
                {
                  rowData => {
                    let node = getNodeByIndex(rowData.index);
                    return (
                      <ShowHideCell rowData = {node} visibility={node.state.visibility}></ShowHideCell>
                    )
                  }
                }
              </Cell>
            </Column>
            </ColumnGroup>
 
          </Table>
        </Paper>
      );
  }

  export default RTree
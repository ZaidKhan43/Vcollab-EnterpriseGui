import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';

import {selectVariableData, selectVariableRootIds, expandVariableNode} from '../../../../store/sideBar/colormapSlice';

import RTree from '../../../shared/RsTreeTable';

import styles from './style'

import TreeNode from '../../../shared/RsTreeTable/TreeNode';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';

import { convertListToTree } from '../../../utils/tree';

export default function Variable(){

  const dispatch = useAppDispatch();  

  const  treeDataRedux = useAppSelector(selectVariableData);
  const treeRootIds = useAppSelector(selectVariableRootIds);
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);


  const classes = styles();
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandVariableNode({toOpen,nodeId}))
  }
  

  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderRightIcon = () => {
    return (
        <div>
        </div>
    )
  }

  const getBody = () => {
    return (
      <RTree 
      treeData={roots} 
        defaultExpandedIds = {expanded}
        onExpand={handleExpand}
        renderTreeToggle = {
          (icon,rowData) => {
            if (rowData.children && rowData.children.length === 0) {
              return null;
            }
            let state = treeDataRedux[rowData.id].state;
            return state.expanded? <TreeExpandedIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>:<TreeCollapseIcon style={state.visibility ? {opacity:1.0} : {opacity:0.5}} viewBox="0 -7 24 24"/>
          }
        }
        treeNode = {(node) => {
          return (
            <TreeNode 
              node={treeDataRedux[node.id]}
              onCheck={() => console.log("sa")}
            >
            </TreeNode>
          )
        }}
        column1 = {(node) => {
          return (<div></div>)
        }}
        column2 = {(node) => {
          return (
            <div>  
            </div>
          )
        }}
      />  
    )
  }


  const getFooter = () => {

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ <Title text={"Variable" } group="Color Maps"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}

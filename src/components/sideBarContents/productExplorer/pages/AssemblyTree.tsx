import {goBack, push} from 'connected-react-router/immutable';
import BackIcon from '../shared/BackIcon';
import SearchIcon from '../shared/SearchIcon';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import {Routes} from "../../../../routes"
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import RTree from '../../../shared/RsTreeTable';
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import TreeNode from '../../../shared/RsTreeTable/TreeNode';
import { convertListToTree } from '../../../utils/tree';
import {selectProductTreeData, selectRootIds,selectCheckedLeafNodes,invertNode, toggleVisibilityAsync, setCheckedNodesAsync, setHightLightedNodesAsync, expandNode} from '../../../../store/sideBar/productTreeSlice'
import Footer from '../Footer'

import ShowHideCell from '../../../shared/RsTreeTable/ShowHide';
import InvertCell from '../../../shared/RsTreeTable/Invert';

function AssemblyTree(props:any) {
    
    const checkedNodes = useAppSelector(selectCheckedLeafNodes);
    const treeDataRedux = useAppSelector(selectProductTreeData);
    const treeRootIds = useAppSelector(selectRootIds);
    const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);
    const dispatch = useAppDispatch();  
    

    const onClickBackIcon = () =>{
      dispatch(goBack());
    }

    const onClickSearchIcon = () => {
      dispatch(push(Routes.GEOMETRY_SEARCH)); 
    }

    const handleNext = () => {
      dispatch(push(Routes.GEOMETRY_DISPLAY_MODES))
    }

    const getHeaderLeftIcon= () => {
        return (
        <BackIcon onClick={onClickBackIcon}/>
        )
    }

    const getHeaderContent = () => {

          return (<Title text="Product Tree" group="Geometry"/>)
    }
    

    const getHeaderRightIcon = () => {
        return (
          <SearchIcon onClick={onClickSearchIcon} />
        )
    }

    const handleExpand = (toOpen:boolean,nodeId:string) => {
      dispatch(expandNode({toOpen,nodeId}));
    }
    const handleCheck = (toCheck:boolean, nodeId:string) => {
      dispatch(setCheckedNodesAsync({toCheck,nodeId}));
    }
 
    const handleVisibility = (toShow:boolean,node:any) => {
      dispatch(toggleVisibilityAsync({toShow, nodeId:node.id}));
    
    }
    const handleInvert = (node:any) => {
      dispatch(invertNode({nodeId:node.id}));
    }


    const getBody = () => {
      return(
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
              onCheck={handleCheck}
            >
            </TreeNode>
              )
            }
          }
          column1 = {(node) => {
            return <InvertCell node = {treeDataRedux[node.id]} onClick={handleInvert}></InvertCell>
            }
          }
          column2 = {(node) => {
            return <ShowHideCell node = {treeDataRedux[node.id]} onToggle={handleVisibility}></ShowHideCell>
          }

          }
          />
      )
    }      

    const getFooter = () => {
          return checkedNodes.length > 0 ? (<Footer selectedCount={checkedNodes.length}
            handleNext = {handleNext}
          ></Footer>) : null
    }

    return (<SideBarContainer
      headerLeftIcon = { getHeaderLeftIcon() }
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}

export default AssemblyTree;
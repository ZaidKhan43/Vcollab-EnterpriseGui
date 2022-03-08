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
import ShowHideCell from '../../../shared/RsTreeTable/ShowHide';
import InvertCell from '../../../shared/RsTreeTable/Invert';
import { convertListToTree } from '../../../utils/tree';
import {selectProductTreeData, selectRootIds,selectCheckedLeafNodes,invertNode, toggleVisibilityAsync, setCheckedNodesAsync, setHightLightedNodesAsync, expandNode} from '../../../../store/sideBar/productTreeSlice'
import Footer from '../Footer'
import { useRef } from 'react';
import useContainer from '../../../../customHooks/useContainer';
import { getItem, selectMainMenuItems, setActiveTab } from 'store/mainMenuSlice';


function AssemblyTree(props:any) {
    const treeDataRedux = useAppSelector(selectProductTreeData);
    const treeRootIds = useAppSelector(selectRootIds);
    const mainMenuItems = useAppSelector(selectMainMenuItems);
    const containerRef = useRef(null);
    // eslint-disable-next-line
    const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);
    const checkedNodes = useAppSelector(selectCheckedLeafNodes);

    const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);
    const dispatch = useAppDispatch();

    const onClickBackIcon = () =>{
      dispatch(goBack());
    }

    const onClickSearchIcon = () => {
      let item = getItem("Geometry12",mainMenuItems);
      dispatch(setActiveTab({menuItem:item}));
      dispatch(push(item.path));
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
      dispatch(expandNode({toOpen,nodeId,undoable:true}));
    }
    const handleCheck = (toCheck:boolean, nodeId:string) => {
      dispatch(setCheckedNodesAsync({toCheck,nodeId, undoable:true}));
    }
    const handleHighlight = (toHighlight:boolean, nodeId:string) => {
      dispatch(setHightLightedNodesAsync({toHighlight,nodeId}))
    }
    const handleVisibility = (toShow:boolean,node:any) => {
      dispatch(toggleVisibilityAsync({toShow, nodeId:node.id, undoable: true}));
    
    }
    const handleInvert = (node:any) => {
      dispatch(invertNode({nodeId:node.id, undoable:true}));
    }
    const getBody = () => {
      return(
        <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
          <RTree 
          treeData={roots} 
          expandedRowIds = {expanded}
          onExpand={handleExpand}
          onRowClick = {() => {}}
          width = {300}
          height = {containerHeight ? containerHeight - 5: 0}
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
          </div>
      )
    }      

    const getFooter = () => {
          return checkedNodes.length > 0 ? (<Footer selectedCount={checkedNodes.length}
            handleNext = {handleNext}
          ></Footer>) : null
    }

    return (<SideBarContainer
      headerContent={ getHeaderContent() }
      headerRightIcon = { getHeaderRightIcon() }
      body ={ getBody() }
      footer = { getFooter() }
      />)
}

export default AssemblyTree;
import {goBack, push} from 'connected-react-router/immutable';
import BackIcon from '../shared/BackIcon';
import SearchIcon from '../shared/SearchIcon';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import {Routes} from "../../../../routes"
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import RTree from '../../../shared/RsTreeTable';
import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import {selectProductTreeData, selectRootIds,selectCheckedLeafNodes,invertNode, toggleVisibilityAsync, setCheckedNodesAsync, setHightLightedNodesAsync, expandNode} from '../../../../store/sideBar/productTreeSlice'
import Footer from '../Footer'


function AssemblyTree(props:any) {
    
    const checkedNodes = useAppSelector(selectCheckedLeafNodes);
    const treeData = useAppSelector(selectProductTreeData);
    const treeRootIds = useAppSelector(selectRootIds);
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
    const handleHighlight = (toHighlight:boolean, nodeId:string) => {
      dispatch(setHightLightedNodesAsync({toHighlight,nodeId}))
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
          treeDataRedux={treeData} 
          rootIdsRedux={treeRootIds} 
          onExpand={handleExpand} 
          onCheck={handleCheck} 
          onHighlight = {handleHighlight}
          onChangeVisibility = {handleVisibility}
          onInvert={handleInvert}
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
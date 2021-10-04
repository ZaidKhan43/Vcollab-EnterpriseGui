import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import styles from './style'

import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';

import RTree from '../../../shared/RsTreeTable';
import IconButton  from '@material-ui/core/IconButton';

import AddIcon from "@material-ui/icons/Add";

import { selectcolormapData, selectRootIds, expandNode, createColorMap } from '../../../../store/sideBar/colormapSlice';

export default function List(){

  const treeData = useAppSelector(selectcolormapData);
  const treeRootIds = useAppSelector(selectRootIds);
  // const selectedCount = useAppSelector(selectedLength);

  const classes = styles()
  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
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

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandNode({toOpen,nodeId}));
  }


  const createLabel = (nodeId : string) => {
    	dispatch(createColorMap(nodeId))
  }

  const renderIcon2 = (node : any) => {
    if(node.pid === "-1")
    return(
      <span style={{marginLeft:"10px", marginTop:"5px"}}>
        <MuiIconButton size='small' onClick={() => createLabel(node.id)}>
            <AddIcon fontSize='default'/> 
        </MuiIconButton> 
      </span>
    )
    else
    return( null )
  }

  const getBody = () => {
    return (
      <div className={classes.scrollBar}>
           <RTree 
          treeDataRedux={treeData} 
          rootIdsRedux={treeRootIds} 
          checkBox ={false}
          onExpand={handleExpand}  
          onCheck={()=> console.log("hi")} 
          onHighlight = {()=> console.log("hi")}
          column1 = {()=> console.log("hi")}
          column2 = {renderIcon2}
          />
      </div>
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
            headerContent={ <Title text={"List" } group="Color Maps"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}

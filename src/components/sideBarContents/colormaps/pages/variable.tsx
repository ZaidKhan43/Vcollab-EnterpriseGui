import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';

import {selectVariableData, selectVariableRootIds, expandVariableNode} from '../../../../store/sideBar/colormapSlice';

import RTree from '../../../shared/RsTreeTable';

import styles from './style'

export default function Variable(){

  const dispatch = useAppDispatch();  

  const  treeData = useAppSelector(selectVariableData);
  const treeRootIds = useAppSelector(selectVariableRootIds);

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
      <div className={classes.scrollBar}>
         <RTree 
          treeDataRedux={treeData} 
          rootIdsRedux={treeRootIds} 
          checkBox ={false}
          onExpand={handleExpand}  
          onCheck={()=> console.log("hi")} 
          onHighlight = {()=> console.log("hi")}
          column1 = {()=> console.log("hi")}
          column2 = {() => console.log("hi")}
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
            headerContent={ <Title text={"Variable" } group="Color Maps"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}

import MuiIconButton from '@material-ui/core/IconButton';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import styles from './style'

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import RTree from '../../../shared/RsTreeTable';
import { selectCheckedLeafNodes } from '../../../../store/sideBar/labelSlice/label3DSlice';
import {invertNode, expandNode, select3DLabelData ,selectRootIds, setCheckedVisibility, invertCheckedVisibility, checkNode, createLabel, delete3DLabel , selectedLength, createParentLabel} from '../../../../store/sideBar/labelSlice/label3DSlice'
import AddIcon from "@material-ui/icons/Add";

import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import VisibilityOptions from '../components/shared/Footer/Options/VisibilityOption';

import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiEditIcon from '@material-ui/icons/EditOutlined';

import {goBack,push} from 'connected-react-router/immutable';
import {Routes} from "../../../../routes"

import InvertCell from '../../../shared/RsTreeTable/Invert';
import TreeNode from '../../../shared/RsTreeTable/TreeNode';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import ShowHideCell from '../../../shared/RsTreeTable/ShowHide';
import MuiGrid from '@material-ui/core/Grid';
import PanToolIcon from '@material-ui/icons/PanTool';

import { convertListToTree } from '../../../utils/tree';

import { useRef, useEffect } from 'react';
import useContainer from '../../../../customHooks/useContainer';
import { Layers, selectActiveLayer , setActiveLayer, setEditMode} from '../../../../store/windowMgrSlice';
import { windowPrefixId } from '../../../../store/sideBar/labelSlice/label3DSlice';

export default function Labels3D(){

  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack()); 
  }
  
  const treeDataRedux = useAppSelector(select3DLabelData);
  const treeRootIds = useAppSelector(selectRootIds);
  const checkedNodes = useAppSelector(selectCheckedLeafNodes);
  const selectedCount = useAppSelector(selectedLength);
  const activeLayer = useAppSelector(selectActiveLayer);
  const isPanBtnPressed = activeLayer === Layers.LABEL3D;
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);

  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);


  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const handlePanChange = () => {
    Object.values(treeDataRedux).forEach(e => {
        if(e.pid !== "-1")
        dispatch(setEditMode({
          uid: windowPrefixId+e.id,
          isEdit: !isPanBtnPressed
        }))
    })
    dispatch(setActiveLayer(!isPanBtnPressed ? Layers.LABEL3D : Layers.VIEWER));
}

  const getHeaderRightIcon = () => {
    return (
      <MuiToggleButton selected={isPanBtnPressed} onChange={handlePanChange}>
        <PanToolIcon/>
      </MuiToggleButton>
    )
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandNode({toOpen,nodeId}));
  }

  const handleInvert = (node:any) => {
    dispatch(invertNode({nodeId:node.id}));
  }
  
  const handleCheck = (toCheck:boolean, nodeId:string) => {
    dispatch(checkNode({toCheck,nodeId}));
  }

  const handleVisibility = (toShow:boolean,node:any) => {
    const leafIds = [node.id];
    const pids = [node.pid];
    console.log(leafIds, pids)
    dispatch(setCheckedVisibility({toShow, leafIds}))
  }

  const onHandleDeleteButton = () => {
    dispatch(delete3DLabel({}));
  }

  

  const getBody = () => {

    return (
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
        }}
        column1 = {(node) => {
          return <InvertCell node = {treeDataRedux[node.id]} onClick={handleInvert}></InvertCell>
        }}
        column2 = {(node) => {
          return (
            <div>
              { node?.pid !== "-1"
                ?
                 <ShowHideCell node = {treeDataRedux[node.id]} onToggle={handleVisibility}></ShowHideCell>
                :        
                  <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
                    <MuiGrid item xs={4}></MuiGrid>
                    <MuiGrid item xs={6}>
                      <MuiIconButton size='small' >
                        <AddIcon fontSize='default'/> 
                      </MuiIconButton> 
                    </MuiGrid>
                  </MuiGrid>
              }    
            </div>
          )
        }}
      />  
    </div>
    )
  }


  const getFooter = () => {

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
          <OptionContainer>
          <Option label="Visibility" 
            icon={
              <VisibilityOptions 
              disabled={selectedCount < 1}
              showClick={() => {dispatch(setCheckedVisibility({
                toShow: true,
                leafIds: checkedNodes.map(n => n.id)
              }))}}
              hideClick={() => {dispatch(setCheckedVisibility({
                toShow: false,
                leafIds: checkedNodes.map(n => n.id)
              }))}}
              invertClick={() => {dispatch(invertCheckedVisibility({
                leafIds: checkedNodes.map(n => n.id)
              }))}}
              />
            }/>
            <Option label="Edit" icon={<MuiIconButton disabled={selectedCount === 1 ? false : true} onClick={() =>dispatch(push(Routes.LABELS_3D_EDITS))}>
                <MuiEditIcon/>
              </MuiIconButton>} 
            />
             <Option label="Delete" icon={<MuiIconButton disabled={selectedCount >= 1? false : true} onClick={onHandleDeleteButton} > 
                  <MuiDeleteForeverOutlinedIcon/>
                </MuiIconButton> }
            />
            </OptionContainer>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ <Title text={"3D Labels" } group="Labels"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}

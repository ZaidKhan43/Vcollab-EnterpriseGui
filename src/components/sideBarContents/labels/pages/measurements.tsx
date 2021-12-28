import MuiIconButton from '@material-ui/core/IconButton';
import MuiToggleButton from '@material-ui/lab/ToggleButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import PanToolIcon from '@material-ui/icons/PanTool';

import styles from './style'

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import {InteractionMode, setInteractionMode} from 'backend/viewerAPIProxy';
import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import RTree from '../../../shared/RsTreeTable';
import { selectCheckedLeafNodes } from '../../../../store/sideBar/labelSlice/measurementsSlice';
import {windowPrefixId, invertNode, expandNode, selectMeasurementsData ,selectRootIds, setCheckedVisibility, invertCheckedVisibility, checkNode, createLabel, delete3DLabel , selectedLength, createParentLabel, selectLabelMode, setLabelMode} from '../../../../store/sideBar/labelSlice/measurementsSlice'
import { setEditMode } from '../../../../store/windowMgrSlice';

import AddCell from '../components/shared/TreeIcons/AddCell'

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

import { convertListToTree } from '../../../utils/tree';

import { useRef, useEffect } from 'react';
import useContainer from '../../../../customHooks/useContainer';
import {Layers,selectActiveLayer,setActiveLayer} from '../../../../store/windowMgrSlice'
import { selectInteractionMode, selectActiveViewerID, setLabelInsertionState, setSelectedLabelMode } from 'store/appSlice';
import { Label3DType } from 'store/sideBar/labelSlice/shared/types';

export default function Measurements(){

  const classes = styles();
  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }
  const interactionMode = useAppSelector(selectInteractionMode);
  const treeDataRedux = useAppSelector(selectMeasurementsData);
  const treeRootIds = useAppSelector(selectRootIds);
  const selectedCount = useAppSelector(selectedLength);
  const checkedNodes = useAppSelector(selectCheckedLeafNodes);
  const activeLayer = useAppSelector(selectActiveLayer);
  const viewerId = useAppSelector(selectActiveViewerID);
  const isPanBtnPressed = activeLayer === Layers.FRONT;
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
    dispatch(setActiveLayer(!isPanBtnPressed ? Layers.FRONT : Layers.VIEWER));
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
    dispatch(setCheckedVisibility({toShow, leafIds}))
  }

  const onHandleDeleteButton = () => {
    dispatch(delete3DLabel({}));
  }

  const handleAdd = (node:any) => {
      if(node.id === Label3DType.DISTANCE){
        let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT ? InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT : InteractionMode.DEFAULT;
        setInteractionMode(viewerId, mode);
        dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT));
      }
      else if(node.id === Label3DType.ARC){
        let mode = interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC ? InteractionMode.LABEL_MEASUREMENT_3PT_ARC : InteractionMode.DEFAULT;
        setInteractionMode(viewerId, mode);
        dispatch(setLabelInsertionState(interactionMode !== InteractionMode.LABEL_MEASUREMENT_3PT_ARC));
      }
  }

  const isNodeSelected = (node:any):boolean => {
    let out = false;
    switch(node.id) {
      case Label3DType.DISTANCE:
        out = interactionMode === InteractionMode.LABEL_MEASUREMENT_POINT_TO_POINT;
        break;
      case Label3DType.ARC:
        out = interactionMode === InteractionMode.LABEL_MEASUREMENT_3PT_ARC;
        break;
      default:
        break;
    }
    return out;
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
                <AddCell node = {treeDataRedux[node.id]} selected={isNodeSelected(node)} onToggle={() => handleAdd(node)}/>
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
            <Option label="Edit" icon={<MuiIconButton disabled={selectedCount === 1 ? false : true} onClick={() =>dispatch(push(Routes.LABELS_MEASUREMENTS_EDITS))}>
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
            headerContent={ <Title text={"Measurements" } group="Labels"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />
  )
}

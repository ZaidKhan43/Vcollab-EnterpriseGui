import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import SelectAction from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { colormapElements, selectColorPaletteData, selectColorPaletteRootIds, expandColorPaletteNode, createPalette, setColorPalette , selectcolormapData} from '../../../../store/sideBar/colormapSlice';

import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';
import {useState} from 'react';

import RTree from '../../../shared/RsTreeTable';
import AddIcon from "@material-ui/icons/Add";

import { convertListToTree } from '../../../utils/tree';

import TreeNodeWithoutCheckbox from '../../../shared/RsTreeTable/treeNodeWithoutCheckbox';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import MuiGrid from '@material-ui/core/Grid';

import { useRef } from 'react';
import useContainer from '../../../../customHooks/useContainer';

export default function ColorPalette(){

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);
  const colormapsData = useAppSelector(selectcolormapData)
  const colormapNamelist = useAppSelector(colormapElements)
  
  const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
  const selectedColorPalette = colormapsData[activeColormapId].colorPalette;
 

  const treeDataRedux = useAppSelector(selectColorPaletteData);
  const treeRootIds = useAppSelector(selectColorPaletteRootIds);
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);

  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);

  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleSelect = (id : string) => {
    setActiveColormapId(id)
  }

  const handleExpand = (toOpen:boolean,nodeId:string) => {
    dispatch(expandColorPaletteNode({toOpen,nodeId}));
  }

  const handleCreatePalette = () => {
    dispatch(createPalette());
  }

  const handlePaletteClick = (node :any) => {
    dispatch(setColorPalette({colorMapId :activeColormapId, colorPaletteId : node.id}))
  }
  
  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getAction = () => {
    return(
      <SelectAction
      labelId="display-modes-selection-label-id"
      id="display-modes-selection-id"
      value={activeColormapId}
      onChange={(e : any) => onHandleSelect(e.target.value)}
      MenuProps={{
        disablePortal: true,
        anchorOrigin: {
          vertical:"bottom",
          horizontal:"left",
       },
       getContentAnchorEl: null
      }}
      >
        {
            colormapNamelist.map((item : any) => 
              <MuiMenuItem value={item.id}>{item.name}</MuiMenuItem>  
          )}
      </SelectAction>
    )
  }

  const getHeaderRightIcon = () => {
    return (
        <div>
        </div>
    )
  }

  const getBody = () => {
    return (
      <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
      <RTree 
      treeData={roots} 
        defaultExpandedIds = {expanded}
        onExpand={handleExpand}
        onRowClick = {handlePaletteClick}
        width = {300}
        hover={true}
        selected={selectedColorPalette}
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
            <TreeNodeWithoutCheckbox 
              node={treeDataRedux[node.id]}
              onCheck={() => console.log("sa")}
            >
            </TreeNodeWithoutCheckbox>
          )
        }}
        column1 = {(node) => {
          return (<div></div>)
        }}
        column2 = {(node) => {
          return (
            <div>
              { node?.pid !== "-1"
                ?
                 <div></div>
                :        
                  <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
                    <MuiGrid item xs={4}></MuiGrid>
                    <MuiGrid item xs={6}>
                      {
                        node.id === "1"
                        ?
                        <MuiIconButton size='small' 
                      onClick={() => handleCreatePalette()}
                      >
                        <AddIcon fontSize='default'/> 
                      </MuiIconButton> 
                      :
                      null
                      }
                      
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
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ <Title text={"Color Palette" } group="Color Maps"/> }
            headerAction = {getAction()} 
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}

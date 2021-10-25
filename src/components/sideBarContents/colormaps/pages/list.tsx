import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import styles from './style'

import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';

import RTree from '../../../shared/RsTreeTable';
 
import AddIcon from "@material-ui/icons/Add";

import { selectcolormapData, selectColormapRootIds, expandNode, createColorMap, setColorMapSelection, ColormapType } from '../../../../store/sideBar/colormapSlice';

import TreeNodeWithoutCheckbox from '../../../shared/RsTreeTable/treeNodeWithoutCheckbox';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import MuiGrid from '@material-ui/core/Grid';

import { convertListToTree } from '../../../utils/tree';

import { useRef } from 'react';
import useContainer from '../../../../customHooks/useContainer';

import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiVisibilityIcon from '@material-ui/icons/Visibility';
import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';
import MuiCheckIcon from '@material-ui/icons/Check';


import { useState } from 'react';

export default function List(){

  const treeDataRedux = useAppSelector(selectcolormapData);
  const treeRootIds = useAppSelector(selectColormapRootIds);
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);

  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);

  const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);

  const [openDelete, setOpenDelete] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleCreateLabel = (nodeId : string) => {
    	dispatch(createColorMap(nodeId))
  }

  const handleRowClick = (node : any) => {
    if(node.children.length === 0)
      dispatch(setColorMapSelection(node.id));
  }


  const getBody = () => {
    return (
      <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
      <RTree 
        treeData={roots} 
        expandedRowIds = {expanded}
        onExpand={handleExpand}
        onRowClick = {handleRowClick}
        width = {300}
        hover={true}
        selectable={true}
        selected={[selectedColorMapId]}
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
                      <MuiIconButton size='small' onClick={() => handleCreateLabel(node.id)}>
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
      <div>
        { !openDelete
          ?
            <div>
              { true
              // selectedColorPalette !== "-1" && selectedColorPalette !== appliedColorPalette 
                ?
                  <div style={{marginTop:"20px", marginBottom:"20px"}}>
                    <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                      autoFocus 
                      // onClick={onHandleApply} 
                      // disabled={readOnly}
                      // color="primary"
                    >
                      Apply
                    </MuiButton>
                  </div>
                :
                   null
              }                                 
                              
              <OptionContainer>
                <Option label={ treeDataRedux[selectedColorMapId]?.colormapType !== ColormapType.USER ? "Edit" : "View"} 
                  icon={<MuiIconButton 
                    // disabled={selectedColorPalette === "-1" }
                    // onClick={onHandleEdit}
                    >
                      { treeDataRedux[selectedColorMapId]?.colormapType !== ColormapType.USER
                        ?
                          <MuiEditIcon/>
                        :
                          <MuiVisibilityIcon/>
                      }  
                    </MuiIconButton>
                  } 
                />

                <Option label="Copy" 
                  icon={ <MuiIconButton 
                    disabled={selectedColorMapId === "-1"}
                    // onClick={() => setCopied(true)}
                    > 
                      <MuiFileCopyOutlinedIcon/>
                    </MuiIconButton>
                  }
                />
                <Option label="Paste" 
                  icon={ <MuiIconButton 
                    // disabled={!copied} 
                    // onClick={onHandlePaste}
                    > 
                      <MuiPaste/>
                    </MuiIconButton>
                  }
                />
                <Option label="Delete" 
                  icon={ <MuiIconButton 
                    // disabled={selectedColorPalette === "-1" || treeDataRedux[selectedColorPalette].pid === "0" || selectedColorPalette === appliedColorPalette}
                    // onClick={onHandleDeleteButton}
                    > 
                      <MuiDeleteForeverOutlinedIcon/>
                    </MuiIconButton>
                  }
                />     
              </OptionContainer>
            </div>
          :
              <div>
                <div style={{marginBottom:"5px", marginTop:"5px"}}>
                  <MuiTypography style={{marginBottom:"5px", fontSize:"14px"}}>
                    Are you sure want to delete the selected Color Palette?
                  </MuiTypography>
                  <div style={{alignContent:"center",}}>
                    <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                      autoFocus 
                      // onClick={onHandleDelete} 
                      // color="primary"
                    >
                      Confirm
                    </MuiButton>
                    <MuiButton style={{width:"20%", fontSize:"9px"}}
                      // onClick={() => setOpenDelete(false)} 
                      // color="primary"
                    >
                      Cancel
                    </MuiButton>
                  </div>
                </div>
              </div>
          }          
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

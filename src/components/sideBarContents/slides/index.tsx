import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackButton from '../../icons/back';

import {useAppDispatch, useAppSelector} from '../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';

import RTree from '../../shared/RsTreeTable';
 
import AddIcon from "@material-ui/icons/Add";

import { selectSlideData, selectRootIds, expandNode, setSlideSelection, createNode } from '../../../store/sideBar/slideSlice';

import TreeNodeWithoutCheckbox from '../../shared/RsTreeTable/treeNodeWithoutCheckbox';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import MuiGrid from '@material-ui/core/Grid';

import { convertListToTree } from '../../utils/tree';

import { useRef , useEffect} from 'react';
import useContainer from '../../../customHooks/useContainer';

import GridViewIcon from '../../icons/gridView';

import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiVisibilityIcon from '@material-ui/icons/Visibility';
import OptionContainer from '../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'
import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';
import MuiCheckIcon from '@material-ui/icons/Check';

import CreateNewFolderIcon from '../../icons/createNewFolder';

import MuiDownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import MuicloudDoneIcon from '@material-ui/icons/CloudDone';

import {Routes} from "../../../routes"

import { useState } from 'react';


export default function Slides (){

    const treeDataRedux = useAppSelector(selectSlideData);
  const treeRootIds = useAppSelector(selectRootIds);
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);

  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);

  const selectedSlideId = useAppSelector(state => state.slide.selectedSlide);

  const appliedSlideId = useAppSelector(state => state.slide.appliedSlide);

  const [openDelete, setOpenDelete] = useState(false);
  const [copied, setCopied] = useState<any>();

    const dispatch = useAppDispatch();

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const handleExpand = (toOpen:boolean,nodeId:string) => {
        dispatch(expandNode({toOpen,nodeId}));
    }    
    
    const handleRowClick = (node : any) => {
        if(node.children.length === 0 && node.pid !== "-1")
          dispatch(setSlideSelection(node.id));
      }
    
    const onHandleCreateGroup = () => {
      dispatch(createNode("-1"));
    }

    const handleCreateNode = (nodeId :string) => {
      dispatch(createNode(nodeId));
    }

    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={onClickBackIcon} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return ( 
          <MuiIconButton
          //   onClick={() => handleCreateLabel(node.id)}
          >
              <GridViewIcon /> 
          </MuiIconButton> 
        )
    }

    const getAction = () => {
        return (
            null
        )
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
        selected={[selectedSlideId]}
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
          return (
            <div>
                { node?.children.length !== 0 || node?.pid === "-1"
                   ?
                    <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
                        <MuiGrid item xs={8}>
                            <MuiIconButton size='small' 
                            //   onClick={() => handleCreateLabel(node.id)}
                            >
                                <GridViewIcon /> 
                            </MuiIconButton> 
                        </MuiGrid>
                    </MuiGrid>
                   :
                    null
                }
            </div>
          )
        }}
        column2 = {(node) => {
          return (
            <div>
              { node?.pid !== "-1" && node?.children.length === 0
                ?
                <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
                    <MuiGrid item xs={9}></MuiGrid>
                    <MuiGrid item xs={3}>
                { appliedSlideId === node.id
                  ?
                      <MuiCheckIcon fontSize='small'/>
                  :
                    treeDataRedux[node.id].pid !== "-1"
                      ?
                        treeDataRedux[node.id].downloaded === true 
                          ?
                            <MuicloudDoneIcon fontSize='small'/>
                          :
                            <MuiDownloadIcon fontSize='small'/>
                      :
                        null
                }
                </MuiGrid>
              </MuiGrid>
                :        
                  <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
                    <MuiGrid item xs={4}></MuiGrid>
                    <MuiGrid item xs={6}>
                      <MuiIconButton size='small' 
                      onClick={() => handleCreateNode(node.id)}
                      >
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
          {
            selectedSlideId === "-1"
            ?
            <OptionContainer>
                <Option label="Create"
                  icon={<MuiIconButton 
                    onClick={onHandleCreateGroup}
                    >
                      <CreateNewFolderIcon/>

                    </MuiIconButton>
                  } 
                />
                </OptionContainer>



            :

          
         !openDelete
          ?
            <div>
              { selectedSlideId !== "-1" && selectedSlideId !== appliedSlideId 
                ?
                  <div style={{marginTop:"20px", marginBottom:"20px"}}>
                    <MuiButton style={{backgroundColor:"#5958FF",width:"50%", fontSize:"9px" , marginRight:"5px"}} 
                      autoFocus 
                      // onClick={onHandleApply} 
                      // disabled={readOnly}
                      // color="primary"
                    >
                     {treeDataRedux[selectedSlideId].downloaded === true ? "Apply" :
                      // `${fileSize(treeDataRedux[selectedSlideId]?.size)}
                       `Download & Apply`} 
                    </MuiButton>
                  </div>
                :
                   null
              }                                 
                              
              <OptionContainer>
                <Option label="Edit"
                  icon={<MuiIconButton 
                  //   disabled={selectedColorMapId === "-1" }
                  //   onClick={onHandleEdit}
                    >
                          <MuiEditIcon/>

                    </MuiIconButton>
                  } 
                />

                <Option label="Copy" 
                
                  icon={ <MuiIconButton 
                    // disabled={selectedColorMapId === "-1"}
                    // onClick={onHandleCopy}
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
                    // disabled={treeDataRedux[selectedColorMapId]?.colormapType === ColormapType.SYSTEM || selectedColorMapId === appliedColorMapId}
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
                      onClick={() => setOpenDelete(false)} 
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

    return(
        <SideBarContainer
        headerLeftIcon = { getHeaderLeftIcon() }
        headerContent={ <Title text={"Slides" } group=""/> }
        headerAction = {getAction()}
        headerRightIcon = { getHeaderRightIcon() }
        body ={ getBody() }
        footer = { getFooter() }
      />

    )
}
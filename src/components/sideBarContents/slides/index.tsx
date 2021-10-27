import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import BackButton from '../../icons/back';

import {useAppDispatch, useAppSelector} from '../../../store/storeHooks';

import {goBack,push} from 'connected-react-router/immutable';

import RTree from '../../shared/RsTreeTable';
 
import AddIcon from "@material-ui/icons/Add";

import { selectSlideData, selectRootIds,expandNode  } from '../../../store/sideBar/slideSlice';

import TreeNodeWithoutCheckbox from '../../shared/RsTreeTable/treeNodeWithoutCheckbox';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import MuiGrid from '@material-ui/core/Grid';

import { convertListToTree } from '../../utils/tree';

import { useRef , useEffect} from 'react';
import useContainer from '../../../customHooks/useContainer';

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

//   const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);

//   const appliedColorMapId = useAppSelector(state => state.colormap.appliedColorMapId);

  const [openDelete, setOpenDelete] = useState(false);
  const [copied, setCopied] = useState<any>();

    const dispatch = useAppDispatch();

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const handleExpand = (toOpen:boolean,nodeId:string) => {
        dispatch(expandNode({toOpen,nodeId}));
      }    
    

    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={onClickBackIcon} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return ( 
           null
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
        // onRowClick = {handleRowClick}
        onRowClick = {() => null}
        width = {300}
        hover={true}
        selectable={true}
        // selected={[selectedColorMapId]}
        selected={[]}
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
            <div></div>
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
                { false
              //   appliedColorMapId === node.id
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
                    //   onClick={() => handleCreateLabel(node.id)}
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
      return(null)
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
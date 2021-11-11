import MuiIconButton from '@material-ui/core/IconButton';

import RTree from '../../../shared/RsTreeTable';
import AddIcon from "@material-ui/icons/Add";

import TreeNodeWithoutCheckbox from '../../../shared/RsTreeTable/treeNodeWithoutCheckbox';
import TreeCollapseIcon from '@material-ui/icons/ChevronRight';
import TreeExpandedIcon from '@material-ui/icons/ExpandMore';
import MuiGrid from '@material-ui/core/Grid';

import { convertListToTree } from '../../../utils/tree';

import { useRef, useState } from 'react';
import useContainer from '../../../../customHooks/useContainer';

import GridViewIcon from '../../../icons/gridView';
import MuiCheckIcon from '@material-ui/icons/Check';

import MuiDownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import MuicloudDoneIcon from '@material-ui/icons/CloudDone';

export default function ListView (props : any){

    const treeDataRedux = props.treeData;
  const treeRootIds = props.rootIds;
  const {roots, expanded} = convertListToTree(treeDataRedux,treeRootIds);

  const containerRef = useRef(null);
  const [containerWidth, containerHeight] = useContainer(containerRef,[treeDataRedux]);

  const selectedSlideId = props.selectedSlideId;

  const appliedSlideId = props.appliedSlideId;

  const [current, setCurrent] = useState("0")

  const imageViewGenerator = ( data : any) => {

    if(data.slideType === props.slideType.VIEW){
      return(
        <img src={data.data.image} width="200px" height="120px"></img>
      )
      }

      if(data.slideType === props.slideType.GROUP){
        const childrenImages : any[] = [];
        Object.keys(treeDataRedux).map(key => {
          if(treeDataRedux[key].pid === data.id && treeDataRedux[key].slideType === props.slideType.VIEW)
          childrenImages.push(treeDataRedux[key].data.image)
      })

        
    return(
      <div style={{width:"200px", height:"120px",border: "1px solid", borderColor:"white" }}>
        <MuiGrid container >
        <MuiGrid container item spacing={1}>
        <MuiGrid item xs={6}>
        <img src={childrenImages[0]} width="95px" height="58px"></img>
      </MuiGrid>
      <MuiGrid item xs={6}>
        <img src={childrenImages[1]} width="95px" height="58px"></img>
      </MuiGrid>
        </MuiGrid>
        <MuiGrid container item spacing={1}>
        <MuiGrid item xs={6}>
        <img src={childrenImages[0]} width="95px" height="58px"></img>
      </MuiGrid>
      <MuiGrid item xs={6}>
        <img src={childrenImages[1]} width="95px" height="58px"></img>
      </MuiGrid>
        </MuiGrid>
        </MuiGrid> 
      </div>
    )
    }
  }

  const rowHeightGenerator = (data : any) => {

    if(data.slideType === props.slideType.VIEW)
      return(180)
    
    else{
      if (data.state.expanded === false)
        return(180)
      else
        return(40) 
    }
  }

    return(
      <div ref = {containerRef} style={{height:'100%',background:'transparent'}} >
    <RTree 
      treeData={roots} 
      expandedRowIds = {expanded}
      onExpand={() => {}}
      onRowClick = {props.handleRowClick}
      width = {300}
      hover={true}
      selectable={true}
      selected={[selectedSlideId]}
      rowHeight={(rowData) => rowHeightGenerator(treeDataRedux[rowData.id])}
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
            <div>
                {
                    treeDataRedux[node.id].state.expanded === true
                    ?
                      <p>{treeDataRedux[node.id].title }</p>
                    :
                    <div>
                        <MuiGrid container direction='column' ></MuiGrid>
                          <MuiGrid item>
                            <p>{treeDataRedux[node.id].title }</p>
                          </MuiGrid>
                          <MuiGrid item>
                            {imageViewGenerator(treeDataRedux[node.id])}
                          </MuiGrid>
                      </div>
                }
            </div>
          
        )
      }}
      column1 = {(node) => {
        return (
          <div>
              { treeDataRedux[node.id].slideType === props.slideType.GROUP
                 ?
                  <MuiGrid container alignItems='center' style={{width:'100%',height:'100%'}}>
                      <MuiGrid item xs={8}>
                          <MuiIconButton size='small' 
                            onClick={() => props.handleExpand( !treeDataRedux[node.id].state.expanded ,node.id) }
                            disabled={treeDataRedux[node.id].children.length === 0}
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
            { treeDataRedux[node.id].slideType === props.slideType.VIEW
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
                    onClick={() => props.handleCreateNode(node.id)}
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
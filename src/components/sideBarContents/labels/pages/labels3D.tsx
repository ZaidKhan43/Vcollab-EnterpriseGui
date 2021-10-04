import MuiIconButton from '@material-ui/core/IconButton';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import styles from './style'

import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';


import {useAppDispatch, useAppSelector} from '../../../../store/storeHooks';

import RTree from '../../../shared/RsTreeTable';
import {invertNode, expandNode, select3DLabelData ,selectRootIds, setCheckedVisibility, checkNode, createLabel, delete3DLabel , selectedLength} from '../../../../store/sideBar/labelSlice/label3DSlice'

import EyeIcon from '@material-ui/icons//Visibility';
import EyeSlashIcon from '@material-ui/icons/VisibilityOff';
import IconButton  from '@material-ui/core/IconButton';

import AddIcon from "@material-ui/icons/Add";

import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'

import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiEditIcon from '@material-ui/icons/EditOutlined';

import {goBack,push} from 'connected-react-router/immutable';
import {Routes} from "../../../../routes"

import InvertCell from '../../../shared/RsTreeTable/Invert';

export default function Labels3D(){

  const classes = styles();
  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }
  
  const treeData = useAppSelector(select3DLabelData);
    const treeRootIds = useAppSelector(selectRootIds);
    const selectedCount = useAppSelector(selectedLength)

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

  const handleInvert = (node:any) => {
    dispatch(invertNode({nodeId:node.id}));
  }
  
  const handleCheck = (toCheck:boolean, nodeId:string) => {
    dispatch(checkNode({toCheck,nodeId}));
  }

  const handleHighlight = () => {
    console.log("sadas")
  }

  const handleVisibility = (toShow:boolean,node:any) => {
    const leafIds = [node.id];
    const pids = [node.pid];
    dispatch(setCheckedVisibility({toShow, pids, leafIds}))
  }

  const onHandleDeleteButton = () => {
    dispatch(delete3DLabel());
  }

  const renderIcon1 = (node : any) => {
    return (
      <InvertCell rowData = {node} onInvert={handleInvert}></InvertCell>
    )
  }

  const renderIcon2 = (node :any) => {
      
    if(node?.pid !== "-1")
    return (
        <span style={{marginLeft:"10px", marginTop:"5px"}}>
          <IconButton size='small' onClick = {() => handleVisibility(!node.state.visibility,node)}>
              { node?.state.visibility
                ? 
                  <EyeIcon fontSize='small'/>
                :
                  <EyeSlashIcon fontSize='small'/>
              }
            </IconButton>
        </span>
      )
    else
    return (
      <span style={{marginLeft:"10px", marginTop:"5px"}}>
        <MuiIconButton size='small' onClick={() => dispatch(createLabel(node.id))}>
            <AddIcon fontSize='default'/> 
        </MuiIconButton> 
      </span>
    )
   
  }
  

  const getBody = () => {

    console.log("treedata",treeData)

    return (
      <div className={classes.scrollBar}>
       <RTree 
          treeDataRedux={treeData} 
          rootIdsRedux={treeRootIds} 
          checkBox = {true}
          onExpand={handleExpand} 
          onCheck={handleCheck} 
          onHighlight = {handleHighlight}
          column1 = {renderIcon1}
          column2 = {renderIcon2}
          />


      </div>
    )
  }


  const getFooter = () => {

    return(
        <div style={{marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}}>
          <OptionContainer>
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

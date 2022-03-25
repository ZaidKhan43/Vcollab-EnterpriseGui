import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';
import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiToggleButton from '@material-ui/lab/ToggleButton';

import PickAndMoveIcon from '@material-ui/icons/ThreeDRotation';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import {useAppSelector, useAppDispatch} from "../../../../store/storeHooks";
import * as viewerAPIProxy from "backend/viewerAPIProxy"; 
import { selectActiveViewerID, selectInteractionMode } from 'store/appSlice';
import { InteractionMode } from 'backend/ViewerManager';

export default function GeometryTransform(props:any){
    const dispatch = useAppDispatch();
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const interactionMode = useAppSelector(selectInteractionMode); 
    const isPickAndMoveEnabled = interactionMode === InteractionMode.PICK_AND_MOVE;
    const onClickPickAndMove = () => {
        viewerAPIProxy.enablePickAndMove(activeViewerID,!isPickAndMoveEnabled);
        viewerAPIProxy.setInteractionMode( activeViewerID,!isPickAndMoveEnabled ? InteractionMode.PICK_AND_MOVE : InteractionMode.DEFAULT);
    }

    const resetPickAndMove = () => {
        viewerAPIProxy.resetPickAndMove(activeViewerID);
    }
    const getHeaderRightIcon = () => {
       return <div style={{textAlign:'center'}} onClick={ onClickPickAndMove } >
        <MuiToggleButton value='pick & move' selected={ isPickAndMoveEnabled } ><PickAndMoveIcon /></MuiToggleButton> 
        </div>
    }
    const getFooter = () => {
       return <div style={{textAlign:'center'}} onClick={ resetPickAndMove } >
       <MuiIconButton><RotateLeftIcon /></MuiIconButton> 
 </div>
    }
    return (<SideBarContainer
      headerRightIcon={ getHeaderRightIcon()}
      headerContent={ <Title text={"Geometry Transform" } group="Geometry"/> }     
      footer = {getFooter()}
      />)
}
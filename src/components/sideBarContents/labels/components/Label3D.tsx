import React,{useRef,useEffect, useState} from 'react'
import { get3DLabelCanvasPos } from '../../../../backend/viewerAPIProxy';
import { selectActiveViewerID } from '../../../../store/appSlice';
import { select3DLabelData, setLabelPos, toggleVisibility, windowPrefixId } from '../../../../store/sideBar/labelSlice/label3DSlice'
import { selectCameraMatrix } from '../../../../store/sideBar/sceneSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks'
import { setEditMode, setWindowPos } from '../../../../store/windowMgrSlice';
import Callout from '../../../shared/callout';
import CustomWindow from '../../../shared/CustomWindow';
type Label3DProps = {
    id: string,
    parentRef: any
}

function Label3D(props:Label3DProps) {
    const cameraMat = useAppSelector(selectCameraMatrix);
    const labelTree = useAppSelector(select3DLabelData);
    const label = labelTree[props.id];
    const viewerId = useAppSelector(selectActiveViewerID)
    const timer = useRef<any | null>(null);
    let wasVisible = useRef<boolean | null>(null);
    const dispatch = useAppDispatch();
        useEffect(() => {
            let l = label;
            if (timer.current !== null){
                clearTimeout(timer.current);
            } 
            else{
                //first
                wasVisible.current = l.state.visibility as boolean;
                dispatch(toggleVisibility({
                    toShow: false,
                    nodeId: l.id
                }))
            }
            timer.current = setTimeout(() => {
                        let pos = get3DLabelCanvasPos(l.id,viewerId);
                        if(pos){
                            dispatch(setLabelPos({id:l.id,pos:[pos[0],pos[1]]}));
                        }
                //last
                timer.current = null; 
                if(wasVisible.current)
                dispatch(toggleVisibility({
                    toShow: true,
                    nodeId: l.id
                }))
            },500);
            
    },[cameraMat])
    
    return (
        label.state.visibility ?
        <>
                <Callout
                    arrowStartPos= {label.pos}
                    visible = {true}
                >
                    <div style={{zIndex:100, backgroundColor:"yellow"}}>{label.id}</div>
                </Callout>
        </>
        :null
    )
}

export default Label3D

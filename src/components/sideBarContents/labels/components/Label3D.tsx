import React,{useRef,useEffect, useState} from 'react'
import { get3DLabelCanvasPos } from '../../../../backend/viewerAPIProxy';
import { selectActiveViewerID } from '../../../../store/appSlice';
import { select3DLabelData, setLabelPos, toggleVisibility, windowPrefixId } from '../../../../store/sideBar/labelSlice/label3DSlice'
import { selectCameraMatrix } from '../../../../store/sideBar/sceneSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks'
import { setEditMode, setWindowPos } from '../../../../store/windowMgrSlice';
import LabelMsg from './LabelMsg';
import LabelAnchor from './LabelAnchor';
import CustomWindow from '../../../shared/CustomWindow';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
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
    const wasVisible = useRef<boolean | null>(null);
    const startRef = useRef<any | null>(null);
    const endRef = useRef<any | null>(null);
    const updateArrow = useXarrow();
    const dispatch = useAppDispatch();
    const handleWindowDrag = () => {
        updateArrow();
    }
    const handleWindowResize = () => {
        updateArrow();
    }
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
    useEffect(() => {
        
            dispatch(setEditMode({uid:windowPrefixId+label.id,isEdit:label.state.checked ? true : false}))
    },[label.state.checked])
    return (
        label.state.visibility ?
        <>
            <Xwrapper>
            <LabelAnchor ref={startRef} pos={label.pos}/>
            
               <CustomWindow 
               ref={endRef} 
               uid={windowPrefixId+label.id} 
               width={100} 
               height={100} 
               resize 
               parentRef={props.parentRef} 
               onDrag={handleWindowDrag}
               onResize={handleWindowResize}
               xy={label.pos}>
                    <LabelMsg msg={label.label}/>
                </CustomWindow>
                <Xarrow start={startRef} end={endRef}/>
            </Xwrapper>
        </>
        :null
    )
}

export default Label3D

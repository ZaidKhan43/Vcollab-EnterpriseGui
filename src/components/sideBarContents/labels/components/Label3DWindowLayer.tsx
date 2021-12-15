import React, { useEffect, useRef } from 'react'
import { get3DLabelCanvasPos } from '../../../../backend/viewerAPIProxy';
import { selectActiveViewerID } from '../../../../store/appSlice';
import {  select3DLabelData, setLabelPos, toggleVisibility, windowPrefixId  } from '../../../../store/sideBar/labelSlice/label3DSlice';
import { selectCameraMatrix } from '../../../../store/sideBar/sceneSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import {batch} from 'react-redux';
import Label3D from '../components/Label3D';
interface Props {
    parentRef:any
}
function Label3DWindowLayer(props:Props) {
    const dispatch = useAppDispatch();
    const cameraMat = useAppSelector(selectCameraMatrix);
    const viewerId = useAppSelector(selectActiveViewerID)
    const timer = useRef<any | null>(null);
    const wasVisible = useRef<{[id:string]:boolean}>({});
    const labelTree = useAppSelector(select3DLabelData);
    useEffect(() => {
                if (timer.current !== null){
                    clearTimeout(timer.current);
                } 
                else{
                    //first
                    batch(() => {
                        Object.values(labelTree).forEach(l => {
                            if(l.pid !== "-1"){
                                wasVisible.current[l.id] = l.state.visibility as boolean;
                                 dispatch(toggleVisibility({
                                    toShow: false,
                                    nodeId: l.id
                                }))
                            }
                        });
                    })
                }
                timer.current = setTimeout(() => {
                    batch(() => {
                        Object.values(labelTree).forEach(l => {
                            if(l.pid !== "-1") {
                                let hitPos = get3DLabelCanvasPos(l.id,viewerId) as [number,number];
                                let p = l.pos;
                                if(hitPos){
                                    let isInitial = p[0] === 0 && p[1] === 0 ? true : false; 
                                    dispatch(setLabelPos({id:l.id,pos:isInitial?hitPos:p, anchor:hitPos}));
                                }
                                //last
                                timer.current = null; 
                                if(wasVisible.current[l.id]){
                                    dispatch(toggleVisibility({
                                        toShow: true,
                                        nodeId: l.id
                                    }));
                                }
                            }
                        });
                    })
                    
                },500);
    },[cameraMat])

    return (
        <>{
            [...Object.values(labelTree)].map(label3D => {
                return label3D.pid !== "-1" ? <Label3D 
                key = {label3D.id}
                windowPrefixId={windowPrefixId}
                label = {label3D}
                setLabelPosReducer = {setLabelPos}
                parentRef={props.parentRef}/> : null
            })
        }
        </>    
    )
}

export default Label3DWindowLayer

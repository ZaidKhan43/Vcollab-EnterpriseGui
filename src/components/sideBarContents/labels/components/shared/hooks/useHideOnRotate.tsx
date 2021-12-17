import React, { useRef, useEffect } from 'react'

import {useAppDispatch, useAppSelector} from '../../../../../../store/storeHooks'
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'
import { batch} from 'react-redux';
import { selectActiveViewerID } from '../../../../../../store/appSlice';
import { ILabel } from '../../../../../../store/sideBar/labelSlice/shared/types';
import { selectCameraMatrix } from '../../../../../../store/sideBar/sceneSlice';
import { get3DLabelCanvasPos } from '../../../../../../backend/viewerAPIProxy';

type Props = {
    labelTree: {[id:string]:ILabel},
    toggleVisibilityReducer: ActionCreatorWithPayload<
    {
        toShow: boolean;
        nodeId: string;
    },string>,
    setLabelPosReducer: ActionCreatorWithPayload<{
        id: string;
        pos: [number, number];
        anchor: [number, number];
    },string>
}
function useHideOnRotate(props:Props) {
    const timer = useRef<any | null>(null);
    const wasVisible = useRef<{[id:string]:boolean}>({});
    const dispatch = useAppDispatch();
    const viewerId = useAppSelector(selectActiveViewerID);
    const cameraMat = useAppSelector(selectCameraMatrix);
    const labelTree = props.labelTree;
    const toggleVisibility = props.toggleVisibilityReducer;
    const setLabelPos = props.setLabelPosReducer;
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
}

export default useHideOnRotate

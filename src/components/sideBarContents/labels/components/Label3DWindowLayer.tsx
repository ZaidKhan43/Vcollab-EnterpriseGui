import React, { useEffect } from 'react'
import { get3DLabelCanvasPos } from '../../../../backend/viewerAPIProxy';
import { selectActiveViewerID } from '../../../../store/appSlice';
import { select3DLabelData, setLabelPos, windowPrefixId } from '../../../../store/sideBar/labelSlice/label3DSlice'
import { selectCameraMatrix } from '../../../../store/sideBar/sceneSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks'
import { setEditMode, setWindowPos } from '../../../../store/windowMgrSlice';
import CustomWindow from '../../../shared/CustomWindow';
import PinIcon from "@material-ui/icons/Room";

interface Props {
    parentRef:any
}
function Label3DWindowLayer(props:Props) {
    const cameraMat = useAppSelector(selectCameraMatrix);
    const labelTree = useAppSelector(select3DLabelData);
    const viewerId = useAppSelector(selectActiveViewerID)
    const dispatch = useAppDispatch();
    useEffect(() => {
            [...Object.values(labelTree)].forEach(l => {
                if(l.pid !== "-1") {
                    let pos = get3DLabelCanvasPos(l.id,viewerId);
                    if(pos){
                        dispatch(setLabelPos({id:l.id,pos:[pos[0],pos[1]]}));
                        dispatch(setWindowPos({
                            uid: windowPrefixId + (l.state.visibility ? l.id : l.id + "pin"),
                            pos: (l.state.visibility ? pos : [pos[0] -11 ,pos[1] -20]) as [number,number]
                        }))
                    }
                }
            });
    },[cameraMat,Object.values(labelTree).length])
    return (
        <>{
            [...Object.values(labelTree)].map(label3D => {
                if (label3D.pid === "-1") return null;
                return (
                label3D.state.visibility ?
                <CustomWindow uid={windowPrefixId + label3D.id} 
                    parentRef={props.parentRef} 
                    >
                    
                    <div>{label3D.label}</div>
                
                </CustomWindow>
                : 
                <CustomWindow uid={windowPrefixId + label3D.id+'pin'}
                    parentRef={props.parentRef}
                    xy={label3D.pos}
                    autoPositionOnResize={false}
                >
                    <PinIcon onMouseEnter={() => alert()}/>
                </CustomWindow>
                
                )
            })
        }
        </>    
    )
}

export default Label3DWindowLayer

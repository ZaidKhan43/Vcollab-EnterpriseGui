import React, { useEffect } from 'react'
import { select3DLabelData, windowPrefixId } from '../../../../store/sideBar/labelSlice/label3DSlice'
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks'
import { setEditMode } from '../../../../store/windowMgrSlice';
import CustomWindow from '../../../shared/CustomWindow';
interface Props {
    parentRef:any
}
function Label3DWindowLayer(props:Props) {
    const labelTree = useAppSelector(select3DLabelData);
    const dispatch = useAppDispatch();
    
    return (
        <>{
            [...Object.values(labelTree)].map(label3D => {
                return (
                <CustomWindow uid={windowPrefixId + label3D.id} 
                    parentRef={props.parentRef} 
                    >
                    
                    <div>{label3D.label}</div>
                
                </CustomWindow>
                )
            })
        }
        </>    
    )
}

export default Label3DWindowLayer

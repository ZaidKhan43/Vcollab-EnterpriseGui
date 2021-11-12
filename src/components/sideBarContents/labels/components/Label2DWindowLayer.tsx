import React, { useEffect } from 'react'
import { selectAllNotes2D, windowPrefixId } from '../../../../store/sideBar/labelSlice/label2DSlice'
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks'
import { setEditMode } from '../../../../store/windowMgrSlice';
import CustomWindow from '../../../shared/CustomWindow'
interface Props {
    parentRef:any
}
function Label2DWindowLayer(props:Props) {
    const notes = useAppSelector(selectAllNotes2D);
    const dispatch = useAppDispatch();
    
    return (
        <>{
            notes.map(note => {
                return (
                <CustomWindow uid={windowPrefixId+note.id} 
                    parentRef={props.parentRef} 
                    >
                    
                    <div>{note.label}</div>
                
                </CustomWindow>
                )
            })
        }
        </>    
    )
}

export default Label2DWindowLayer

import React, { useEffect } from 'react'
import { selectAllNotes2D } from '../../../../store/sideBar/labelSlice/label2DSlice'
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks'
import { setEditMode } from '../../../../store/windowMgrSlice';
import CustomWindow from '../../../shared/CustomWindow'
import {windowPrefix} from '../../labels/pages/notes2D'
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
                <CustomWindow uid={`${windowPrefix} ${note.id}`} 
                    parentRef={props.parentRef} 
                    width={150} 
                    height={150} >
                    
                    <div>{note.label}</div>
                
                </CustomWindow>
                )
            })
        }
        </>    
    )
}

export default Label2DWindowLayer

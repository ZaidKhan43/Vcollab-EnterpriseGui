import React, { useEffect } from 'react'
//import { selectAllNotes2D, windowPrefixId } from '../../../../store/sideBar/labelSlice/label2DSlice'
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks'
import { setEditMode } from '../../../../store/windowMgrSlice';
import CustomWindow from '../../../shared/CustomWindow'
import LabelMsg from './shared/LabelMsg'
interface Props {
    parentRef:any
}
function Label2DWindowLayer(props:Props) {
    //const notes = useAppSelector(selectAllNotes2D);
    const dispatch = useAppDispatch();
    
    return (
        <>{
            // notes.map(note => {
            //     return (
            //     <CustomWindow uid={windowPrefixId+note.id} 
            //         parentRef={props.parentRef} 
            //         resize 
            //         autoPositionOnResize
            //         >
            //     <LabelMsg key={note.id} msg={note.label}/>
            //     </CustomWindow>
            //     )
            // })
        }
        </>    
    )
}

export default Label2DWindowLayer

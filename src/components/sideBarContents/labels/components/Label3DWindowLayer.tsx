import React, { useEffect, useRef } from 'react'
import { select3DLabelData } from '../../../../store/sideBar/labelSlice/label3DSlice';
import { useAppSelector } from '../../../../store/storeHooks';
import Label3D from '../components/Label3D';
interface Props {
    parentRef:any
}
function Label3DWindowLayer(props:Props) {
    const labelTree = useAppSelector(select3DLabelData);
    return (
        <>{
            [...Object.values(labelTree)].map(label3D => {
                return label3D.pid !== "-1" ? <Label3D id = {label3D.id} parentRef={props.parentRef}/> : null
            })
        }
        </>    
    )
}

export default Label3DWindowLayer

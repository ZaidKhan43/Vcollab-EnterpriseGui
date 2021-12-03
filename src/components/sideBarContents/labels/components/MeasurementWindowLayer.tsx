import React, { useEffect, useRef } from 'react'
import { selectMeasurementsData, windowPrefixId } from '../../../../store/sideBar/labelSlice/measurementsSlice';
import { useAppSelector } from '../../../../store/storeHooks';
import CustomWindow from '../../../shared/CustomWindow';
import Label3D from '../components/Measurement3D';
interface Props {
    parentRef:any
}
function MeasurementWindowLayer(props:Props) {
    const labelTree = useAppSelector(selectMeasurementsData);
    return (
        <>{
            [...Object.values(labelTree)].map(label3D => {
                return label3D.pid !== "-1" 
                ? 
                (
                  <Label3D id = {label3D.id} parentRef={props.parentRef}/>
                ) 
                : null
            })
        }
        </>    
    )
}

export default MeasurementWindowLayer

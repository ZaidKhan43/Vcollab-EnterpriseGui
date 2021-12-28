import {  selectMeasurementsData, setLabelPos, toggleVisibility, windowPrefixId  } from '../../../../store/sideBar/labelSlice/measurementsSlice';
import { useAppSelector } from '../../../../store/storeHooks';
import useHideOnRotate from './shared/hooks/useHideOnRotate'; 
import Label3D from '../components/Label3D';
import { Layers } from 'store/windowMgrSlice';
interface Props {
    parentRef:any,
    layerId:Layers
}
function MeasurementWindowLayer(props:Props) {
    
    const labelTree = useAppSelector(selectMeasurementsData);
    useHideOnRotate({
        labelTree,
        setLabelPosReducer: setLabelPos,
        toggleVisibilityReducer: toggleVisibility
    })

    return (
        <>{
            [...Object.values(labelTree)].map(label3D => {
                return label3D.pid !== "-1" ? <Label3D 
                key = {label3D.id}
                layerId={props.layerId}
                windowPrefixId={windowPrefixId}
                label = {label3D}
                setLabelPosReducer = {setLabelPos}
                parentRef={props.parentRef}/> : null
            })
        }
        </>    
    )
}

export default MeasurementWindowLayer

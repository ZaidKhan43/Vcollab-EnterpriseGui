import { Layers } from 'store/windowMgrSlice';
import {  select2DLabelData, setLabelPos, toggleVisibility, windowPrefixId  } from '../../../../store/sideBar/labelSlice/label2DSlice';
import { useAppSelector } from '../../../../store/storeHooks';
import Label2D from './Label2D';

interface Props {
    parentRef:any,
    layerId:Layers
}
function Label2DWindowLayer(props:Props) {
    
    const labelTree = useAppSelector(select2DLabelData);
    return (
        <>{
            [...Object.values(labelTree)].map(label2D => {
                return label2D.pid !== "-1" ? <Label2D 
                key = {label2D.id}
                layerId={props.layerId}
                windowPrefixId={windowPrefixId}
                label = {label2D}
                setLabelPosReducer = {setLabelPos}
                parentRef={props.parentRef}/> : null
            })
        }
        </>    
    )
}

export default Label2DWindowLayer

import {  select3DLabelData, setLabelPos, toggleVisibility, windowPrefixId  } from '../../../../store/sideBar/labelSlice/label3DSlice';
import { useAppSelector } from '../../../../store/storeHooks';
import useHideOnRotate from './shared/hooks/useHideOnRotate'; 
import Label3D from '../components/Label3D';
interface Props {
    parentRef:any
}
function Label3DWindowLayer(props:Props) {
    
    const labelTree = useAppSelector(select3DLabelData);
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
                windowPrefixId={windowPrefixId}
                label = {label3D}
                setLabelPosReducer = {setLabelPos}
                parentRef={props.parentRef}/> : null
            })
        }
        </>    
    )
}

export default Label3DWindowLayer

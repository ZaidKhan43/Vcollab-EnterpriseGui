import React from 'react'
import Label3DWindowLayer from "../../sideBarContents/labels/components/Label3DWindowLayer"
import MeasurementWindowLayer from "../../sideBarContents/labels/components/MeasurementWindowLayer"
import Label2DWindowLayer from "../../sideBarContents/labels/components/Label2DWindowLayer"
import Layer from "../Layer"
import {Layers} from "../../../store/windowMgrSlice";
interface Label3DContainerProps {
    parentRef: any
}
function Label3DContainer(props:Label3DContainerProps) {
    return (
        <Layer id={Layers.FRONT}>
        <Label3DWindowLayer parentRef={props.parentRef}/> 
        <MeasurementWindowLayer parentRef={props.parentRef}/>
        <Label2DWindowLayer parentRef={props.parentRef}/>
        </Layer>
    )
}

export default Label3DContainer

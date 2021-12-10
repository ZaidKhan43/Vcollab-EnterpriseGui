import React from 'react'
import Label2DWindowLayer from "../../sideBarContents/labels/components/Label2DWindowLayer"
import Layer from "../Layer"
import {Layers} from "../../../store/windowMgrSlice";
interface Label2DContainerProps {
    parentRef: any
}
function Label2DContainer(props:Label2DContainerProps) {
    return (
        <Layer id={Layers.LABEL2D}>
        <Label2DWindowLayer parentRef={props.parentRef}/>
        </Layer>
    )
}

export default Label2DContainer

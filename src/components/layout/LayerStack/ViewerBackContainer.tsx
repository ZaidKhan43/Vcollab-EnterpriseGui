import React from 'react'
import AxisTriadWindow from "../../../components/sideBarContents/scene/components/AxisTriadWindow"
import Legend from "../../sideBarContents/colormaps/shared/colorPlot/colorplotWindow"
import Layer from "../Layer"
import {Layers} from "../../../store/windowMgrSlice";
type ContainerProps = {
    parentRef:any
}
function Container(props:ContainerProps) {
    return (
        <Layer id={Layers.BACK} >
            <AxisTriadWindow parentRef={props.parentRef}/>
            <Legend parentRef={props.parentRef}/>
        </Layer>
    )
}

export default Container


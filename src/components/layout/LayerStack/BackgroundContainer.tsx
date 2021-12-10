import React from 'react'
import AxisTriadWindow from "../../../components/sideBarContents/scene/components/AxisTriadWindow"
import Layer from "../Layer"
import {Layers} from "../../../store/windowMgrSlice";
import Background from "../../viewer/Background";
type BackgroundContainerProps = {
    parentRef:any
}
function BackgroundContainer(props:BackgroundContainerProps) {
    return (
        <Layer id={Layers.BACKGROUND} >
            <Background />
            <AxisTriadWindow parentRef={props.parentRef}/>
        </Layer>
        
    )
}

export default BackgroundContainer

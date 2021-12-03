import React, { useEffect,useLayoutEffect, useState } from 'react'
import AxisTriadWindow from "../../sideBarContents/scene/components/AxisTriadWindow"
import Label2DWindowLayer from "../../sideBarContents/labels/components/Label2DWindowLayer"
import Label3DWindowLayer from "../../sideBarContents/labels/components/Label3DWindowLayer"
import MeasurementWindowLayer from "../../sideBarContents/labels/components/MeasurementWindowLayer"
interface WindowsContainerProps {
    parentRef: any
}

function WindowsContainer(props:WindowsContainerProps) {
    return (
        <div style={{position:'absolute',width:'100%',height:'100%', pointerEvents: 'none'}}>
        <AxisTriadWindow parentRef={props.parentRef}/>
        <Label2DWindowLayer parentRef={props.parentRef}/>
        <Label3DWindowLayer parentRef={props.parentRef}/> 
        <MeasurementWindowLayer parentRef={props.parentRef}/>
        </div>
    )
    
}

export default WindowsContainer

import React, { useEffect,useLayoutEffect, useState } from 'react'
import AxisTriadWindow from "../../sideBarContents/scene/components/AxisTriadWindow"
import Label2DWindowLayer from "../../sideBarContents/labels/components/Label2DWindowLayer"
import Label3DWindowLayer from "../../sideBarContents/labels/components/Label3DWindowLayer"
interface WindowsContainerProps {
    parentRef: any
}

function WindowsContainer(props:WindowsContainerProps) {
    return (
        <>
        <AxisTriadWindow parentRef={props.parentRef}/>
        <Label2DWindowLayer parentRef={props.parentRef}/>
        <Label3DWindowLayer parentRef={props.parentRef}/> 
        </>
    )
    
}

export default WindowsContainer

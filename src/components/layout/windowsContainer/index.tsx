import React, { useEffect,useLayoutEffect, useState } from 'react'
import AxisTriadWindow from "../../sideBarContents/scene/components/AxisTriadWindow"
interface WindowsContainerProps {
    parentRef: any
}

function WindowsContainer(props:WindowsContainerProps) {
    return (
        <AxisTriadWindow parentRef={props.parentRef}/>
    )
    
}

export default WindowsContainer

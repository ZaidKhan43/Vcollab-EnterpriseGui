import React from 'react'
import BackgroundLayer from './BackgroundContainer'
import ViewerLayer from './ViewerContainer'
import Label2DLayer from './Label2DContainer'
import Label3DLayer from './Label3DContainer'
type Props = {
    parentRef:any
}
function LayerStack(props:Props) {
    return (
        <>
            <BackgroundLayer parentRef={props.parentRef}/>
            <ViewerLayer parentRef={props.parentRef}/>
            <Label2DLayer parentRef={props.parentRef}/>
            <Label3DLayer parentRef={props.parentRef}/>
        </>
    )
}

export default LayerStack

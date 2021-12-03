import React, {forwardRef} from 'react'

type LabelAnchorProps = {
    pos: [number,number]
}
function LabelAnchor(props:LabelAnchorProps, ref:any ) {
    const pos = props.pos;
    return (
        <div  ref = {ref} style={{ position:'absolute', top:`${pos[1]}px`, left:`${pos[0]}px`, width:5, height:5, backgroundColor:'violet'}}>
            
        </div>
    )
}

export default forwardRef(LabelAnchor)

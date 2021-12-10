import React, {forwardRef} from 'react'

type LabelMsgProps = {
    msg:string
}
function LabelMsg(props:LabelMsgProps, ref:any) {
    return (
        <div ref={ref} style={{ backgroundColor:"yellow", width:'100%' , height:'100%'}}>{props.msg}</div>
    )
}

export default forwardRef(LabelMsg)

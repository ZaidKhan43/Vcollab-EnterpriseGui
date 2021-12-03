import React from 'react'

type LabelMsgProps = {
    msg:string
}
function LabelMsg(props:LabelMsgProps) {
    return (
        <div style={{ backgroundColor:"yellow"}}>{props.msg}</div>
    )
}

export default LabelMsg

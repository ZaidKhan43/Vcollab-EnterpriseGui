import React, { useLayoutEffect, useRef, useState } from 'react'
import CustomWindow from "../../../shared/CustomWindow"

interface Props {
    parentRef: any
}
function AxisTriadWindow(props:Props) {
    const [canvas, setCanvas] = useState<any>(null);
    const canvasRef = useRef<any>(null);
    useLayoutEffect(() => {
        let canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        let ctx = canvas.getContext('2d');
        if(ctx){
            ctx.fillStyle = 'rgba(255,0,0,1)';
            ctx.fillRect(0,0,300,300);
        }
        setCanvas(canvas);
        canvasRef.current = canvas;
    },[])

    return (
        <>
        <CustomWindow uid="window" parentRef = {props.parentRef}>
            <canvas ref ={canvasRef}></canvas>
        </CustomWindow>
        </>
    )
}

export default AxisTriadWindow

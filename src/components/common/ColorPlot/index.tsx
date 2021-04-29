import React, { useEffect, useRef, useState } from 'react'

function Legend() {
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState< CanvasRenderingContext2D | null>(null);

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(20, 20, 150, 100);
    }
    useEffect(() => {
        if(canvasRef.current)
        {
            const canvas = canvasRef.current as unknown as HTMLCanvasElement;
            setCtx(canvas.getContext('2d'));
            if(ctx){
                draw(ctx);
            }    
        }
    },[canvasRef.current])


    return (
        <canvas ref={canvasRef}>
        </canvas>
    )
}

export default Legend

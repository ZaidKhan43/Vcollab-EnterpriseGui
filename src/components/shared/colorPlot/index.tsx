import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import {Palette, PaletteBuilder} from '../../utils/palette/PaletteBuilder'


function Legend() {
    const canvasRef = useRef(null);
    const paletteRef = useRef<Palette| null>(null);
    const [ctx, setCtx] = useState< CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        if(canvasRef.current)
        {
            const canvas = canvasRef.current as unknown as HTMLCanvasElement;
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            setCtx(canvas.getContext('2d'));
            if(ctx){
               
                paletteRef.current = new PaletteBuilder().build();
            }    
        }
    },[canvasRef.current])

    useEffect(() => {
        if(paletteRef.current && ctx)
        {
            paletteRef.current.draw(ctx);   
        }
        return () => {
            if(ctx && canvasRef.current !== null)
            {   
                const canvas = canvasRef.current as unknown as HTMLCanvasElement;
                ctx.clearRect(0,0,canvas.width,canvas.height);
            }
        }
    })
    return (
        <>
        <Box flex>
            <Typography>
            Legend
            </Typography>
        </Box>
        <canvas ref={canvasRef}>
        </canvas>
        </>
    )
}

export default Legend

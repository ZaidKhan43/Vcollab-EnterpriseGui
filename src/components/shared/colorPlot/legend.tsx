import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import {Palette, PaletteBuilder} from '../../../utils/palette/PaletteBuilder'
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import { selectcolormapData, colormapElements, setColorMapSelection, paletteTypeDataList, directionDataList, ticPositionDataList, titlePlacementDataList, valuePlacementDataList, setLegendSettings,ColormapType } from '../../../../store/sideBar/colormapSlice';
import {selectWindowSize} from '../../../../store/windowMgrSlice';

function Legend() {
    const canvasRef = useRef(null);
    const paletteRef = useRef<Palette| null>(null);
    const [ctx, setCtx] = useState< CanvasRenderingContext2D | null>(null);
    const selectedColorMapId = useAppSelector(state => state.colormap.selectedColorMapId);

    const paletteTypeArray = useAppSelector(paletteTypeDataList);
    const paletteDirectionArray =useAppSelector(directionDataList);
    const paletteTickPositionArray = useAppSelector(ticPositionDataList);
    const paletteTittlePlacementArray = useAppSelector(titlePlacementDataList);
    const paletteValuePlacementArray = useAppSelector(valuePlacementDataList);
    const colormapsData = useAppSelector(selectcolormapData);
    const [colorMapWindowSizeWidth ,colorMapWindowSizeHeight]  = useAppSelector(state=>selectWindowSize(state,'colorPlotWindow'));


    const paletteTypeID = colormapsData[selectedColorMapId].paletteType;
    const paletteDirectionID = colormapsData[selectedColorMapId].direction;
    const paletteTickPositionID = colormapsData[selectedColorMapId].ticPosition;
    const paletteTittlePlacementID = colormapsData[selectedColorMapId].titlePlacement;
    const paletteValuePlacementID = colormapsData[selectedColorMapId].valuePlacement;

    let paletteType:any;
    let paletteDirection:any;
    let paletteTickPosition:any; 
    let paletteTittlePlacement:any;
    let paletteValuePlacement:any;


    // palette Type
    paletteTypeArray.forEach( data => {
    if ( data.id === paletteTypeID ) {
        paletteType = data.type;
    }
    });

    // palette Direction
    paletteDirectionArray.forEach( data => {
        if ( data.id === paletteDirectionID ) {
            paletteDirection = data.direction;
        }
        });

    // palette tick position 
     paletteTickPositionArray.forEach(data=> {

        if(data.id === paletteTickPositionID ) {

            paletteTickPosition = data.ticktype;

        }

     });

     //palette tittle position 

     paletteTittlePlacementArray.forEach(data=> {

        if(data.id === paletteTittlePlacementID ) {

            paletteTittlePlacement = data.position;

        }

     });

     //palette value position

     paletteValuePlacementArray.forEach(data=> {

        if(data.id === paletteValuePlacementID ) {

            paletteValuePlacement = data.position;

        }

     });



    useEffect(()=> {

        if(paletteRef.current && ctx) {
            
            paletteRef.current.setPaletteType(paletteType);

            paletteRef.current.setPaletteDirection(paletteDirection);

            paletteRef.current.setPaletteTickPosition(paletteTickPosition);

            paletteRef.current.setPaletteTittlePlacement(paletteTittlePlacement);

            paletteRef.current.setPaletteValuePlacement(paletteValuePlacement);

        }

    })

    useEffect(() => {
        
        if(canvasRef.current)
        {
            const canvas = canvasRef.current as unknown as HTMLCanvasElement;
            canvas.width = colorMapWindowSizeWidth;
            canvas.height = colorMapWindowSizeHeight;
            setCtx(canvas.getContext('2d'));
            if(ctx){
               
                paletteRef.current = new PaletteBuilder().build();
            }    
        }
    },[canvasRef.current])



    useEffect(() => {

            const canvas = canvasRef.current as unknown as HTMLCanvasElement;
            canvas.width = colorMapWindowSizeWidth;
            canvas.height = colorMapWindowSizeHeight;


    },[colorMapWindowSizeWidth , colorMapWindowSizeHeight])

    useEffect(() => {
        if(paletteRef.current && ctx) {
 
            paletteRef.current.draw(ctx ,colorMapWindowSizeWidth ,colorMapWindowSizeHeight);   
 
        }
        return () => {
            if(ctx && canvasRef.current !== null) {   
                const canvas = canvasRef.current as unknown as HTMLCanvasElement;
                ctx.clearRect(0,0,canvas.width,canvas.height);
            }
        }
    })

    return (
        <>
        <canvas ref={canvasRef} >
        </canvas>
        </>
    )
}

export default Legend
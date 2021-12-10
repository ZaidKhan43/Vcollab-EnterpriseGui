import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import {Palette, PaletteBuilder} from '../../../../utils/palette/PaletteBuilder'
import { useAppDispatch, useAppSelector } from '../../../../../store/storeHooks';
import { selectcolormapData, colormapElements, setColorMapSelection, paletteTypeDataList, directionDataList, ticPositionDataList, titlePlacementDataList, valuePlacementDataList, setLegendSettings,ColormapType ,selectColorPaletteData ,selectedColorPaletteId} from '../../../../../store/sideBar/colormapSlice';
import {selectWindowSize} from '../../../../../store/windowMgrSlice';

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
    const colorPaletteData = useAppSelector(selectColorPaletteData);


    const [activeColormapId, setActiveColormapId] = useState(selectedColorMapId); 
    const appliedColorPalette = colormapsData[activeColormapId].colorPalette;


    const colorPaletteList = useAppSelector(state => state.colormap.colorPaletteTree.data)

    const colorSet =  colorPaletteList[appliedColorPalette].colorSet;
    const valueSet =   colorPaletteList[appliedColorPalette].valueSet;



    const [colorMapWindowSizeWidth ,colorMapWindowSizeHeight]  = useAppSelector(state=>selectWindowSize(state,'colorPlotWindow'));


    const paletteTypeID = colormapsData[selectedColorMapId].paletteType;
    const paletteDirectionID = colormapsData[selectedColorMapId].direction;
    const paletteTickPositionID = colormapsData[selectedColorMapId].ticPosition;
    const paletteTittlePlacementID = colormapsData[selectedColorMapId].titlePlacement;
    const paletteValuePlacementID = colormapsData[selectedColorMapId].valuePlacement;


    let colorSetValues:string[] = [];

    colorSet.forEach(data => {

        let R = data.color.r ;
        let G = data.color.g ;
        let B = data.color.b ;
        let A = data.color.a ;

        let colors = 'rgba('+R+','+G+','+B+','+A+')';
        let hexValue = convertRGBtoHEX(colors);

         colorSetValues.push(hexValue);

    })


    function convertRGBtoHEX(colors:any) {

        const colorValue = colors;
        const rgba = colorValue.replace(/^rgba?\(|\s+|\)$/g, '').split(',');

        const hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
        return hex ;

    }


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

           paletteRef.current.setPaletteColor(colorSetValues);

        

            paletteRef.current.setPaletteValue(valueSet);

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
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {useAppDispatch, useAppSelector} from '../../../../../store/storeHooks'

import {selectWindowSize} from '../../../../../store/windowMgrSlice'

import { setEditMode } from '../../../../../store/windowMgrSlice'

import CustomWindow from "../../../../shared/CustomWindow"
import Legend from "./legend";

import { selectedColormapID , selectedColorPaletteId } from "../../../../../store/sideBar/colormapSlice";


export const  windowId = "colorPlotWindow";

interface Props {
    parentRef: any
}


function ColorPlotdWindow(props:Props) {

    const windowRef = useRef(null);
    const colorMapID = useAppSelector(selectedColormapID);

    const colorPlatteID = useAppSelector(selectedColorPaletteId);

    const dispatch = useAppDispatch();
   // const [colorMapWindowSizeWidth ,colorMapWindowSizeHeight]  = useAppSelector(state=>selectWindowSize(state,windowId));

    useEffect(()=>{
    
        if(windowRef.current)
        dispatch(setEditMode({uid:windowId , isEdit :true}))

    })   


    return (

        <>
        {
        colorMapID !== "-1" ?
        <CustomWindow ref={windowRef} uid={windowId} resize={true} parentRef = {props.parentRef} width={300} height={300} >
                     <Legend></Legend>
        </CustomWindow>
        :null
        }
        </>
    )
}

export default ColorPlotdWindow
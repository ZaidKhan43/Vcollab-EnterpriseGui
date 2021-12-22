import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {useAppDispatch, useAppSelector} from 'store/storeHooks'

import {selectWindowSize} from 'store/windowMgrSlice'

import { setEditMode , selectWindowMgr} from 'store/windowMgrSlice'

import CustomWindow from "components/shared/CustomWindow"
import Legend from "components/shared/colorPlot/legend";

import { selectcolormapData } from "store/sideBar/colormapSlice";


export const  windowId = "colorPlotWindow";

interface Props {
    parentRef: any
}


function ColorPlotdWindow(props:Props) {

    const colorMapData = useAppSelector(selectcolormapData);

   // const selectWindowManager = useAppSelector(selectWindowMgr).windows[windowId];

    const dispatch = useAppDispatch();


 useEffect(()=>{

    if(Object.values(colorMapData).length > 0) {

        dispatch(setEditMode({uid:windowId , isEdit :true}));

    }
 
 });


    return (

            <CustomWindow 
            uid={windowId}
            visible={true} 
            resize={true} 
            parentRef = {props.parentRef} 
            width={100} 
            height={300} >
                {
                        
                        Object.values(colorMapData).length > 0 ?  <Legend></Legend> :null
                }
            </CustomWindow>
            
    )
}

export default ColorPlotdWindow
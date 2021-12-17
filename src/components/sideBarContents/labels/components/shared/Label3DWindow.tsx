import React, { forwardRef } from 'react'
import CustomWindow,{CustomWindowProps} from '../../../../shared/CustomWindow';
import {useXarrow} from 'react-xarrows';
import { useAppDispatch } from '../../../../../store/storeHooks';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit'
import { Label3D } from '../../../../../store/sideBar/labelSlice/shared/types';
import {setLabelPos} from '../../../../../store/sideBar/labelSlice/label3DSlice';
interface Label3DWindowProps extends CustomWindowProps {
    label: Label3D,
    setLabelPosReducer: ActionCreatorWithPayload<{
        id: string;
        pos: [number, number];
        anchor: [number, number];
    }, string>
}

const Label3DWindow = forwardRef((props:Label3DWindowProps,ref:any) => {
    //const updateArrow = useXarrow();
    const dispatch = useAppDispatch();
    return (
        <CustomWindow 
                ref = {ref}
               {...props}
               >
                   {
                       props.children
                   }
        </CustomWindow>
    )
})

export default Label3DWindow

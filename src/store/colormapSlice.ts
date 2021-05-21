import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './index';

type colormapState = {
    variable:string|null,
    step:string|null,
    palette:{},
    selectedVariable:string|null,
    selectedStep:string|null,
    selectedPalette:string[],
}

const initialState: colormapState ={
    variable:null,
    step:null,
    palette:[],
    selectedVariable:'',
    selectedStep:'',
    selectedPalette:[],
}

export const colormapSlice =createSlice({
    name: 'colormaps',
    initialState,
    reducers: {
        insertData:(state,action)=>{
          state.variable = action.payload.variable;
          state.step = action.payload.step;
        },
        setData:(state,action) =>{
          state.selectedVariable =action.payload.selectedVariable
          state.selectedStep = action.payload.selectedStep
        },

    }
});

export const { insertData, setData } =colormapSlice.actions;
export const insertVariableData =(state:RootState) => state.colormaps;


export default colormapSlice.reducer

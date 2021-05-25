import { createSlice} from '@reduxjs/toolkit';
import type { RootState } from './index';

type colormapState = {
    selectedVariable:string|null,
    selectedStep:string|null,
    caeResult:any | null,
    variableId:string|null
    derivedTypeID:string|null
}

const initialState: colormapState ={

    selectedVariable:'',
    selectedStep:'',
    caeResult:null,
    variableId:'',
    derivedTypeID:''


}

export const colormapSlice =createSlice({
    name: 'colormaps',
    initialState,
    reducers: {
        insertData:(state,action)=>{
          state.caeResult=action.payload.caeResult
        },
        setData:(state,action) =>{
          state.selectedVariable =action.payload.selectedVariable
          state.selectedStep = action.payload.selectedStep
          state.variableId = action.payload.variableId
          state.derivedTypeID=action.payload.derivedTypeID
        },

    }
});

export const { insertData, setData } =colormapSlice.actions;

export const insertCaeData = (state:RootState) => { return state.colormaps.caeResult;};


export default colormapSlice.reducer

import { createSlice} from '@reduxjs/toolkit';
import type { RootState } from './index';

type colormapState = { 
    caeResult : any | null,
    selectedVariableId : string|null,
    selectedDerivedTypeId : string|null,
    selectedStepId : string|null
}

const initialState: colormapState = {
    caeResult:null,
    selectedVariableId:'',
    selectedDerivedTypeId:'',
    selectedStepId:''
}

export const colormapSlice =createSlice({
    name: 'colormaps',
    initialState,
    reducers: {
        setCAEResult:(state,action)=>{
          state.caeResult=action.payload.caeResult
        },
        setSelectedData:(state,action) =>{        
          state.selectedVariableId = action.payload.selectedVariableId
          state.selectedDerivedTypeId=action.payload.selectedDerivedTypeId
          state.selectedStepId=action.payload.selectedStepId
        },

    }
});

export const { setCAEResult, setSelectedData } = colormapSlice.actions;

export const SelectCAEResult = ( state : RootState ) => { return state.colormaps.caeResult;};

export default colormapSlice.reducer

import { createSlice} from '@reduxjs/toolkit';

type props = {
    position : {
        x : number,
        y : number,
    },
    text : string,
    showFlag : boolean,
}

const initialState : props = {
    position : {
        x : 0,
        y: 0,
    },
    text : "Position of the Point",
    showFlag : false,
}

export const probeSlice = createSlice ({
    name: "probe",
    initialState : initialState,
    reducers : {
        
        flagUpdate: (state) => {
            state.showFlag = !state.showFlag;
        },

        positionUpdate: (state,action) => {
            state.position.x = Number(action.payload.x);
            state.position.y = Number(action.payload.y);
        },
    }
})

export const {positionUpdate, flagUpdate} = probeSlice.actions;
export default probeSlice.reducer;
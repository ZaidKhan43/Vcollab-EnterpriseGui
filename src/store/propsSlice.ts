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

export const propsSlice = createSlice ({
    name: "props",
    initialState : initialState,
    reducers : {
        positionUpdate: (state,action) => {
            state.position.x = Number(action.payload.x);
            state.position.y = Number(action.payload.y);
        },
    }
})

export const {positionUpdate} = propsSlice.actions;
export default propsSlice.reducer;
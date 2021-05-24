import { createSlice} from '@reduxjs/toolkit';

type cameraValue= {
    name: string,
    value: number,
}

type colorList = {
    id : number,
    color : string,
}

type scene = {
    stdView : string[],
    valuePerspective : cameraValue[],
    valueOrthographic : cameraValue[],
    file : any,
    colorLimit : number,
    colorList : colorList[],
}

const initialState : scene = {
    stdView : [ "Front" , "Back" , "Left" , "Right" , "Top" , "Bottom" , "Isometric" ,],
    valuePerspective :  [ 
                            {name:"Left", value:100},
                            {name:"Right", value:1000},
                            {name:"Top", value:100},
                            {name:"Bottom", value:100},
                            {name:"Far Plane", value:100},
                            {name:"Near Plane", value:1000},
                        ],
    valueOrthographic : [
                            {name:"Left", value:100},
                            {name:"Right", value:1000},
                            {name:"Top", value:100},
                            {name:"Bottom", value:100},
                            {name:"Far Plane", value:100},
                            {name:"Near Plane", value:1000},
                        ],
    colorList : [{ id:1, color:"#a0a0fc"} , {id:2, color:"#ffffff"}],
    file : null ,
    colorLimit : 4,
    
}

export const sceneSlice = createSlice ({
    name: "scene",
    initialState : initialState,
    reducers : {
        perspectiveUpdate: (state,action) => {
            const index = state.valuePerspective.findIndex((item) => item.name === action.payload.name);
            if (index >= 0){
                let changeItem = state.valuePerspective[index];
                changeItem.value = action.payload.value;
                state.valuePerspective[index] = changeItem;
            }
        },
        orthographicUpdate : (state, action) => {
            const index = state.valueOrthographic.findIndex((item) => item.name === action.payload.name);
            if (index >= 0){
                let changeItem = state.valueOrthographic[index];
                changeItem.value = action.payload.value;
                state.valueOrthographic[index] = changeItem;
            }
        },
        updateBackGroundColor : (state, action) => {
            state.colorList = action.payload;
        }
    }
})

export const {perspectiveUpdate , orthographicUpdate , updateBackGroundColor } = sceneSlice.actions;
export default sceneSlice.reducer;
import { PlaylistAddOutlined } from '@material-ui/icons';
import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../index';

export enum ViewMode{
    Perspective = 0,
    Orthographic = 1,
  }

export type cameraView = {
    id : number,
    name : string,
    userDefined : boolean,
    viewMode : ViewMode,
    valuePerspective : {
        name : string,
        value : number,
    }[],
    valueOrthographic : {
        name : string,
        value : number,
    }[],
    cameraPosition: {
        name : string,
        value : number,
    }[],
    cameraDirection: {
        name : string,
        value : number,
    }[],
    cameraUp : {
        name : string,
        value : number,
    }[]
}

type settings = {
    defaultCameraParameter : {
        userDefined : boolean,
        viewMode : ViewMode,
        valuePerspective : {
            name : string,
            value : number,
        }[],
        valueOrthographic : {
            name : string,
            value : number,
        }[],
        cameraPosition: {
            name : string,
            value : number,
        }[],
        cameraDirection: {
            name : string,
            value : number,
        }[],
        cameraUp : {
            name : string,
         value : number,
        }[]
    }
    activeId : number,
    userDefineLimit : number
}

type scenes = {
    cameraViews : cameraView[],
    settings : settings,
}

const initialState : scenes = {
    cameraViews : [
        {
            id: 0,
            name: "Front" , 
            viewMode: ViewMode.Orthographic,
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
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
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"Center X", value:10},
                {name:"Center Y", value:20},
                {name:"Center Z", value:30},
            ],
            cameraUp:[
                {name:"dx", value:5},
                {name:"dy", value:3},
                {name: "dz", value:2},
            ],
        },
        {
            id: 1,
            name: "Back" , 
            viewMode: ViewMode.Orthographic,
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
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
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"Center X", value:10},
                {name:"Center Y", value:20},
                {name:"Center Z", value:30},
            ],
            cameraUp:[
                {name:"dx", value:5},
                {name:"dy", value:3},
                {name: "dz", value:2},
            ],
        },
        {
            id: 2,
            name: "Left" , 
            viewMode: ViewMode.Orthographic,
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
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
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"Center X", value:10},
                {name:"Center Y", value:20},
                {name:"Center Z", value:30},
            ],
            cameraUp:[
                {name:"dx", value:5},
                {name:"dy", value:3},
                {name: "dz", value:2},
            ],
        },
        {
            id: 3,
            name: "Right" , 
            viewMode: ViewMode.Orthographic,
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
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
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"Center X", value:10},
                {name:"Center Y", value:20},
                {name:"Center Z", value:30},
            ],
            cameraUp:[
                {name:"dx", value:5},
                {name:"dy", value:3},
                {name: "dz", value:2},
            ],
        },
        {
            id: 4,
            name: "Top" , 
            viewMode: ViewMode.Orthographic,
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
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
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"Center X", value:10},
                {name:"Center Y", value:20},
                {name:"Center Z", value:30},
            ],
            cameraUp:[
                {name:"dx", value:5},
                {name:"dy", value:3},
                {name: "dz", value:2},
            ],
        },
        {
            id: 5,
            name: "Bottom" , 
            viewMode: ViewMode.Orthographic,
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
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
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"Center X", value:10},
                {name:"Center Y", value:20},
                {name:"Center Z", value:30},
            ],
            cameraUp:[
                {name:"dx", value:5},
                {name:"dy", value:3},
                {name: "dz", value:2},
            ],
        },
        {
            id: 6,
            name: "Isometric" , 
            viewMode: ViewMode.Orthographic,
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
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
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"Center X", value:10},
                {name:"Center Y", value:20},
                {name:"Center Z", value:30},
            ],
            cameraUp:[
                {name:"dx", value:5},
                {name:"dy", value:3},
                {name: "dz", value:2},
            ],
        },
    ],

    settings : {
        defaultCameraParameter : {
            userDefined : true,
            viewMode : ViewMode.Orthographic,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
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
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"Center X", value:10},
                {name:"Center Y", value:20},
                {name:"Center Z", value:30},
            ],
            cameraUp:[
                {name:"dx", value:5},
                {name:"dy", value:3},
                {name: "dz", value:2},
            ],
        },
        activeId : -1,
        userDefineLimit: 3,  
    }
}

export const sceneSlice = createSlice({
    name: "scene",
    initialState : initialState,
    reducers: {
        addCameraView : (state) => {
            if(state.cameraViews.filter(item => item.userDefined === true).length < state.settings.userDefineLimit){
                const length = state.cameraViews.length;
                const userDefinedLength = state.cameraViews.filter(item => item.userDefined === true).length;
                const id : number = length;
                const name : string = `Camera View ${userDefinedLength + 1}`;
                const newCameraView : cameraView = {
                id, name, ...state.settings.defaultCameraParameter
            }
            state.cameraViews = [...state.cameraViews, newCameraView];
            }
        },

        setActiveId:(state, action) => {
            if(action.payload !== state.settings.activeId)
                state.settings.activeId = action.payload;
            else
                state.settings.activeId = -1;
        },

        editViewMode: (state, action) => {
            const index = state.cameraViews.findIndex(item => item.id === action.payload.id);
            if( index > -1){
                let changeItem : cameraView = state.cameraViews[index];
                console.log(action.payload.value)
                changeItem.viewMode = action.payload.value;
                state.cameraViews[index] = changeItem;
            }
        }
    }
})

export const {addCameraView, setActiveId , editViewMode} = sceneSlice.actions;

export default sceneSlice.reducer;

//selectors

export const selectedCameraView = (state : RootState) => {
    const clickedValues = state.scene.cameraViews.filter(item => item.id === state.scene.settings.activeId);
    return(clickedValues)
  }
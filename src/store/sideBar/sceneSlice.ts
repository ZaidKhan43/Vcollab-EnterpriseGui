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

type colorList = {
    id : number,
    color : {
        r : number,
        g : number,
        b : number,
        a ?: number,
    },
}

type settings = {
    defaultCameraParameter : {
        userDefined : boolean,
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
    userDefineLimit : number,
    projection : ViewMode,
    colorLimit : number,
}

type scenes = {
    cameraViews : cameraView[],
    settings : settings,
    colorList : colorList[],
    file: any,
}

const initialState : scenes = {
    cameraViews : [
        {
            id: 0,
            name: "Front" , 
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
                {name:"Far", value:100},
                {name:"Near", value:1000},
            ],
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"X", value:10},
                {name:"Y", value:20},
                {name:"Z", value:30},
            ],
            cameraUp:[
                {name:"X", value:5},
                {name:"Y", value:3},
                {name: "Z", value:2},
            ],
        },
        {
            id: 1,
            name: "Back" , 
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
                {name:"Far", value:100},
                {name:"Near", value:1000},
            ],
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"X", value:10},
                {name:"Y", value:20},
                {name:"Z", value:30},
            ],
            cameraUp:[
                {name:"X", value:5},
                {name:"Y", value:3},
                {name: "Z", value:2},
            ],
        },
        {
            id: 2,
            name: "Left" , 
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
                {name:"Far", value:100},
                {name:"Near", value:1000},
            ],
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"X", value:10},
                {name:"Y", value:20},
                {name:"Z", value:30},
            ],
            cameraUp:[
                {name:"X", value:5},
                {name:"Y", value:3},
                {name: "Z", value:2},
            ],
        },
        {
            id: 3,
            name: "Right" , 
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
                {name:"Far", value:100},
                {name:"Near", value:1000},
            ],
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"X", value:10},
                {name:"Y", value:20},
                {name:"Z", value:30},
            ],
            cameraUp:[
                {name:"X", value:5},
                {name:"Y", value:3},
                {name: "Z", value:2},
            ],
        },
        {
            id: 4,
            name: "Top" , 
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
                {name:"Far", value:100},
                {name:"Near", value:1000},
            ],
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"X", value:10},
                {name:"Y", value:20},
                {name:"Z", value:30},
            ],
            cameraUp:[
                {name:"X", value:5},
                {name:"Y", value:3},
                {name: "Z", value:2},
            ],
        },
        {
            id: 5,
            name: "Bottom" , 
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
                {name:"Far", value:100},
                {name:"Near", value:1000},
            ],
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"X", value:10},
                {name:"Y", value:20},
                {name:"Z", value:30},
            ],
            cameraUp:[
                {name:"X", value:5},
                {name:"Y", value:3},
                {name: "Z", value:2},
            ],
        },
        {
            id: 6,
            name: "Isometric" , 
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
                {name:"Far", value:100},
                {name:"Near", value:1000},
            ],
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"X", value:10},
                {name:"Y", value:20},
                {name:"Z", value:30},
            ],
            cameraUp:[
                {name:"X", value:5},
                {name:"Y", value:3},
                {name: "Z", value:2},
            ],
        },
    ],

    colorList : [{ id:1, color:{r:160, g:160, b:252, a:1}} , {id:2, color:{r:255, g:255, b:255, a:1}}],
    file : null ,

    settings : {
        defaultCameraParameter : {
            userDefined : true,
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
                {name:"Far", value:100},
                {name:"Near", value:1000},
            ],
            cameraPosition : [
                {name:"X" , value:20.0},
                {name:"Y", value:20.0},
                {name:"Z", value:20.0},
            ],
            cameraDirection:[
                {name:"X", value:10},
                {name:"Y", value:20},
                {name:"Z", value:30},
            ],
            cameraUp:[
                {name:"X", value:5},
                {name:"Y", value:3},
                {name: "Z", value:2},
            ],
        },
        activeId : -1,
        userDefineLimit: 3,
        projection: ViewMode.Orthographic,  
        colorLimit : 4,
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

        pasteCameraView: (state,action :  PayloadAction<{data: cameraView}>) => {
            const userDefinedLength : number = state.cameraViews.filter(item => item.userDefined === true).length;
            let clone = JSON.parse(JSON.stringify(action.payload.data));
            const newId = state.cameraViews.length;
            clone.id= newId;
            clone.userDefined = true;
            clone.name = `Camera View ${userDefinedLength + 1}`;
            state.cameraViews = [...state.cameraViews , clone];
        },

        deteteCameraView:(state, action: PayloadAction<{id : number}>) => {
            state.cameraViews =  state.cameraViews.filter(item => item.id !== action.payload.id)
        },

        setActiveId:(state, action :  PayloadAction<number>) => {
            if(action.payload !== state.settings.activeId)
                state.settings.activeId = action.payload;
            else
                state.settings.activeId = -1;
        },

        editViewMode: (state, action:  PayloadAction<{value : ViewMode}>) => {
            state.settings.projection = action.payload.value;
        },

        updateChange: (state, action :  PayloadAction<{data : cameraView}>) => {
            const data = action.payload.data;
            const index = state.cameraViews.findIndex(item => item.id === data.id)
            if(index > -1){
                state.cameraViews[index] = {...data};
            }
        },

        updateBackgroundColor : (state, action : PayloadAction<colorList[]>) => {
            state.colorList = action.payload;
        },

        updateBackgroundImage : (state, action) => {
            state.file = action.payload;
        },
    }
})

export const {addCameraView, setActiveId , editViewMode , updateChange, pasteCameraView , deteteCameraView , updateBackgroundColor , updateBackgroundImage } = sceneSlice.actions;

export default sceneSlice.reducer;

//selectors

export const selectedCameraView = (state : RootState) => {
    const clickedValues = state.scene.cameraViews.filter(item => item.id === state.scene.settings.activeId);
    return(clickedValues)
  }
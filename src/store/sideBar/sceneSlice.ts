import { PlaylistAddOutlined } from '@material-ui/icons';
import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { getCameraStdViews, setCameraInfo, setCameraProjection } from '../../backend/viewerAPIProxy';
import {perspectiveToOrtho,orthoToPerspective} from '../../components/utils/camera'
import type { RootState } from '../index';

export enum ViewMode {
    Perspective = 0,
    Orthographic = 1,
  }

export type CameraView = {
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

type ColorList = {
    id : number,
    color : {
        r : number,
        g : number,
        b : number,
        a ?: number,
    },
}

type Settings = {
    idGenerator: number,
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

type Scenes = {
    cameraViews : CameraView[],
    settings : Settings,
    colorList : ColorList[],
    file: any,
    axisTriodList : AxisTriodList[],
}


export type AxisTriodList = {
    id:any
    text:string,
    selected:boolean,
    applied:boolean,
}

const initialState : Scenes = {
    cameraViews : [
        
    ],
    
    colorList : [{ id:1, color:{r:160, g:160, b:252, a:1}} , {id:2, color:{r:255, g:255, b:255, a:1}}],
    file : null ,
    axisTriodList:[
        {id:'1',text:'Top Right',selected:false,applied:false},
        {id:'2',text:'Top Left',selected:false,applied:false},
        {id:'3',text:'Middle Right',selected:false,applied:false},
        {id:'4',text:'Middle Left',selected:false,applied:false},
        {id:'5',text:'Bottom Left',selected:false,applied:false},
        {id:'6',text:'Bottom Right',selected:false,applied:false},
        {id:'7',text:'Custom',selected:false,applied:false}
    ],

    settings : {
        idGenerator:0,
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
                {name:"Z", value:2},
            ],
        },
        activeId : -1,
        userDefineLimit: 3,
        projection: ViewMode.Perspective,  
        colorLimit : 4,
    }
}

export const fetchCameraStdViews = createAsyncThunk(
    'scene/fetchCameraStdViews',
    async (data,{dispatch, getState}) => {
        const state = getState() as RootState;
        const viewerId = state.app.viewers[state.app.activeViewer || ''];
        let r:any[] = getCameraStdViews(viewerId);
        return r;
    }
)

export const setCameraInfoAsync = createAsyncThunk(
    'scene/setCameraInfoAsync',
    async (data,{dispatch,getState}) => {
        const state = getState() as RootState;
        const viewerId = state.app.viewers[state.app.activeViewer || ''];
        let activeView = selectedCameraView(state)[0];
        let camData = {
            position: [activeView.cameraPosition[0].value,activeView.cameraPosition[1].value,activeView.cameraPosition[2].value],
            dir: [activeView.cameraDirection[0].value,activeView.cameraDirection[1].value,activeView.cameraDirection[2].value],
            up: [activeView.cameraUp[0].value,activeView.cameraUp[1].value,activeView.cameraUp[2].value],
            perspective: 
            {
                fov: activeView.valuePerspective[0].value,
                aspect: activeView.valuePerspective[1].value,
                far: activeView.valuePerspective[2].value,
                near: activeView.valuePerspective[3].value
            },
            ortho: {
                left: activeView.valueOrthographic[0].value,
                right: activeView.valueOrthographic[1].value,
                top: activeView.valueOrthographic[2].value,
                bottom: activeView.valueOrthographic[3].value,
                far: activeView.valueOrthographic[4].value,
                near: activeView.valueOrthographic[5].value,
            }
        }
        setCameraInfo(viewerId,camData);
    }
)
export const setProjectionAsync = createAsyncThunk(
    'scene/setProjectionAsync',
    async (data:ViewMode, {dispatch,getState}) => {
        const state = getState() as RootState;
        const viewerId = state.app.viewers[state.app.activeViewer || ''];
        setCameraProjection(viewerId,data);
        dispatch(sceneSlice.actions.editViewMode({value:data}));
    }
)
export const sceneSlice = createSlice({
    name: "scene",
    initialState : initialState,
    reducers: {
        //camera
        addCameraView : (state) => {
            if(state.cameraViews.filter(item => item.userDefined === true).length < state.settings.userDefineLimit){
                const userDefinedLength = state.cameraViews.filter(item => item.userDefined === true).length;
                const id : number = ++state.settings.idGenerator;
                const name : string = `Camera View ${userDefinedLength + 1}`;
                const newCameraView : CameraView = {
                ...state.settings.defaultCameraParameter,id, name, userDefined:true
            }
            state.cameraViews = [...state.cameraViews, newCameraView];
            }
        },

        pasteCameraView: (state,action :  PayloadAction<{data: CameraView}>) => {
            const userDefinedLength : number = state.cameraViews.filter(item => item.userDefined === true).length;
            let clone = JSON.parse(JSON.stringify(action.payload.data));
            const newId = ++state.settings.idGenerator;
            clone.id= newId;
            clone.userDefined = true;
            clone.name = `Camera View ${userDefinedLength + 1}`;
            state.cameraViews = [...state.cameraViews , clone];
        },

        deleteCameraView:(state, action: PayloadAction<{id : number}>) => {
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
        
        updateChange: (state, action :  PayloadAction<{data : CameraView, tab : ViewMode}>) => {
            const {data,tab} = action.payload;
            const index = state.cameraViews.findIndex(item => item.id === data.id)
            if(index > -1){
                if(tab === ViewMode.Perspective)
                {
                    let fov = data.valuePerspective[0].value;
                    let aspect = data.valuePerspective[1].value; 
                    let far = data.valuePerspective[2].value;
                    let near = data.valuePerspective[3].value;
                    let orthoData = perspectiveToOrtho(fov,aspect,near,far);
                    data.valueOrthographic[0].value = orthoData.left;
                    data.valueOrthographic[1].value = orthoData.right;
                    data.valueOrthographic[2].value = orthoData.top;
                    data.valueOrthographic[3].value = orthoData.bottom;
                    data.valueOrthographic[4].value = orthoData.far;
                    data.valueOrthographic[5].value = orthoData.near;
                }
                else{
                    let left = data.valueOrthographic[0].value;
                    let right = data.valueOrthographic[1].value; 
                    let top = data.valueOrthographic[2].value;
                    let bottom = data.valueOrthographic[3].value;
                    let far = data.valueOrthographic[4].value;
                    let near = data.valueOrthographic[5].value;
                    let perspData = orthoToPerspective(left,right,top,bottom,near,far);
                    data.valuePerspective[0].value = perspData.fov;
                    data.valuePerspective[1].value = perspData.aspect;
                    data.valuePerspective[2].value = perspData.far;
                    data.valuePerspective[3].value = perspData.near;
                }
                state.cameraViews[index] = {...data};
            }
        },

        //background
        updateBackgroundColor : (state, action : PayloadAction<ColorList[]>) => {
            state.colorList = action.payload;
        },

        updateBackgroundImage : (state, action) => {
            state.file = action.payload;
        },
        // axisTriad
        setApplyItem:(state, action:PayloadAction<any>)=>{
            state.axisTriodList.forEach((item)=>{    
              if(item.id === action.payload) {
                item.selected = true
              }
              else{
                item.selected = false
              }
        // Apply selected item             
              if(item.selected === true) {
                item.applied = true
                item.selected = false // 
              }
              else {
                item.applied = false
                }
            })
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchCameraStdViews.fulfilled, (state, action:PayloadAction<any[]>) => {
            const r = action.payload;
            let userViews = state.cameraViews.filter(e => e.userDefined === true);
            state.cameraViews = [...userViews];
            r.forEach(e => {
                let view = {
                    id: ++state.settings.idGenerator,
                    name: e.name,
                    userDefined:false,
                    valuePerspective: [
                        {name: "Y-Field of View", value: e.perspective.fov},
                        {name: "Aspect Ratio",value: e.perspective.aspect},
                        {name: "Far Plane", value: e.perspective.far},
                        {name: "Near Plane", value: e.perspective.near}
                    ],
                    valueOrthographic: [
                        {name:"Left", value:e.ortho.left},
                        {name:"Right", value:e.ortho.right},
                        {name:"Top", value:e.ortho.top},
                        {name:"Bottom", value:e.ortho.bottom},
                        {name:"Far", value:e.ortho.far},
                        {name:"Near", value:e.ortho.near},
                    ],
                    cameraPosition : [
                        {name:"X" , value:e.position[0]},
                        {name:"Y", value:e.position[1]},
                        {name:"Z", value:e.position[2]},
                    ],
                    cameraDirection:[
                        {name:"X", value:e.dir[0]},
                        {name:"Y", value:e.dir[1]},
                        {name:"Z", value:e.dir[2]},
                    ],
                    cameraUp:[
                        {name:"X", value:e.up[0]},
                        {name:"Y", value:e.up[1]},
                        {name:"Z", value:e.up[2]},
                    ],
                }
                state.cameraViews.push(view);
            })
            state.settings.defaultCameraParameter = state.cameraViews[0];

        })
    }
})

export const {addCameraView, setActiveId ,  updateChange, pasteCameraView , deleteCameraView, updateBackgroundColor , updateBackgroundImage , setApplyItem} = sceneSlice.actions;

export default sceneSlice.reducer;

//selectors

export const selectAxisTriodList = (state:RootState) => state.scene.axisTriodList;

export const selectedCameraView = (state : RootState) => {
    const clickedValues = state.scene.cameraViews.filter(item => item.id === state.scene.settings.activeId);
    return(clickedValues)
  }
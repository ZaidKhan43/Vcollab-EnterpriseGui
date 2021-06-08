import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { mat4, vec3 } from 'gl-matrix';
import {getSectionGUIData, setPlaneState, setSectionPlaneEquation, setActiveSectionPlane, addSectionPlane, deleteSectionPlane, getSceneBoundingBox} from "../../backend/viewerAPIProxy"
import {getNormalizedEqn, getWorldTransformFromPlaneEqn} from "../../components/utils/Math"
import type { RootState } from '../index';
type plane = {
    id: number,
    name: string,
    enabled: boolean,
    showClip: boolean,
    showEdge: boolean,
    showCap: boolean,
    clipCordX: number,
	  clipCordY: number,
	  clipCordZ: number,
	  clipConstD: number,
    clipNormalInverted: boolean,
    translate: number,
    translateMin: number,
    translateMax: number,
    rotate: number,
    axisX: number,
	  axisY: number,	
    transform: number[],
    initTransform: number[],
    userInputEquation:number[],		
    color: [number,number,number,number]
}

type settings= {
  planesData: any,
  defaultPlaneParameters : plane
  maxAllowedPlanes : number,
  idGenerator: number,
  clickedVal : plane | null,
}

type Color = [number,number,number,number];

type planes = {
  colors: Color[]
  planes : plane[],
  settings : settings
};

const initialState : planes = {
  colors: [[1,0,0,0.5],
  [0,1,0,0.5],
  [0,0,1,0.5],
  [1,1,0,0.5],
  [1,0,1,0.5],
  [0,1,1,0.5]],
  planes:[

  ],

  settings :{
    maxAllowedPlanes : 6,
    idGenerator :-1,
    planesData: [],
    clickedVal : null,
    defaultPlaneParameters : {
      id:-1,
      name:'plane',
      enabled: true,
      showClip: true,
      showEdge: false,
      showCap: false,
      clipCordX: 1,
      clipCordY: 0,
      clipCordZ: 0,
      clipConstD:0,
      clipNormalInverted: false,
      translate: 0,
      translateMin:-200,
      translateMax:200,
      rotate: 0,
      axisX: 0,
      axisY: 0,
      transform: Array.from(mat4.create()),
      initTransform: Array.from(mat4.create()),
      userInputEquation: [1,0,0,0],
      color: [1,0,0,0.3]
    }
  }
}

//added by pravin
export const fetchSectionPlaneData = createAsyncThunk(
  "clipSlice/fetchSectionPlaneData",
  async (data,{dispatch,getState}) => {
     
     const rootState = getState() as RootState;
     const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
     let result:any = [];
     if(viewerId)
     result =  getSectionGUIData(viewerId);
     if(result.planeOptions instanceof Array){
       return Promise.resolve(result.planeOptions);
     }
     else{
       return Promise.reject();
     }
  }
)

export const setSectionPlaneData = createAsyncThunk(
  "clipSlice/setSectionPlaneState",
  async (data:{id:number},{dispatch,getState}) => {
     
     const rootState = getState() as RootState;
     const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
     const index : any = rootState.clipPlane.planes.findIndex((item) => item.id === data.id);
     const curPlane = rootState.clipPlane.planes[index];
     let options = {
       ...rootState.clipPlane.settings.planesData[index],
       isPlaneEnabled: curPlane.enabled,
       isPlaneVisible: curPlane.showClip,
       primarySliderValue: curPlane.translate,
       sliderMinMax: [curPlane.translateMin,curPlane.translateMax],
       rotSliderNValue: curPlane.rotate,
       rotSliderUValue: curPlane.axisX,
       rotSliderVValue:curPlane.axisY,
     }
     
     setPlaneState(data.id,options,viewerId);
     //let eq:[number,number,number,number] = [curPlane.clipCordX,curPlane.clipCordY,curPlane.clipCordZ,-curPlane.clipConstD];

     setSectionPlaneEquation(data.id,new Float32Array(curPlane.transform),viewerId,new Float32Array(curPlane.initTransform));
     dispatch(fetchSectionPlaneData());
     return Promise.resolve('SUCCESS')
  }
)

export const addPlane = createAsyncThunk(
  "clipSlice/addSectionPlane",
  async (data,{dispatch,getState}) => {
    const rootState = getState() as RootState;
    const state = rootState.clipPlane;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    let eqn = getNormalizedEqn([
      state.settings.defaultPlaneParameters.clipCordX,
      state.settings.defaultPlaneParameters.clipCordY,
      state.settings.defaultPlaneParameters.clipCordZ,
      -state.settings.defaultPlaneParameters.clipConstD
    ]);
    let bbox = getSceneBoundingBox(viewerId,false);
    let center = bbox.getCenter() as vec3;
    let n = vec3.fromValues(eqn[0],eqn[1],eqn[2]);
    eqn[3] = -vec3.dot(n,center);
    let newTransform = getWorldTransformFromPlaneEqn(eqn,center);
    let id = rootState.clipPlane.settings.idGenerator + 1;
    let randColorIdx = id % state.colors.length;
    let color = state.colors[randColorIdx];
    addSectionPlane(id, newTransform, color ,viewerId);
    dispatch(createPlane({newTransform: Array.from(newTransform), eqn, color, radius: bbox.getRadius()}));
    dispatch(setSectionPlaneData({id}))
  }
)
export const duplicatePlane = createAsyncThunk(
  "clipSlice/duplicatePlane",
  async (data:{id:number},{dispatch,getState}) => {
    const rootState = getState() as RootState;
    const state = rootState.clipPlane;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    let cloneId = state.settings.idGenerator;
    const index : any = rootState.clipPlane.planes.findIndex((item) => item.id === cloneId);
    const curPlane = rootState.clipPlane.planes[index];
    addSectionPlane(cloneId,new Float32Array(curPlane.transform),curPlane.color,viewerId);
    dispatch(setSectionPlaneData({id:cloneId}))
  }
)
export const removePlane = createAsyncThunk(
  "clipSlice/addSectionPlane",
  async (data:{id:number},{dispatch,getState}) => {
    const rootState = getState() as RootState;
    //const state = rootState.clipPlane;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
    dispatch(setSectionPlaneData({id:data.id}))
    deleteSectionPlane(data.id,viewerId);
    dispatch(deletePlane(data.id));
  }
)

export const setActive = createAsyncThunk(
  "clipSlice/setActiveSectionPlane",
  async (data:{id:number},{dispatch,getState}) => {
     const rootState = getState() as RootState;
     const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];
     setActiveSectionPlane(data.id,viewerId)

  }
)

export const clipSlice = createSlice({
  name: "clip",
  initialState : initialState,
  reducers: {
    setPlanesData: (state,action) => {
      state.settings.planesData = action.payload;
      state.settings.maxAllowedPlanes = action.payload.length;
    },
    createPlane: (state, action:PayloadAction<{newTransform:number[],color:Color,eqn:number[],radius:number}>) => {
      if (state.planes.length < state.settings.maxAllowedPlanes){
        state.settings.idGenerator +=1 ;
        const newId = state.settings.idGenerator;
        const plane = {  id: newId,name:`Plane ${newId}`, 
        enabled: state.settings.defaultPlaneParameters.enabled, 
        showClip: state.settings.defaultPlaneParameters.showClip, 
        showEdge: state.settings.defaultPlaneParameters.showEdge,
        showCap: state.settings.defaultPlaneParameters.showCap,
        clipCordX:action.payload.eqn[0],
        clipCordY:action.payload.eqn[1], 
        clipCordZ:action.payload.eqn[2],
        clipConstD:-action.payload.eqn[3],
        clipNormalInverted: state.settings.defaultPlaneParameters.clipNormalInverted,
        translate: 0,
        translateMin: -action.payload.radius,
        translateMax: action.payload.radius,
        rotate: 0,
        axisX:0,
        axisY: 0,
        transform: action.payload.newTransform,
        initTransform: action.payload.newTransform,
       userInputEquation: [action.payload.eqn[0],
                           action.payload.eqn[1],
                            action.payload.eqn[2], 
                            -action.payload.eqn[3]            
      ],
        color: action.payload.color
      }
        state.planes= [...state.planes,plane];      }
    },

    editEnabled: (state, action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0 ) {
        let changeItem : any = state.planes[index];
        if(changeItem.enabled === true && changeItem.showClip === true)
          changeItem.showClip = !changeItem.showClip
        if(changeItem.enabled === false && changeItem.showClip === false)
          changeItem.showClip = !changeItem.showClip   
        changeItem.enabled = !changeItem.enabled
        
        state.planes[index] = changeItem;
      }
    },

    editShowClip : (state,action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0 ) {
        let changeItem : any = state.planes[index];
        changeItem.showClip = !changeItem.showClip;
        state.planes[index] = changeItem;
      }
    },

    editEdgeClip : (state,action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0 ) {
        let changeItem : any = state.planes[index];
        changeItem.showEdge = !changeItem.showEdge
        state.planes[index] = changeItem;
      }       
    },

    editShowCap : (state,action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.showCap = !changeItem.showCap
        state.planes[index] = changeItem;
      }
    },

    pastePlane : (state, action) => {
      if (state.planes.length < state.settings.maxAllowedPlanes){
        let clone = JSON.parse(JSON.stringify(action.payload));
        state.settings.idGenerator+=1;
        clone.id=state.settings.idGenerator;
        clone.name = `${clone.name} (Copy)`
        clone.checkbox= false;
        clone.color = state.colors[clone.id % state.colors.length];
        state.planes=[...state.planes, clone];
        //console.log("clone",clone)
        //console.log("After", state.planes)
      }
    },

    deletePlane : (state, action) => {
      const newArray = state.planes.filter(item => item.id !== action.payload);
      state.planes=[...newArray]
    },

    editPlane: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.clipCordX = action.payload.clipCordX;
        changeItem.clipCordY = action.payload.clipCordY;
        changeItem.clipCordZ = action.payload.clipCordZ;
        changeItem.clipConstD = action.payload.clipConstD;
        changeItem.clipNormalInverted = action.payload.clipNormalInverted;
        changeItem.translate = action.payload.translate;
        changeItem.rotate = action.payload.rotate;
        changeItem.axisX = action.payload.axisX;
        changeItem.axisY = action.payload.axisY;
        state.planes[index] = changeItem;
      }      
    },

    editEquation: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem = state.planes[index];
        if(changeItem.clipCordX !== action.payload.clipCordX || changeItem.clipCordY !== action.payload.clipCordY || changeItem.clipCordZ !== action.payload.clipCordZ)
          {
            changeItem.rotate = 0;
            changeItem.translate = 0;
            changeItem.axisX = 0;
            changeItem.axisY = 0;
          }
        let curTransform = changeItem.transform;
        let curCenter = vec3.fromValues(curTransform[12],curTransform[13],curTransform[14]);
        let eqn = getNormalizedEqn([
          action.payload.clipInputX,
          action.payload.clipInputY,
          action.payload.clipInputZ,
          action.payload.clipInputD
        ]);
        let newTransform = getWorldTransformFromPlaneEqn(eqn,curCenter);
        changeItem.clipCordX = action.payload.clipInputX;
        changeItem.clipCordY = action.payload.clipInputY;
        changeItem.clipCordZ = action.payload.clipInputZ;
        changeItem.clipConstD = action.payload.clipInputD;

        changeItem.userInputEquation[0] = action.payload.clipInputX;
        changeItem.userInputEquation[1] = action.payload.clipInputY;
        changeItem.userInputEquation[2] = action.payload.clipInputZ;
        changeItem.userInputEquation[3] = action.payload.clipInputD;
        changeItem.transform = Array.from(newTransform);
        changeItem.initTransform = Array.from(newTransform);
        state.planes[index] = changeItem;
      }
    },

    editNormalInverted: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.clipNormalInverted = !changeItem.clipNormalInverted;
        changeItem.clipCordX = (changeItem.clipCordX < 0) ? Math.abs(changeItem.clipCordX) : - Math.abs(changeItem.clipCordX);
        changeItem.clipCordY = (changeItem.clipCordY < 0) ? Math.abs(changeItem.clipCordY) : - Math.abs(changeItem.clipCordY);
        changeItem.clipCordZ = (changeItem.clipCordZ < 0) ? Math.abs(changeItem.clipCordZ) :  - Math.abs(changeItem.clipCordZ);
        changeItem.clipConstD = (changeItem.clipConstD < 0) ? Math.abs(changeItem.clipConstD) : - Math.abs(changeItem.clipConstD);
        changeItem.translate = (changeItem.translate < 0) ? Math.abs(changeItem.translate) : - Math.abs(changeItem.translate);
        let transform = mat4.clone(changeItem.transform);
        transform[8] = -changeItem.transform[8]; 
        transform[9] = -changeItem.transform[9]; 
        transform[10] = -changeItem.transform[10];
        changeItem.transform = transform;
        state.planes[index] = changeItem;
      }
    },

    editTranslate: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        let data = {id:index,delta:action.payload.translate - changeItem.translate};
        clipSlice.caseReducers.translate(state,{payload:data,type:"clipslice/translate"})
        changeItem.translate= action.payload.translate;
        // state.planes[index] = changeItem;
      }
    },

    editRotate: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        let data = {id:index,delta:action.payload.rotate - changeItem.rotate};
        clipSlice.caseReducers.rotateZ(state,{payload:data,type:"clipslice/rotateZ"})
        changeItem.rotate= action.payload.rotate;
        state.planes[index] = changeItem;
      }
    },

    editAxisX: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        let data = {id:index,delta:action.payload.axisX - changeItem.axisX};

        clipSlice.caseReducers.rotateX(state,{payload:data,type:"clipslice/rotateX"})
        changeItem.axisX= action.payload.axisX;
        state.planes[index] = changeItem;
      }
    },

    editAxisY: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        let data = {id:index,delta:action.payload.axisY - changeItem.axisY};
        clipSlice.caseReducers.rotateY(state,{payload:data,type:"clipslice/rotateY"})
        changeItem.axisY= action.payload.axisY;
        state.planes[index] = changeItem;
      }
    },

    editPlaneName: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.name = action.payload.editName;
        state.planes[index] = changeItem;
      }
    },
    saveClickedVal: (state, action) => {
      state.settings.clickedVal= action.payload;
    },
        //added by pravin
        setPlaneEqn: (state, action) => {
          const {id, eqn} = action.payload;
          let plane = state.planes[id];
          plane.clipCordX = eqn[0];
          plane.clipCordY = eqn[1];
          plane.clipCordZ = eqn[2];
          plane.clipConstD = eqn[3];
      },
      translate: (state, action) => {
        let {id,delta} = action.payload;
        let curPlane = state.planes[id];
        let normal = vec3.fromValues(curPlane.clipCordX,curPlane.clipCordY,curPlane.clipCordZ);
        let l = vec3.len(normal);
        vec3.normalize(normal,normal);
        let transform = mat4.fromValues(
          curPlane.transform[0],curPlane.transform[1],curPlane.transform[2],curPlane.transform[3], 
          curPlane.transform[4],curPlane.transform[5],curPlane.transform[6],curPlane.transform[7],
          curPlane.transform[8],curPlane.transform[9],curPlane.transform[10],curPlane.transform[11],
          curPlane.transform[12],curPlane.transform[13],curPlane.transform[14],curPlane.transform[15],
        )
        let translation = mat4.create();
        let dir = vec3.clone(normal);
        let pos = vec3.fromValues(transform[12] , transform[13] , transform[14]);
        curPlane.clipConstD = curPlane.clipConstD + delta;
        vec3.scale(dir,dir,delta/l);
        mat4.translate(translation,translation,dir);
        vec3.transformMat4(pos,pos,translation)
        transform[12] = pos[0] ; transform[13] = pos[1] ; transform[14] = pos[2];
        curPlane.transform = Array.from(transform);
      },
    
      rotateX: (state, action) => {
          let {id,delta} = action.payload;
          let curPlane = state.planes[id];
          let normal = vec3.fromValues(curPlane.clipCordX,curPlane.clipCordY,curPlane.clipCordZ);
          let rad = Math.PI/180 * delta;
          let l = vec3.len(normal);
          vec3.normalize(normal,normal);
          let transform = mat4.fromValues(
            curPlane.transform[0],curPlane.transform[1],curPlane.transform[2],curPlane.transform[3], 
            curPlane.transform[4],curPlane.transform[5],curPlane.transform[6],curPlane.transform[7],
            curPlane.transform[8],curPlane.transform[9],curPlane.transform[10],curPlane.transform[11],
            curPlane.transform[12],curPlane.transform[13],curPlane.transform[14],curPlane.transform[15],
          )
          mat4.rotateX(transform,transform,rad);
          let newNormal = vec3.fromValues(transform[8],transform[9],transform[10]);
          curPlane.clipConstD = l*vec3.dot(newNormal,vec3.fromValues(curPlane.transform[12],curPlane.transform[13],curPlane.transform[14]))
          curPlane.clipCordX = l*newNormal[0];
          curPlane.clipCordY = l*newNormal[1];
          curPlane.clipCordZ = l*newNormal[2];
          curPlane.transform = Array.from(transform);
    
      },
    
      rotateY: (state,action) => {
        let {id,delta} = action.payload;
        let curPlane = state.planes[id];
        let normal = vec3.fromValues(curPlane.clipCordX,curPlane.clipCordY,curPlane.clipCordZ);
        let rad = Math.PI/180 * delta;
        let l = vec3.len(normal);
        vec3.normalize(normal,normal);
        let transform = mat4.fromValues(
          curPlane.transform[0],curPlane.transform[1],curPlane.transform[2],curPlane.transform[3], 
          curPlane.transform[4],curPlane.transform[5],curPlane.transform[6],curPlane.transform[7],
          curPlane.transform[8],curPlane.transform[9],curPlane.transform[10],curPlane.transform[11],
          curPlane.transform[12],curPlane.transform[13],curPlane.transform[14],curPlane.transform[15],
        )
        mat4.rotateY(transform,transform,rad);
        let newNormal = vec3.fromValues(transform[8],transform[9],transform[10]);
        curPlane.clipConstD = l*vec3.dot(newNormal,vec3.fromValues(curPlane.transform[12],curPlane.transform[13],curPlane.transform[14]))
        curPlane.clipCordX = l*newNormal[0];
        curPlane.clipCordY = l*newNormal[1];
        curPlane.clipCordZ = l*newNormal[2];
        curPlane.transform = Array.from(transform);
        //let eqn = [newNormal,curPlane.clipConstD];
        //console.log("count", count+=1);
        //console.log("totalDelta",totalDelta+=delta);
      },
    
      rotateZ: (state,action) => {
        let {id,delta} = action.payload;
        let curPlane = state.planes[id];
        let normal = vec3.fromValues(curPlane.clipCordX,curPlane.clipCordY,curPlane.clipCordZ);
        let rad = Math.PI/180 * delta;
        let l = vec3.len(normal);
        vec3.normalize(normal,normal);
        let transform = mat4.fromValues(
          curPlane.transform[0],curPlane.transform[1],curPlane.transform[2],curPlane.transform[3], 
          curPlane.transform[4],curPlane.transform[5],curPlane.transform[6],curPlane.transform[7],
          curPlane.transform[8],curPlane.transform[9],curPlane.transform[10],curPlane.transform[11],
          curPlane.transform[12],curPlane.transform[13],curPlane.transform[14],curPlane.transform[15],
        )
        mat4.rotateZ(transform,transform,rad);
        let newNormal = vec3.fromValues(transform[8],transform[9],transform[10]);
        curPlane.clipConstD = l*vec3.dot(newNormal,vec3.fromValues(curPlane.transform[12],curPlane.transform[13],curPlane.transform[14]))
        curPlane.clipCordX = l*newNormal[0];
        curPlane.clipCordY = l*newNormal[1];
        curPlane.clipCordZ = l*newNormal[2];
        curPlane.transform = Array.from(transform);
        //let eqn = [newNormal,curPlane.clipConstD];
        //console.log("count", count+=1);
        //console.log("totalDelta",totalDelta+=delta);
      }
  },
extraReducers: (builder) => {
  builder.addCase(fetchSectionPlaneData.fulfilled, (state,{payload}) => {
    clipSlice.caseReducers.setPlanesData(state,{payload,type:"any"})
  });
}
})

export const { createPlane,editEnabled,editShowClip, editEdgeClip, editShowCap, pastePlane, deletePlane, editPlane, editEquation, editNormalInverted , editTranslate, editRotate, editAxisX, editAxisY, editPlaneName, saveClickedVal,rotateX, rotateY, rotateZ, translate} = clipSlice.actions;

export default clipSlice.reducer;

import { createSlice,createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { mat4, vec3 } from 'gl-matrix';
import { forEachChild } from 'typescript';
import {getSectionGUIData, setSectionPlaneGUIData, setSectionPlaneEquation, setActiveSectionPlane, addSectionPlane, deleteSectionPlane, getSceneBoundingBox} from "../../backend/viewerAPIProxy"
import {getNormalizedEqn, getPerpendicular, getWorldTransformFromPlaneEqn} from "../../components/utils/Math"
import type { RootState } from '../index';

interface slicePlane {
  id:number,
  enabled: boolean,
  showClip: boolean,
  transform: number[],
  translate: number,
  translateMin: number,
  translateMax:number,
  color: Color
} 

type masterPlane = {
  id: number,
  name: string,
}

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
    slicePlane: slicePlane | null,
    childPlane: number[],
    masterPlane: masterPlane ,
      
  }

type settings= {
  planesData: any,
  defaultPlaneParameters : plane
  maxAllowedPlanes : number,
  idGenerator: number,
  clickedVal : plane | null,
  selectedPlanes : any,
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
    selectedPlanes : [],
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
      color: [1,0,0,0.3],
      slicePlane: null,
      childPlane: [],
      masterPlane: {id:-1, name: "Global"},
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
     let sliceOptions = {
        ...rootState.clipPlane.settings.planesData[index],
       isPlaneEnabled: curPlane.slicePlane?.enabled,
       isPlaneVisible: curPlane.slicePlane?.showClip,
       primarySliderValue: curPlane.slicePlane?.translate,
       sliderMinMax: [curPlane.slicePlane?.translateMin,curPlane.slicePlane?.translateMax],
     }
     
     //primary plane
     setSectionPlaneGUIData(data.id,options,viewerId);
     setSectionPlaneEquation(data.id,new Float32Array(curPlane.transform),viewerId,new Float32Array(curPlane.initTransform));
     
     //slice plane
     if(curPlane.slicePlane)
     {
      let slicePlane = curPlane.slicePlane;
      const sliceId = slicePlane.id;
      setSectionPlaneGUIData(sliceId,sliceOptions,viewerId);
      setSectionPlaneEquation(sliceId,new Float32Array(slicePlane.transform),viewerId);
     }
     dispatch(fetchSectionPlaneData());
     
     return Promise.resolve('SUCCESS')
  }
)

const generatePlane = (id:number, transform:number[], eqn:number[], color:Color, radius:number) => {
  const plane:plane = {  id,name:`Plane ${id}`, 
    enabled: false, 
    showClip: false, 
    showEdge: false,
    showCap: false,
    clipCordX:eqn[0],
    clipCordY:eqn[1], 
    clipCordZ:eqn[2],
    clipConstD:-eqn[3],
    clipNormalInverted: false,
    translate: 0,
    translateMin: -radius,
    translateMax: radius,
    rotate: 0,
    axisX:0,
    axisY: 0,
    transform,
    initTransform: Array.from(transform),
    userInputEquation: [eqn[0],eqn[1],eqn[2],-eqn[3]],
    color,
    slicePlane: null,
    childPlane: [],
    masterPlane: {id:-1, name:"Global"},
  }
return plane
}

const generateSlicePlane = (parent:plane, id:number, color:Color, radius:number) => {
  const eqn = [parent.clipCordX,parent.clipCordY,parent.clipCordZ,-parent.clipConstD];
  const plane:plane = generatePlane(id, Array.from(parent.transform), eqn, color, radius);
  let t = new Float32Array(plane.transform) as mat4;
   //t[8] = -t[8]; t[9] = -t[9]; t[10] = -t[10];
  //mat4.translate(t,t,vec3.fromValues(0,0,-radius*0.25));
  plane.enabled = false;
  plane.showClip = true;
  plane.translateMax = radius;
  plane.translateMin = 0;
  plane.translate = radius*0.5;
  plane.transform = Array.from(t);
  plane.initTransform = Array.from(t);
  return plane as slicePlane;
}

const generateEqn = (planes:plane[],bbox:any):[number,number,number,number] => {
  
  let c = bbox.getCenter() as vec3;
  if(planes.length === 0) {
    let n = vec3.fromValues(1,0,0);

    return getNormalizedEqn([
      n[0],
      n[1],
      n[2],
      vec3.dot(n,c) 
    ]);
  }
  else if(planes.length === 1) {
    const plane1 = planes[0];
    let n1 = vec3.fromValues(plane1.transform[8],plane1.transform[9],plane1.transform[10]);
    let n2 = getPerpendicular(n1);
    return getNormalizedEqn([
      n2[0],
      n2[1],
      n2[2],
      vec3.dot(n2,c)
    ]);
  }
  else {
    const plane1 = planes[0];
    const plane2 = planes[1];
    let n1 = vec3.fromValues(plane1.transform[8],plane1.transform[9],plane1.transform[10]);
    let n2 = vec3.fromValues(plane2.transform[8],plane2.transform[9],plane2.transform[10]);
    let n3 = vec3.create();
    vec3.cross(n3,n1,n2);
    return getNormalizedEqn([
      n3[0],
      n3[1],
      n3[2],
      vec3.dot(n3,c)
    ]);
  }
}

export const addPlane = createAsyncThunk(
  "clipSlice/addSectionPlane",
  async (data,{dispatch,getState}) => {
    const rootState = getState() as RootState;
    const state = rootState.clipPlane;
    const viewerId = rootState.app.viewers[rootState.app.activeViewer || ""];

    let bbox = getSceneBoundingBox(viewerId,false);
    let center = bbox.getCenter() as vec3;
    let eqn = generateEqn(state.planes,bbox);
    
    let newTransform = getWorldTransformFromPlaneEqn(eqn,center);

    dispatch(clipSlice.actions.incrementId())
    let id = (getState() as RootState).clipPlane.settings.idGenerator;
    let randColorIdx = id % state.colors.length;
    let color = state.colors[randColorIdx];
    addSectionPlane(id, newTransform, color ,viewerId);
    let radius = bbox.getRadius();
    let plane = generatePlane(id, Array.from(newTransform), eqn, color,radius);
    // dispatch(clipSlice.actions.incrementId());

    //slice plane
    let sliceId = (getState() as RootState).clipPlane.settings.idGenerator;;
    let sliceColor = state.colors[sliceId % state.colors.length];

    plane.slicePlane = generateSlicePlane(plane, sliceId, sliceColor,radius );
    addSectionPlane(sliceId, new Float32Array(plane.slicePlane.transform), sliceColor, viewerId);
    dispatch(createPlane({plane}));
    dispatch(clipSlice.actions.updateSlicePlane({pid:id}));
    dispatch(setSectionPlaneData({id}))
  }
)
export const duplicatePlane = createAsyncThunk(
  "clipSlice/duplicatePlane",
  async (data:{pastedPlane:plane},{dispatch,getState}) => {
    dispatch(pastePlane(data.pastedPlane))
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
    dispatch(clipSlice.actions.deletePlane(data.id));
  }
)

export const setActive = createAsyncThunk(
  "clipSlice/setActiveSectionPlane",
  async (data:{id:number},{dispatch,getState}) => {
     console.log("active plane", data.id)
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

    incrementId: (state) => {
      state.settings.idGenerator = state.settings.idGenerator + 1 ;
    },

    createPlane: (state, action:PayloadAction<{plane:plane}>) => {
      if (state.planes.length < state.settings.maxAllowedPlanes){
        state.planes= [...state.planes,action.payload.plane];      
      }
    },

    editEnabled: (state, action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload);
      if ( index >= 0 ) {
        let changeItem : any = state.planes[index];

        // if(changeItem.enabled === true && changeItem.slicePlane.enabled === true)
        //   changeItem.slicePlane.enabled = false;
        //   changeItem.slicePlane.showClip = false;

        if(changeItem.enabled === true && changeItem.showClip === true)
          changeItem.showClip = false
        if(changeItem.enabled === false && changeItem.showClip === false)
          changeItem.showClip = true 
        
        changeItem.enabled = !changeItem.enabled
        
        state.planes[index] = changeItem;
        
        const indexSelected = state.settings.selectedPlanes.findIndex((item:any) => item.id === action.payload);
          if( indexSelected >= 0) {
            state.settings.selectedPlanes[indexSelected] = changeItem;
          }

      }
    

    },

    editShowClip : (state,action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload[0]);
      if ( index >= 0 ) {
        let changeItem : any = state.planes[index];
        // if(changeItem.showClip === true && changeItem.slicePlane.showClip === true)
        //   changeItem.slicePlane.showClip = false;
        // if(changeItem.showClip === false && changeItem.slicePlane.enabled === true)
        //   changeItem.slicePlane.showClip = true;
          
        changeItem.showClip = action.payload[1];
        state.planes[index] = changeItem;
        const indexSelected = state.settings.selectedPlanes.findIndex((item:any) => item.id === action.payload[0]);
          if( indexSelected >= 0) {
            state.settings.selectedPlanes[indexSelected] = changeItem;
          }
      }
    },

    editEdgeClip : (state,action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload[0]);
      if ( index >= 0 ) {
        let changeItem : any = state.planes[index];
        changeItem.showEdge = action.payload[1]
        state.planes[index] = changeItem;
        const indexSelected = state.settings.selectedPlanes.findIndex((item:any) => item.id === action.payload[0]);
          if( indexSelected >= 0) {
            state.settings.selectedPlanes[indexSelected] = changeItem;
          }
      }       
    },

    editShowCap : (state,action) => {
      const index= state.planes.findIndex((item) => item.id === action.payload[0]);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        changeItem.showCap = action.payload[1]
        state.planes[index] = changeItem;
        const indexSelected = state.settings.selectedPlanes.findIndex((item:any) => item.id === action.payload[0]);
          if( indexSelected >= 0) {
            state.settings.selectedPlanes[indexSelected] = changeItem;
          }
      }
    },

    pastePlane : (state, action) => {
      if (state.planes.length < state.settings.maxAllowedPlanes){
        let clone = JSON.parse(JSON.stringify(action.payload));
        clipSlice.caseReducers.incrementId(state);
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

      const index = state.planes.findIndex(item => item.id === action.payload);
        if( index >= 0 ){
          const childPlanes = state.planes[index].childPlane;
          const masterPlaneId = state.planes[index].masterPlane.id;
          
          if(masterPlaneId > -1){
            const masterIndex = state.planes.findIndex(item => item.id === masterPlaneId);
            let changeItem = state.planes[masterIndex];
            changeItem.childPlane = changeItem.childPlane.filter(item => item !== action.payload)
            state.planes[masterIndex] = changeItem
          }

          if(childPlanes.length > 0){
            childPlanes.forEach(item => 
              {
                const childIndex : any = state.planes.findIndex(element => element.id === item)
                if ( childIndex >= 0){
                  let changeItem = state.planes[childIndex]
                  changeItem.masterPlane = {id: -1, name: "Global"}
                  state.planes[childIndex] = changeItem;
                }
              })
          }
        }
        const newArray = state.planes.filter(item => item.id !== action.payload);
        state.planes=[...newArray];
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

    editEquation: (state, action:PayloadAction<{planeData:any,viewerId:any}>) => {
      let planeData = action.payload.planeData;
      const index : any = state.planes.findIndex((item) => item.id === planeData.id);
      if ( index >= 0) {
        let changeItem = state.planes[index];
        let bbox = getSceneBoundingBox(action.payload.viewerId,false);
        let curCenter = bbox.getCenter() as vec3;
        let radius = bbox.getRadius();
        let eqn = getNormalizedEqn([
          planeData.clipInputX,
          planeData.clipInputY,
          planeData.clipInputZ,
          planeData.clipInputD
        ]);

        if(changeItem.clipCordX !== planeData.clipCordX || changeItem.clipCordY !== planeData.clipCordY || changeItem.clipCordZ !== planeData.clipCordZ)
        {
          changeItem.rotate = 0;
          changeItem.translate = 0;
          changeItem.translateMin = -radius;
          changeItem.translateMax = radius;
          changeItem.axisX = 0;
          changeItem.axisY = 0;
        }

        let newTransform = getWorldTransformFromPlaneEqn(eqn,curCenter);
        changeItem.clipCordX = planeData.clipInputX;
        changeItem.clipCordY = planeData.clipInputY;
        changeItem.clipCordZ = planeData.clipInputZ;
        changeItem.clipConstD = planeData.clipInputD;

        changeItem.userInputEquation[0] = planeData.clipInputX;
        changeItem.userInputEquation[1] = planeData.clipInputY;
        changeItem.userInputEquation[2] = planeData.clipInputZ;
        changeItem.userInputEquation[3] = planeData.clipInputD;
        changeItem.transform = Array.from(newTransform);
        changeItem.initTransform = Array.from(newTransform);

        
        state.planes[index] = changeItem;
		clipSlice.caseReducers.updateSlicePlane(state,{payload:{pid:changeItem.id},type:"clipSlice/updateSlicePlane"});
      }
    },

 	editNormalInverted: (state, action:PayloadAction<number>) => {
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
 		clipSlice.caseReducers.updateSlicePlane(state,{payload:{pid:action.payload}, type:"clipSlice/updateSlicePlane"})
      }
    },

    editTranslate: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : plane = state.planes[index];
        let data = {id:action.payload.id,delta:action.payload.translate - changeItem.translate};
        changeItem.translate= action.payload.translate;
        clipSlice.caseReducers.translate(state,{payload:data,type:"clipslice/translate"})
        // state.planes[index] = changeItem;
      }
    },

    editRotate: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : plane = state.planes[index];
        let data = {id:action.payload.id,delta:action.payload.rotate - changeItem.rotate};
        clipSlice.caseReducers.rotateZ(state,{payload:data,type:"clipslice/rotateZ"})
        changeItem.rotate= action.payload.rotate;
        state.planes[index] = changeItem;
      }
    },

    editAxisX: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        let data = {id:action.payload.id,delta:action.payload.axisX - changeItem.axisX};

        clipSlice.caseReducers.rotateX(state,{payload:data,type:"clipslice/rotateX"})
        changeItem.axisX= action.payload.axisX;
        state.planes[index] = changeItem;
      }
    },

    editAxisY: (state, action) => {
      const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
      if ( index >= 0) {
        let changeItem : any = state.planes[index];
        let data = {id:action.payload.id,delta:action.payload.axisY - changeItem.axisY};
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

    saveSelectedPlane: (state, action) => {
      // console.log("clicked", action.payload.clicked.id)
      if((state.settings.selectedPlanes.findIndex((item : any) => item.id === action.payload.clicked.id)) >= 0){
        const newArray = state.settings.selectedPlanes.filter((item: any )=> item.id !== action.payload.clicked.id);
        state.settings.selectedPlanes = [...newArray];
      }
      else{
       state.settings.selectedPlanes = [...state.settings.selectedPlanes, action.payload.clicked];
      }
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
      updateMinMax: (state, action:PayloadAction<{id:number|string}>) => {
        const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
        if(index < 0)
        return;

        let curPlane = state.planes[index];
        let delta = (curPlane.translateMax - curPlane.translateMin)*0.5;
        if(curPlane.translateMin >= curPlane.translate) {
          curPlane.translateMin = curPlane.translateMin - delta;
          curPlane.translateMax = curPlane.translateMax - delta;
          
        }
        else if(curPlane.translateMax <= curPlane.translate) {
          curPlane.translateMin = curPlane.translateMin + delta;
          curPlane.translateMax = curPlane.translateMax + delta;
          
        }
      },

      translate: (state, action:PayloadAction<{id:number,delta:number}>) => {

        let {id,delta} = action.payload;
        let index = state.planes.findIndex((item) => item.id === id);
        let curPlane = state.planes[index];

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
        vec3.scale(dir,dir,delta);
        mat4.translate(translation,translation,dir);
        vec3.transformMat4(pos,pos,translation)
        curPlane.clipConstD = vec3.dot(normal,pos)*l;
        transform[12] = pos[0] ; transform[13] = pos[1] ; transform[14] = pos[2];
        curPlane.transform = Array.from(transform);
        clipSlice.caseReducers.updateSlicePlane(state,{payload:{pid:id},type:"clipPlanes/updateSlicePlane"})
      },

      updateSlicePlane: (state, action:PayloadAction<{pid:number}>) => {
        let {pid} = action.payload;
        let index = state.planes.findIndex((item) => item.id === pid);
          let curPlane = state.planes[index];
          if(curPlane.slicePlane) {
            const slicePlane = curPlane.slicePlane;
            let t = new Float32Array(curPlane.transform) as mat4;
            // flip master plane normal to create slice plane mat
            let n = vec3.fromValues( -t[8], -t[9], -t[10])
            t[8] = n[0]; t[9] = n[1]; t[10] = n[2]; 
            // master plane center
            mat4.translate(t,t,vec3.fromValues(0,0,-slicePlane.translate));
            slicePlane.transform = Array.from(t);
          }
      },
    
	  rotateX: (state, action:PayloadAction<{id:number,delta:number}>) => {
          let {id,delta} = action.payload;
          let index = state.planes.findIndex((item) => item.id === id);
          let curPlane = state.planes[index];
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
 		  clipSlice.caseReducers.updateSlicePlane(state,{payload:{pid:id},type:"clipPlanes/updateSlicePlane"})
    
      },
    
   	  rotateY: (state,action:PayloadAction<{id:number,delta:number}>) => {
        let {id,delta} = action.payload;
        let index = state.planes.findIndex((item) => item.id === id);
        let curPlane = state.planes[index];
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
 		clipSlice.caseReducers.updateSlicePlane(state,{payload:{pid:id},type:"clipPlanes/updateSlicePlane"})
        //let eqn = [newNormal,curPlane.clipConstD];
        //console.log("count", count+=1);
        //console.log("totalDelta",totalDelta+=delta);
      },
    
		rotateZ: (state,action:PayloadAction<{id:number,delta:number}>) => {
        let {id,delta} = action.payload;
        let index = state.planes.findIndex((item) => item.id === id);
        let curPlane = state.planes[index];
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
		clipSlice.caseReducers.updateSlicePlane(state,{payload:{pid:id},type:"clipPlanes/updateSlicePlane"})
        //let eqn = [newNormal,curPlane.clipConstD];
        //console.log("count", count+=1);
        //console.log("totalDelta",totalDelta+=delta);
      },

      sliceEditEnable: (state, action) => {
        const index : any = state.planes.findIndex((item) => item.id === action.payload);
        // if ( index >= 0) {
        //   let changeItem : plane = state.planes[index];
        //   if(changeItem.slicePlane)
        //   {
        //     if(changeItem.slicePlane.enabled === false){
        //       changeItem.slicePlane.enabled = true;
        //       changeItem.slicePlane.showClip = changeItem.showClip;
        //     }

        //     else{
        //       changeItem.slicePlane.enabled = false;
        //       changeItem.slicePlane.showClip = false;
        //     }
        //   } 
        //   console.log(changeItem)         
        //   state.planes[index] = changeItem;
        // }
      },

      editSliceTranslate: (state, action) => {
        const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
        if ( index >= 0) {
          let changeItem : plane = state.planes[index];
          if (changeItem.slicePlane){
            changeItem.slicePlane.translate= action.payload.translate;
          }
          state.planes[index] = changeItem;
		  clipSlice.caseReducers.updateSlicePlane(state,{payload:{pid:changeItem.id}, type:"clipSlice/updateSlicePlane"})
        }
      },

      setChildPlane: (state, action) => {

        const childIndex = state.planes.findIndex((item) => item.id === action.payload.childId);
        if( childIndex >= 0) {
          if (state.planes[childIndex].masterPlane.id === -1){
            const index= state.planes.findIndex((item) => item.id === action.payload.masterId);
            if ( index >= 0 ) {
              let changeItem : any = state.planes[index];
              if( changeItem.childPlane.includes(action.payload.childId) === false) {
                changeItem.childPlane = [...changeItem.childPlane , action.payload.childId ]
                state.planes[index] = changeItem;
              }
            }
          }

          if(state.planes[childIndex].childPlane.length > 0){
            const masterIndex = state.planes.findIndex((item) => item.id === action.payload.masterId);
            if(masterIndex >= 0){
              let changeMaster : any = state.planes[masterIndex];
              changeMaster.childPlane = state.planes[masterIndex].childPlane.concat(state.planes[childIndex].childPlane); 
              state.planes[masterIndex] = changeMaster;
            }

          }
        

          if (state.planes[childIndex].masterPlane.id > -1){
            const currentMasterIndex = state.planes.findIndex((item) => item.id === state.planes[childIndex].masterPlane.id);
            if (  currentMasterIndex >= 0) {
              let changeMaster : any = state.planes[currentMasterIndex];
              changeMaster.childPlane = changeMaster.childPlane.filter((item : number) => item !== action.payload.childId)
              state.planes[currentMasterIndex] = changeMaster;
            }
            const newMasterIndex= state.planes.findIndex((item) => item.id === action.payload.masterId);
            if (  newMasterIndex >= 0 ) {
              let changeItem : any = state.planes[newMasterIndex];
              if( changeItem.childPlane.includes(action.payload.childId) === false){
                changeItem.childPlane = [...changeItem.childPlane , action.payload.childId ]
                state.planes[newMasterIndex] = changeItem;
              }
            }
          }

        

        }
      },

      setMasterPlane: (state, action) => {
        const index= state.planes.findIndex((item) => item.id === action.payload.childId);
        if ( index >= 0 ) {
          let changeItem : any = state.planes[index];
          if(changeItem.childPlane){
            changeItem.childPlane.forEach((item : any)=> 
              {
                const childIndex = state.planes.findIndex((element) => element.id === item);
                let changeChild : any = state.planes[childIndex];
                changeChild.masterPlane = {id: action.payload.masterId, name : action.payload.masterName};
                state.planes[childIndex] = changeChild;
              })
              
            // remove all the childs from the current plane
            const currentIndex = state.planes.findIndex((item) => item.id === action.payload.childId);
            if (currentIndex >= 0){
              let removeChild : any = state.planes[currentIndex];
              removeChild.childPlane = [];
              state.planes[currentIndex] = removeChild; 
            }
          }
          changeItem.masterPlane = {id: action.payload.masterId, name: action.payload.masterName}
          state.planes[index] = changeItem;
        }


      },
  },

extraReducers: (builder) => {
  builder.addCase(fetchSectionPlaneData.fulfilled, (state,{payload}) => {
    clipSlice.caseReducers.setPlanesData(state,{payload,type:"any"})
  });
}
})

export const { createPlane,editEnabled,editShowClip, editEdgeClip, editShowCap, pastePlane, deletePlane, editPlane, editEquation, editNormalInverted , editTranslate, editRotate, editAxisX, editAxisY, editPlaneName, saveClickedVal,rotateX, rotateY, rotateZ, translate, updateMinMax, sliceEditEnable, editSliceTranslate , saveSelectedPlane , setMasterPlane , setChildPlane } = clipSlice.actions;

export default clipSlice.reducer;

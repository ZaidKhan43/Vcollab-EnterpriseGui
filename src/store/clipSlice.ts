import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { sideBarContentTypes } from '../config';

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
    rotate: number,
    axisX: number,
	  axisY: number,	
}




type  defaultPlaneParameters = {
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
    rotate: number,
    axisX: number,
	  axisY: number,
  };
type  maxAllowedPlanes = number;

type settings= {
  defaultPlaneParameters : defaultPlaneParameters
  maxAllowedPlanes : maxAllowedPlanes
}

type planes = {
  planes : plane[],
  settings : settings
};



const initialState : planes = {
  planes:[
    {
      id : 1,
      name: "Plane 1",
      enabled: true,
      showClip: true,
      showEdge: false,
      showCap: false,
      clipCordX: 5,
      clipCordY: 4,
      clipCordZ: 6,
      clipConstD:10,
      clipNormalInverted: false,
      translate: 50,
      rotate: 0,
      axisX: 0,
      axisY: 90,
    },
    {
      id : 2,
      name: "Plane 2",
      enabled: false,
      showClip: false,
      showEdge: false,
      showCap: true,
      clipCordX: 3,
      clipCordY:2,
      clipCordZ:4,
      clipConstD:10,
      clipNormalInverted: true,
      translate: -50,
      rotate: 60,
      axisX: 180,
      axisY: 90,
    },
  ],

 settings :{
  maxAllowedPlanes : 6,
  defaultPlaneParameters : {
    enabled: true,
    showClip: true,
    showEdge: false,
    showCap: false,
    clipCordX: 5,
    clipCordY: 4,
    clipCordZ: 6,
    clipConstD:10,
    clipNormalInverted: false,
    translate: 50,
    rotate: 0,
    axisX: 0,
    axisY: 90,
  }
 }
}



export const clipSlice = createSlice({
    name: "clip",
    initialState : initialState,
    reducers: {
      createPlane: (state) => {
        if (state.planes.length < 6){
          let nameO;
          if(state.planes.length === 0) {
             nameO = 1;
          }
          else{
            const lengthO= state.planes.length;
          nameO = Number(state.planes[lengthO - 1].id + 1);
          }
          state.planes= [...state.planes,{id: nameO,name:`Plane ${nameO}`, 
                                          enabled: state.settings.defaultPlaneParameters.enabled, 
                                          showClip: state.settings.defaultPlaneParameters.showClip, 
                                          showEdge: state.settings.defaultPlaneParameters.showEdge,
                                          showCap: state.settings.defaultPlaneParameters.showCap,
                                          clipCordX:state.settings.defaultPlaneParameters.clipCordX,
                                          clipCordY:state.settings.defaultPlaneParameters.clipCordY, 
                                          clipCordZ:state.settings.defaultPlaneParameters.clipCordZ,
                                          clipConstD:state.settings.defaultPlaneParameters.clipConstD,
                                          clipNormalInverted: state.settings.defaultPlaneParameters.clipNormalInverted,
                                          translate: state.settings.defaultPlaneParameters.translate,
                                          rotate: state.settings.defaultPlaneParameters.rotate,
                                          axisX: state.settings.defaultPlaneParameters.axisX,
                                          axisY: state.settings.defaultPlaneParameters.axisY,
                                        }]
        }
      },

      editCheck: (state, action) => {
        let newArray=[...state.planes];
        const index= state.planes.findIndex((item) => item.id === action.payload);
        let changeItem : any = state.planes.find((item) => item.id === action.payload);
        const val = changeItem&& changeItem?.enabled
        changeItem = {...changeItem, enabled:!val}
        // changeItem.checkbox= !changeItem.checkbox;
        // console.log("change", changeItem, index)
        // planes=[...planes, planes[]]
        newArray[index]=changeItem;
         state.planes=[...newArray]

      },

      editShowClip : (state,action) => {
        let newArray=[...state.planes];
        const index= state.planes.findIndex((item) => item.id === action.payload);
        let changeItem : any = state.planes.find((item) => item.id === action.payload);
        // const val = changeItem&& changeItem?.showClip
        changeItem.showClip = !changeItem.showClip
        // changeItem.checkbox= !changeItem.checkbox;
        // planes=[...planes, planes[]]
        newArray[index]=changeItem;
         state.planes=[...newArray]
      },

      editEdgeClip : (state,action) => {
        let newArray=[...state.planes];
        const index= state.planes.findIndex((item) => item.id === action.payload);
        let changeItem : any = state.planes.find((item) => item.id === action.payload);
        changeItem.showEdge = !changeItem.showEdge
        newArray[index]=changeItem;
         state.planes=[...newArray]
      },

      editShowCap : (state,action) => {
        let newArray=[...state.planes];
        const index= state.planes.findIndex((item) => item.id === action.payload);
        let changeItem : any = state.planes.find((item) => item.id === action.payload);
        console.log("show", changeItem)
        changeItem.showCap = !changeItem.showCap
        newArray[index]=changeItem;
         state.planes=[...newArray]
      },

      pastePlane : (state, action) => {
        if (state.planes.length < 6){
          let clone : any = {}; 
          for (let key in action.payload) {
            clone[key] = action.payload[key];
          }
          clone.id=state.planes[state.planes.length - 1].id + 1;
          clone.name = `${clone.name} (Copy)`
          clone.checkbox= false;
          state.planes=[...state.planes, clone];
          console.log("clone",clone)
          console.log("After", state.planes)
        }
      },

      deletePlane : (state, action) => {
        const newArray = state.planes.filter(item => item.id !== action.payload);
        state.planes=[...newArray]
      },

      editPlane: (state, action) => {
        let newArray=[...state.planes];
        const index : any = state.planes.findIndex((item) => item.id === action.payload.id);
        let changeItem : any = state.planes.find((item) => item.id === action.payload.id);
        console.log("change",changeItem)
        console.log("action", action.payload)
        changeItem.clipCordX = action.payload.clipCordX;
        changeItem.clipCordY = action.payload.clipCordY;
        changeItem.clipCordZ = action.payload.clipCordZ;
        changeItem.clipConstD = action.payload.clipConstD;
         changeItem.clipNormalInverted = action.payload.clipNormalInverted;
         changeItem.translate = action.payload.translate;
         changeItem.rotate = action.payload.rotate;
         changeItem.axisX = action.payload.axisX;
         changeItem.axisY = action.payload.axisY;
         newArray[index]=changeItem;
         state.planes=[...newArray]

      }

      }

})

export const { createPlane,editCheck,editShowClip, editEdgeClip, editShowCap, pastePlane, deletePlane, editPlane } = clipSlice.actions;

export default clipSlice.reducer;

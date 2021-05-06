import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { sideBarContentTypes } from '../config';

type plane = {
    // planes: object[],
    id: number,
    name: string,
    checkbox: boolean,
    showClip: boolean,
    showEdge: boolean,
    showCap: boolean,
    xCord: number,
    yCord: number,
    zCord: number,
    constant: number,
    // equation: string,
    clipDirection: boolean,
    translate: string,
    rotate: number,
    xAxis: number,
    yAxis: number,
    // clipPlaneMode: string,
}

type planesType = plane[];


type planeState = {
  planes : planesType,
} ;

const state : planeState = {
  planes:[
    {
      id : 1,
      name: "Plane 1",
      checkbox: true,
      showClip: true,
      showEdge: false,
      showCap: false,
      xCord: 5,
      yCord: 4,
      zCord: 6,
      constant:10,
      // equation: "x+y+z = 5",
      clipDirection: false,
      translate: "50",
      rotate: 0,
      xAxis: 0,
      yAxis: 90,
      // clipPlaneMode: "Surface",
    },
    {
      id : 2,
      name: "Plane 2",
      checkbox: false,
      showClip: false,
      showEdge: false,
      showCap: true,
      xCord: 3,
      yCord:2,
      zCord:4,
      constant:10,
      // equation: "x+y+z = 15",
      clipDirection: true,
      translate: "-50",
      rotate: 60,
      xAxis: 180,
      yAxis: 90,
      // clipPlaneMode: "Points",
    },
  ]
}


//  let planes : planesType = [
//     {
//       name : 1,
//       checkbox: true,
//       showClip: true,
//       showEdge: false,
//       showCap: false,
//       equation: "x+y+z = 5",
//       clipDirection: true,
//       translate: "50",
//       rotate: 0,
//       xAxis: 0,
//       yAxis: 90,
//     },
//     {
//       name : 2,
//       checkbox: false,
//       showClip: false,
//       showEdge: false,
//       showCap: true,
//       equation: "x+y+z = 15",
//       clipDirection: false,
//       translate: "-50",
//       rotate: 60,
//       xAxis: 180,
//       yAxis: 90,
//     },
//   ]
  // const initialState: planesType = {
  //   planes : planes,
  // }

export const clipSlice = createSlice({
    name: "clip",
    initialState : state,
    reducers: {
      addItem: (state) => {
        if (state.planes.length < 6){
          let nameO;
          if(state.planes.length === 0) {
             nameO = 1;
          }
          else{
            const lengthO= state.planes.length;
          nameO = Number(state.planes[lengthO - 1].id + 1);
          }
          state.planes= [...state.planes,{id: nameO,name:`Plane ${nameO}`, checkbox: false, showClip: true, showEdge: false, showCap: true, xCord:0, yCord:0, zCord:0,constant:0,clipDirection: true, translate: "50", rotate: 219, xAxis: 189, yAxis: 212,}]
        }
      },

      editCheck: (state, action) => {
        let newArray=[...state.planes];
        const index= state.planes.findIndex((item) => item.id === action.payload);
        let changeItem : any = state.planes.find((item) => item.id === action.payload);
        const val = changeItem&& changeItem?.checkbox
        changeItem = {...changeItem, checkbox:!val}
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
        changeItem.xCord = action.payload.xCord;
        changeItem.yCord = action.payload.yCord;
        changeItem.zCord = action.payload.zCord;
        changeItem.constant = action.payload.constant;
         changeItem.clipDirection = action.payload.clipDirection;
         changeItem.translate = action.payload.translate;
         changeItem.rotate = action.payload.rotate;
         changeItem.xAxis = action.payload.xAxis;
         changeItem.yAxis = action.payload.yAxis;
         newArray[index]=changeItem;
         state.planes=[...newArray]

      }

      }

})

export const { addItem,editCheck,editShowClip, editEdgeClip, editShowCap, pastePlane, deletePlane, editPlane } = clipSlice.actions;

export default clipSlice.reducer;

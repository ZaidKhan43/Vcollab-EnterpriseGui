import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { sideBarContentTypes } from '../config';

type plane = {
    // planes: object[],
    name: number,
    checkbox: boolean,
    showClip: boolean,
    showEdge: boolean,
    showCap: boolean,
    equation: string,
    clipDirection: boolean,
    translate: string,
    rotate: number,
    xAxis: number,
    yAxis: number,
}

type planesType = plane[];


type planeState = {
  planes : planesType,
} ;

const state : planeState = {
  planes:[
    {
      name : 1,
      checkbox: true,
      showClip: true,
      showEdge: false,
      showCap: false,
      equation: "x+y+z = 5",
      clipDirection: true,
      translate: "50",
      rotate: 0,
      xAxis: 0,
      yAxis: 90,
    },
    {
      name : 2,
      checkbox: false,
      showClip: false,
      showEdge: false,
      showCap: true,
      equation: "x+y+z = 15",
      clipDirection: false,
      translate: "-50",
      rotate: 60,
      xAxis: 180,
      yAxis: 90,
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
          nameO = state.planes[lengthO - 1].name + 1;
          }
          state.planes= [...state.planes,{name: nameO, checkbox: false, showClip: true, showEdge: false, showCap: true, equation: "x+y+z = 0",clipDirection: true, translate: "50", rotate: 219, xAxis: 189, yAxis: 212,}]
        }
      },

      editCheck: (state, action) => {
        let newArray=[...state.planes];
        const index= state.planes.findIndex((item) => item.name === action.payload);
        let changeItem : any = state.planes.find((item) => item.name === action.payload);
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
        const index= state.planes.findIndex((item) => item.name === action.payload);
        let changeItem : any = state.planes.find((item) => item.name === action.payload);
        // const val = changeItem&& changeItem?.showClip
        changeItem.showClip = !changeItem.showClip
        // changeItem.checkbox= !changeItem.checkbox;
        // planes=[...planes, planes[]]
        newArray[index]=changeItem;
         state.planes=[...newArray]
      },

      editEdgeClip : (state,action) => {
        let newArray=[...state.planes];
        const index= state.planes.findIndex((item) => item.name === action.payload);
        let changeItem : any = state.planes.find((item) => item.name === action.payload);
        changeItem.showEdge = !changeItem.showEdge
        newArray[index]=changeItem;
         state.planes=[...newArray]
      },

      editShowCap : (state,action) => {
        let newArray=[...state.planes];
        const index= state.planes.findIndex((item) => item.name === action.payload);
        let changeItem : any = state.planes.find((item) => item.name === action.payload);
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
          clone.name=state.planes[state.planes.length - 1].name + 1;
          clone.checkbox= false;
          state.planes=[...state.planes, clone];
          console.log("clone",clone)
          console.log("After", state.planes)
        }
      },

      deletePlane : (state, action) => {
        const newArray = state.planes.filter(item => item.name !== action.payload);
        state.planes=[...newArray]
      },

      editPlane: (state, action) => {
        let newArray=[...state.planes];
        const index : any = state.planes.findIndex((item) => item.name === action.payload.name);
        let changeItem : any = state.planes.find((item) => item.name === action.payload.name);
        console.log("change",changeItem)
        console.log("action", action.payload)
        changeItem.equation = action.payload.equation;
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

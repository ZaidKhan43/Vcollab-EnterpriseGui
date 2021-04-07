import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { sideBarContentTypes } from '../config';

interface planes {
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

 const planes = [
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

export const clipSlice = createSlice({
    name: "clip",
    initialState: planes,
    reducers: {

    }
})

export default clipSlice.reducer;
import { PayloadAction } from "@reduxjs/toolkit";

export enum LabelMode {
    EDIT,
    VIEW
}
export enum Label3DType{
    ANNOTATION = "ANNOTATION", 
    MINMAX = "MINMAX", 
    PROBE = "PROBE",
    DISTANCE = "DISTANCE", 
    ARC = "ARC", 
    EDGE = "EDGE", 
    FACE = "FACE"
}

export type LabelSettings = {
    mode: LabelMode
}
//reducers
export const setLabelModeReducer = (state:LabelSettings, action:PayloadAction<LabelMode>) => {
    state.mode = action.payload;
}
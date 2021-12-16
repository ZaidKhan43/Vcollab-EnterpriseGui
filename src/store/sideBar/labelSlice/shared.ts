import { PayloadAction } from "@reduxjs/toolkit";
import {TreeNode} from "../shared/Tree/types";

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

export interface Label3D extends TreeNode {
    pos:[number,number],
    anchor: [number,number],
    label: string,
}

export type LabelSettings = {
    mode: LabelMode
}
//reducers
export const setLabelModeReducer = (state:LabelSettings, action:PayloadAction<LabelMode>) => {
    state.mode = action.payload;
}
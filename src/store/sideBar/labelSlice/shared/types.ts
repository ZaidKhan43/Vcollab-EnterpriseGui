import { PayloadAction } from "@reduxjs/toolkit";
import {TreeNode} from "../../shared/Tree/types";

export enum LabelMode {
    EDIT,
    VIEW
}
export enum Label2DType {
    DEFAULT = 'DEFAULT'
}
export enum Label3DType {
    ANNOTATION = "ANNOTATION", 
    MINMAX = "MINMAX", 
    PROBE = "PROBE",
    DISTANCE = "DISTANCE", 
    ARC = "ARC", 
    EDGE = "EDGE", 
    FACE = "FACE"
}

export interface ILabel extends TreeNode {
    label: string,
    pos: [number, number],
}

export interface Label3D extends ILabel {
    anchor: [number,number],
}

export interface Label2D extends ILabel {
    
}

export type LabelSettings = {
    mode: LabelMode
}

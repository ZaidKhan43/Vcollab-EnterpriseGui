import { mat4 } from 'gl-matrix';
import viewerMgr from './viewerMgr';

export function createViewer(viewerDivID : string){
    return viewerMgr.createViewer(viewerDivID);
}
export function getProductTree(viewerDivID : string){
    return viewerMgr.getProductTree(viewerDivID);
}
export function getEventDispatcher(){
    return viewerMgr.getEventDispatcher();
}

export function getEventsList(){
    return viewerMgr.getEventsList();
}

export function loadModel(api: string, url: string, activeViewerID: string){
    return viewerMgr.loadModel(api, url, activeViewerID);
}

export function showModel(activeViewerID: string){
    return viewerMgr.showModel(activeViewerID);
}

export function getSceneBoundingBox(activeViewerID:string, onlyVisible:boolean = true) {
    return viewerMgr.getSceneBoundingBox(activeViewerID,onlyVisible);
}

export function setPartVisibility(activeViewerID:string,nodeIds:string[], toShow:boolean){
    return viewerMgr.setPartsVisibility(nodeIds,toShow,activeViewerID);
}

export function invertPartsVisibility(activeViewerID:string) {
    return viewerMgr.invertPartsVisibility(activeViewerID);
}

export function getDisplayModes(activeViewerID:string,nodeIds:string[]) {
    return viewerMgr.getDisplayModes(nodeIds,activeViewerID);
}
export function setDisplayMode(activeViewerID:string, displayModeId:string, nodeIds:string[]) {
    return viewerMgr.setDisplayMode(displayModeId,nodeIds,activeViewerID);
}
export function setHighlightedNodes(activeViewerID:string, toShow: boolean, nodeIds:string[]) {
    return viewerMgr.setHighlightedNodes(nodeIds,toShow,activeViewerID);
}
// part Manipulation
export function enablePickAndMove(activeViewerID:string, toEnable:boolean) {
    return viewerMgr.enablePickAndMove(toEnable,activeViewerID);
}
export function resetPickAndMove(activeViewerID:string) {
    return viewerMgr.resetPickAndMove(activeViewerID);
}

export function fitView(activeViewerID: string, nodeIds:string[] = []){
    return viewerMgr.fitView(nodeIds,activeViewerID);
}

export function captureScreen(activeViewerID: string){
    return viewerMgr.captureScreen(activeViewerID);
}

export function getSearchHints(activeViewerID:string) {
    return viewerMgr.getSearchHints(activeViewerID);
}

export function getModelInfo(activeViewerID:string) {
    return viewerMgr.getModelInfo(activeViewerID);
}

export function getDisplayResult(activeViewerID:string) {
    return viewerMgr.getDisplayResult(activeViewerID);
}

export function applyResult(resultId:string, stepId:string, derivedTypeId:string, activeViewerID:string) {
    return viewerMgr.applyResult(resultId,stepId,derivedTypeId, activeViewerID);
}

//#region Section
export function getSectionGUIData(activeViewerID:string) {
    return viewerMgr.getSectionGUIData(activeViewerID);
}

export function setActiveSectionPlane(planeId:number, activeViewerID:string) {
    return viewerMgr.setActiveSectionPlane(planeId,activeViewerID);
}

export function addSectionPlane(planeId:number, transform:mat4, color:[number,number,number,number],activeViewerID:string){
    return viewerMgr.addSectionPlane(planeId,transform,color,activeViewerID);
}

export function deleteSectionPlane(planeId:number,activeViewerID:string) {
    return viewerMgr.deleteSectionPlane(planeId,activeViewerID);
}
export function getSectionPlaneEquation(planeId:number, activeViewerID:string) {
    return viewerMgr.getSectionPlaneEquation(planeId,activeViewerID);
}

export function setSectionPlaneEquation(planeId:number, transform:mat4,activeViewerID:string, initTransform?:mat4) {
    return viewerMgr.setSectionPlaneEquation(planeId,transform, activeViewerID, initTransform);
}

export function setPlaneState(planeId:number,selectedPlaneOptions:any, activeViewerID:any){
    viewerMgr.setPlaneState(planeId,selectedPlaneOptions,activeViewerID);
    return 'SUCCESS'
}
//#endregion
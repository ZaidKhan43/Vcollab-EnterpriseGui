import { mat4 } from 'gl-matrix';
import viewerMgr from './ViewerManager';
import {viewerEvents,globalEvents,EventDispatcher,InteractionMode} from './ViewerManager';

export function createViewer(viewerDivID : string){
    return viewerMgr.createViewer(viewerDivID);
}
export function getProductTree(viewerDivID : string){
    return viewerMgr.getProductTree(viewerDivID);
}
export function getEventDispatcher():EventDispatcher | null {
    return viewerMgr.getEventDispatcher() as EventDispatcher | null;
}
export function setInteractionMode(viewerDivID:string,mode:InteractionMode) {
    viewerMgr.setInterationMode(viewerDivID,mode);
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
export function setMouseBindings(activeViewerID:string, json:any) {
    console.log(json);
    return viewerMgr.setMouseInputMapping(json,activeViewerID);
}
export function getMouseData(activeViewerID:string) :any {
    let data = viewerMgr.getMouseInputData(activeViewerID);
    console.log(JSON.stringify(data));
    return data;
}
export function getSystemMouseMappings(activeViewerID:string):any[] {
    let data = viewerMgr.getSystemMouseMappings(activeViewerID);
    //console.log(JSON.stringify(data));
    return data;
}

//#region Camera
export function getCameraStdViews(activeViewerID:string) : any {
    console.log(viewerMgr.getCameraStdViews(activeViewerID));
    return viewerMgr.getCameraStdViews(activeViewerID);
}
export function setCameraProjection(activeViewerID:string, camType: number) {
    viewerMgr.setCameraProjection(camType,activeViewerID);
}
export function getCameraInfo(activeViewerID:string, camType:number) {
    return viewerMgr.getCameraInfo(camType,activeViewerID);
}
export function setCameraInfo(activeViewerID:string, camData:any) {
    viewerMgr.setCameraInfo(camData,activeViewerID);
    console.log(camData);
}
//#endregion
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
//#region Probe
export function probe(pointerData:{xyFromTop:number[], width:number,height:number},activeViewerID:string) {
    return viewerMgr.probeFromNodes(pointerData,activeViewerID);
}
//#endregion
//#region Labels
export function add3DLabel(uid:string,hitPoint:number[],type:any,probeData:any,activeViewerID:string) {

    viewerMgr.add3DLabel(uid,hitPoint,type,probeData,activeViewerID);
}
export function delete3DLabel(uid:string,activeViewerID:string):boolean{
    return viewerMgr.delete3DLabel(uid,activeViewerID);
}
export function get3DLabelCanvasPos(uid:string,activeViewerID:string):number[] | null {
    return viewerMgr.get3DLabelCanvasPos(uid,activeViewerID);
}
//#endregion
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

export function setSectionPlaneGUIData(planeId:number,selectedPlaneOptions:any, activeViewerID:any){
    viewerMgr.setSectionPlaneGUIData(planeId,selectedPlaneOptions,activeViewerID);
    return 'SUCCESS'
}

//#endregion
export {EventDispatcher, viewerEvents,globalEvents, InteractionMode};
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
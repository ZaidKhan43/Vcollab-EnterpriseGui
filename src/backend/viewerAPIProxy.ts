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

export function fitView(activeViewerID: string){
    return viewerMgr.fitView(activeViewerID);
}

export function captureScreen(activeViewerID: string){
    return viewerMgr.captureScreen(activeViewerID);
}
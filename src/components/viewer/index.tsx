import { memo, useEffect , useRef, useState, useCallback } from 'react';
import { createRef } from 'react';
import * as viewerAPIProxy from '../../backend/viewerAPIProxy';
import nextId from 'react-id-generator';
import { setModelInfo, setModelLoadedState, setModelLoadingStatus } from '../../store/appSlice';
import { useAppDispatch } from '../../store/storeHooks';
import {saveTree, fetchSearchHints,setHightLightedNodesAsync } from "../../store/sideBar/productTreeSlice";
import { addViewer } from '../../store/appSlice';

function Viewer(){
    
    const viewerRefs = createRef<HTMLDivElement>();
    const viewerDomID = nextId("vct-viewer-");
    const [mount, setMount] = useState(false)
    const dispatch = useAppDispatch(); 
    const tree = useRef();

    /*
    //To get the queryString Name from url
    const getParameterByName = (name : string) => {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "i"),
      results = regex.exec(window.location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    */
      
    const loadModel = useCallback((api : string, url : string, activeViewerID : string) => {
      viewerAPIProxy.loadModel(api, url, activeViewerID )
      .then(async (response : string) => {

        if(response === "SUCCESS") {
          dispatch(setModelLoadedState(true));
          let modelInfo = viewerAPIProxy.getModelInfo(activeViewerID) as any;
          dispatch(setModelInfo(modelInfo));
        }

        //let modelName = viewerMgr.getModelInfo(viewerID);
        //this.props.saveModelName(modelName[0]?.name);
        //this.props.saveModelLoadingStatus(response);
        //await this.props.saveTreeData(viewerMgr.getProductTree(this.viewerID));
        viewerAPIProxy
          .showModel(activeViewerID)
          .then((response1 : string) => {
            console.log("Showing Model : " + response1);  
            tree.current = viewerAPIProxy.getProductTree(activeViewerID) as any; 
            if(tree.current)
            {
              let treeData = tree.current as any;
              [...Object.values(treeData.models)].forEach((node:any)=>{
                node.state = {
                    checked: false,
                    partiallyChecked: false,
                    expanded: true,
                    highlighted: false,
                    visibility: true
                  }
            })
            dispatch(saveTree({tree:treeData.models,rootIds:treeData.rootNodeIds}));
            dispatch(fetchSearchHints());
            }

           // console.log("Showing Model : " + response1);   
            /*       
            setTimeout(() => {
              viewerAPIProxy.fitView(activeViewerID);
              viewerAPIProxy.captureScreen(activeViewerID);
            }, 3000);
            */         
          })
          .catch((error : string) => {
            console.error("Error in showing model : ", error);
          });
      })  
      .catch((error : string) => {
        console.error("Error in loading model : ", error);
      });;
    },[dispatch]);

    useEffect  (() => {
      if(!mount) {
            setMount(true);
            //this.props.saveModelLoadingStatus("");
            let viewerDivID = viewerRefs.current?.id || '';
            let api = "http://localhost:8181/api/1.0/model";
            //let url = "file://samples/bracket.cax";
            //let url = "file://samples/airbag.cax";
            //let url = "file://samples/heater.cax";
            //let url = "file://samples/merged.cax";
            //let url = "file://samples/F30_model.cax";
            //let url = "file%3A%2F%2FC%3A%5CWORK%5Centerprise-1.1-win64%5Csamples%5Cbracket.cax";
            let url = "file%3A%2F%2FD%3A%5Ccaxserver%5CF30_model.cax";
      
            //let api = "http://100.26.229.30:8181/api/1.0/model";
            //let url = "file%3A%2F%2FC%3A%5CUsers%5CAdministrator%5CDownloads%5Centerprise-1.1-win64%5Csamples%5CF30_model.cax";
            
            /*
            let url = this.getParameterByName("url");
            if (url === "") {
              alert("URL querystring is missing.");
              return;
            }
      
            let api = this.getParameterByName("api");
            if (api === "") {
              alert("API querystring is missing.");
              return;
            }   
            */    
      
            let viewerID = viewerAPIProxy.createViewer(viewerDivID);
            dispatch(addViewer({name : viewerDomID, id: viewerID }));
            let eventDispatcher = viewerAPIProxy.getEventDispatcher();
            let events = viewerAPIProxy.getEventsList();
            if (events) {
              eventDispatcher?.addEventListener(
                events.viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE,
                (event : any) => {
                  dispatch(setModelLoadingStatus(event.data));
                }
              );
              eventDispatcher?.addEventListener(
                events.viewerEvents.MODEL_PART_HIGHLIGHTED,
                (event: any) => {
                  console.log(event);
                  const toHighlight = event.data.isHighlighted;
                  const nodeIds = event.data.nodeIds
                  if(nodeIds.length > 0)
                  {
                    nodeIds.forEach((nodeId:string) => {
                      dispatch(setHightLightedNodesAsync({toHighlight, nodeId }))
                    })
                  }
                  else{
                    let treeData = tree.current as any;
                    dispatch(setHightLightedNodesAsync({toHighlight,nodeId:treeData.rootNodeIds[0]}))
                  }
                  
                }
              )
            }
            loadModel(api, url, viewerID);
          }
    },[ loadModel, dispatch, mount, viewerRefs, viewerDomID ]);


    return (
      <div
        style={{ flex: 1 }}
        id={viewerDomID}
        ref={viewerRefs}
        className="viewer"
      />
    );
}

function arePropsEqual(prevProps : any, nextProps : any) {
  return true; 
}

export default memo(Viewer, arePropsEqual);
//https://blog.logrocket.com/react-pure-components-functional/#whatisareactpurecomponent
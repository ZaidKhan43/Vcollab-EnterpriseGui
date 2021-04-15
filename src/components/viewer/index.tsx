import React, { memo, useEffect } from 'react';
import { createRef } from 'react';
import viewerMgr from "../../backend/viewerMgr";
import nextId from "react-id-generator";


function Viewer(){
    
    const viewerRefs = createRef<HTMLDivElement>();
    const viewerDomID = nextId("vct-viewer-");
    let viewerID :any = null;

    //To get the queryString Name from url
    const getParameterByName = (name : string) => {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "i"),
      results = regex.exec(window.location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
      
    const loadModel = (api : string, url : string) => {
      viewerMgr.loadModel(api, url).then(async (response : string) => {
        console.log("response",response );
        let modelName = viewerMgr.getModelInfo(viewerID);
        //this.props.saveModelName(modelName[0]?.name);
        //this.props.saveModelLoadingStatus(response);
        //await this.props.saveTreeData(viewerMgr.getProductTree(this.viewerID));
        viewerMgr
          .showModel(viewerID)
          .then((response1 : string) => {
            console.log("Showing Model" + response1);
          })
          .catch((error1 : string) => {
            console.error("Error in loading model : ", error1);
          });
        //viewerMgr.fitView(this.viewerID);
        //viewerMgr.captureScreen(this.viewerID);
      });
    }
  
    useEffect (() => {
      //this.props.saveModelLoadingStatus("");
      let viewerDomID = viewerRefs?.current?.id;
      let api = "http://localhost:8181/api/1.0/model";
      //let url = "file://samples/bracket.cax";
      //let url = "file://samples/airbag.cax";
      //let url = "file://samples/heater.cax";
      //let url = "file://samples/merged.cax";
      //let url = "file://samples/F30_model.cax";
      let url = "file%3A%2F%2FC%3A%5CWORK%5Centerprise-1.1-win64%5Csamples%5Cbracket.cax";
      //let url = "file%3A%2F%2FC%3A%5CWORK%5Centerprise-1.1-win64%5Csamples%5CF30_model.cax";
  
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
    
      viewerID = viewerMgr.createViewer(viewerDomID);
      //this.props.saveViewerId(this.viewerID);
      let eventDispatcher = viewerMgr.getEventDispatcher();
      let events = viewerMgr.getEventsList();
      if (events) {
        eventDispatcher?.addEventListener(
          events.viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE,
          (event : any) => {
            //this.props.saveViewerLoadingStatus(event.data);
          }
        );
      }
      loadModel(api, url);
    }, [] );


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
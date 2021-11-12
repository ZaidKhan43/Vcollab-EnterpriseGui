import {EventDispatcher, viewerEvents} from '../../backend/viewerAPIProxy';
import { setModelLoadingStatus } from '../../store/appSlice';
import { handlePlaneSelection } from '../../store/sideBar/clipSlice';
import { handleCameraChange, handleClick } from '../../store/sideBar/labelSlice/label3DSlice';
import { addMessage, updateMessage, NetworkData, NotificationType, finishMessage } from '../../store/sideBar/messageSlice';
import { handleHighlightAsync } from '../../store/sideBar/productTreeSlice';
import { fetchCameraMatrix } from '../../store/sideBar/sceneSlice';
import { toastMsg } from '../../store/toastSlice';

export const registerEvents = (eventDispatcher:EventDispatcher, events:viewerEvents, dispatch:any) => {
    if (events) {
        eventDispatcher?.addEventListener(
          events.viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE,
          (event : any) => {
            dispatch(setModelLoadingStatus(event.data));
          }
        );
        eventDispatcher?.addEventListener(
          events.viewerEvents.DOWNLOAD_START,
          (event: any) => {
            let data = event.data;
            let networkData:NetworkData = {
              transfferedSize: 0,
              totalSize: data.event.totalSize,
              pause: false,
              cancel: false,
              timeLeft: ""
            }
            dispatch(addMessage({
              id: data.id,
              type: NotificationType.NETWORK_TRANSFER_MESSAGE,
              tags: ["Downloads","Display Mode"],
              data: networkData,
              title: data.event.title
            }))
            dispatch(toastMsg({msg:`Downloading ${data.event.title}`}));
            console.log("start",networkData.totalSize);
          }
        );
        eventDispatcher?.addEventListener(
          events.viewerEvents.DOWNLOAD_PROGRESS,
          (event: any) => {
            let data = event.data;
            dispatch(updateMessage({
              id: data.id,
              transferredSize: data.event.loaded
            }))
            console.log("update",data.event);
          }
        );
        eventDispatcher?.addEventListener(
          events.viewerEvents.DOWNLOAD_END,
          (event: any) => {
            let data = event.data;
           
            dispatch(finishMessage({
              id: data.id
            }))
            dispatch(toastMsg({msg:`${data.event.title}`}));
          }
        );
        eventDispatcher?.addEventListener(
          events.viewerEvents.MODEL_PART_HIGHLIGHTED,
          (event: any) => {
              let nodeIds = event.data.nodeIds;
              let toHighlight = event.data.isHighlighted;
            dispatch(handleHighlightAsync({nodeIds,toHighlight}));            
          }
        );
        eventDispatcher?.addEventListener(
          events.viewerEvents.SECTION_PLANE_SELECTED,
          (event : any) => {
            let data = event.data;
            dispatch(handlePlaneSelection({e:data}));
          }
        );
        eventDispatcher?.addEventListener(
          events.viewerEvents.CAMERA_MOVED,
          (event:any) => {
            dispatch(fetchCameraMatrix())
            dispatch(handleCameraChange(event))
          }
        );
        eventDispatcher?.addEventListener(
          events.viewerEvents.VIEWER_CLICK,
          (event:any) => {
            dispatch(handleClick(event));
          }
        )
      }
}
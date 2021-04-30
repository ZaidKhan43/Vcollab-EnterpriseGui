import {selectModelLoadingStatus,setModelLoadingStatus,setModelLoadedState} from '../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../store/storeHooks';

import {getEventDispatcher , getEventsList} from '../../backend/viewerAPIProxy';

//import  { useEffect } from 'react';

import Logo from "../../assets/images/LogoBig.svg";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export const styles = makeStyles((theme) => ({
  loaderContainer: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgba(23, 23, 39, 0.5)",
    alignItems: "center",
    textAlign: "center",
    width: "100vw",
    height: "100vh",
    zIndex: 5000,
  },
  logo: {
    width: "50%",
  },
  status: {
    paddingTop: "50px",
    color:"rgb(245,255,250)"
  },
}));



export default function AppLoader() {


  let eventDispatcher = getEventDispatcher();
  let eventList = getEventsList();

  const modelStatus = useAppSelector(selectModelLoadingStatus);
  const dispatch = useAppDispatch();

  eventDispatcher?.addEventListener(eventList.viewerEvents.MODEL_DOWNLOAD_STATUS_UPDATE,(e:any ) => {

    //console.log(e);

    if(e.data === "SUCCESS") {

      dispatch(setModelLoadedState(true));

    }
    else {

      dispatch(setModelLoadingStatus(e.data));

    }
     
  } )


  const classes = styles();
  return (
    <div className={classes.loaderContainer}>
      <Typography>
        <img src={Logo} className={classes.logo} alt="Logo" />
      </Typography>
      <Typography className={classes.status} variant='h3'>{modelStatus}</Typography>
    </div>
  );



}



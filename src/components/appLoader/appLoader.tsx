import {selectModelLoadingStatus,setModelLoadingStatus,setModelLoadedState} from '../../store/appSlice';
import { useAppSelector, useAppDispatch } from '../../store/storeHooks';

import  { useEffect } from 'react';

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

  useEffect(() => {

    UpdateModelStatus();
    
  },[]);

  let count = 0;

  const modelStatus = useAppSelector(selectModelLoadingStatus);
  const dispatch = useAppDispatch();


  function UpdateModelStatus() {

    setTimeout(function() {

      dispatch(setModelLoadingStatus ("Downloading file on the server"));

     }, 1000)

    let test =   setInterval(function() { 

      count = count + 10; 
   
      dispatch(setModelLoadingStatus ("File download in progress: "+count.toString()+"% completed"));

     }, 2000);


     setTimeout(function() {

      dispatch(setModelLoadingStatus ("Downloading data from server"));

      clearInterval(test);

     }, 20000)

     setTimeout(function() {

      dispatch(setModelLoadingStatus ("Process data"));

     }, 22000)

     setTimeout(function() {

      dispatch(setModelLoadedState (true));

     }, 23000)

  }


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



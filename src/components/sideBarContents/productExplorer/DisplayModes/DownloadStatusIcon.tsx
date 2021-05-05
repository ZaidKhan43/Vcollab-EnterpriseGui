import React from 'react'
import DownloadIcon from "@material-ui/icons/CloudDownload"
import DownloadedIcon from "@material-ui/icons/CloudDone";
import ReportProblemIcon from "@material-ui/icons/ReportProblem"
import CircularProgress from "@material-ui/core/CircularProgress";
import {DownloadStates} from "../../../../store/sideBar/DisplayModesSlice";


const Render = (props:any) => {
        switch (props.downloadState) {
            case DownloadStates.DOWNLOADED:
                return < DownloadedIcon color='primary' />
            case DownloadStates.IN_PROGRESS:
                return <CircularProgress color='inherit' size={20} ></CircularProgress>
            case DownloadStates.NOT_DOWNLOADED:
                return <DownloadIcon/>
            case DownloadStates.NO_DATA_AVAILABLE:
                return <ReportProblemIcon/>
            default:
                return null;
        }
}

export function DownloadStatusIcon(props:any) {

    return (
        <>
         <Render downloadState = {props.status}></Render>
        </>
    )
}

export default DownloadStatusIcon
import {useState} from "react";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CenterFocusWeakSharpIcon from '@material-ui/icons/CenterFocusWeakSharp';
import IconButton  from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid"
import ToolTip from '@material-ui/core/Tooltip'

import AddTagDialog from "./Dialogs/AddTagDialog"
import VisibilityOptions from './VisibilityOptions'
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import {selectActiveViewerID} from '../../../../store/appSlice';
import {groupSelectedNodes,focusSelectedNodes} from '../../../../store/sideBar/ProductTreeSlice'



function FooterOptions(props:any) {
    const dispatch = useAppDispatch();
    const [showDialog, setShowDialog] = useState(false);
    const activeViewerId = useAppSelector(selectActiveViewerID)
    const handleDialogOpen = () => {
        setShowDialog(true);
    }
    const handleDialogClose = () => {
        setShowDialog(false);
    }  
    const handleDialogSave = (name:string) => {
        dispatch(groupSelectedNodes({tagName:name}))
        setShowDialog(false);
    }
    const handleFocus = () => {
        dispatch(focusSelectedNodes({viewerId:activeViewerId}));
    }
    return (
        <Grid container justify="space-around">
            <Grid item>
                <VisibilityOptions {...props}></VisibilityOptions>
            </Grid>
            <Grid item>
            <ToolTip title='Tag selected'>
                <IconButton {...props} onClick={() => handleDialogOpen()}>
                    <LocalOfferIcon/>
                </IconButton>  
            </ToolTip>
            </Grid>
            <Grid item>
            <ToolTip title='Focus selected'>
                <IconButton {...props} onClick={() => handleFocus()}>
                    <CenterFocusWeakSharpIcon/>
                </IconButton>  
            </ToolTip>
            </Grid>
            <AddTagDialog open={showDialog} handleSave={handleDialogSave} handleClose={handleDialogClose}></AddTagDialog>
        </Grid>
    )
}

export default FooterOptions

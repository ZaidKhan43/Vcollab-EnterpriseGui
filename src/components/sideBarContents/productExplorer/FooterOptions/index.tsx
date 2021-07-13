import {useState} from "react";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CenterFocusWeakSharpIcon from '@material-ui/icons/CenterFocusWeakSharp';
import IconButton  from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid"
import ToolTip from '@material-ui/core/Tooltip'
import Typography from "@material-ui/core/Typography";

import AddTagDialog from "./Dialogs/AddTagDialog";
import AddTagNoModal from "./Dialogs/AddTagNoModal";
import VisibilityOptions from './VisibilityOptions'
import { useAppDispatch, useAppSelector } from '../../../../store/storeHooks';
import {selectActiveViewerID} from '../../../../store/appSlice';
import {groupSelectedNodes,focusSelectedNodes, updatePrevSearches} from '../../../../store/sideBar/productTreeSlice'
import { makeStyles,createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => createStyles({
    iconText: {
        height:'50px'
    }
}))


function FooterOptions(props:any) {
    const classes = useStyles();
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
        dispatch(updatePrevSearches(name));
        setShowDialog(false);
    }
    const handleFocus = () => {
        dispatch(focusSelectedNodes({viewerId:activeViewerId}));
    }
    return (

        showDialog ?
        <AddTagNoModal message=" Enter a tag name to the selected Nodes. 
        This tag name can be used in search to filter nodes" 
        onAdd = {handleDialogSave}
        onCancel = {handleDialogClose}
        />
        :
        <Grid container justify="space-around">
            <Grid item xs={4}>
                <Grid container item direction='column' justify='flex-start'>
                    <Grid item>
                    <VisibilityOptions disabled={props.disabled}></VisibilityOptions>
                    </Grid>
                    <Grid item className={classes.iconText}>
                        <Typography  variant='caption'>Visibility</Typography>    
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid container item direction='column'>
                <Grid item>
                    <ToolTip title='Tag selected'>
                        <span>
                        <IconButton disabled={props.disabled} onClick={() => handleDialogOpen()}>
                            <LocalOfferIcon/>
                        </IconButton>  
                        </span>
                    </ToolTip>
                    </Grid>
                    <Grid item className={classes.iconText}>
                        <Typography  variant='caption'>Label Parts</Typography>    
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
            <Grid container item direction='column'>
                <Grid item>
                    <ToolTip title='Focus selected'>
                    <span>
                    <IconButton disabled={props.disabled} onClick={() => handleFocus()}>
                    <CenterFocusWeakSharpIcon/>
                    </IconButton>  
                    </span>
                    </ToolTip>
                </Grid>
                <Grid item className={classes.iconText} >
                        <Typography variant='caption'>Fit To Screen</Typography>    
                </Grid>
            </Grid>
        </Grid>
            <AddTagDialog open={showDialog} handleSave={handleDialogSave} handleClose={handleDialogClose}></AddTagDialog>
        </Grid>
    )
}

export default FooterOptions

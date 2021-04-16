import {useState} from "react";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import VisibilityOptions from './VisibilityOptions'
import IconButton  from '@material-ui/core/IconButton';
import { useAppDispatch } from '../../../../store/storeHooks';
import {groupSelectedNodes} from '../../../../store/sideBar/ProductTreeSlice'
import ToolTip from '@material-ui/core/Tooltip'
import AddTagDialog from "./Dialogs/AddTagDialog"
function FooterOptions(props:any) {
    const dispatch = useAppDispatch();
    const [showDialog, setShowDialog] = useState(false);
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
    return (
        <>
            <VisibilityOptions {...props}></VisibilityOptions>
            <ToolTip title='Add Tag'>
                <IconButton onClick={() => handleDialogOpen()}>
                    <CreateNewFolderIcon/>
                </IconButton>  
            </ToolTip>
            <AddTagDialog open={showDialog} handleSave={handleDialogSave} handleClose={handleDialogClose}></AddTagDialog>
        </>
    )
}

export default FooterOptions

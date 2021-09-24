import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import MuiIconButton from '@material-ui/core/IconButton';
import BackButton from '../../../icons/back';

import MuiGrid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
import AddIcon from "../../../icons/plus";

import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';

import { useState} from "react";
import {useAppSelector,useAppDispatch } from '../../../../store/storeHooks';
import {goBack, push} from 'connected-react-router/immutable';
import MuiButton from '@material-ui/core/Button';

import OptionContainer from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/OptionContainer'
import Option from '../../../layout/sideBar/sideBarContainer/sideBarFooter/utilComponents/Option'

import MuiEditIcon from '@material-ui/icons/EditOutlined';
import MuiFileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import MuiPaste from '@material-ui/icons/AssignmentOutlined';
import MuiDeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import MuiVisibilityIcon from '@material-ui/icons/Visibility';

import MuiToggleButton from '@material-ui/lab/ToggleButton';
import MuiToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { Routes } from '../../../../routes/index'
import styles from '../style';

import { useEffect } from 'react';

import { CameraView ,addCameraView , setActiveId, ViewMode , setProjectionAsync , pasteCameraView , deleteCameraView, setCameraInfoAsync} from '../../../../store/sideBar/sceneSlice';

export default function Camera (){

    const classes = styles();

    const dispatch = useAppDispatch();
    const maxUserDefined = 3;
    const [copy, setCopy] = useState(-1);
    const [openDelete,setOpenDelete] = useState(false)

    const cameraList : CameraView[] = useAppSelector((state) => state.scene.cameraViews)
    const active = useAppSelector(state => state.scene.settings.activeId);
    const projection = useAppSelector(state => state.scene.settings.projection)
    
    const userDefinedLength : number = cameraList.filter(item => item.userDefined === true).length;
    
    // useEffect(() => {
    //     if(value){
    //         setActive(value.id)
    //         dispatch(setActiveId(value.id))
    //     }
    //     else
    //         dispatch(setActiveId(-1))
    //   },[cameraList]);
      

    const onHandleCamera = (id : number) => {
        dispatch(setActiveId(id))
    }

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const onHandleAdd = () => {
        dispatch(addCameraView());
    }

    const onHandleCopy = () => {
        setCopy(active);
    }

    const onHandlePaste = () => {
        const data = cameraList.find(item => item.id === copy)
        if(data)
        dispatch(pasteCameraView({data}))
        // setCameraList(newCameraList);
    }

    const onHandleDeleteButton = () => {
        setOpenDelete(true); 
        // setDeleteMessage("Are you sure want to delete the selected plane?")
     }

    const onHandleDelete = () => {
        setOpenDelete(false);
        const id = active;
        dispatch(deleteCameraView({id}))
        dispatch(setActiveId(-1))
    }

    const onHandleViewMode = (e : any) => {
        const value = Number(e.currentTarget.value);
        dispatch(setProjectionAsync(value))
    }

    const onHandleApply = () => {
        dispatch(setCameraInfoAsync())
    } 

    const onHandleEdit = () => {
        dispatch(push(Routes.SCENE_CAMERA_EDIT));  
    }

    const getHeaderLeftIcon = () => {
        return (
            <MuiIconButton onClick={() => onClickBackIcon()} ><BackButton/></MuiIconButton> 
        )
    }

    const getHeaderRightIcon = () => {
        return ( 
            <MuiIconButton onClick={onHandleAdd}>
            <AddIcon/>
        </MuiIconButton> 
        )
    }

    const getAction = () => {
        return (
                <div style={{marginBottom: "20px", textAlign:"center"}}>
                <MuiToggleButtonGroup
            // style={{marginBottom:"20px",}}
            size="small" 
            value={projection}
            exclusive
            onChange={onHandleViewMode}
            aria-label="text alignment"
        >
            <MuiToggleButton value={ViewMode.Perspective} aria-label="left aligned">
                <MuiTypography style={{fontSize:"12px",textTransform:'none'}}>Perspective</MuiTypography>
            </MuiToggleButton>
            <MuiToggleButton value={ViewMode.Orthographic} aria-label="left aligned">
                <MuiTypography style={{fontSize:"12px",textTransform:'none'}}>Orthographic</MuiTypography>
            </MuiToggleButton>
        </MuiToggleButtonGroup>
                </div>
        )
    }

    const getBody = () => {
        return (
            <div className={classes.scrollBar}>
            
                <div style={{marginLeft:"10px", marginTop:"20px",}}>

                        <MuiTypography  style={{textTransform:"none", textAlign:"left"}}>
                            System Provided
                        </MuiTypography>

                <div>
                    <MuiMenuList>
                        {
                            cameraList.filter(item => item.userDefined !== true).map(item =>
                                <MuiMenuItem  key={ 'divParent_' + item.id }  selected={active === item.id} onClick={() => onHandleCamera(item.id)}>
                                <MuiTypography>
                                    {item.name}
                                </MuiTypography>
                            </MuiMenuItem>
                        )}
                    </MuiMenuList>
                    
                {
                    userDefinedLength > 0 
                    ?
                    <div>
                         <MuiTypography  style={{textTransform:"none", textAlign:"left"}}>
                            User Defined
                        </MuiTypography>
                        <MuiMenuList>
                        {
                            cameraList.filter(item => item.userDefined === true).map(item =>
                                <MuiMenuItem  key={ 'divParent_' + item.id }  selected={active === item.id} onClick={() => onHandleCamera(item.id)}>
                                <MuiTypography>
                                    {item.name}
                                </MuiTypography>
                            </MuiMenuItem>
                        )}
                    </MuiMenuList>
                    </div>

                    :
                    null
                }
                </div>
            </div>
            </div>

        )
    }

    const getFooter = () => {
        const activeItem = cameraList.filter(item => item.id === active) 
        return(
            <div>
                {
                    openDelete === false
                    ?
                        <div>
                        {active > -1
                        ?
                        <div style={{marginTop:"20px", marginBottom:"20px"}}>
                            <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                                autoFocus 
                                onClick={onHandleApply} 
                                // color="primary"
                            >
                                Apply
                            </MuiButton>
                        </div>
                        :
                         null
                            }   

                                {
                                    
                                    <OptionContainer>
                                        {
                                            cameraList.find(item => item.id === active)?.userDefined
                                            ?
                                            <Option label="Edit" icon={<MuiIconButton 
                                                disabled={active === -1 || activeItem[0]?.userDefined === false}
                                                 onClick={() => onHandleEdit()}
                                            >
                                                <MuiEditIcon/>
                                                </MuiIconButton>} 
                                            />
                                            :
                                            <Option label="View" icon={<MuiIconButton 
                                                disabled={active === -1}
                                                 onClick={() => onHandleEdit()}
                                            >
                                                <MuiVisibilityIcon/>
                                                </MuiIconButton>} 
                                            />
                                        }
                                        
                                        
                                        <Option label="Copy" icon={ <MuiIconButton 
                                            disabled = {active === -1 || userDefinedLength === maxUserDefined} 
                                             onClick={() => onHandleCopy()}
                                        > 
                                            <MuiFileCopyOutlinedIcon/>
                                            </MuiIconButton>}
                                        />
                                        <Option label="Paste" icon={ <MuiIconButton 
                                            disabled = {copy === -1 || userDefinedLength === maxUserDefined }  
                                            onClick={() => onHandlePaste()}
                                        > 
                                            <MuiPaste/>
                                            </MuiIconButton>}
                                        />
                                        <Option label="Delete" icon={ <MuiIconButton 
                                            disabled = {active === -1 || cameraList.find(item => item.id === active)?.userDefined === false}  
                                            onClick={() => onHandleDeleteButton()}
                                        > 
                                            <MuiDeleteForeverOutlinedIcon/>
                                            </MuiIconButton>}
                                        />
                                        
                                    </OptionContainer>
                                }
                    </div>
                    :
                    <div>
                       <div style={{marginBottom:"5px", marginTop:"5px"}}>
                <MuiTypography style={{marginBottom:"5px", fontSize:"14px"}}>
                    Are you sure want to delete the selected view?
                </MuiTypography>
                <div style={{alignContent:"center",}}>
                  <MuiButton style={{backgroundColor:"#5958FF",width:"20%", fontSize:"9px" , marginRight:"5px"}} 
                    autoFocus 
                    onClick={onHandleDelete} 
                    // color="primary"
                  >
                    Confirm
                  </MuiButton>
                <MuiButton style={{width:"20%", fontSize:"9px"}}
                  onClick={() => setOpenDelete(false)} 
                  // color="primary"
                >
                  Cancel
              </MuiButton>
            </div>
          </div>
                    </div>

                }
                
     </div>
        )
    }

    return(
        <SideBarContainer
        headerLeftIcon = { getHeaderLeftIcon() }
        headerContent={ <Title text={"Camera" } group="Scene"/> }
        headerAction = {getAction()}
        headerRightIcon = { getHeaderRightIcon() }
        body ={ getBody() }
        footer = { getFooter() }
      />

    )
}
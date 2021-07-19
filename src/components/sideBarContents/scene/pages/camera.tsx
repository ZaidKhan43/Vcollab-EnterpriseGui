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
import { CopyrightOutlined } from '@material-ui/icons';

import { Routes } from '../../../../routes/index'

export default function Camera (){

    const dispatch = useAppDispatch();
    const [active,setActive] = useState(-1);
    const maxUserDefined = 3;
    const [copy, setCopy] = useState(-1);
    const [openDelete,setOpenDelete] = useState(false)

    const [cameraList, setCameraList]=useState([
        {
            id: 0,
            name: "Front" , 
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
            valueOrthographic : [
                {name:"Left", value:100},
                {name:"Right", value:1000},
                {name:"Top", value:100},
                {name:"Bottom", value:100},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
        },
        {   
            id:1,
            name: "Back" , 
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
            valueOrthographic : [
                {name:"Left", value:100},
                {name:"Right", value:1000},
                {name:"Top", value:100},
                {name:"Bottom", value:100},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
        },
        {
            id:2,
            name: "Left" ,
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
            valueOrthographic : [
                {name:"Left", value:100},
                {name:"Right", value:1000},
                {name:"Top", value:100},
                {name:"Bottom", value:100},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
        }, 
        {
            id:3,
            name:"Right",
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
            valueOrthographic : [
                {name:"Left", value:100},
                {name:"Right", value:1000},
                {name:"Top", value:100},
                {name:"Bottom", value:100},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
        } , 
        {
            id:4,
            name:"Top" ,
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
            valueOrthographic : [
                {name:"Left", value:100},
                {name:"Right", value:1000},
                {name:"Top", value:100},
                {name:"Bottom", value:100},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
        }, 
        {
            id:5,
            name:"Bottom" ,
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
            valueOrthographic : [
                {name:"Left", value:100},
                {name:"Right", value:1000},
                {name:"Top", value:100},
                {name:"Bottom", value:100},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
        },
        {
            id:6,
            name: "Isometric" ,
            userDefined: false,
            valuePerspective :  [ 
                {name:"Y-Field of View", value:100},
                {name:"Aspect Ratio", value:1000},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
            valueOrthographic : [
                {name:"Left", value:100},
                {name:"Right", value:1000},
                {name:"Top", value:100},
                {name:"Bottom", value:100},
                {name:"Far Plane", value:100},
                {name:"Near Plane", value:1000},
            ],
        },
    ]);

    const userDefinedLength = cameraList.filter(item => item.userDefined === true).length;

    const onHandleCamera = (id : number) => {
        if(active === id)
            setActive(-1)
        else
            setActive(id)
    }

    const onClickBackIcon = () => {
        dispatch(goBack());
    }

    const onHandleAdd = () => {
        const length = cameraList.length;
        
        if(userDefinedLength < maxUserDefined){
            const newItem = { id: length,
                            name:`Camera View ${userDefinedLength+1}`,
                            userDefined : true,
                            valuePerspective :  [ 
                                {name:"Y-Field of View", value:100},
                                {name:"Aspect Ratio", value:1000},
                                {name:"Far Plane", value:100},
                                {name:"Near Plane", value:1000},
                            ],
                            valueOrthographic : [
                                {name:"Left", value:100},
                                {name:"Right", value:1000},
                                {name:"Top", value:100},
                                {name:"Bottom", value:100},
                                {name:"Far Plane", value:100},
                                {name:"Near Plane", value:1000},
                            ],
                        }
            const newList = [...cameraList , newItem];
            setCameraList(newList);
        }

    }

    const onHandleCopy = () => {
        setCopy(active);
    }

    const onHandlePaste = () => {
        const toCopyItem = cameraList.find(item => item.id === copy)
        let clone = JSON.parse(JSON.stringify(toCopyItem));
        const newId = cameraList.length;
        clone.id= newId;
        clone.userDefined = true;
        clone.name = `Camera View ${userDefinedLength + 1}`;
        const newCameraList = [...cameraList , clone];
        setCameraList(newCameraList);
    }

    const onHandleDeleteButton = () => {
        setOpenDelete(true); 
        // setDeleteMessage("Are you sure want to delete the selected plane?")
     }

    const onHandleDelete = () => {
        setOpenDelete(false);
        // const toRemove = cameraList.find(item => item.id === active)
        const newCameraList =  cameraList.filter(item => item.id !== active)
        setCameraList(newCameraList)
        setActive(-1)
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
        return ( null)
    }


    const getBody = () => {
        return (
            <div style={{marginLeft:"10px", marginTop:"10px",}}>
                <div>
                <MuiGrid container  spacing={6}>
                    <MuiGrid item xs={12} sm={8}>
                        <MuiTypography  style={{textTransform:"none", textAlign:"left"}}>
                            Add View
                        </MuiTypography>
                    </MuiGrid>
                    <MuiGrid item xs={12} sm={2} style={{marginTop:"-10px"}}>
                        <MuiIconButton onClick={onHandleAdd}>
                            <AddIcon/>
                        </MuiIconButton> 
                    </MuiGrid>
                </MuiGrid>
                </div>

                <div>
                    <MuiMenuList>
                        {
                            cameraList.map(item =>
                                <MuiMenuItem selected={active === item.id} onClick={() => onHandleCamera(item.id)}>
                                <MuiTypography>
                                    {item.name}
                                </MuiTypography>
                            </MuiMenuItem>
                        )}
                    </MuiMenuList>
                    
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
                                // onClick={onHandleDelete} 
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
                                        <Option label="Edit" icon={<MuiIconButton 
                                            disabled={active === -1 || activeItem[0]?.userDefined === false}
                                             onClick={() => onHandleEdit()}
                                        >
                                            <MuiEditIcon/>
                                            </MuiIconButton>} 
                                        />
                                        
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
        headerRightIcon = { getHeaderRightIcon() }
        body ={ getBody() }
        footer = { getFooter() }
      />

    )
}
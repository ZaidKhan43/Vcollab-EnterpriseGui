import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiToolTip from '@material-ui/core/Tooltip';
import MuiBackIcon from '@material-ui/icons/ArrowBack'

import { useAppDispatch } from "../../../store/storeHooks";
import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import styles from './style';

import {goBack, push} from 'connected-react-router/immutable';
import Title from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SelectAction from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { useState} from "react";

import BackButton from '../../../components/icons/back';
import MuiCheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import MuiGrid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiButton from '@material-ui/core/Button';
import MuiCancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


export default function Annotations(){

    const classes = styles();
    const dispatch = useAppDispatch();  

    const toSelectList = [
        {
            id:0,
            name:"All",
        },
        {
            id:1,
            name:"Color Maps",
        },
        {
            id:2,
            name:"Display Modes",
        },
    ]

    const [notificationList, setNotificationList] = useState([
        {
            id:0,
            name:"Simplified Mesh",
            time: new Date(),
            completed:false,
            process: 40,
            pause: false,
            size:2024,
            timeLeft:"3 Minute",
            cancel : false,
            image:<MuiCheckCircleOutlineOutlinedIcon/>,
            collapse:false,
        },
        {
            id:1,
            name:" Colorplot",
            time: new Date(),
            completed:true,
            process: 40,
            pause: false,
            size:2024,
            timeLeft:"3 Minute",
            cancel : false,
            image:<MuiCheckCircleOutlineOutlinedIcon/>,
            collapse:true,
        },
        {
            id:2,
            name:" Shadow Mesh",
            time: new Date(),
            completed:false,
            process: 40,
            pause: false,
            size:2024,
            timeLeft:"3 Minute",
            cancel : false,
            image:<MuiCheckCircleOutlineOutlinedIcon/>,
            collapse:false,
        },
        {
            id:3,
            name:" Shadow Mesh",
            time: new Date(),
            completed:false,
            process: 40,
            pause: false,
            size:2024,
            timeLeft:"3 Minute",
            cancel : false,
            image:<MuiCheckCircleOutlineOutlinedIcon/>,
            collapse:false,
        },
    ])

    const [activeId, setActiveId] = useState(0);

    const onClickBackIcon = () =>{
        dispatch(goBack());
    }

    const onHandleSelect = (id : number) => {
        setActiveId(id);
    }

    const getHeaderLeftIcon= () => {
        return (
         <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
        );
      }

    const onHandlePause = (id : number) => {
        const index = notificationList.findIndex(item => item.id === id);
        const newArray = [...notificationList]
        if(index >= 0){
            let updated = newArray[index];
            updated.pause = !updated.pause;
            newArray[index]= updated
            setNotificationList(newArray)
        }
    }

    const onHandleCollapse = (id : number) => {
        const index = notificationList.findIndex(item => item.id === id);
        const newArray = [...notificationList]
        if(index >= 0){
            let updated = newArray[index];
            updated.collapse = !updated.collapse;
            newArray[index]= updated
            setNotificationList(newArray)
        }
    }

    const onHandleCancel = (id: number) => {
        const index = notificationList.findIndex(item => item.id === id);
        const newArray = [...notificationList]
        if(index >= 0){
            let updated = newArray[index];
            updated.cancel = true;
            newArray[index]= updated
            setNotificationList(newArray)
        }
    }

    const getAction = () => {
        return (
          <SelectAction
          labelId="display-modes-selection-label-id"
          id="display-modes-selection-id"
          value={activeId}
          onChange={(e : any) => onHandleSelect(Number(e.target.value) )}
          MenuProps={{
            disablePortal: true,
            anchorOrigin: {
              vertical:"bottom",
              horizontal:"left",
           },
           getContentAnchorEl: null
          }}
          >
           { 
            toSelectList.map((item) => 
              <MuiMenuItem value={item.id}>{item.name}</MuiMenuItem> 
          )}
          </SelectAction>
        );
      }
  
  
    const getHeaderRightIcon = () => {
        return null;
    }

    const newCollapse = (id : number) => {

        let countHide = 1;
        let hiddenId = [id];
        const index = notificationList.findIndex(item => item.id === id);

        if( index >= 0){
            for(let i = index+1; i<notificationList.length;i++){
                if(notificationList[i].collapse === false){
                    countHide= countHide+1;
                    hiddenId = [...hiddenId, notificationList[i].id]
                }
                else
                    break;
            }
        
            if(index > 0 && notificationList[index -1].collapse === false){
                return(null);
            }
            return(<MuiGrid container>
                <MuiGrid item xs={1}></MuiGrid>
                <MuiGrid item xs={9}>
                <Typography onClick={() => { countHide === 1 ? onHandleCollapse(id) :hiddenId.map(item => onHandleCollapse(item))}}>
           {`${countHide} Notification`} 
        </Typography>
                </MuiGrid>
                <MuiGrid item>
                 <ExpandLess />
                </MuiGrid>
            </MuiGrid>)

        }

        // if(index > 0){
        //     if(notificationList[index-1].collapse === false)
        //     return(null)
        // }

        // notificationList.forEach((item,index) => {
        // if(item.id === id && index> 0){
        //     if(notificationList[index + 1].collapse === false ){
        //         countHide=+1;
        //     }
        // }
        // })

        
    }

    const getBody = () => {
        return (
            <div>
                {notificationList.map((item,index) => 
                    <div  style={{marginTop:"20px"}}>
                        {
                        !item.collapse && 
                        newCollapse(item.id)
                        }

                        <Collapse in={item.collapse} >
                            <div >
                        <MuiGrid container>
                            <MuiGrid item xs={3}> </MuiGrid>
                            <MuiGrid item xs={9} >
                                <MuiGrid container>
                                    <MuiGrid item  xs={9}>
                                    <Typography variant="h3" align="left">
                                        {`${item.time.getHours()} Hours`}
                                    </Typography>
                                    </MuiGrid>
                                    <MuiGrid item>
                                    {item.collapse && <ExpandLess onClick={() => onHandleCollapse(item.id)}/>}
                                    </MuiGrid>
                                </MuiGrid>
                            
                                    
                            </MuiGrid>
                        
                        <MuiGrid item style={{marginTop:"10px"}}>
                        <MuiGrid container>
                            <MuiGrid item xs={4}>
                                {item.cancel ?
                                <div style={{marginLeft:"20px", marginRight:"15px"}}>
                                <MuiCancelOutlinedIcon  fontSize="large"/>
                            </div>
                                    :
                                    item.completed === false ?
                                        <Box position="relative" display="inline-flex">
                                            <CircularProgress variant="determinate" value={item.process} />
                                            <Box
                                                top={0}
                                                left={0}
                                                bottom={0}
                                                right={0}
                                                position="absolute"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Typography variant="caption" component="div" color="textSecondary">{`${item.process}%`}</Typography>
                                            </Box>
                                        </Box>
                                    :
                                        <div style={{marginLeft:"20px", marginRight:"15px"}}>
                                        <MuiCheckCircleOutlineOutlinedIcon  fontSize="large"/>
                                    </div>
                                }
                            </MuiGrid>
                            <MuiGrid item xs={8}>
                                {item.cancel
                                ?
                                <MuiGrid container direction="column">
                                    <MuiGrid item>
                                        <Typography variant="h2" align="left">
                                            { `Cancelled ${item.name}`}
                                        </Typography>
                                    </MuiGrid>
                                </MuiGrid>
                            
                                :
                                <MuiGrid container direction="column">
                                    <MuiGrid item>
                                        <Typography variant="h2" align="left">
                                            {item.completed === false ? `Downloading ${item.name}` : `Downloaded ${item.name}`}
                                        </Typography>
                                    </MuiGrid>
                                    <MuiGrid item  style={{marginTop:"10px"}}>
                                        <Typography variant="h3" align="left">
                                            {
                                                item.completed ?
                                                "4.0MB"
                                                :
                                                " 2.0MB / 4.0MB, 3 Sec Left"
                                            }
                                           
                                        </Typography>
                                        
                                    </MuiGrid>
                                    {
                                        item.completed
                                        ?
                                        null
                                        :
                                        <MuiGrid item >
                                        <MuiGrid container>
                                            <MuiGrid item>
                                                <MuiButton style={{width:"20%", fontSize:"12px"}}
                                                    onClick={() => onHandlePause(item.id)} 
                                                    color="primary"
                                                >
                                                    {item.pause ? "Continue" : "Pause"}
                                                </MuiButton>
                                            </MuiGrid>
                                                <MuiGrid item>
                                                    <MuiButton style={{width:"20%", fontSize:"12px"}}
                                                        onClick={() => onHandleCancel(item.id)} 
                                                        color="primary"
                                                    >
                                                        Cancel
                                                    </MuiButton>
                                                </MuiGrid>
                                            </MuiGrid>
                                        </MuiGrid>
                                   
                                    }
                                    </MuiGrid> 
                            }
                            </MuiGrid>
                        </MuiGrid>
                        </MuiGrid>
                        </MuiGrid>
                        </div>
                        </Collapse>
                    </div>
                    
                    )
                }
            </div>
        )
    }      
  
    const getFooter = () => {
        return null;  
    }

    return (<SideBarContainer
        headerLeftIcon = { getHeaderLeftIcon() }
        headerContent={ <Title text={`${toSelectList.filter(item => item.id === activeId).map(item=> item.name)}`} group="Messages"/> }
        headerRightIcon = { getHeaderRightIcon() }
        headerAction = {getAction()}
        body ={ getBody() }
        footer = { getFooter() }
        />)
}
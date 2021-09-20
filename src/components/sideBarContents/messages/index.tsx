import SideBarContainer from '../../layout/sideBar/sideBarContainer';
import styles from './style';

import {useEffect} from 'react';

import {goBack} from 'connected-react-router/immutable';
import Title from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';

import SelectAction from '../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/SelectAction';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { useState} from "react";
import {useAppSelector,useAppDispatch } from '../../../store/storeHooks';
import {editPause, editCancel, editCollapse, editSearch, sortedNotification,NotificationType,NotificationList} from "../../../store/sideBar/messageSlice";

import BackButton from '../../../components/icons/back';
import MuiGrid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';

import CardSimple from './components/cardSimple';
import CardTransfer from './components/cardTransfer';
import MuiIconButton from '@material-ui/core/IconButton';

export default function Annotations(){

    const dispatch = useAppDispatch(); 
    const classes = styles();

    const notificationList= useAppSelector(sortedNotification )
    const [activeId, setActiveId] = useState(0);

    const toSelectList = [
        {
            id: -1,
            name:"Custom",
        },
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

        {
            id: 3,
            name:"Network Transfer",
        }
    ]

    useEffect(() => {
        const list = notificationList.filter(item => item.collapsed).map(item => item.id);
       
        const ongoingNetworkTransfer = notificationList.filter(item => item.card.type=== NotificationType.NETWORK_TRANSFER_MESSAGE && item.card.data.cancel === false && item.card.data.totalSize !== item.card.data.transfferedSize).map(item => item.id);    
        const colorMaps = notificationList.filter(item => (item.tags.includes("Color Maps"))=== true).map(item => item.id);
        const displayModes = notificationList.filter(item => (item.tags.includes("Display Modes"))=== true).map(item => item.id);
        
        if(list.length === notificationList.length)
            setActiveId(0);
        if(JSON.stringify(list) === JSON.stringify(ongoingNetworkTransfer))
            setActiveId(3);
        if(JSON.stringify(list) === JSON.stringify(colorMaps))
            setActiveId(1);
        if(JSON.stringify(list) === JSON.stringify(displayModes))
            setActiveId(2);
      },[notificationList]);

    const onClickBackIcon = () =>{
        dispatch(goBack());
    }

    const onHandleSelect = (id : number) => {
        setActiveId(id);
        dispatch(editSearch(toSelectList.filter(item => item.id === id).map(item => item.name)[0]))
    }

    const getHeaderLeftIcon= () => {
        return (
         <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
        );
    }

    const onHandlePause = (id : number, pause : boolean) => {
        // console.log(id,pause)
        if(pause)
            dispatch(editPause({id:id, value: false}));
        else
            dispatch(editPause({id:id, value: true}));
    }

    const onHandleCollapse = (id : number, boolean: boolean) => {
        if(boolean)
        dispatch(editCollapse({id, value: false}))

        else
        dispatch(editCollapse({id, value: true}))

        setActiveId(-1);
    }

    const onHandleCancel = (id: number) => {
       dispatch(editCancel(id));
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
                    activeId === -1 
                    ?
                    toSelectList.map((item) => 
                        <MuiMenuItem disabled={item.id=== -1} value={item.id}>{item.name}</MuiMenuItem> )
                    :
                    toSelectList.filter(item => item.id !== -1).map((item) => 
                        <MuiMenuItem value={item.id}>{item.name}</MuiMenuItem> )
                }
            </SelectAction>
        );
    }
  
  
    const getHeaderRightIcon = () => {
        return null;
    }

    const newCollapse = (id : number) => {

        let countHide = 1;
        let hiddenId = [id];
        const index = notificationList.findIndex((item:any) => item.id === id);

        if( index >= 0){
            for(let i = index+1; i<notificationList.length;i++){
                if(notificationList[i].collapsed === false){
                    countHide= countHide+1;
                    hiddenId = [...hiddenId, notificationList[i].id]
                }
                else
                    break;
            }
        
            if(index > 0 && notificationList[index -1].collapsed === false){
                return(null);
            }

            return(
                <div className={classes.card}>
                    <MuiGrid container onClick={() => { countHide === 1 ? onHandleCollapse(id,false) :hiddenId.map(item => onHandleCollapse(item,false))}}>
                        <MuiGrid item xs={1}></MuiGrid>
                        <MuiGrid item xs={9} className={classes.notification}>
                            <Typography >
                                {`${countHide} Notification`} 
                            </Typography>
                        </MuiGrid>
                        <MuiGrid item>
                            <MuiIconButton size="small">
                                <ExpandMore />
                            </MuiIconButton>
                        </MuiGrid>
                    </MuiGrid>
                </div>
            )
        }
    }

    const getCard = (item : NotificationList) => {
        switch(item.card.type){
            case(NotificationType.SIMPLE_MESSAGE):
                return(
                    <CardSimple item={item} handleCollapse={onHandleCollapse}/>
                )
            case(NotificationType.NETWORK_TRANSFER_MESSAGE):
                return(
                    <CardTransfer item={item} handleCollapse={onHandleCollapse} handlePause={onHandlePause} handleCancel={onHandleCancel}/>
                )
        }
    }

    const getBody = () => {
        // console.log(notificationList)
        return (
            <div className={classes.scrollBar}>
                {notificationList.map((item: any,index:number) => 
                    <span>
                        {   !item.collapsed
                            && 
                                newCollapse(item.id)
                        }
                        <Collapse in={item.collapsed} >
                            <div className={classes.card}>
                            {getCard(item)}
                            </div>
                        </Collapse>
                    </span>
                )}
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
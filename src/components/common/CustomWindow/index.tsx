import { Box, IconButton, Typography, ClickAwayListener } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import clsx from 'clsx'
import { selectWindowMgr, addWindow, removeWindow, setEditMode, setHiddenState, setWindowAccess} from '../../../store/windowMgrSlice'
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";


const useStyles = makeStyles((theme:any) => ({
    titleBar:{
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main
    },
    grabHandle:{
        cursor: "grab",
        maxHeight: theme.spacing(3)
    },
    edit: {
        border: "solid 1px #ddd",
        backgroundColor: theme.palette.background,
        boxShadow: theme.shadows[1],
        zIndex: (props:any) => (props.window? props.window.zOrder : 0),
        pointerEvents: 'initial',
    },
    view: {
        zIndex: (props:any) => (props.window? props.window.zOrder : 0),
        userSelect: 'none',
        pointerEvents: (props:any) => (props.isEnabled?'initial':'none'),
    },
    overflow:{
        overflow: 'hidden'
    },
    hide: {
        visibility: 'hidden'
    },
    windowHoverEffect: {
        '&:hover':{
        backgroundColor:'rgba(0, 0, 1, 0.1)'
        }
    }
}))

const TitleBar = (props:any) => {
    
    const classes = useStyles(props);
    return (
        <Box display={'flex'} className={clsx(
            {
                [classes.titleBar]: props.isEditMode,
                [classes.grabHandle]: props.isEditMode,
                [classes.hide]: !props.isEditMode
            }
        )} >
                <Box flexGrow={1} component="span" style={{paddingLeft:'4px'}}>
                    <Typography variant="subtitle2" color='textPrimary' >Title</Typography>
                </Box>
                <Box>
                    <IconButton size='small' onClick={props.onClose}>
                        <Close fontSize='small' color="secondary"></Close>
                    </IconButton>
                </Box>
        </Box>
    )
}

type CustomWindowProps = {
    uid: string,
    children:any
} 

const CustomWindow = (props:CustomWindowProps) => {
    const dispatch = useAppDispatch();
    const windowMgr = useAppSelector(selectWindowMgr);
    const uid = props.uid;
    const window = windowMgr.windows[uid];
    let styleProps = {
        window,
        isEnabled: windowMgr.isEnabled
    }
    let classes = useStyles(styleProps);
    const toggleVisibility = (v:boolean) => {
        dispatch(setHiddenState({uid, isHidden: window ? !window.isHidden : false}));
    }

    useEffect(() => {
        dispatch(addWindow({uid}));
        return () => {
            dispatch(removeWindow({uid}));
        }
    },[])

    return (
        <>
            <ClickAwayListener onClickAway={() => dispatch(setEditMode({uid,isEdit:false}))}>
            <Rnd 
            className={clsx( classes.overflow,
                {   [classes.edit]: !window?.isHidden && window?.isEditMode,
                    [classes.view]: !window?.isHidden && !window?.isEditMode,
                    [classes.hide]: window?.isHidden
                })} 
            style = {!window?.isEditMode ? {userSelect:'none'}: {}}
            default={{x:100,y:100,width:300,height:300}}
            bounds="parent" 
            onDoubleClick = {() => dispatch(setEditMode({uid,isEdit:true}))}
            enableResizing={window?.isEditMode}
            dragHandleClassName={`${classes.grabHandle}`}
            >
             <TitleBar onClose = {toggleVisibility} isEditMode={window?.isEditMode}></TitleBar>
             {props.children}
            </Rnd>
            </ClickAwayListener>
        </>
    )
}

export default CustomWindow

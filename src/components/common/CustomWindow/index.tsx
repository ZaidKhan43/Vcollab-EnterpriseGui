import { Box, IconButton, Typography, ClickAwayListener } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useCallback, useState } from 'react'
import { Rnd } from 'react-rnd'
import { useResizeDetector } from 'react-resize-detector';
import clsx from 'clsx'
import { selectWindowMgr, addWindow, removeWindow, setEditMode, setHiddenState, setWindowAccess} from '../../../store/windowMgrSlice'
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";


const useStyles = makeStyles(theme => createStyles({
    titleBar:{
        alignItems: 'center',
        background: theme.palette.background.paper
    },
    grabHandle:{
        cursor: "grab",
        maxHeight: theme.spacing(3)
    },
    edit: {
        border: "solid 1px #ddd",
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

type TitleProps = {
    title: string,
    isEditMode: boolean,
    onClose: (e:any) => void
}
const TitleBar = (props:TitleProps) => {
    
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
                    <Typography variant="subtitle2" color='textPrimary' >{props.title}</Typography>
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
    title?: string,
    width?: number,
    height?: number,
    parentRef: React.MutableRefObject<null | HTMLDivElement>,
    children:any
} 

const CustomWindow = (props:CustomWindowProps) => {
    const dispatch = useAppDispatch();
    const windowMgr = useAppSelector(selectWindowMgr);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width, setWidth] = useState(props.width || 300);
    const [height, setHeight] = useState(props.height || 300);
    const uid = props.uid;
    const [title, setTitle] = useState(props.title || uid);
    const window = windowMgr.windows[uid];
    const windowRef = useRef(null);

    const onResize = useCallback((width ?:number, height ?: number) => {
     if(windowRef.current)
        {
            const windowEl = windowRef.current as any;
            console.log(windowEl.updateOffsetFromParent());
        }
        
      }, [ dispatch, props.parentRef]);

    useResizeDetector({ 
        refreshMode: 'debounce',
        refreshRate: 400,
        refreshOptions :{trailing : true, leading : false },
        onResize,
        targetRef: props.parentRef
      });
    
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
            ref = {windowRef}
            className={clsx( classes.overflow,
                {   [classes.edit]: !window?.isHidden && window?.isEditMode,
                    [classes.view]: !window?.isHidden && !window?.isEditMode,
                    [classes.hide]: window?.isHidden
                })} 
            style = {!window?.isEditMode ? {userSelect:'none'}: {}}
            bounds="parent" 
            onDoubleClick = {() => dispatch(setEditMode({uid,isEdit:true}))}
            enableResizing={window?.isEditMode}
            dragHandleClassName={`${classes.grabHandle}`}
            size={{ width,  height }}
            position={{ x, y}}
            onDragStop={(e, d) => {
                setX(d.x); setY(d.y); 
             }}
            onResize={(e, direction, ref, delta, position) => {
                setWidth(ref.offsetWidth);
                setHeight(ref.offsetHeight);
                setX(position.x );
                setY(position.y );
            }}
            >
             <TitleBar title={title} onClose = {toggleVisibility} isEditMode={window?.isEditMode}></TitleBar>
             {props.children}
            </Rnd>
            </ClickAwayListener>
        </>
    )
}

export default CustomWindow

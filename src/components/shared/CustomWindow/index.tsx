import { Grid, IconButton, Typography, ClickAwayListener } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { Rnd } from 'react-rnd'
import { useResizeDetector } from 'react-resize-detector';
import clsx from 'clsx'
import { selectWindowMgr, selectWindowAnchor,addWindow, removeWindow, setEditMode, setHiddenState, setWindowSize,setWindowAccess, setWindowPos, selectWindowXY, setWindowAnchor} from '../../../store/windowMgrSlice'
import {useAppSelector, useAppDispatch} from "../../../store/storeHooks";
import { vec2, vec3 } from 'gl-matrix';


const findNearestQuadrant = (parentSize:[number,number], winXy:[number,number], winSize:[number,number]):string => {
    let c = vec2.fromValues(parentSize[0]/2,parentSize[1]/2);
    let topLeft = vec2.fromValues(winXy[0],winXy[1]);
    let topRight =  vec2.fromValues(winXy[0]+winSize[0],winXy[1]);
    let btmLeft = vec2.fromValues(winXy[0],winXy[1]+winSize[1]);
    let btmRight = vec2.fromValues(winXy[0]+winSize[0],winXy[1]+winSize[1]);
    let quadrants = [];

    quadrants.push({id:'q1',val:vec2.sqrDist(c,topLeft)});
    quadrants.push({id:'q2',val:vec2.sqrDist(c,topRight)});
    quadrants.push({id:'q3',val:vec2.sqrDist(c,btmLeft)});
    quadrants.push({id:'q4',val:vec2.sqrDist(c,btmRight)});

    quadrants.sort((a,b) => b.val-a.val);
    return quadrants[0].id;

}
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
    height: number,
    onClose: (e:any) => void
}
const TitleBar = React.forwardRef((props:TitleProps, ref) => {
    
    const classes = useStyles(props);
    return (
        <Grid container justify="space-between" alignItems="center" innerRef={ref} className={clsx(
            {
                [classes.titleBar]: props.isEditMode,
                [classes.grabHandle]: props.isEditMode,
                [classes.hide]: !props.isEditMode
            }
        )} >
                <Grid item xs zeroMinWidth style={{paddingLeft:'4px'}}>
                    <Typography noWrap variant="subtitle2" color='textPrimary' >{props.title}</Typography>
                </Grid>
                <Grid item justify="flex-end" >
                    <IconButton size='small' onClick={props.onClose}>
                        <Close fontSize='small' color="secondary"></Close>
                    </IconButton>
                </Grid>
        </Grid>
    )
});


type CustomWindowProps = {
    uid: string,
    title?: string,
    width?: number,
    height?: number,
    resize?:boolean,
    anchor?:[number,number],
    onClickOutside?: (uid:string) => void,
    parentRef: React.MutableRefObject<null | HTMLDivElement>,
    children: JSX.Element | null
} 

const CustomWindow = (props:CustomWindowProps) => {
    const dispatch = useAppDispatch();
    const windowMgr = useAppSelector(selectWindowMgr);
    const uid = props.uid;
    const [title, setTitle] = useState(props.title || uid);
    const [titleBarHeight, setTitleBarHeight] = useState(0);
    const window = windowMgr.windows[uid];
    const pos = useAppSelector(state => selectWindowXY(state,uid));
    const anchor = useAppSelector(state => selectWindowAnchor(state,uid));
    const [width, height] = window ? window.size : [300,300];
    const [parentSize, setParentSize] = useState<number[]>([])
    const windowRef = useRef<any>(null);
    const titleBarRef = useRef<HTMLDivElement | null>(null);

    const onResize = (newWidth ?:number, newHeight ?: number) => {
     if(windowRef.current && newWidth && newHeight && pos[0] !== -1 && pos[1] !== -1)
        {
            const windowEl = windowRef.current as any;
            if(parentSize) {
                
                let xNorm = (pos[0] + anchor[0])/parentSize[0];
                let yNorm = (pos[1] + anchor[1])/parentSize[1];
                dispatch(setWindowPos({uid,pos:[xNorm*newWidth-anchor[0],yNorm*newHeight-anchor[1]]}))

                windowEl.updateOffsetFromParent();
                setParentSize([newWidth,newHeight])
            }
        }
        
    }

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
        console.log(`window ${uid} mounted`);
        dispatch(addWindow({uid}));
        dispatch(setWindowPos({uid,pos:[0,0]}))
        if(props.parentRef.current)
        setParentSize([props.parentRef.current.clientWidth,props.parentRef.current.clientHeight]);
        
        if(props.width && props.height)
        dispatch(setWindowSize({uid,size:[props.width,props.height]}))
        else if(windowRef.current)
            dispatch(setWindowSize({uid,size:[windowRef.current.clientWidth, windowRef.current.clientHeight]}))
        return () => {
            dispatch(removeWindow({uid}));
        }
    },[])

    useLayoutEffect(() => {
        if(titleBarRef.current) {
            setTitleBarHeight(titleBarRef.current.clientHeight);
            console.log(titleBarHeight)
        }
    },[titleBarRef.current, window?.isEditMode])

    return (
        <>
            <ClickAwayListener onClickAway={
                (e:any) => {
                    if(e.target.id.includes('_vct-viewer-'))  
                    {
                        if(props.onClickOutside)
                        props.onClickOutside(uid);
                        dispatch(setEditMode({uid,isEdit:false}))
                    }
                }
            }
            >
            <Rnd 
            ref = {windowRef}
            className={clsx( classes.overflow,
                {   [classes.edit]: !window?.isHidden && window?.isEditMode,
                    [classes.view]: !window?.isHidden && !window?.isEditMode,
                    [classes.hide]: window?.isHidden
                })} 
            style = {!window?.isEditMode ? {userSelect:'none'}: {}}
            bounds="parent" 
            //onDoubleClick = {() => dispatch(setEditMode({uid,isEdit:true}))}
            enableResizing={window?.isEditMode && props.resize ? props.resize : false}
            dragHandleClassName={`${classes.grabHandle}`}
            size= {props.width ?{ width,  height: height + titleBarHeight} : undefined}
            position={{ x: pos[0], y: pos[1]}}
            onDragStop={(e, d) => {
                let q = findNearestQuadrant(parentSize as [number,number],[d.x,d.y] as [number,number],[width,height]);
                let anchor:[number,number] = [0,0];
                switch (q) {
                    case 'q1':
                        anchor = [0,0]
                        break;
                    case 'q2':
                        anchor = [width,0]
                        break;
                    case 'q3':
                        anchor = [0,height]
                        break;
                    case 'q4':
                        anchor = [width,height]
                        break;
                    default:
                        break;
                }
                dispatch(setWindowAnchor({uid,anchor}));
                dispatch(setWindowPos({uid,pos:[d.x,d.y]}))
             }}
            onResizeStop={(e, direction, ref, delta, position) => {
                dispatch(setWindowSize({uid,size:[ref.offsetWidth,ref.offsetHeight - titleBarHeight]}))
                dispatch(setWindowPos({uid,pos:[position.x,position.y]}))
            }}
            >
             {
                 window?.isEditMode ?
                <TitleBar ref={titleBarRef} title={title} height={titleBarHeight} onClose = {toggleVisibility} isEditMode={window?.isEditMode}></TitleBar>
                :null
             }
             
             {
               props.children
             }
            </Rnd>
            </ClickAwayListener>
        </>
    )
}

export default CustomWindow

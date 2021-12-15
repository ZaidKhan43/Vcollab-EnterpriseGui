import React,{useRef,useEffect, memo} from 'react'
import { Label3D as ILabel3D } from '../../../../store/sideBar/labelSlice/shared'
import { useAppDispatch, useAppSelector} from '../../../../store/storeHooks'
import { selectWindowMgr, setWindowSize } from '../../../../store/windowMgrSlice';
import Label3DWindow from './Label3DWindow';
import LabelMsg from './LabelMsg';
import LabelAnchor from './LabelAnchor';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';

type Label3DProps = {
    label:ILabel3D,
    windowPrefixId:string,
    setLabelPosReducer: ActionCreatorWithPayload<{
        id: string;
        pos: [number, number];
        anchor: [number, number];
    }, string>,
    parentRef: any
}

function Label3D(props:Label3DProps) {
    const startRef = useRef<any | null>(null);
    const endRef = useRef<any | null>(null);
    const childRef = useRef<any | null>(null);
    const dispatch = useAppDispatch();
    const handleWindowDrag = (e:any,data:any) => {
        console.log("drag",data);
        let l = props.label;
        let a = l.anchor;
        let newPos:[number,number] = [Math.max(0,l.pos[0] + data.deltaX),Math.max(0,l.pos[1]+data.deltaY)];
        dispatch(props.setLabelPosReducer({id: l.id,pos:newPos, anchor:a}));
    }
    const handleWindowDragStop = (x:number,y:number) => {
        let l = props.label;
        let a = l.anchor;
        console.log("drag Stop",x,y);
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y], anchor:a}));
    }
    const handleWindowResize = () => {
        console.log("resize");
    }
    const handleWindowResizeStop = (x:number,y:number) => {
        let l = props.label;
        let a = l.anchor;
        console.log("resize stop",x,y);
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y], anchor:a}));
    }
    useEffect(() => {
        if(childRef.current) {
            const div = childRef.current as HTMLDivElement;
            dispatch(setWindowSize({uid:props.windowPrefixId+props.label.id, size:[div.clientWidth,div.clientHeight]}));
        }
    },[childRef])
    
    const label = props.label;
    return (
        label.state.visibility ?
        < >
            <LabelAnchor ref={startRef} pos={label.anchor}/>
                <Label3DWindow
                ref={endRef} 
                uid={props.windowPrefixId+label.id} 
                width={childRef?.current?.clientWidth | 0} 
                height={childRef?.current?.clientHeight | 0} 
                resize 
                parentRef={props.parentRef}
                label={label}
                xy={label.pos}
                setLabelPosReducer={props.setLabelPosReducer}
                onDrag={handleWindowDrag}
                onDragStop={handleWindowDragStop}
                onResize={handleWindowResize}
                onResizeStop={handleWindowResizeStop}
                >
                    <LabelMsg ref={childRef} msg={label.label}/>
                </Label3DWindow>
                <Xarrow 
                start={startRef} 
                end={endRef} 
                path={'straight'} 
                strokeWidth={2}
                color={'black'}
                tailColor={'yellow'}
                showHead={false} 
                showTail={false}/>
        </>
        :null
    )
}

export default Label3D

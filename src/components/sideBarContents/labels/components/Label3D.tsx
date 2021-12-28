import React,{useRef,useEffect, memo} from 'react'
import { ILabel2D as ILabel3D } from '../../../../store/sideBar/labelSlice/shared/types'
import { useAppDispatch, useAppSelector} from '../../../../store/storeHooks'
import { Layers, selectWindowMgr, setWindowSize } from '../../../../store/windowMgrSlice';
import Window from 'components/shared/CustomWindow';
import LabelMsg from './shared/LabelMsg';
import LabelAnchor from './shared/LabelAnchor';
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
    parentRef: any,
    layerId:Layers
}

function Label3D(props:Label3DProps) {
    const startRef = useRef<any | null>(null);
    const endRef = useRef<any | null>(null);
    const childRef = useRef<any | null>(null);
    const dispatch = useAppDispatch();
    const updateArrow = useXarrow();
    const handleWindowDrag = (e:any,data:any) => {
        console.log("drag",data);
        let l = props.label;
        let a = l.anchor;
        let newPos:[number,number] = [Math.max(0,l.pos[0] + data.deltaX),Math.max(0,l.pos[1]+data.deltaY)];
        dispatch(props.setLabelPosReducer({id: l.id,pos:newPos, anchor:a}));
        //updateArrow();
    }
    const handleWindowDragStop = (x:number,y:number) => {
        let l = props.label;
        let a = l.anchor;
        console.log("drag Stop",x,y);
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y], anchor:a}));
        //updateArrow();
    }
    const handleWindowResize = () => {
        console.log("resize");
        //updateArrow();
    }
    const handleWindowResizeStop = (x:number,y:number) => {
        let l = props.label;
        let a = l.anchor;
        console.log("resize stop",x,y);
        dispatch(props.setLabelPosReducer({id: l.id,pos:[x,y], anchor:a}));
        //updateArrow();
    }
    useEffect(() => {
        if(childRef.current) {
            const div = childRef.current as HTMLDivElement;
            dispatch(setWindowSize({uid:props.windowPrefixId+props.label.id, size:[div.clientWidth,div.clientHeight]}));
        }
    },[childRef])
    useEffect(() => {
        //updateArrow();
    },[props.label.anchor,props.label.pos])
    const label = props.label;
    return (
        
        < >
            <LabelAnchor ref={startRef} pos={label.anchor} visible={label.state.visibility ? true :false} />
                <Window
                layer={props.layerId}
                ref={endRef} 
                uid={props.windowPrefixId+label.id} 
                visible={label.state.visibility ? true : false}
                width={childRef?.current?.clientWidth | 0} 
                height={childRef?.current?.clientHeight | 0} 
                resize 
                parentRef={props.parentRef}
                xy={label.pos}
                onDrag={handleWindowDrag}
                onDragStop={handleWindowDragStop}
                onResize={handleWindowResize}
                onResizeStop={handleWindowResizeStop}
                autoPositionOnResize = {false}
                >
                    <LabelMsg ref={childRef} msg={label.label}/>
                </Window>
                <Xarrow 
                zIndex={0}
                start={startRef} 
                showXarrow={label.state.visibility}
                end={endRef} 
                path={'straight'} 
                strokeWidth={2}
                color={'black'}
                tailColor={'yellow'}
                showHead={false} 
                showTail={false}/>
        </>
    )
}

export default Label3D

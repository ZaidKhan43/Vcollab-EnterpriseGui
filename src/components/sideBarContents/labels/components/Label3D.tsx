import React,{useRef,useEffect, memo} from 'react'
import { Label3D as ILabel3D } from '../../../../store/sideBar/labelSlice/shared'
import { useAppDispatch} from '../../../../store/storeHooks'
import { setWindowSize } from '../../../../store/windowMgrSlice';
import LabelMsg from './LabelMsg';
import LabelAnchor from './LabelAnchor';
import CustomWindow from '../../../shared/CustomWindow';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import { AnyAction } from 'redux';
type Label3DProps = {
    label:ILabel3D,
    windowPrefixId:string,
    setLabelPosReducer: (payload:{id:string, pos:[number,number], anchor:[number,number]}) => AnyAction;
    parentRef: any
}

function Label3D(props:Label3DProps) {
    const startRef = useRef<any | null>(null);
    const endRef = useRef<any | null>(null);
    const childRef = useRef<any | null>(null);
    const updateArrow = useXarrow();
    const dispatch = useAppDispatch();
    const handleWindowDrag = (e:any,data:any) => {
        updateArrow();
        let l = props.label;
        let a = l.anchor;
        
        dispatch(props.setLabelPosReducer({id: l.id,pos:[data.x,data.y], anchor:a}));
        
    }
    const handleWindowResize = () => {
        updateArrow();
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
            {console.log("rendering label",label.id)}
            <Xwrapper key={label.id}>
            <LabelAnchor ref={startRef} pos={label.anchor}/>
            
               <CustomWindow 
               ref={endRef} 
               uid={props.windowPrefixId+label.id} 
               width={childRef?.current?.clientWidth | 0} 
               height={childRef?.current?.clientHeight | 0} 
               resize 
               parentRef={props.parentRef} 
               onDrag={handleWindowDrag}
               onResize={handleWindowResize}
               xy={label.pos}>
                    <LabelMsg ref={childRef} msg={label.label}/>
                </CustomWindow>
                <Xarrow 
                start={startRef} 
                end={endRef} 
                path={'straight'} 
                strokeWidth={2}
                color={'black'}
                tailColor={'yellow'}
                showHead={false} 
                showTail={false}/>
            </Xwrapper>
        </>
        :null
    )
}

export default memo(Label3D)

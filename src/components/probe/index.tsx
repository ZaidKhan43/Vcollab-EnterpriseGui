import ProbeLabel from './probeLabel';
import { fetchProbeData, update, PointerData } from '../../store/probeSlice';
import { useAppSelector, useAppDispatch } from '../../store/storeHooks';
import { useCallback, useEffect, useRef } from 'react';

export default function Probe (props:{containerRef:React.RefObject<HTMLDivElement>}){

  const dispatch = useAppDispatch();  
  const isEnabled = useAppSelector((state) => state.probe.enabled)
  const showLabel = useAppSelector((state) => state.probe.showLabel)
  const timerRef = useRef<any>(null);
  const timeoutRef = useRef<any>(useAppSelector((state) => state.probe.timeout));
  const getPostion = useCallback((e : MouseEvent) => {
      if(timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(
        function() {
          let guiPos = {x:e.clientX,y:e.clientY};
          let container = e.target as HTMLDivElement;
          let rect = container.getBoundingClientRect();
          let pointerData:PointerData = {
            xyFromTop: [ e.clientX - rect.left,
              e.clientY - rect.top],
            width: rect.width,
            height: rect.height
          }
          let start = performance.now();
          dispatch(fetchProbeData({pointerData}))
          let end = performance.now();
          let time = end - start;
          //alert(`dispatch time ${time} ms`);
          dispatch(update({position:guiPos}));
        }, timeoutRef.current
      )

  },[])

  useEffect(() => {
      if(props.containerRef.current){
        if(isEnabled) {
          props.containerRef.current.addEventListener('mousemove', getPostion);
        }
        else if(props.containerRef.current.removeEventListener){
          props.containerRef.current.removeEventListener('mousemove', getPostion);
        }
      }
  },[props.containerRef.current, isEnabled]) 

return(
  <>
    { showLabel ? <ProbeLabel /> : null }
  </>
  
)

}
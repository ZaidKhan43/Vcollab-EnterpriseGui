import ProbeLabel from './probeLabel';
import { positionUpdate } from '../../store/probeSlice';
import { useAppSelector, useAppDispatch } from '../../store/storeHooks';

export default function Probe (){

  const dispatch = useAppDispatch();  
  const showFlag = useAppSelector((state) => state.probe.showFlag)

  const getPostion = (e : any) => {
    if(showFlag){
      const positions = {x : e.clientX, y : e.clientY}
      dispatch(positionUpdate(positions));
    }
  }

return(
  <div onMouseMove={ getPostion} style={{width:"100%"}}>
    <ProbeLabel />
  </div>
  
)

}
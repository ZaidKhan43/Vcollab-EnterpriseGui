import {useCallback, useState} from 'react'
import { useResizeDetector } from 'react-resize-detector';
function useContainer(targetRef:React.MutableRefObject<null>, deps:any[] ) {
    const [refWidth, setRefWidth] = useState(0);
    const [refHeight, setRefHeight] = useState(0);
    const onResize = useCallback((width ?:number, height ?: number) => {
        if(width)
        setRefWidth(width);
        if(height)
        setRefHeight(height)
      }, [refWidth,refHeight,...deps]);
    
      useResizeDetector({ 
        refreshMode: 'debounce',
        refreshRate: 400,
        refreshOptions :{trailing : true, leading : false },
        onResize,
        targetRef
      });
    return [refWidth, refHeight]
    
}

export default useContainer

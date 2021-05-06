import {useCallback, useState} from 'react'
import { useResizeDetector } from 'react-resize-detector';
function useContainer(targetRef:React.MutableRefObject<null>, deps:any[] ) {
  const { width, height } = useResizeDetector({ targetRef });
  return [width,height];
}

export default useContainer

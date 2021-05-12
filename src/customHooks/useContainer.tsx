import {useState,useEffect,useRef} from 'react'

function useContainer() {
    const [containerHeight, setContainerHeight] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(containerRef?.current)
        {
            setContainerHeight(containerRef.current.clientHeight);
        }
      }, [containerRef.current?.clientHeight])

    return {containerRef, containerHeight };
}

export default useContainer

import {useState,useLayoutEffect} from 'react'

function useLoadCss(path:string) {
    const [RTreeStylePath, setRTreeStylePath] = useState('')
   useLayoutEffect(() => {
        setRTreeStylePath(path);
      }, [])
   useLayoutEffect(() => {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = process.env.PUBLIC_URL + RTreeStylePath;

    head.appendChild(link);

    return () => { head.removeChild(link); }
    }, [RTreeStylePath])
    return setRTreeStylePath
}

export default useLoadCss

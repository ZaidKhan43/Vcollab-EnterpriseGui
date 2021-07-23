import { SketchPicker } from 'react-color';

interface ColorPickerProps {
    color : {
        r:number,
        g:number,
        b:number,
        a:number,
    },
    onChangeComplete : () => {},
}

export default function ColorPicker(props : ColorPickerProps) {
    return(
        <SketchPicker  
               {...props}   
               presetColors={[]}
               disableAlpha ={true}                 
        />
    )
}
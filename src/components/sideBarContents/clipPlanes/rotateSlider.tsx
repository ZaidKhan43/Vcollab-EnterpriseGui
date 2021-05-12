// import MuiInput from '@material-ui/core/Input';
import NumericInput from '../../common/numericInput'
// import NumericInput from 'react-numeric-input';
import CircularSlider from '@fseehawer/react-circular-slider';
import MuiTypgraphy from '@material-ui/core/Typography';
import styles from './style';
import React, { useState, useEffect } from "react";

export default function RotateSlider( props : any ){

    const [value, setValue] = useState(props.value)

    const classes = styles();

    useEffect(() => {
        setValue(props.value)
      },[props.value]);

    const onChangeHandle = (value: any) => {
       setValue(value)

       if(Math.round(props.value) !== value)
        props.functionOne(props.setFunction, value)
       
    }
    
console.log(value)
    return(
        <div className={classes.rotate}>
            <CircularSlider 
                dataIndex={Math.round(value)}
                width={90}
                knobRadius={10}
                progressWidth={20}
                direction={-1}
                circleWidth={3}
                max={359.9}
                knobPosition= "right"
                knobColor="currentColor"
                trackColor = 'currentColor' 
                knobSize={24}
                progressColorFrom="#8C8BFF"
                progressColorTo="#8C8BFF"
                tooltipColor="#6ab6e1"
                showTooltip={true}
                tooltipSize={26}
                onChange={onChangeHandle}
                renderLabelValue ={
                    <div className={classes.circularSlider}>
                        <NumericInput style={{input:{ fontSize:"12px",},}}
                        className={classes.clicularSliderInputOne}
                        format={() => props.value + "°"}
                        value={props.value}
                        precision={4}
                        min={0.0}
                        max={359.9}
                        mobile={false}
                        onChange={props.functionTwo}
                        // classes={classes.button}
                        />
                        {/* <div onClick={() => onHandleClick("Sub")}>-</div> */}
                    </div>
                }
            />
            
            <MuiTypgraphy className={classes.caption}  noWrap>{props.label}</MuiTypgraphy>
        </div>
    )
}
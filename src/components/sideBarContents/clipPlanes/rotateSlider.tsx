// import MuiInput from '@material-ui/core/Input';
import NumericInput from 'react-numeric-input';
// import NumericInput from 'react-numeric-input';
import CircularSlider from '@fseehawer/react-circular-slider';
import MuiTypgraphy from '@material-ui/core/Typography';
import styles from './style';
//import React, { useState, useEffect } from "react";

import MuiPlusIcon from '@material-ui/icons/Add';
import MuiMinusIcon from '@material-ui/icons/Remove';

import MuiIconButton from '@material-ui/core/IconButton';
//import { ClassRounded } from '@material-ui/icons';

export default function RotateSlider( props : any ){

    // const [value, setValue] = useState(props.value)

    const classes = styles();

    // useEffect(() => {
    //     setValue(props.value)
    //   },[props.value]);

    const onChangeHandle = (value: any) => {
       const valueOne = value;
       if(Math.round(props.value) !== valueOne)
        props.handleChange(value)
    }

    const onChangeHandleOne = (value: any) => {
        props.handleChange(value)
    }
//console.log(value)
    return(
        <div className={classes.rotate}>
            <CircularSlider 
                knobDraggable={props.disable === false  && true}
                dataIndex={Math.round(props.value)}
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
                        <MuiIconButton disabled={props.disable} style={{ width: 10, height: 10}} onClick={() => props.value < 359 ? onChangeHandle(props.value + 1) : onChangeHandle(0)} ><MuiPlusIcon className={`${classes.circularSliderButton} + ${props.disable && classes.disabledButton}`}/></MuiIconButton>
                        <NumericInput
                        readOnly={props.disable}
                        noStyle
                        className={`${classes.cicularSliderInput} + ${props.disable && classes.disabled}`}
                        format={() => props.value + "°"}
                        value={props.value}
                        precision={4}
                        min={0.0}
                        max={359.9}
                        mobile={false}
                        onChange={onChangeHandleOne}
                        />
                         <MuiIconButton disabled={props.disable} style={{ width: 10, height: 10}} onClick={() => props.value > 0 ? onChangeHandle(props.value - 1) : onChangeHandle(359)}><MuiMinusIcon   className={`${classes.circularSliderButton} + ${props.disable && classes.disabledButton }`}/></MuiIconButton>
                    </div>
                }
            />
            
            <MuiTypgraphy className={classes.caption}  noWrap>{props.label}</MuiTypgraphy>
        </div>
    )
}
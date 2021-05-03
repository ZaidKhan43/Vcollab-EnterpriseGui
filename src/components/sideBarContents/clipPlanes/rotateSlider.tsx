import Input from '@material-ui/core/Input';
import NumericInput from '../../common/numericInput'
// import NumericInput from 'react-numeric-input';
import CircularSlider from '@fseehawer/react-circular-slider';
import Typography from '@material-ui/core/Typography';
import styles from './style';
import React, { useState, useEffect } from "react";

export default function RotateSlider( props : any ){

    const [value,setValue] = useState(props.value);
    const [valueOne, setValueOne] = useState(value)
    const classes = styles();

    const onChangeHandle = (value: any) => {
        setValueOne(parseFloat(value))
        if(Math.round(value) !== valueOne)
            setValue(valueOne)
        props.functionOne(props.setFunction, valueOne)
    }

    const functionTwo = (value: any) => {
        if(value > 359.99)
            value = 359 
        setValue(value)
        setValueOne(value)
        props.functionTwo(value)
    } 
    // const onHandleClick = (toDo : any) => {
    //     if(toDo === "Add"){
    //         if(value == 359){
    //             setValue(0)
    //         }
    //         else
    //         setValue(value + 1)
    //     }
    //     if(toDo === "Sub"){
    //         setValue(value - 1)
    //     }
    // }

    // const onEdit = (e : any) => {
    //     setValue(e.target.value)
    // }
    

    return(
        <div>
            <CircularSlider
                dataIndex={valueOne}
                width={90}
                knobRadius={10}
                progressWidth={20}
                direction={-1}
                circleWidth={3}
                max={359.9}
                knobPosition= "right"
                knobColor="#8C8BFF"
                trackColor = '#DDDEFB' 
                knobSize={24}
                tooltipColor="#6ab6e1"
                showTooltip={true}
                tooltipSize={26}
                onChange={onChangeHandle}
                renderLabelValue ={
                    <div className={classes.circularSlider}>
                        <NumericInput style={{input:{ fontSize:"12px",},}}
                        className={classes.clicularSliderInputOne}
                        format={() => value + "°"}
                        value={value}
                        precision={4}
                        min={0.0}
                        max={359.9}
                        mobile={false}
                        onChange={functionTwo}
                        classes={classes.button}
                        />
                        {/* <div onClick={() => onHandleClick("Sub")}>-</div> */}
                    </div>
                }
            />
            
            <Typography className={classes.caption}  noWrap>{props.label}</Typography>
        </div>
    )
}
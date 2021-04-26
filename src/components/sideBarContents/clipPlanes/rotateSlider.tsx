import Input from '@material-ui/core/Input';
import NumericInput from '../../common/numericInput'
// import NumericInput from 'react-numeric-input';
import CircularSlider from '@fseehawer/react-circular-slider';
import Typography from '@material-ui/core/Typography';
import styles from './style';
import React, { useState, useEffect } from "react";

export default function RotateSlider( props : any ){

    const [value,setValue] = useState(props.value);
    const classes = styles();

    const onChangeHandle = (value: any) => {
        setValue(value)
        props.functionOne(props.setFunction, value)
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
                dataIndex={props.value}
                width={90}
                knobRadius={10}
                progressWidth={20}
                direction={-1}
                circleWidth={3}
                max={359.9}
                knobPosition= "right"
                knobColor="#ffffff"
                knobSize={24}
                tooltipColor="#6ab6e1"
                showTooltip={true}
                tooltipSize={26}
                onChange={ (value : any) => onChangeHandle(value)}
                renderLabelValue ={
                    <div className={classes.circularSlider}>
                        {/* <div onClick={() => onHandleClick("Add")} > + </div> */}
                        {/* <Input
                            style={{ color:"#DFDEDE",paddingLeft:"20%",
                            paddingTop:"10%",
                            width:"70%",
                            left:"0%",
                            top:"15%",bottom:"-20%",
                            fontSize:"8px",
                            zIndex: 10,
                            border: "1px solid #DFDEDE",
                        }}    
                            value={value}
                            margin="dense"
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: 359,
                                // type:"number",
                               
                                'aria-labelledby': 'input-slider', 
                            }}
                            onChange={onEdit}
                        /> */}


                        {/* <button onClick={() => console.log("hello")} > + </button> */}
                        <NumericInput style={{input:{color: "white", fontSize:"12px",background:"#353535",},}}
                        className={classes.clicularSliderInputOne}
                        format={() => props.value + "°"}
                        value={props.value}
                        precision={2}
                        min={0.0}
                        max={359.9}
                        mobile={false}
                        onChange={props.functionTwo}
                        />
                        {/* <div onClick={() => onHandleClick("Sub")}>-</div> */}
                    </div>
                }
            />
{/* 
      <NumericInput style={{input:{color: "white", fontSize:"12px",background:"#353535",},}}
                        className={classes.clicularSliderInputOne}
                        format={() => props.value + "°"}
                        value={props.value}
                        precision={2}
                        min={0.0}
                        max={359.9}
                        mobile={false}
                        onChange={props.functionTwo}
                        /> */}
            
            <Typography style={{fontSize:"14px"}}   noWrap>{props.label}</Typography>
        </div>
    )
}
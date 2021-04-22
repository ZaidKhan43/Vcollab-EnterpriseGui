import Input from '@material-ui/core/Input';
import CircularSlider from '@fseehawer/react-circular-slider';
import Typography from '@material-ui/core/Typography';
import styles from './style';

export default function RotateSlider( props : any ){

    const classes = styles();

    const onChangeHandle = (value: any) => {
        props.functionOne(props.setFunction, value)
    }
    return(
        <div>
            <CircularSlider
                dataIndex={props.value}
                width={90}
                knobRadius={10}
                progressWidth={20}
                direction={-1}
                circleWidth={3}
                max={359}
                knobPosition= "right"
                knobColor="#ffffff"
                knobSize={24}
                tooltipColor="#6ab6e1"
                showTooltip={true}
                tooltipSize={26}
                onChange={ (value : any) => onChangeHandle(value)}
                renderLabelValue ={
                    <div className={classes.circularSlider}>
                        <Input
                            className={classes.clicularSliderInput}
                            value={props.value}
                            margin="dense"
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: 359,
                                type:"number",
                                'aria-labelledby': 'input-slider', 
                            }}
                            onChange={props.functionTwo}
                        /> 
                    </div>
                }
            />
            <Typography style={{fontSize:"14px"}}   noWrap>{props.label}</Typography>
        </div>
    )
}
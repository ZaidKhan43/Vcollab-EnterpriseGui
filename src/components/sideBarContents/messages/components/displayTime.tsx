import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {useState} from 'react';

export default function DisplayTime(props:any){
    
    const [time,setTime] = useState<string>("Just now");
    const [interval, setInterval] = useState(1000)

    const changeTimeFinder = (date : Date) => {
        console.log("sda")
        let time : string;
        const now = moment(Date());
        const then = moment(date)
        const changeTime = now.diff(then,"seconds")
        if(changeTime < 60)
            time=`Just now`;
        else{
            setInterval(60000)
            let changeTimeMunite = Math.round(changeTime/60);
            if(changeTimeMunite < 60)
                time=`${changeTimeMunite} minutes ago`;
            else{
                setInterval(3600000)
                let changeTimeHours = Math.round(changeTimeMunite/60);
                if ( changeTimeHours < 24)
                    time=`${changeTimeHours} Hours ago`;
                else{
                    setInterval(86400000)
                    let changeTimeDays = Math.round(changeTimeMunite/24);
                    time=`${changeTimeDays} Days ago`
                }
            }
        } 
       setTime(time)
    }


    setTimeout( () => {
        changeTimeFinder(props.time)
      }, interval);

       
    return (
        <Typography variant="h3" align="left">
            {time}
        </Typography>
    )
}
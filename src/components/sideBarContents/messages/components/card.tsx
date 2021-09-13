import MuiGrid from '@material-ui/core/Grid';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiButton from '@material-ui/core/Button';
import MuiCancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import MuiCheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import moment from 'moment';
import {useState} from 'react';

export default function Card(props:any){
    const {item, handleCollapse, handlePause, handleCancel} = props;
    
    const changeTimeFinder = (date : Date) => {
        console.log("sda")
        let time : string;
        const now = moment(Date());
        const then = moment(date)
        const changeTime = now.diff(then,"seconds")
        if(changeTime < 60)
            time=`${changeTime} Seconds ago`;
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

    const [time,setTime] = useState<string>("Just now");
    const [interval, setInterval] = useState(1000)

    setTimeout( () => {
        changeTimeFinder(item.time)
      }, interval);

    const getIcon = () => {
    }

    const now = moment(Date());
    const then = moment(item.time)
    const changeTime = now.diff(then,"seconds")

    
       
return(
    
    <div >
        <MuiGrid container>
            <MuiGrid item xs={3}> </MuiGrid>
            <MuiGrid item xs={9} >
                <MuiGrid container>
                    <MuiGrid item  xs={9}>
                        <Typography variant="h3" align="left">
                            {time}
                        </Typography>
                    </MuiGrid>
                    <MuiGrid item>
                        <ExpandLess onClick={() => handleCollapse(item.id, true)}/>
                    </MuiGrid>
                </MuiGrid>        
            </MuiGrid>
        <MuiGrid item style={{marginTop:"10px"}}>
            <MuiGrid container>
                <MuiGrid item xs={4}>
                    {item.cancel 
                        ?
                            <div style={{marginLeft:"20px", marginRight:"15px"}}>
                                <MuiCancelOutlinedIcon  fontSize="large"/>
                            </div>
                        :
                            item.completed === false 
                                ?
                                    <Box position="relative" display="inline-flex">
                                        <CircularProgress variant="determinate" value={item.process} />
                                        <Box
                                            top={0}
                                            left={0}
                                            bottom={0}
                                            right={0}
                                            position="absolute"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Typography variant="caption" component="div" color="textSecondary">{`${item.process}%`}</Typography>
                                        </Box>
                                    </Box>
                                :
                                    <div style={{marginLeft:"20px", marginRight:"15px"}}>
                                        <MuiCheckCircleOutlineOutlinedIcon  fontSize="large"/>
                                    </div>
                        }
                    </MuiGrid>
                    <MuiGrid item xs={8}>
                        <MuiGrid container direction="column">
                            <MuiGrid item>
                                <Typography variant="h2" align="left">
                                    {item.card.title}
                                </Typography>
                            </MuiGrid>
                        </MuiGrid>
                            {item.card.data.cancel
                                ?
                                    null

                                :
                                    <MuiGrid container direction="column">
                                        <MuiGrid item  style={{marginTop:"10px"}}>
                                            {
                                                item.type===0 &&
                                                    <Typography variant="h3" align="left">
                                                        { item.completed 
                                                           ?
                                                                "4.0MB"
                                                            :
                                                                " 2.0MB / 4.0MB, 3 Sec Left"
                                                        }
                                                    </Typography>
                                            }
           
                                        </MuiGrid>
                                        {
                                            item.completed
                                                ?
                                                    null
                                                :
                                                    <MuiGrid item >
                                                        <MuiGrid container>
                                                            <MuiGrid item>
                                                                <MuiButton style={{width:"20%", fontSize:"12px"}}
                                                                    onClick={() => handlePause(item.id, item.card.data.pause)} 
                                                                    color="primary"
                                                                >
                                                            {item.card.data.pause ? "Continue" : "Pause"}
                                                        </MuiButton>
                                                    </MuiGrid>
                                                    <MuiGrid item>
                                                        <MuiButton style={{width:"20%", fontSize:"12px"}}
                                                            onClick={() => handleCancel(item.id)} 
                                                            color="primary"
                                                        >
                                                            Cancel
                                                        </MuiButton>
                                                    </MuiGrid>
                                                </MuiGrid>
                                            </MuiGrid>   
                                        }
                                    </MuiGrid> 
                                }
                            </MuiGrid>
                        </MuiGrid>
                    </MuiGrid>
                </MuiGrid>
            </div>
)
}
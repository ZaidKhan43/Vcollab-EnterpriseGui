import MuiGrid from '@material-ui/core/Grid';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiButton from '@material-ui/core/Button';
import MuiCancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import MuiCheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import MuiPauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import moment from 'moment';
import {useState} from 'react';
import ProcessIndicator from './processIndicator';

import {iconType, notificationType} from '../../../../store/sideBar/messageSlice';

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

    const fileSize = (size : number) => {
        if (size >= 1024) {
          const kbSize = size / 1024
          if (kbSize >= 1024) {
            const mbSize = kbSize / 1024
            if(mbSize >= 1024){
              const gbSize = mbSize / 1024;
              return `${ (Math.round(gbSize * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)} GB`
            }
            return `${ (Math.round(mbSize * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)} MB`
          }
          return `${Math.round(kbSize)} kB`
        }
        return `${size} B`
      }


    const [time,setTime] = useState<string>("Just now");
    const [interval, setInterval] = useState(1000)


    setTimeout( () => {
        changeTimeFinder(item.time)
      }, interval);


    const getIcon = () => {
        if(item.card.icon === iconType.COMPLETED)
            return(
                <div style={{marginLeft:"20px", marginRight:"15px"}}>
                    <MuiCheckCircleOutlineOutlinedIcon  fontSize="large"/>
                </div>
            )
            
        if(item.card.icon === iconType.APPLIED)
            return(
                <div style={{marginLeft:"20px", marginRight:"15px"}}>
                    <MuiCheckCircleOutlineOutlinedIcon  fontSize="large"/>
                </div>
            )
        
            if(item.card.icon === iconType.CANCELLED)
            return(
                <div style={{marginLeft:"20px", marginRight:"15px"}}>
                    <MuiCancelOutlinedIcon  fontSize="large"/>
                </div>
            )

            if(item.card.icon === iconType.PAUSE)
            return(
                <div style={{marginLeft:"20px", marginRight:"15px"}}>
                <MuiPauseCircleOutlineIcon  fontSize="large"/>
            </div>
            )
        
        if(item.card.icon === iconType.TRANSFERING)
        return(
            <ProcessIndicator process= {Math.round(item.card.data.transfferedSize / item.card.data.totalSize * 100)}/>
        )

    }

    const transferCard = () => {
        return(
            <MuiGrid container direction="column">
                <MuiGrid item  style={{marginTop:"10px"}}>
                    <Typography variant="h3" align="left">
                        { item.card.icon === iconType.COMPLETED 
                           ?
                                `${fileSize(item.card.data.transfferedSize)}`
                            :
                                `${fileSize(item.card.data.transfferedSize)} / ${fileSize(item.card.data.totalSize)}, ${item.card.data.timeLeft}`
                        }
                    </Typography>
                </MuiGrid>
                <MuiGrid item>
                    {   item.card.icon === iconType.COMPLETED 
                        ?
                            null
                        :
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
                        }
                    </MuiGrid>
                </MuiGrid>
            )
        }

    // const now = moment(Date());
    // const then = moment(item.time)
    // const changeTime = now.diff(then,"seconds")

    
       
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
                        {getIcon()}
                    </MuiGrid>
                    <MuiGrid item xs={8}>
                        <MuiGrid container direction="column">
                            <MuiGrid item>
                                <Typography variant="h2" align="left">
                                    {item.card.title}
                                </Typography>
                            </MuiGrid>
                        </MuiGrid>
                        <MuiGrid>
                        {
                            item.card.type === notificationType.NETWORK_TRANSFER_MESSAGE
                            ?
                            <span>
                            {transferCard()}
                            </span>
                            :
                            null
                        }
                        </MuiGrid>
                        </MuiGrid>
                        </MuiGrid>
                    </MuiGrid>
                </MuiGrid>
            </div>
)
}
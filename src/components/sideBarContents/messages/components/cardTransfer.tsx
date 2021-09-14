import MuiGrid from '@material-ui/core/Grid';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Typography from '@material-ui/core/Typography';
import MuiButton from '@material-ui/core/Button';
import MuiCancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import MuiCheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import MuiPauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import ProcessIndicator from './processIndicator';
import DisplayTime from './displayTime';

import {iconType} from '../../../../store/sideBar/messageSlice';
import styles from '../style';

export default function CardTransfer(props:any){
    const {item, handleCollapse, handlePause, handleCancel} = props;
    const classes = styles();
    
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

    const getIcon = () => {
        switch(item.card.icon){
            case(iconType.COMPLETED):
                return(
                    <div className={classes.transferIcon}>
                        <MuiCheckCircleOutlineOutlinedIcon  fontSize="large"/>
                    </div>
                )
            
            case(iconType.CANCELLED):
                return(
                    <div className={classes.transferIcon}>
                        <MuiCancelOutlinedIcon  fontSize="large"/>
                    </div>
                )
            
            case(iconType.PAUSE):
                return(
                    <div className={classes.transferIcon}>
                        <MuiPauseCircleOutlineIcon  fontSize="large"/>
                    </div>
                )
            
            case(iconType.TRANSFERING):
                return(
                    <ProcessIndicator process= {Math.round(item.card.data.transfferedSize / item.card.data.totalSize * 100)}/>
                )
        }    
    }

       
    return(
        <MuiGrid container>
            <MuiGrid item xs={3}> </MuiGrid>
            <MuiGrid item xs={9} >
                <MuiGrid container>
                    <MuiGrid item  xs={9}>
                        <Typography variant="h3" align="left">
                            <DisplayTime time={item.time}/>
                        </Typography>
                    </MuiGrid>
                    <MuiGrid item>
                        <ExpandLess onClick={() => handleCollapse(item.id, true)}/>
                    </MuiGrid>
                </MuiGrid>        
            </MuiGrid>
            <MuiGrid item className={classes.cardTopPadding}>
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
                        <MuiGrid item>
                            <MuiGrid container direction="column">
                                <MuiGrid item className={classes.cardTopPadding}>
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
                                                    <MuiButton className={classes.buttonStyle}
                                                        onClick={() => handlePause(item.id, item.card.data.pause)} 
                                                        color="primary"
                                                    >
                                                        {item.card.data.pause ? "Continue" : "Pause"}
                                                    </MuiButton>
                                                </MuiGrid>
                                                <MuiGrid item>
                                                    <MuiButton className={classes.buttonStyle}
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
                        </MuiGrid>
                    </MuiGrid>
                </MuiGrid>
            </MuiGrid>
        </MuiGrid>
    )
}
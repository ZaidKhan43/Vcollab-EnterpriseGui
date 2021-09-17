import MuiGrid from '@material-ui/core/Grid';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Typography from '@material-ui/core/Typography';
import MuiCheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import DisplayTime from './displayTime';
import styles from '../style';

export default function CardSimple(props:any){
    const {item, handleCollapse} = props;  
    const classes = styles();

    return(    
        <div>
            <MuiGrid container>
                <MuiGrid item xs={3}> </MuiGrid>
                <MuiGrid item xs={9} >
                    <MuiGrid container>
                        <MuiGrid item  xs={9}>
                            <DisplayTime time={item.time} />
                        </MuiGrid>
                        <MuiGrid item>
                            <ExpandLess onClick={() => handleCollapse(item.id, true)}/>
                        </MuiGrid>
                    </MuiGrid>        
                </MuiGrid>
                <MuiGrid item className={classes.cardTopPadding}>
                    <MuiGrid container>
                        <MuiGrid item xs={4}>
                            <div className={classes.simpleIcon}>
                                <MuiCheckCircleOutlineOutlinedIcon  fontSize="large"/>
                            </div>
                        </MuiGrid>
                        <MuiGrid item xs={8}>
                            <MuiGrid container direction="column">
                                <MuiGrid item className={classes.simpleCard}>
                                    <Typography variant="h2" align="left">
                                        {item.card.title}
                                    </Typography>
                                </MuiGrid>
                            </MuiGrid>
                        </MuiGrid>
                    </MuiGrid>
                </MuiGrid>
            </MuiGrid>
        </div>
    )
}
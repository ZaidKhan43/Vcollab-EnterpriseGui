import styles from './style';
import Grid from '@material-ui/core/Grid'
import Select from './utilComponents/SelectAction'

export default function SideBarHeader(props : any) {

  const classes = styles();

  const HeaderFirstRow = (props:any) => {
      return(
        <Grid container className={classes.header} alignItems='center'>
        <Grid item >
        {props.leftIcon ?
            <div className = {classes.leftIcon}>
                {props.leftIcon}
            </div>
            :null
        }
        </Grid>
        
        {props.content ?
        <Grid item className = {classes.content}>
                {props.content}
        </Grid>
            :null
        }
        <Grid item className={classes.rightContent}>
        {props.rightIcon ?
        <div className = {classes.rightIcon}>
            {props.rightIcon}
        </div>
        :null
        }
        </Grid>
    </Grid>
      )

  }

  const HeaderSecondRow = (props:any) => {
      return(
    <Grid container alignItems='center' className={classes.action}>
    { props.action ?
          <Grid item style={{width:'90%', margin:'auto', marginTop:'10px'}}>
              {props.action}
          </Grid>
          :null
    }
    </Grid>
    )
  }

  return (
      <Grid container direction='column' >
          <Grid item xs={12} alignItems='center' >
          <HeaderFirstRow {...props}/>
          </Grid>
          <Grid item xs={12}>
          <HeaderSecondRow {...props}/>
          </Grid>
      </Grid>
  );
}

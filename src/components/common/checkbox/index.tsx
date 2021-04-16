import {makeStyles, createStyles} from '@material-ui/core/styles';
import MUICheckBox from '@material-ui/core/Checkbox';

const useStyles = makeStyles( theme => 
  createStyles({
       root: {
         padding:0,
         paddingLeft: 5,
         paddingRight: 5
       }
  })
)
function Checkbox(props:any) {
  const classes = useStyles();
  return (
    <>
      <MUICheckBox 
            color='default'
            size='small'
            {...props}
            ></MUICheckBox>
    </>
  )
}

export default Checkbox

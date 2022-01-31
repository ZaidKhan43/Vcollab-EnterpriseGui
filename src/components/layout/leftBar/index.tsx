import React from 'react';
import LogoMini from 'assets/images/logoMini.svg'
import useStyles from './style';
import MuiIcon from '@material-ui/core/Icon'
import MuiGrid from '@material-ui/core/Grid'
function LeftBar() {
  const classes = useStyles();
  return (
  <div className={classes.root}>
      <MuiGrid container>
        <MuiGrid item>
        <MuiIcon>
            <img style={{paddingLeft: '2px', width:'40px', paddingTop: '15px'}} src={LogoMini} alt='VCollab Logo' />
        </MuiIcon>
        </MuiGrid>
        <MuiGrid item>
            
        </MuiGrid>
      </MuiGrid>
      

  </div>
  );
}

export default LeftBar;

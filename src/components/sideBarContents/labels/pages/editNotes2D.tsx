import MuiIconButton from '@material-ui/core/IconButton';
import {goBack} from 'connected-react-router/immutable';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';



import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import styles from './style';

import { useAppSelector, useAppDispatch} from '../../../../store/storeHooks';
import {selectedNote2D, editLabel} from '../../../../store/sideBar/labelSlice';

import MuiTextField from '@material-ui/core/TextField';
import MuiTypography from '@material-ui/core/Typography';
import MuiButton from '@material-ui/core/Button';

import {useState} from 'react';

export default function EditNotes2D(){

  const note2D = useAppSelector(selectedNote2D);
  const [labelText,setLabelText] = useState(note2D?note2D.label : "");

  const classes = styles();
  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleEdit = (e :any)=>{
    setLabelText(e.currentTarget.value)
  }

  const onHandleReset = () => {
    setLabelText(note2D?note2D.label : "");
  }

  const onHandleSave = () => {
    dispatch(editLabel({id: note2D ? note2D.id : -1, value: labelText}))
  }

  const getHeaderLeftIcon= () => {
    return (
     <MuiIconButton  onClick={() => onClickBackIcon()}><BackButton/></MuiIconButton> 
    );
  }

  const getHeaderRightIcon = () => {
    return (
      <div>
      </div>
    )
  }
    
  const getBody = () => {

    // console.log("selected",clickedValues)
    return (
      <div style={{marginTop:"20px", marginLeft:"10px"}}>
        <MuiTypography variant="h2" className={classes.pageCaption} noWrap>
          Label
        </MuiTypography>
        <MuiTextField
          style={{marginLeft:"-40px"}}
          id="filled-textarea"
          value={labelText}
          multiline
          variant="filled"
          onChange={onHandleEdit}
        />
      </div>
    )
  }


  const getFooter = () => {

    let change = false;
    if(note2D?.label !== labelText)
      change = true;

    return(
      <div className={classes.editPageFooter}>
        <MuiButton className={classes.saveButton}
          disabled={!change}
          autoFocus 
          onClick={onHandleSave}
          // color="primary"
        >
          Save
        </MuiButton>
     
        <MuiButton className={classes.resetButton}
            autoFocus 
            onClick={onHandleReset} 
            disabled={!change}
            // color="primary"
        >
          Reset
        </MuiButton>
      </div>
    ) 
  }

  return (
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ <Title text={`${note2D?.name}`} group="Labels - 2D Notes"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}

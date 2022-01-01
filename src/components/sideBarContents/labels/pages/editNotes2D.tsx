import MuiIconButton from '@material-ui/core/IconButton';
import {goBack} from 'connected-react-router/immutable';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';



import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import styles from './style';

import { useAppSelector, useAppDispatch} from '../../../../store/storeHooks';

import {selectedLabel2D,editLabel} from '../../../../store/sideBar/labelSlice/label2DSlice'

import MuiTextField from '@material-ui/core/TextField';
import MuiTypography from '@material-ui/core/Typography';
import MuiButton from '@material-ui/core/Button';
import {useRef, useState} from 'react';
import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import 'remirror/styles/all.css';

import { cx, htmlToProsemirrorNode } from 'remirror';
import { BoldExtension } from 'remirror/extensions';
import { Remirror, ThemeProvider, useActive, useCommands, useRemirror } from '@remirror/react';

const extensions = () => [new BoldExtension()];

const BoldButton = () => {
  const commands = useCommands();
  const active = useActive(true);
  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => commands.toggleBold()}
      className={cx(active.bold() && 'active')}
    >
      Bold
    </button>
  );
};

const Basic = (): JSX.Element => {
  const { manager, state, onChange } = useRemirror({
    extensions: extensions,
    content: '<p>Text in <b>bold</b></p>',
    stringHandler: htmlToProsemirrorNode,
  });

  return (
    <ThemeProvider>
      <Remirror
        manager={manager}
        autoFocus
        onChange={onChange}
        initialContent={state}
        autoRender='end'
      >
        <BoldButton />
      </Remirror>
    </ThemeProvider>
  );
};

export default function EditLabels2D(){

  const label2D = useAppSelector(selectedLabel2D)
  const [labelText,setLabelText] = useState(label2D?label2D.label : "");
  const remirrorRef = useRef<any>(null);
  

  const classes = styles();
  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleEdit = (e :any)=>{
    setLabelText(e.currentTarget.value)
  }

  const onHandleReset = () => {
    setLabelText(label2D?label2D.label : "");
  }

  const onHandleSave = () => {
    dispatch(editLabel({id: label2D ? label2D.id : "-1", value: labelText}))
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
    
    console.log("selected", label2D)

    // console.log("selected",clickedValues)
    return (
        <Basic/>
    )
  }


  const getFooter = () => {

    let change = false;
    if(label2D?.label !== labelText)
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
            headerContent={ <Title text={`${label2D?.title}`} group="Labels - 2D Labels"/> }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}

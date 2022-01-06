import MuiIconButton from '@material-ui/core/IconButton';
import {goBack} from 'connected-react-router/immutable';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';



import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import styles from './style';

import { useAppSelector, useAppDispatch} from '../../../../store/storeHooks';

import {selectedLabel2D,editLabel, select2DLabelData} from '../../../../store/sideBar/labelSlice/labelAllSlice'

import MuiButton from '@material-ui/core/Button';
import {useRef, useState} from 'react';
import React, { forwardRef, useImperativeHandle, useCallback } from 'react';

import { cx, htmlToProsemirrorNode } from 'remirror';
import { BoldExtension, ItalicExtension, UnderlineExtension } from 'remirror/extensions';
import { Remirror, ThemeProvider, useActive, useCommands, useHelpers, useKeymap, useRemirror } from '@remirror/react';

const extensions = () => [new BoldExtension(), new ItalicExtension(), new UnderlineExtension()];

const hooks = [
  () => {
    const { getJSON, getHTML } = useHelpers();
    const labels2d = useAppSelector(select2DLabelData);
    const dispatch = useAppDispatch();
    const handleSaveShortcut = useCallback(
      ({ state }) => {
        Object.values(labels2d).forEach(l => {
          dispatch(editLabel({id: l.id,value: JSON.stringify(getJSON(state))}));
        }) 
        console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

        return true; // Prevents any further key handlers from being run.
      },
      [getJSON],
    );

    // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
    useKeymap('Mod-s', handleSaveShortcut);
  },
];

const Buttons = () => {
  const commands = useCommands();
  const active = useActive(true);
  return (
    <>
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => commands.toggleBold()}
      className={cx(active.bold() && 'active')}
    >
      B
    </button>
    <button
    onMouseDown={(event) => event.preventDefault()}
    onClick={() => commands.toggleItalic()}
    className={cx(active.italic() && 'active')}
  >
    I
  </button>
  <button
  onMouseDown={(event) => event.preventDefault()}
  onClick={() => commands.toggleUnderline()}
  className={cx(active.underline() && 'active')}
>
  U
</button>
</>
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
        hooks={hooks}
        autoRender='end'
      >
        <Buttons />
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

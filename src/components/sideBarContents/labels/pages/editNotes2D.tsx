import MuiIconButton from '@material-ui/core/IconButton';
import {goBack} from 'connected-react-router/immutable';
import Title from '../../../layout/sideBar/sideBarContainer/sideBarHeader/utilComponents/Title';



import SideBarContainer from '../../../layout/sideBar/sideBarContainer';
import BackButton from '../../../icons/back';

import styles from './style';

import { useAppSelector, useAppDispatch} from '../../../../store/storeHooks';

import {editLabel, selectLabelData, selectedLeafNodes, selectCheckedLeafNodes} from '../../../../store/sideBar/labelSlice/labelAllSlice'

import MuiButton from '@material-ui/core/Button';
import {useRef, useState} from 'react';
import React, { forwardRef, useImperativeHandle, useCallback } from 'react';

import { cx, htmlToProsemirrorNode } from 'remirror';
import { BoldExtension, ItalicExtension, UnderlineExtension } from 'remirror/extensions';
import { Remirror, ThemeProvider, useActive, useCommands, useHelpers, useKeymap, useRemirror } from '@remirror/react';
import { ILabel, LabelType } from 'store/sideBar/labelSlice/shared/types';

const extensions = () => [new BoldExtension(), new ItalicExtension(), new UnderlineExtension()];

const hooks = [
  () => {
    const { getJSON, getHTML } = useHelpers();
    const labels2d = useAppSelector(selectLabelData);
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

const getInitialContent = (selectedLabels:ILabel[]) => {
  if(selectedLabels.length > 1) {
    switch(selectedLabels[0].labelType) {
      case LabelType.LABEL2D:
      return  {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: `Cannot edit Multiple 2d labels selected`,
                },
              ],
            },
          ]
      }
    
      default:
        return JSON.parse(selectedLabels[0].label)
    }
  }
  else{
    return JSON.parse(selectedLabels[0].label)
  }
}
const Basic = (props:{selectedLabels:ILabel[]}): JSX.Element => {
  const { manager, state, onChange } = useRemirror({
    extensions: extensions,
    content: getInitialContent(props.selectedLabels)
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

  const labelTree = useAppSelector(selectLabelData);
  const selectedLabelsIds = useAppSelector(selectCheckedLeafNodes)
  const remirrorRef = useRef<any>(null);
  

  const classes = styles();
  const dispatch = useAppDispatch();  
  const onClickBackIcon = () =>{
    dispatch(goBack());
  }

  const onHandleReset = () => {
    //setLabelText(label2D?label2D.label : "");
  }

  const onHandleSave = () => {
    //dispatch(editLabel({id: label2D ? label2D.id : "-1", value: labelText}))
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
    return (
        <Basic selectedLabels={selectedLabelsIds.map(label => labelTree[label.id])}/>
    )
  }


  const getFooter = () => {

    let change = false;
    // if(label2D?.label !== labelText)
    //   change = true;

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

  const getHeaderContent = () => {
      const type = (selectedLabelsIds[0] as ILabel).labelType;
      const text = selectedLabelsIds.length > 1 ? "..." : selectedLabelsIds[0].title;
      return(<Title text={text} group={`Labels - ${type}`}/>)
  }
  return (
          <SideBarContainer
            headerLeftIcon = { getHeaderLeftIcon() }
            headerContent={ getHeaderContent() }
            headerRightIcon = { getHeaderRightIcon() }
            body ={ getBody() }
            footer = { getFooter() }
          />

  )
}

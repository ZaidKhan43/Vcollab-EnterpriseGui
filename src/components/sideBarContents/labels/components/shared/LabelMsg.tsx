import React, { forwardRef, useImperativeHandle, useCallback, useEffect } from 'react';
import { BoldExtension, ItalicExtension, UnderlineExtension, MarkdownExtension, MarkdownOptions } from 'remirror/extensions';
import {
  ReactExtensions,
  ReactFrameworkOutput,
  Remirror,
  useRemirror,
  useHelpers,
  useCommands,
  useKeymap
} from '@remirror/react';
import { makeStyles } from '@material-ui/core';

const extensions = () => [new BoldExtension(), new ItalicExtension(),new UnderlineExtension(), new MarkdownExtension()];
type Extensions = ReactExtensions<BoldExtension & ItalicExtension & UnderlineExtension & MarkdownExtension>;

const useEditorStyles = makeStyles(theme => (
  {
    root: {
      overflowY: 'hidden !important'
    }
  }
));
const EditorWithRef = forwardRef<ReactFrameworkOutput<Extensions>>((props:any, ref) => {
    const classes = useEditorStyles();
    const { manager, state, setState, getContext, onChange } = useRemirror({ extensions,
      content: '<p> Some dummy content</p>',
      stringHandler: 'html',
      selection: 'start',
    });
  
    useImperativeHandle(ref, () => getContext(), [getContext]);

    useEffect(() => {
      manager.view.updateState(manager.createState({ content: props.content }));
    },[])
    useEffect(() => {
      manager.view.updateState(manager.createState({ content: props.content }));
    },[props.content])
  
    // Add the state and create an `onChange` handler for the state.
    return (
      <Remirror
        {...props}
        classNames={[classes.root]}
        manager={manager}
        state={state}
        onChange={onChange}
      >
      </Remirror>
    );
  });
type LabelMsgProps = {
    msg:string
}
function LabelMsg(props:LabelMsgProps, ref:any) {
    return (
        <div ref={ref} style={{ backgroundColor:"yellow", width:'100%' , height:'100%', zIndex:1}}>{
          //  <EditorWithRef content = {JSON.parse(props.msg)}/>
          props.msg
        }</div>
        
    )
}

export default forwardRef(LabelMsg)

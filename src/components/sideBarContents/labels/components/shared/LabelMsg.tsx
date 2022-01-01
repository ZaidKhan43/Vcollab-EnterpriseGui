import 'remirror/styles/all.css';
import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import { BoldExtension, MarkdownExtension, MarkdownOptions } from 'remirror/extensions';
import {
  ReactExtensions,
  ReactFrameworkOutput,
  Remirror,
  useRemirror,
  useHelpers,
  useCommands,
  useKeymap
} from '@remirror/react';

const extensions = () => [new BoldExtension(), new MarkdownExtension()];
type Extensions = ReactExtensions<BoldExtension>;

const EditorWithRef = forwardRef<ReactFrameworkOutput<Extensions>>((props:any, ref) => {
  
    const { manager, state, setState, getContext } = useRemirror({ extensions,
      content: props.content,
      selection: 'start',
      stringHandler: 'html',
    });
  
    useImperativeHandle(ref, () => getContext(), [getContext]);
  
    // Add the state and create an `onChange` handler for the state.
    return (
      <Remirror
        {...props}
        manager={manager}
        state={state}
        onChange={(parameter) => {
          // Update the state to the latest value.
          setState(parameter.state);
        }}
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
           <EditorWithRef content = {`<p>${props.msg}</p>`}/>
        }</div>
        
    )
}

export default forwardRef(LabelMsg)

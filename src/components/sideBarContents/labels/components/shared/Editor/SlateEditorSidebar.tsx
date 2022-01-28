import { useMemo, useState ,useEffect ,useCallback} from 'react';
import { Editable, withReact, Slate ,ReactEditor ,  useSlate } from 'slate-react';
import {
  Editor,
  BaseEditor ,
  createEditor,
  Descendant,
  Element as SlateElement,
  
} from 'slate';
import { HistoryEditor } from 'slate-history';

import MuiButton from '@material-ui/core/Button';

import { useAppSelector, useAppDispatch} from '../../../../../../store/storeHooks';
import {selectLabelData,editLabel,selectCheckedLeafNodes} from '../../../../../../store/sideBar/labelSlice/labelAllSlice';
import {ILabel,LabelType} from '../../../../../../store/sideBar/labelSlice/shared/types';
import {getInitialContent} from './common';

import Toolbar from './Toolbar';

type CustomText = { text: string }
type CustomElement = { type: 'paragraph'; children: CustomText[] }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

const Element = (props:any) => {

  const {attributes, children, element} = props;

  switch (element.type) {

    case 'alignLeft':
        return <div style={{textAlign:'left',listStylePosition:'inside'}} {...attributes}>{children}</div>
    case 'alignCenter':
        return <div style={{textAlign:'center',listStylePosition:'inside'}} {...attributes}>{children}</div>
    case 'alignRight':
        return <div style={{textAlign:'right',listStylePosition:'inside'}} {...attributes}>{children}</div>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'list-item':
          return  <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>

    default:
      return <p {...attributes}>{children}</p>
  }
} 

const Leaf = (props:any) => {

let {attributes, children ,leaf} = props;

  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if(leaf.strikethrough){
    children = <del>{children}</del>
  }


  // if (leaf.code) {
  //   children = <code>{children}</code>
  // }

  // if(leaf.superscript){
  //     children = <sup>{children}</sup>
  // }
  // if(leaf.subscript){
  //     children = <sub>{children}</sub>
  // }
  // if(leaf.color){
  //     children = <span style={{color:leaf.color}}>{children}</span>
  // }
  // if(leaf.bgColor){
  //     children = <span style={{backgroundColor:leaf.bgColor}}>{children}</span>
  // }

  return <span {...attributes}>{children}</span>
}

export default function SidebarEditor(props:{selectedLabels:ILabel[]}) {


  const selectedLabels = useAppSelector(selectCheckedLeafNodes);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<Descendant[]>(getInitialContent(props.selectedLabels))
  const [editor] = useState(() => withReact(createEditor()))

  const renderElement = useCallback(props => <Element {...props}/>,[])

  const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
  }, [])  

  const onHandleSave = () => {
    selectedLabels.forEach(e => {

        dispatch(editLabel({id: e.id, value: JSON.stringify(value)}))
      
  })

  }

    return (
      <>
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
              <Toolbar/>
              <div style={{border:"1px solid black",marginTop:'20px'}}>
                <Editable 
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                />
              </div>

              <br></br>

              <MuiButton variant="contained" color="primary" 
              onClick={onHandleSave}>
                Save  
              </MuiButton>
        </Slate>
      </>
    )

}


import MuiButton from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import { TreePicker  } from 'rsuite';

import {useAppSelector , useAppDispatch} from '../../../../store/storeHooks';
import { insertData, insertVariableData, setData } from '../../../../store/colormapSlice';
import { selectActiveViewerID, selectDarkModeEnable } from '../../../../store/appSlice';

import * as viewerAPIProxy from '../../../../backend/viewerAPIProxy';

import { useStylesDark, useStylesLight } from '../accordstyle';
import 'rsuite/dist/styles/rsuite-default.css';
import '../colormaprsuitedark.css';
import styles from './style';


function Colormap() {

  const isDarkMode = useAppSelector(selectDarkModeEnable);
  const activeViewerID = useAppSelector(selectActiveViewerID);
  
  let totalDataFromRedux = useAppSelector(insertVariableData);
  const dispatchAction = useAppDispatch()

  const [ variable, setVariable] = useState(null);
  const [ step, setStep ] = useState(null);
 
  let varfromredux1 = totalDataFromRedux.variable;
  let stepfromredux1 = totalDataFromRedux.step;

  const varfromredux = JSON.parse(JSON.stringify(varfromredux1));
  const stepfromredux = JSON.parse(JSON.stringify(stepfromredux1));
  const palettefromredux = JSON.parse(JSON.stringify(null));
 
  const overrideClasses = styles();

  useEffect(()=>{
    let totalData:any[] = [];
    let stepTotal:any[] =[];
    let datawq:any = viewerAPIProxy.getDisplayResult(activeViewerID);
    let modelInfo = viewerAPIProxy.getModelInfo(activeViewerID);
    console.log('model_names',modelInfo)
    let variablesData:any =  datawq.variables;
    let value:number = 0;
    for (let x in variablesData){
        const {name, type} =  variablesData[x];
        let eachOBj:any = {
            label: name,
            value: value,
            children:[]
        }

        value++;
        let derivedTypefeilds:any = datawq.variableTypes[type].derivedTypeIds;
        for(let type = 0; type < derivedTypefeilds.length; type++){
          eachOBj.children.push({label:datawq.derivedTypes[derivedTypefeilds[type]].name, value});
          value++;
        }
        totalData.push(eachOBj)
    }
    // step data from API  
    let stepData:any= datawq.stepVariables;
    let stepN =0;
    for (let y in stepData) {
      const{ name } =stepData[y];
      let eachStep={
          label:name,
          value:stepN,
      }
      stepN++;
      stepTotal.push(eachStep)
    }

    let selectderived:any=datawq.selection.derivedTypeId;
    let selectstep = datawq.selection.stepId;
    selectderived = datawq.derivedTypes[selectderived].name;
    let varValue:any;
    for(let i=0;i<totalData.length;i++){

      if(totalData[i].label === selectderived){
        varValue = totalData[i].value;
        break;
      }
      if(totalData[i].children){
        for(let j=0;j<totalData[i].children.length;j++){
          if(totalData[i].children[j].label === selectderived){
            varValue = totalData[i].children[j].value;
            break;
          }
        }
      }
      if(varValue !== undefined){
        break;
      }
    }
    selectstep=datawq.stepVariables[selectstep].name;
    let stepVal:any;
    for(let k=0;k<stepTotal.length;k++){
      if(stepTotal[k].label === selectstep){
        stepVal=stepTotal[k].value;
        break; 
      }
    }
    setVariable(varValue);
    setStep(stepVal);
    console.log('before saving -->',totalData, stepTotal );
    dispatchAction(insertData({
      variable: totalData,
      step: stepTotal,
      palet: null
    }));

  },[activeViewerID, dispatchAction]);
      

  const isButtonEnabled= variable && step && step > 0;
  const getParentLabel = (data:any[], id:any):any=>{
    let i:number;
    for(i=0;i<data.length;i++){
      if(data[i].value === id){
        return true;
      }
      if(data[i].children && data[i].children.length > 0){
        let result =  getParentLabel(data[i].children, id);
        if(result === true){
          return data[i].label;
        } else if(result){
            return result;
        }
      }
    }
  }

  const getDetails = (data:any[], id:null, children:any[]):any=>{
    let i;
    for(i=0;i<data.length;i++){
      if(data[i].value === id){
        if(children.length >0){
          return {
            children: data[i].children,
          }
        }
        return {
          label: data[i].label,
          id: id
        }
      }
      if(data[i].children && data[i].children.length > 0){
        let result =  getDetails(data[i].children, id,[]);
        if(result){
          return result;
        }
      }
    }
  }
  const onSave = ()=>{
    let vari='';
    let st='';
    vari = getDetails(varfromredux, variable,[]);
    st = getDetails(stepfromredux, step,[]);
  
    dispatchAction(setData({
      selectedVariable: vari,
      selectedStep: st,
    }));
  }

  let dark = useStylesDark({});
  let light =  useStylesLight({})
  const classes = isDarkMode ? dark : light
 
  const getDisableValues = (data:any, arr:any) => {
    for(let i=0;i<data.length;i++){
      if(data[i].children && data[i].children.length > 0){
        arr.push(data[i].value);
        getDisableValues(data[i].children,arr);
      }
    }
  }

  const disableChildrenForVar:any[] = [], disableChildrenForStep:any[]=[], disableChildrenForPalette:any[] =[];
  if(varfromredux){
    getDisableValues(varfromredux, disableChildrenForVar);
  }
  if(stepfromredux)
    getDisableValues(stepfromredux, disableChildrenForStep);
  if(palettefromredux)
    getDisableValues(palettefromredux, disableChildrenForPalette);

  return  (
    <div>
      <div className={classes.container}>     
          <div className={isDarkMode ? " ":"somelight"}>
          <p className={classes.divp}> Variable</p>
          { varfromredux && <TreePicker className={overrideClasses.tree} menuClassName={isDarkMode ? "dark":"light"} disabledItemValues={disableChildrenForVar}  name="variable" onChange={(value)=>setVariable(value)} value={variable} defaultExpandAll data={varfromredux} style={{ width: 246, zIndex:9999 }} searchable={false} renderValue={(value, item, selectedElement) => {
            console.log(item)
            let details;
            if(item.value)
              details = getParentLabel(varfromredux, item.value);
            // console.log(details);
            return (
              <span>
                {details ? `${details} - ` : ''} {item.label}
              </span>
            );
          }} />}

          </div>
          <div className={isDarkMode ? "somedark":"somelight"}>
          <p className={classes.divp}>Step</p>
          { stepfromredux && <TreePicker className={overrideClasses.tree} menuClassName={isDarkMode ? "dark":"light"} value={step} disabledItemValues={disableChildrenForStep} onChange={(value)=>{setStep(value)}} defaultExpandAll data={stepfromredux} style={{ width: 246,  zIndex:9999 }} searchable={false}  />}
          </div>
          <div className={classes.button}>
            {isButtonEnabled?null:
            <p  style={{ width: 246, marginTop: 10, color:"#e4687e" }} >Data not avaiable for the current selection</p>}
            <div className={classes.custom_button_group} style={{ width: 246, marginTop: 10 }} >
              <MuiButton variant="contained" color="primary" onClick={onSave} disabled={!isButtonEnabled}>Apply</MuiButton>
            </div>
          </div>  
    </div>
   </div>
  );
}


export default Colormap;


import MuiButton from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import TreePicker   from 'rsuite/lib/TreePicker';
import {useAppSelector , useAppDispatch} from '../../../../store/storeHooks';
import { insertData, setData,insertCaeData } from '../../../../store/colormapSlice';
import { selectActiveViewerID, selectDarkModeEnable } from '../../../../store/appSlice';
import * as viewerAPIProxy from '../../../../backend/viewerAPIProxy';
import { useStylesDark } from './style';

function Colormap(props:any) {
    const isDarkMode = useAppSelector(selectDarkModeEnable);
    const activeViewerID = useAppSelector(selectActiveViewerID);
    const dispatchAction = useAppDispatch();
    
    let dark = useStylesDark({});
    const classes = dark

    useEffect(()=>{
        const cae:any =viewerAPIProxy.getDisplayResult(activeViewerID);
            dispatchAction(insertData({          
                    caeResult:cae,                              
            }));     
        
    },[activeViewerID,dispatchAction]);

    const datawq = useAppSelector(insertCaeData);

    console.log('redux',datawq);
        
        let isButtonEnabled;
        let varValue:any;
        let stepVal:any;
        let totalData:any[] =[];
        let stepTotal:any[]=[];

    if(datawq){
        let variablesData:any =datawq.variables;
        let value:number =0;
        for (let x in variablesData){
            const {name,type} = variablesData[x];
            let eachOBj:any ={
                label:name,
                value:value,
                children:[]
            }
            value++;
            let derivedTypefeilds:any = datawq.variableTypes[type].derivedTypeIds;
            for(let type = 0; type < derivedTypefeilds.length; type++){
              eachOBj.children.push({label:datawq.derivedTypes[derivedTypefeilds[type]].name, value});
              value++;
            }
            totalData.push(eachOBj)
        };
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
        };
    
    let variableID:any = datawq.selection.variableId;  
    let selectderived:any=datawq.selection.derivedTypeId;
    let selectstep = datawq.selection.stepId;
    let selectderived1 = datawq.derivedTypes[selectderived].name;
    console.log('totalData',totalData)
    console.log('varID',variableID)
    console.log('selderived',selectderived)
    console.log('selstep',selectstep)
    console.log('selcderived',selectderived1)
    
    for(let i=0;i<totalData.length;i++){

      if(totalData[i].label === selectderived1){
        varValue = totalData[i].value;
        break;
      }
      if(totalData[i].children){
        for(let j=0;j<totalData[i].children.length;j++){
          if(totalData[i].children[j].label === selectderived1 && totalData[i].label === variableID ){
            varValue = totalData[i].children[j].value;
            break;
          }
        }
      }
      if(varValue !== undefined){
        break;
      }
    };
    selectstep=datawq.stepVariables[selectstep].name;
    for(let k=0;k<stepTotal.length;k++){
      if(stepTotal[k].label === selectstep){
        stepVal=stepTotal[k].value;
        break; 
      }
    };

}
  const [variable, setVariable]=useState(varValue);
  const [step, setStep]=useState(stepVal);
   
  console.log('varvalue',varValue)
  console.log('stepvalue',stepVal)

    isButtonEnabled= variable && step > 0;
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

  const varfromredux = JSON.parse(JSON.stringify(totalData));
  const stepfromredux = JSON.parse(JSON.stringify(stepTotal));
  //let v = getDetails(varfromredux, variable,[]);
  
 

  const onSave = ()=>{
    let vari : any='';
    let st='';
    let varId='';
    vari = getDetails(varfromredux, variable,[]);
    st = getDetails(stepfromredux, step,[]);
    varId= getParentLabel(varfromredux,variable);
    console.log('vari',vari)
    let k;
    let new1;
    for(k in datawq.derivedTypes){
      if(vari.label === datawq.derivedTypes[k].name){
        new1=datawq.derivedTypes[k].generator;
        break;
      }
    };
   

  
    dispatchAction(setData({
      selectedVariable: vari,
      selectedStep: st,
      variableId:varId,
      derivedTypeID:new1
    }));
  }
  const getDisableValues = (data:any, arr:any) => {
    for(let i=0;i<data.length;i++){
      if(data[i].children && data[i].children.length > 0){
        arr.push(data[i].value);
        getDisableValues(data[i].children,arr);
      }
    }
  }

  const disableChildrenForVar:any[] = [], disableChildrenForStep:any[]=[];
  if(varfromredux){
    getDisableValues(varfromredux, disableChildrenForVar);
  }
  if(stepfromredux)
    getDisableValues(stepfromredux, disableChildrenForStep);
    

    return(
      <div>
      <div className={classes.container}>     
          <div className={isDarkMode ? "somedark":"somelight"}>
          <p className={classes.divp}> Variable</p>
          { varfromredux && <TreePicker menuClassName={isDarkMode ? "dark":"light"} disabledItemValues={disableChildrenForVar}  name="variable" onChange={(value)=>setVariable(value)} value={variable} defaultExpandAll data={varfromredux} style={{ width: 246, zIndex:9999 }} searchable={false} renderValue={(value, item : any, selectedElement) => {
            console.log(item)
            let details;
            if(item.value)
              details = getParentLabel(varfromredux, item.value);
            return (
              <span>
                {details ? `${details} - ` : ''} {item.label}
              </span>
            );
          }} />}

          </div>
          <div className={isDarkMode ? "somedark":"somelight"}>
          <p className={classes.divp}>Step</p>
          { stepfromredux && <TreePicker  menuClassName={isDarkMode ? "dark":"light"} value={step} disabledItemValues={disableChildrenForStep} onChange={(value)=>{setStep(value)}} defaultExpandAll data={stepfromredux} style={{ width: 246,  zIndex:9999 }} searchable={false}  />}
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
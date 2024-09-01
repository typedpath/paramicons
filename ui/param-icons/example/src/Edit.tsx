import React, {Fragment, useEffect, useState} from 'react';
import { Property,  MetaData, MultiShapeParams, circlyIconMetaData, polarRadialCon2MetaData, blockconMetaData, polarRadialConMetaData, spiralConMetaData } from 'param-icons';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import ColourListSvg from './ColourListSvg';

import Stack  from '@mui/material/Stack';

import NullableParamiconEdit from './NullableParamiconEdit';


export interface EditParams {
  metaData: MetaData;
  params: MultiShapeParams;
}

function paramsForEdit(params: MultiShapeParams) : MultiShapeParams {
   const result = {...params};
   result.pageHeight=300;
   result.pageWidth=300;
   return result; 
}

const Edit = (editParams: EditParams) => {
  console.log(editParams);
  
  const [ params, setParams] = useState(paramsForEdit(editParams.params));
  const [frame, setFrame] = useState(0)

  function onChange() {
    setParams({...params})
 }

  useEffect(()=>{
    let animationParams = editParams.metaData.animationParams && editParams.metaData.animationParams(params);

    if (animationParams) {

    let pollingPeriod = animationParams.msDuration / animationParams.frameCount;
    console.log(`starting timer pollingPeriod: ${pollingPeriod} frame:${frame}`);
    let myInterval = setInterval(() => {
           console.log(`timer ${pollingPeriod} frame: ${frame}`);
           
           animationParams.phaseAngle = 360 * (frame % animationParams.frameCount) /  animationParams.frameCount;
           onChange();
           setFrame(frame+1);
        }, pollingPeriod)
        return ()=> {
            clearInterval(myInterval);
          };
    } else {
      console.log('not animated')
    }
});


function propertyUi(ps: Property) : JSX.Element{
   return  <Fragment>{edit(params, onChange, ps, ps.name)}</Fragment>
}
 
  const ui = <Stack>
      {editParams.metaData.render(params)}
     { editParams.metaData.properties.map(ps => propertyUi(ps)) }
  </Stack>
  return ui;
  }
  
  function editBoolean(params: MultiShapeParams,  onChange: () => void, prop: Property, key: string) : JSX.Element {
    const isChecked = prop.get(params)
  
    return <FormControlLabel
    control={<Checkbox size={"small"} key={key} checked={isChecked} onChange={(e)=>{
      prop.set(params, e.target.checked)
     onChange();
     }} />}
    label={prop.description}
  />
  }
  
  function editColourList(params: MultiShapeParams,  onChange: () => void, prop: Property, key: string) : JSX.Element {
    function onChangeInner(colours: string[]) {
         prop.set(params, colours);
         onChange();
    }
  
    return <FormControlLabel key={key}
    control={<ColourListSvg onChange={onChangeInner}  colours={prop.get(params)} cRadius={20}/>}
    label={prop.description}
  />
  }
  
  function editText(params: MultiShapeParams,  onChange: () => void, prop: Property, key: string) : JSX.Element {
    const onClick = () => {   
      params.highlightedProperty = prop.name == params.highlightedProperty ? '' : prop.name; 
      onChange();     
      //console.log('onClick property ', prop.name )
    } 
    const current = prop.get(params);
    return <TextField size={"small"} onClick={onClick}  key={key}  variant={"outlined"} id="outlined-basic" disabled={false} label={prop.description} value={isNaN(current)?"":current} 
     onChange={(e)=>{
       var val = parseFloat(e.target.value);   
       if (isNaN(val)) {
          prop.set(params, undefined);
          onChange();
      }
       else {
          prop.set(params, val)
          onChange();
       }
      }} />
    }
    

    function editNullableParamicon(params: MultiShapeParams,  onChangeIn: () => void, prop: Property, key: string) : JSX.Element {

       let metaDatas: MetaData[] = [circlyIconMetaData, polarRadialCon2MetaData, blockconMetaData, polarRadialConMetaData,  spiralConMetaData]


      const current: EditParams | null = prop.get(params);
      const onChange = (p: EditParams | null) => {
        prop.set(params, p);
        onChangeIn();
      } 
  return <NullableParamiconEdit metaDatas={metaDatas} editParams={current} onChange={onChange} inEditDefault={false}/>
      }
      
  
  function edit(params: MultiShapeParams,  onChange: () => void, prop: Property, key: string) : JSX.Element {
    var field;
  
    if (prop.type=='boolean') {
      field = editBoolean(params, onChange, prop, key);
    } else if (prop.type=='colourList') {
      field = editColourList(params, onChange, prop, key);
    } else if (prop.type=='NullableParamicon') {
      field = editNullableParamicon(params, onChange, prop, key);
    }else {
    field = editText(params, onChange, prop, key);
   }
  return field;
  }
  

export default Edit;  
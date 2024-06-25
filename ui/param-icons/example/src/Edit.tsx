import React, {Fragment, useState} from 'react';
import { Property,  MetaData, MultiShapeParams } from 'param-icons';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
//import Card from "@mui/material/Card";
//import CardContent from "@mui/material/CardContent";



import ColourListSvg from './ColourListSvg';
import ReactDOMServer from 'react-dom/server';

import Stack  from '@mui/material/Stack';



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

  const onClickDownload = () => {

    const renderPs = {...params} 
    renderPs.pageHeight=200;
    renderPs.pageWidth=200;
  
    const el: JSX.Element = editParams.metaData.render(renderPs);
    const strEl: string = ReactDOMServer.renderToStaticMarkup(el);
  
    const blob = new Blob([strEl]);
    const fileDownloadUrl = URL.createObjectURL(blob);
  
    const filename = 'download.svg';
    const aTag = document.createElement('a');
    aTag.href = fileDownloadUrl;
    aTag.download = filename;
    aTag.click();
    URL.revokeObjectURL(fileDownloadUrl); 
  
  }  
  
  function onChange() {
     setParams({...params})
  }


function propertyUi(ps: Property) : JSX.Element{
  //return <Card sx={{margin: 0, padding: 0}} variant={"outlined"}>
  //<CardContent sx={{margin: 0, pt: 1}}>  {edit(params, onChange, ps, ps.name)}</CardContent></Card>
  return  <Fragment>{edit(params, onChange, ps, ps.name)}</Fragment>

}
 
  const ui = <Stack>
    <Button style={{textAlign: 'left'}} onClick={onClickDownload}><Typography variant="h4" >
        Download
          </Typography></Button>
     {editParams.metaData.render(params)}
     {editParams.metaData.properties.map(ps => propertyUi(ps)) }
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
    
  function edit(params: MultiShapeParams,  onChange: () => void, prop: Property, key: string) : JSX.Element {
    var field;
  
    if (prop.type=='boolean') {
      field = editBoolean(params, onChange, prop, key);
    } else if (prop.type=='colourList') {
      field = editColourList(params, onChange, prop, key);
    } else {
    field = editText(params, onChange, prop, key);
   }
  return field;
  }
  

export default Edit;  
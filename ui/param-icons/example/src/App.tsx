import { Property, 
   MetaData, circlyIconMetaData, polarRadialCon2MetaData, polarRadialConMetaData, spiralConMetaData, MultiShapeParams } from 'param-icons';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import React, {useState} from 'react';
import ColourListSvg from './ColourListSvg';
import ReactDOMServer from 'react-dom/server';
import { IconView } from './IconView';


interface SampleRow {
   metaData: MetaData
   selected: boolean 
}

const defaultRows: SampleRow[] = [circlyIconMetaData, polarRadialCon2MetaData,polarRadialConMetaData, spiralConMetaData]
     .map ( mdt =>  {return {
      metaData: mdt,
      selected: false
    }} );

//  <text onClick={onClickEdit} x={x+2.5*unit} y={2*unit/3}>Edit</text>

function rowUI( row: SampleRow, onChange: () => void) : JSX.Element {
    row.metaData.defaultParams.pageWidth = row.selected?512:100;
    row.metaData.defaultParams.pageHeight = row.selected?512:100;
  const onClickEdit = () => {
    row.selected = !row.selected;
    onChange();
  }  

  function sampleSize(ps: MultiShapeParams) : MultiShapeParams{
ps.pageHeight = 100;
ps.pageWidth = 100;
return ps;
}
function onClickSample(metaData: MetaData, i: number) : ()=>void {
   return () => {
     metaData.defaultParams = {...(metaData.sampleParams[i])};
     console.log("clicked ", metaData, i);
     onChange();
    }
}

const onClickDownload = () => {

  const renderPs = {...row.metaData.defaultParams} 
  renderPs.pageHeight=200;
  renderPs.pageWidth=200;

  const el: JSX.Element = row.metaData.render(renderPs);
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


return <React.Fragment>
    <text>{row.metaData.description}</text>
    <br/> 
    <text onClick={onClickEdit}>{ row.selected?"Close Edit":"Edit" }</text>
    <text> .... </text>
    <text onClick={onClickDownload}>{ "Download" }</text>

<br/>
   {[row.metaData.render(row.metaData.defaultParams) ]} 
   { !row.selected &&  row.metaData.sampleParams.map((ps, i)=> {
           return <span onClick={onClickSample(row.metaData, i)}>{row.metaData.render(sampleSize(ps))}
           </span>}  )}
  <br/>         
   {row.metaData.sampleParams.map((ps)=><IconView metaData={row.metaData} paramsIn={ps}/> )}        

<form>  
{ row.selected &&  row.metaData.properties.map((prop, i)=>edit(row.metaData.defaultParams, onChange, prop, ""+i))}
</form>

</React.Fragment>
}

const App = () => {
  
  const [ sampleRows, setSampleRows] = useState(defaultRows);

  const onRowChange = () => {setSampleRows([...sampleRows])}

  const ui = <Container>    

<br/> {sampleRows.map( row=>rowUI(row, onRowChange)  ) }
<br/>

</Container>

return ui;
}

function editBoolean(params: MultiShapeParams,  onChange: () => void, prop: Property, key: string) : JSX.Element {
  const isChecked = prop.get(params)
  console.log(`${prop.name} isChecked`, isChecked);

  return <FormControlLabel
  control={<Checkbox key={key} checked={isChecked} onChange={(e)=>{
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
  control={<ColourListSvg onChange={onChangeInner}  colours={prop.get(params)}  cRadius={20} />}
  label={prop.description}
/>
}

function editText(params: MultiShapeParams,  onChange: () => void, prop: Property, key: string) : JSX.Element {
  const onClick = () => {   
    params.highlightedProperty = prop.name == params.highlightedProperty ? '' : prop.name; 
    onChange();     
    console.log('onClick property ', prop.name )
  } 
  return <TextField onClick={onClick}  key={key}  variant={"outlined"} id="outlined-basic" disabled={false} label={prop.description} value={prop.get(params)} 
   onChange={(e)=>{
     prop.set(params, parseFloat(e.target.value))
    onChange();
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

export default App

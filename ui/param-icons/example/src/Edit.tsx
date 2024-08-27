import React, {Fragment, useEffect, useState} from 'react';
import { Property,  MetaData, MultiShapeParams, transitionConMetaData, circlyIconMetaData, polarRadialCon2MetaData, blockconMetaData, polarRadialConMetaData, spiralConMetaData } from 'param-icons';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { ShareData, ShareView } from './Share';

import ColourListSvg from './ColourListSvg';
import ReactDOMServer from 'react-dom/server';

import Stack  from '@mui/material/Stack';
import svgThumbnail  from './functions/svgThumbnail';
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
  const [shareData, setShareData] = useState<ShareData | null>(null)
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


  const onClickShare = () => {
      setShareData(shareData ? null : {link: null});
      let newParams = {...params};
      newParams.loading=!shareData;
      setParams(newParams) ;
  }

  function renderAsSvgString(width: number, height: number) : string {
    const renderPs = {...params} 
    renderPs.pageHeight=height;
    renderPs.pageWidth=width;
console.log("renderAsSvgString ", width, height );
    const el: JSX.Element = editParams.metaData.render(renderPs);
    return  ReactDOMServer.renderToStaticMarkup(el);
  }

  const onClickDownload = () => {

    let strEl = renderAsSvgString(600, 600)
  
    const blob = new Blob([strEl]);
    const fileDownloadUrl = URL.createObjectURL(blob);
  
    const filename = 'download.svg';
    const aTag = document.createElement('a');
    aTag.href = fileDownloadUrl;
    aTag.download = filename;
    aTag.click();
    URL.revokeObjectURL(fileDownloadUrl); 
  
  }  
  



function propertyUi(ps: Property) : JSX.Element{
   return  <Fragment>{edit(params, onChange, ps, ps.name)}</Fragment>
}
 
useEffect( () => {
  if (shareData!=null && !shareData.link) {
    // may need url encode !
       let editParamsIn = `id=${editParams.metaData.id}&params=${JSON.stringify(params)}`          
       svgThumbnail( editParamsIn, renderAsSvgString(600, 600))
    
    .then( (data) =>  
    {
    setShareData({link: data.toString()})
    console.log('share.link:', data)
    let newParams = {...params};
    newParams.loading=false;
    setParams(newParams) ;
    }
  );
}
}
);

  const ui = <Stack>
    <Button style={{textAlign: 'left'}} onClick={onClickDownload}>
      <Typography variant="h4" >Download</Typography>
        </Button>
        <Button style={{textAlign: 'left'}} >
      <Typography variant="h4"  onClick={onClickShare}>{shareData? "Edit" : "Share"}</Typography>
        </Button>
     {shareData && (shareData.link ? <ShareView link={shareData.link}></ShareView> : "building share link . . .")}   
     {editParams.metaData.render(params)}
     {!shareData && editParams.metaData.properties.map(ps => propertyUi(ps)) }
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
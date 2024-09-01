import { EditParams } from "./Edit";
import { MetaData, MultiShapeParams } from 'param-icons';
import React, {Fragment, useState, useEffect}  from "react";
import Edit from './Edit'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";

import ReactDOMServer from 'react-dom/server';
import { ShareData, ShareView } from "./Share";
import svgThumbnail from "./functions/svgThumbnail";


export interface NullableParamiconEditParams {
   editParams: EditParams | null,
   metaDatas: MetaData[],
   inEditDefault: boolean,
   onChange: (editParams: EditParams | null ) => void
}

const NullableParamiconEdit = (nullableParams: NullableParamiconEditParams
      ) => {
  const [ inEdit, setInEdit] = useState( nullableParams.inEditDefault);
  const metaDatas = nullableParams.metaDatas;
  const editParams = nullableParams.editParams;
  const [shareData, setShareData] = useState<ShareData | null>(null)


  const onClick = (metaData: MetaData, ps: MultiShapeParams) => {
    console.log("calling on change")
   nullableParams.onChange({metaData: metaData, params: ps})
  }

  function small(p: MultiShapeParams) : MultiShapeParams {
    p.pageWidth=100;
    p.pageHeight=100;
    return p;
  }

function clear() {
  nullableParams.onChange(null)
}
function toggleEdit() {
  setInEdit(!inEdit)
}

function renderAsSvgString(width: number, height: number, editParams: EditParams) : string {
  const renderPs = {...editParams?.params} 
  renderPs.pageHeight=height;
  renderPs.pageWidth=width;
console.log("renderAsSvgString ", width, height );
  const el: JSX.Element = editParams.metaData.render(renderPs);
  return  ReactDOMServer.renderToStaticMarkup(el);
}

const onClickDownload = () => {

  let strEl = renderAsSvgString(600, 600, editParams!!)

  const blob = new Blob([strEl]);
  const fileDownloadUrl = URL.createObjectURL(blob);

  const filename = 'download.svg';
  const aTag = document.createElement('a');
  aTag.href = fileDownloadUrl;
  aTag.download = filename;
  aTag.click();
  URL.revokeObjectURL(fileDownloadUrl); 

}  

const onClickShare = () => {
  setShareData(shareData ? null : {link: null});
  //console.log("onClickShare: shareData:", shareData)
  //let newParams = {...params};
  //newParams.loading=!shareData;
  //setParams(newParams) ;
}


useEffect( () => {

  if (shareData!=null && !shareData.link && editParams) {
     
    // may need url encode !
       let editParamsIn = `id=${editParams.metaData.id}&params=${encodeURI(JSON.stringify(editParams.params))}`          
       svgThumbnail( editParamsIn, renderAsSvgString(600, 600, editParams))
    
    .then( (data) =>  
    {
    setShareData({link: data.toString()})
    console.log('share.link:', data)
   // let newParams = {...editParams.params};
   // newParams.loading=false;
   // setParams(newParams) ;
    }
  );
}
}
);



  function ui(metaData: MetaData, onClickIn: (metaData: MetaData, ps: MultiShapeParams)=>void) : JSX.Element{
   console.log("shareData", shareData)
   return <Card variant={"outlined"}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {metaData.description}
      </Typography>
      <CardContent   sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 2,
              minWidth: 300,
            }}>{metaData.sampleParams.map ((ps)=>{
        const onClick = () => {
          onClickIn(metaData, ps);
        }
        return <span padding-right= "20" onClick={onClick}>&nbsp;{metaData.render(small(ps))}</span>}
      )}</CardContent>
      <Typography variant="body2" color="textSecondary">
        click to select
      </Typography>
    </CardContent>
    </Card>
    }
console.log(`inEdit: ${inEdit} metaDatas: ${metaDatas}`, metaDatas)
  return <Fragment>
  {<Button onClick={toggleEdit}>{ inEdit?"Close Edit":"Edit"}</Button>}
  {inEdit && editParams &&
  <Fragment>
     <Button onClick={clear}>Clear</Button>
     <Button onClick={onClickDownload}>Download</Button>
     <Button onClick={onClickShare}>Share</Button>
     {shareData && (shareData.link ?
       <ShareView link={shareData.link}></ShareView> : <Button>building share link . . .</Button>) }
     <Edit metaData={editParams.metaData} params={editParams.params}/>
   </Fragment>
}
{!inEdit && editParams && <span padding-right= "20" >&nbsp;{editParams.metaData.render(small(editParams.params))}</span>}
  {inEdit && !editParams &&  metaDatas.map(mt=>ui(mt, onClick))}

  </Fragment>
}

export default NullableParamiconEdit;

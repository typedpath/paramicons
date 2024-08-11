import { EditParams } from "./Edit";
import { MetaData, MultiShapeParams } from 'param-icons';
import React, {Fragment, useState}  from "react";
import Edit from './Edit'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";


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

  function ui(metaData: MetaData, onClickIn: (metaData: MetaData, ps: MultiShapeParams)=>void) : JSX.Element{
    return <Card variant={"outlined"}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {metaData.description}
      </Typography>
      <CardContent   sx={{
              bgcolor: 'background.paper',
              boxShadow: 1,
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
     <Edit metaData={editParams.metaData} params={editParams.params}/>
   </Fragment>
  }
  {!inEdit && editParams && <span padding-right= "20" >&nbsp;{editParams.metaData.render(small(editParams.params))}</span>}
  {inEdit && !editParams &&  metaDatas.map(mt=>ui(mt, onClick))}
  
  </Fragment>
}

export default NullableParamiconEdit;
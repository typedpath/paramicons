import React, {useState} from 'react';
import { MetaData, MultiShapeParams } from '../../dist';


interface IconViewProps {
  metaData: MetaData;
  paramsIn: MultiShapeParams;
}

export function IconView({metaData, paramsIn} : IconViewProps) {

const [params /*,setParams*/] = useState(paramsIn);
const [inEdit ,setInEdit] = useState(false);

//  const onParamsChange = () => {setParams({...params})}

  function sampleSize(ps: MultiShapeParams) : MultiShapeParams {
      ps.pageHeight = inEdit?400:30;
      ps.pageWidth = inEdit?400:30;
      return ps;
  }

  const onClickEdit = () => {
    setInEdit(!inEdit);
  } 

  return <span >
    {inEdit && <br/>}
        <text onClick={onClickEdit}>{ inEdit?"Close Edit":"Edit" }</text>
    {metaData.render(sampleSize(params))}
    {inEdit && <br/>}
           </span>

}

// edit ui


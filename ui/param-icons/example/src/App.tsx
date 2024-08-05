import React, { useState }  from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { DocSample } from "./DocSample";
import {
  MetaData, blockconMetaData, circlyIconMetaData, polarRadialCon2MetaData, polarRadialConMetaData,
   spiralConMetaData, transitionConMetaData, MultiShapeParams, Circlycon } from 'param-icons';
import NullableParamiconEdit from "./NullableParamiconEdit";
import { EditParams } from "./Edit";


const metaDatas: MetaData[] = [circlyIconMetaData, polarRadialCon2MetaData, blockconMetaData, polarRadialConMetaData,  spiralConMetaData, transitionConMetaData]

const defaultSelected: {metaData: MetaData, params: MultiShapeParams} | null = getDefaultSelected()

const App = () => {

  const [ selected, setSelected] = useState<EditParams | null>( defaultSelected);
  const [ sampleDocOn, setSampleDocOn] = useState<boolean>(false);


   function onClick(metaDataIn: MetaData, psIn: MultiShapeParams) {
     console.log("clicked", metaDataIn, psIn)
     setSelected({metaData: metaDataIn, params: psIn})
   }


function headerIcon() : JSX.Element {
  const iconSize = 50;
  if (selected==null) {
return <Circlycon
                 pageHeight={iconSize} pageWidth={iconSize} depth={4} decreaseRatio={1.3} margin={0} fillColours={["red", "blue", "yellow", "green"]}/>
   } else {
      const params = {...selected.params}
      params.pageHeight=iconSize;
      params.pageWidth=iconSize;
      return  selected.metaData.render(params);
   }
}

const onHome = () => {
  setSelected(null);
  setSampleDocOn(false)
  window.history.replaceState(null, "Paramicons", "/")
}

const onSampleDoc = () => {
  setSelected(null);
  setSampleDocOn(!sampleDocOn)
  window.history.replaceState(null, "Paramicons", "/")
}
const onChange =  (editParams: EditParams | null ) => {
  console.log("called on change ", editParams)
  setSelected(editParams);
}

console.log("selected ", selected);

return  <Box sx={{ flexGrow: 1 }}>
<AppBar position="static" >
<Toolbar>
<Box display='flex' >
            {/* whatever is on the left side */}
            <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="Home"
                onClick={onHome}
                sx={{ml:1}}
              >
                {headerIcon()}
              </IconButton>
        </Box>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1, alignSelf: 'center'  }}>
        Param-Iconz
          </Typography>
          <MenuItem onClick={onSampleDoc}> Sample Doc</MenuItem>
        <MenuItem onClick={onHome}> Home</MenuItem>
        </Toolbar>
</AppBar>

{!sampleDocOn && <NullableParamiconEdit metaDatas={metaDatas} editParams={selected} onChange={onChange} inEditDefault={true}/>}
{sampleDocOn && <DocSample/>}

</Box>
}

function getDefaultSelected(): {metaData: MetaData, params: MultiShapeParams} | null{

const queryParams = new URLSearchParams(window.location.search)
const id = queryParams.get("id")
const params = queryParams.get("params")

console.log("id", id)
console.log("params", params)
if (params && id) {
  let oParams = JSON.parse(params)
  console.log("oParams", oParams)
  let metaDataSelected = metaDatas.find(m=>id==m.id)
  if (metaDataSelected) {
    console.log("metaDataSelected", metaDataSelected);
    return {metaData: metaDataSelected,  params:  oParams} ;
  }
} 
return null;
}

export default App;

import React, { useEffect, useState }  from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { DocSample } from "./DocSample";
import {
  MetaData, blockconMetaData, circlyIconMetaData, polarRadialCon2MetaData, polarRadialConMetaData, spiralConMetaData, MultiShapeParams, Circlycon } from 'param-icons';
import Edit from './Edit'


function small(p: MultiShapeParams) : MultiShapeParams {
  p.pageWidth=100;
  p.pageHeight=100;
  return p;
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
    click to edit

  </Typography>
</CardContent>
</Card>
}

const metaDatas: MetaData[] = [circlyIconMetaData, polarRadialCon2MetaData, blockconMetaData, polarRadialConMetaData,  spiralConMetaData]

const defaultSelected: {metaData: MetaData, params: MultiShapeParams} | null = getDefaultSelected()

const App = () => {

  const [ selected, setSelected] = useState<{metaData: MetaData, params: MultiShapeParams} | null>(defaultSelected);
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
{selected && <Edit metaData={selected.metaData} params={selected.params}/>}
{!selected && !sampleDocOn && metaDatas.map(mt=>ui(mt, onClick))}
{sampleDocOn && <DocSample/>}

</Box>
}

function getDefaultSelected(): {metaData: MetaData, params: MultiShapeParams} | null{
  //?id=CirclyIcon.0&params=%7B%22margin%22:10,%22depth%22:3,%22decreaseRatio%22:1.3,%22angleDegrees%22:60,%22loading%22:true,%22fillColours%22:[%22red%22,%22orange%22,%22yellow%22],%22pageWidth%22:300,%22pageHeight%22:300%7D

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

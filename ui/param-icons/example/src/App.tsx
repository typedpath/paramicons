import React, { useState }  from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';

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

const defaultSelected: {metaData: MetaData, params: MultiShapeParams} | null = null

const App = () => {

  const [ selected, setSelected] = useState<{metaData: MetaData, params: MultiShapeParams} | null>(defaultSelected);

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
  window.history.replaceState(null, "Paramicons", "/")

}

  //const linkAddress = 'whatsapp://send?l=en&text=' + encodeURIComponent(window.location.href) ;
  //whatsapp://send?text=http://www.example.com
  //const linkAddress2 = 'https://wa.me/?text=fdsdfs' ;//+ encodeURIComponent(window.location.href) ;
  //const linkAddress3 = 'whatsapp://send?text=Checkoutthispage:{url}'
  //const linkaction = () => {
  //window.open('https://web.whatsapp.com://send?text=This is whatsapp sharing example using button');
  //}


  const whatsappf = (title: string, text: string, url: string, ) =>   {

  return `https://wa.me/?text=${title}%0D%0A${url}${text ? `%0D%0A%0D%0A${text}` : ''}`};

  const  linkAddress4 = whatsappf('tehtitle', 'thetext', 'https://devparamicons.testedsoftware.org');


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
        <MenuItem onClick={onHome}> Home</MenuItem>
        </Toolbar>
</AppBar>

<a href={linkAddress4} data-action="share/whatsapp/share" target="_blank">Share To x </a>



{selected && <Edit metaData={selected.metaData} params={selected.params}/>}
{!selected && metaDatas.map(mt=>ui(mt, onClick))}

</Box>
}
//sx={{ alignSelf: 'center' }
//sx={{ alignSelf: 'flex-end' }}
export default App;

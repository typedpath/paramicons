import React from 'react';

import Typography from "@mui/material/Typography";
import { Circlycon } from 'param-icons';
import {BlockConParams, Blockcon} from 'param-icons';


import Box from "@mui/material/Box";



export function DocSample() {
   return     <Box sx={{ width: '100%', maxWidth: 500 }}>
   <Typography variant="h1" gutterBottom>
      {icon(80, 1)} h1. Heading
   </Typography>
   <Typography variant="h2" gutterBottom>
   {icon(50, 2)}  h2. Heading
   </Typography>
   <Typography variant="h3" gutterBottom>
   {icon(40, 3)} h3. Heading
   </Typography>
   <Typography variant="h4" gutterBottom>
   {icon(30, 4)} h4. Heading
   </Typography>
   <Typography variant="h5" gutterBottom>
   {icon(20, 5)} h5. Heading
   </Typography>
   <Typography variant="h6" gutterBottom>
   {icon(15, 6)} h6. Heading
   </Typography>
   <Typography variant="subtitle1" gutterBottom>
   {icon(10, 7)} subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
     blanditiis tenetur
   </Typography>
   <Typography variant="subtitle2" gutterBottom>
   {icon(10, 7)} subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
     blanditiis tenetur
   </Typography>
   <Typography variant="body1" gutterBottom>
   {icon(10, 7)} body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
     blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
     neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
     quasi quidem quibusdam.
   </Typography>
   <Typography variant="body2" gutterBottom>
   {icon(10, 7)} body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
     blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
     neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
     quasi quidem quibusdam.
   </Typography>
   <Typography variant="button" display="block" gutterBottom>
     button text
   </Typography>
   <Typography variant="caption" display="block" gutterBottom>
     caption text
   </Typography>
   <Typography variant="overline" display="block" gutterBottom>
     overline text
   </Typography>
 </Box>
}

function iconCircle(iconSize: number, iconDepth: number ) : JSX.Element {
return <Circlycon
                 pageHeight={iconSize} pageWidth={iconSize} depth={iconDepth} decreaseRatio={1.3} margin={0} fillColours={["red", "blue", "yellow", "green"]}/>
}

function icon(iconSize: number, iconDepth: number ) : JSX.Element {
  return  <Blockcon 
  pageWidth={iconSize} pageHeight={iconSize}  
  loading={false}
  fillColours={ ["lime", "blue", "red", "green", "purple", "gray", "orange", "cyan", "violet", "brown"]} 
  horizontalCount={iconDepth}
  verticalCount={iconDepth}
/>  }
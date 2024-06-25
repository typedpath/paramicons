import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React from 'react';


export interface ColourListEditorParams {
  colours: string[];
}

const ColourListEditor = (params: ColourListEditorParams) => {
const ui = <List style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
   {params.colours.map(colour=>colourItem(colour))}
</List>
return ui;
}

function colourItem(colour: string) : JSX.Element{
//  console.log(`hello ${colour}`);
  
const cWidth = 30;
const cHeight = 30;
const cRadius = 15;

function onclick(colour: string) {
return () => alert(colour) 
}

var ui =  <ListItem >
  <svg height={cHeight} width={cWidth}>
            <circle onClick={onclick(colour)} cx={cRadius} cy={cRadius} r={cRadius} stroke="black" 
                    stroke-width="3" fill={colour} />
        </svg>
</ListItem>

return ui;
}


export default ColourListEditor; 


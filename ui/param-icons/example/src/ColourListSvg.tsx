import React, {useState, Fragment} from 'react';
import {ColorPicker, Color} from 'material-ui-color';

export interface ColourListSvgParams {
  cRadius: number,
  colours: string[];
  onChange: (colours: string[])=>void; 
}

const ColourListSvg = (params: ColourListSvgParams) => {

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [editingColour, setEditingColour] = useState(false);
   
  const cRadius = params.cRadius;
  const cMargin = cRadius /6;
  const width = 2*(cRadius + cMargin) * (params.colours.length+3)
  const height = 2 * cRadius;

const viewBox= `0 ${-height} ${width} ${3*height} `;

function onClick(i: number) {
  return () => 
  setSelectedIndex(i==selectedIndex?-1:i);
}

function onClickDelete(i: number) {
  return () => {
//  console.log(`onClickDelete ${i}`)
  params.colours.splice(i, 1)
  params.onChange(params.colours);
  }
}

function onClickAdd(i: number) {
  return () => {
//  console.log(`onClickAdd ${i}`)
params.colours.splice(i, 0, params.colours[i])
params.onChange(params.colours);
  }
}


function swapColours(i: number, nextIndex: number) {
  if (nextIndex<0) nextIndex = params.colours.length-1;
  else if (nextIndex>=params.colours.length) nextIndex=0; 
  const a = params.colours[i];
  params.colours[i] = params.colours[nextIndex];  
  params.colours[nextIndex] = a;
  params.onChange(params.colours); 
  setSelectedIndex(nextIndex);
}

function onClickRight() {
    if (!moveRightEnabled) return;
    swapColours(selectedIndex, selectedIndex+1);
  }

function onClickLeft() {
  if (!moveLeftEnabled) return;
  swapColours(selectedIndex, selectedIndex-1);
}

const unit = 2*cRadius+cMargin;

var x = 0;//-unit;

const moveRightEnabled = selectedIndex!=-1 && params.colours.length>1;
const rightArrowColour = moveRightEnabled?"#000":"gray";
const moveLeftEnabled = selectedIndex!=-1 && params.colours.length>1;
const leftArrowColour = moveLeftEnabled?"#000":"gray";

function onSelectedColourChange (colour: Color)  {
console.log('new colour ' + colour.hex);
params.colours[selectedIndex] = "#" + colour.hex
params.onChange(params.colours); 
}

function onClickEdit () {
  setEditingColour(!editingColour);
}

const ui = <Fragment> <svg width={width} height={3*height} viewBox={viewBox} 
     preserveAspectRatio={"none"}>
  {move(x, unit, leftArrowColour, false, onClickLeft)}
  { params.colours.map( (colour, index) => {
    if (index==0) x = x + unit/2 + cMargin; 
    x=x+unit;
    return colourItem(colour, x, 0, cRadius, selectedIndex==index, onClick(index), onClickDelete(index), onClickAdd(index));} )   }
  {move(x, unit, rightArrowColour, true, onClickRight)}
  <text onClick={onClickEdit} x={x+2.5*unit} y={2*unit/3}>{!editingColour?"Edit":"Close"}</text>
</svg>

{ (editingColour)  && <div><br/><ColorPicker   value={params.colours[selectedIndex]} onChange={onSelectedColourChange}  /></div> }

</Fragment>

return ui;
}

function move(x: number, unit:number, colour: string, leftRight: boolean, onClick: () => void) {
  let arrowPoints = leftRight?"0 0, 2.5 1.75, 0 3.5":"2.5 0, 2.5 3.5, 0 1.75";
  const x1 = x+=unit;
  const x2 =  x+=unit/2;
  const arrowRef = leftRight ? "url(#arrowheadr)":"url(#arrowheadl)";
  const arrowId = leftRight ? "arrowheadr":"arrowheadl";
  const refX = leftRight?0:2.5;

  return <g pointerEvents={"all"}> <defs>   <marker  id={arrowId} markerWidth="3" markerHeight="3.5" 
   refX={refX} refY="1.75" orient="right">
    <polygon onClick={onClick} points={arrowPoints} fill={colour} />
  </marker> </defs>
  <rect onClick={onClick} x={x1+(leftRight?0:-unit/2)} y={0} width={x2-x1+unit/2} height={unit} rx={unit/100} opacity={0.1}/>  
<line  x1={x1} y1={unit/2} x2={x2} y2={unit/2} stroke={colour} 
stroke-width="8" markerEnd={leftRight?arrowRef:""} markerStart={!leftRight?arrowRef:""} />
</g>
}

function colourItem(colour: string, x: number, y:number, r: number, isSelected: boolean, onClick: ()=> void,
    onClickDelete: ()=> void,
    onClickAdd: ()=> void) : JSX.Element{
  return <g>
    <line x1={x+r/2} y1={y-r} x2={x+(3*r/2)} y2={y-r } stroke="black" strokeWidth={r/5} />
    <rect onClick={onClickDelete} x={x+r/2} y={y-(3*r/2)} width={r} height={r} rx={y-r} opacity={0.1}/>  
<circle onClick={onClick} cx={x+r} cy={y+r} r={r} stroke="black" 
                    stroke-width={isSelected ? "3" : "0"} fill={colour} />
<g>
  <line x1={x+r/2} y1={y+3*r} x2={x+(3*r/2)} y2={y+ 3*r } stroke="black" strokeWidth={r/5} />
<line x1={x+r} y1={y+(5*r/2)} x2={x+r} y2={y+ (7*r/2) } stroke="black" strokeWidth={r/5} />
<rect  onClick={onClickAdd} x={x+r/2} y={y+(5*r/2)} width={r} height={r} rx={y-r} opacity={0.1}/>  
</g>
</g>
}

export default ColourListSvg; 

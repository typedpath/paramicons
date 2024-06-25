import React from 'react';
import {Circle, renderSvgCircle} from './Circle'
import {MultiShapeParams} from './Params'


export interface CirclyconParams extends MultiShapeParams{
       depth: number;
       decreaseRatio: number;
       margin: number;
   }


export function Circlycon({ loading, unit, margin, pageWidth, depth, decreaseRatio, pageHeight, angleDegrees, fillColours}: CirclyconParams) {

var paths: JSX.Element[] = []
loading = loading ? loading : false;
unit = unit ? unit : 300;
margin = margin ? margin : 10;
pageHeight = pageHeight ? pageHeight : 512;
pageWidth = pageWidth ? pageWidth : 512;
depth = depth ? depth : 1;
decreaseRatio = decreaseRatio ? decreaseRatio : 1.3;
fillColours = fillColours ? fillColours : ["lime", "blue", "red", "green", "purple"];
angleDegrees = angleDegrees ? angleDegrees : 45;

var currentRadius = 50;
const circles: Circle[] = [];

var circle0: Circle  = {cx: currentRadius+20, cy:currentRadius+20, radius: currentRadius, colour: fillColours[0]}

if (depth>0) {
  circles.push(circle0);
}
if (depth>1) {
  const angle0 = angleDegrees  * (2 * Math.PI)   / 360;
  var nextRadius = circle0.radius / decreaseRatio

  const circle1 = {radius: nextRadius,
    cx: Math.sin(angle0) * (nextRadius + circle0.radius)  + circle0.cx,
    cy: Math.cos(angle0) * (nextRadius + circle0.radius)  + circle0.cy,
    colour: fillColours[1]};


  circles.push(circle1);

}

while (circles.length < depth) {
    var nextCircle: Circle;
    var adjacentCircle: Circle;
    const colour = fillColours[circles.length % fillColours.length  ]
    const adjacentCircleIndex = circles.length==2 ? circles.length -1 : circles.length-2;
    adjacentCircle = circles[adjacentCircleIndex];
    const nextRadius = circles[circles.length-1].radius /decreaseRatio;
    if ((circles.length % 2) ==0) {
      nextCircle = nextCircleClockwise2(circle0, adjacentCircle, nextRadius, colour);
    } else {
      nextCircle = nextCircleAntiClockwise(circle0, adjacentCircle, nextRadius, colour);
    }
    circles.push(nextCircle);
}

var height = 0;
var width = 0;

for (let i=0; i<circles.length; i++) {
  const circle = circles[i];
  //console.log(`radius:`, circle)
  paths.push(renderSvgCircle(circle, ""+i));
  height = Math.max(height, circle.cy+circle.radius);
  width = Math.max(width, circle.cx+circle.radius);
  //colourIndex++;
}

const viewBox = `0 0 ${width} ${height}`;
return <svg height={pageHeight} viewBox={viewBox} width={pageWidth}
xmlns="http://www.w3.org/2000/svg">
{paths}
{
  loading &&
<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="360 8.4 9.5" to="0 8.4 9.5" dur="5.0s" additive="sum" repeatCount="indefinite" />
}
</svg>
}
function nextCircleClockwise2(circle0: Circle, circle1: Circle, radius2: number, colour: string) : Circle {
//  console.log(`adding ${colour} to ${circle1.colour} cw`);
  var angle0 = Math.asin((circle1.cy - circle0.cy)  /  (circle0.radius + circle1.radius));
  if (circle0.cx>circle1.cx) {
      angle0=Math.PI-angle0;
  }
  const middleAngle =  cosineRuleOpoositeAngle( circle0.radius + circle1.radius, circle0.radius + radius2, circle1.radius + radius2);
  const angle2 =  middleAngle + angle0;
  //console.log(`cw angle0: ${rad2Deg(angle0)}  middleAngle: ${rad2Deg(middleAngle)}  angle2 ${rad2Deg(angle2)} cos(angle2)(x) : ${Math.cos(angle2)}  sin(angle2)(x) : ${Math.sin(angle2)} `)
  const cx2 = circle0.cx + (circle0.radius + radius2) * Math.cos(angle2);
  const cy2 = circle0.cy + (circle0.radius + radius2) * Math.sin(angle2);
  return {cx: cx2, cy: cy2, radius: radius2, colour:colour   }

}


function nextCircleAntiClockwise(circle0: Circle, circle1: Circle, radius2: number, colour: string) : Circle {
  //console.log(`adding ${colour} to ${circle1.colour} acw`);
  var angle0 = Math.acos((circle1.cy - circle0.cy)  /  (circle0.radius + circle1.radius))
  if (circle0.cx>circle1.cx) {
    angle0 = (2 * Math.PI) - angle0;
  }

  const middleAngle =  cosineRuleOpoositeAngle( circle0.radius + circle1.radius, circle0.radius + radius2, circle1.radius + radius2);
  const angle2 =   (Math.PI )  -  middleAngle - angle0;
  //console.log(`acw angle0: ${rad2Deg(angle0)}  middleAngle: ${rad2Deg(middleAngle)}    angle2 ${rad2Deg(angle2)} `)
  const cx2 = circle0.cx + ((circle0.radius + radius2) * Math.sin(angle2));
  const cy2 = circle0.cy - ((circle0.radius + radius2) * Math.cos(angle2));
  return {cx: cx2, cy: cy2, radius: radius2, colour: colour }

}

//function rad2Deg(rads: number) : number{
//    return rads * 180 / Math.PI;
//}

function cosineRuleOpoositeAngle(a: number, b:number, c: number ) {
   return Math.acos(  ((a*a) + (b*b) - (c*c)) / ( 2 * a * b) );
}

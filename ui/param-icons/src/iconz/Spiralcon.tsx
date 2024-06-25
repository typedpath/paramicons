import React from 'react';
import {Circle, renderSvgCircle} from './Circle'
import {MultiShapeParams} from './Params'


export interface SpiralconParams extends MultiShapeParams {
frequency: number
decreaseRatio?: number,
depth?: number,
}

export function Spiralcon({ loading, unit, pageWidth,
   depth, decreaseRatio, pageHeight, angleDegrees, fillColours,
  frequency}: SpiralconParams) {

var paths: JSX.Element[] = []
loading = loading ? loading : false;
unit = unit ? unit : 300;
pageHeight = pageHeight ? pageHeight : 512;
pageWidth = pageWidth ? pageWidth : 512;
depth = depth ? depth : 1;
decreaseRatio = decreaseRatio ? decreaseRatio : 1.3;
fillColours = fillColours ? fillColours : ["lime", "blue", "red", "green", "purple"];
angleDegrees = angleDegrees ? angleDegrees : 45;
frequency = frequency ? frequency : 0.25;

const circles: Circle[] = [];

var angle = degrees2Rads(angleDegrees);
var orbit =  unit;

while (circles.length < depth) {
    var nextCircle: Circle;
    const colour = fillColours[circles.length % fillColours.length  ]
    const nextRadius =  circles.length==0?unit:circles[circles.length-1].radius /decreaseRatio;
    //frequency is turns per index
    //console.log(`angle: ${angle}`);
    nextCircle = {cx: orbit * Math.sin(angle), cy: orbit * Math.cos(angle), colour:colour, radius: nextRadius };   
    orbit += nextRadius;
    angle += (2 * Math.PI / frequency);
    circles.push(nextCircle);

  }



var height = 0;
var width = 0;

var minx=0;
var miny=0;
var maxx=0;
var maxy=0;


for (let i=0; i<circles.length; i++) {
  const circle = circles[i];
  //console.log(`radius:`, circle)
  paths.push(renderSvgCircle(circle, ""+i));
  minx = Math.min(minx, circle.cx-circle.radius);
  miny = Math.min(miny, circle.cy-circle.radius);
  maxx = Math.max(maxx, circle.cx+circle.radius);
  maxy = Math.max(maxy, circle.cy+circle.radius);
  //colourIndex++;
}
width = maxx-minx;
height = maxy-miny;


const viewBox = `${minx} ${miny} ${width} ${height}`;
return <svg height={pageHeight} viewBox={viewBox} width={pageWidth} 
xmlns="http://www.w3.org/2000/svg">
{paths}
{
  loading && 
<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="360 8.4 9.5" to="0 8.4 9.5" dur="5.0s" additive="sum" repeatCount="indefinite" />
}
</svg>
}

function degrees2Rads(degrees: number) : number{
   return 2 * Math.PI * degrees / 360;
}


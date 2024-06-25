import React from 'react';
import {Circle, renderSvgCircle} from './Circle'
import {MultiShapeParams} from './Params'


export interface PolarRadialConParams extends MultiShapeParams {
frequency?: number;
radialFrequency?: number;
polarFrequency?:number;
}


export function PolarRadialCon({ loading, unit, pageWidth,
   pageHeight, angleDegrees, fillColours,
  frequency, polarFrequency, radialFrequency}: PolarRadialConParams) {

var paths: JSX.Element[] = []
loading = loading ? loading : false;
unit = unit ? unit : 300;
pageHeight = pageHeight ? pageHeight : 512;
pageWidth = pageWidth ? pageWidth : 512;
fillColours = fillColours ? fillColours : ["black", "white"];
angleDegrees = angleDegrees ? angleDegrees : 45;
frequency = frequency ? frequency : 0.25;
polarFrequency = polarFrequency ? polarFrequency: 20;
radialFrequency = radialFrequency ? radialFrequency : 20; 

const circles: Circle[] = [];

var angle = degrees2Rads(angleDegrees);
var orbit =  unit;


const radius = unit;
while (circles.length < polarFrequency) {
    var nextCircle: Circle;
    const colour = fillColours[circles.length % fillColours.length  ]
    //const nextRadius =  circles.length==0?unit:circles[circles.length-1].radius /decreaseRatio;
    //frequency is turns per index
    angle = circles.length * 2 * Math.PI / polarFrequency;
    nextCircle = {cx: orbit * Math.sin(angle), cy: orbit * Math.cos(angle), colour:colour, radius: radius };   
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
  //console.log(`circle:`, circle)
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


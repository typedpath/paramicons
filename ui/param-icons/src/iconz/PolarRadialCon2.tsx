import React from 'react';
import {MultiShapeParams} from './Params'

export interface PolarRadialCon2Params extends MultiShapeParams {
rotationalFrequency?: number;
radialFrequency?: number;
spokeAngle0?: number;
spokeAngle1?: number;
clipRadius?: number;
spokeUnit?: number;
radialColourGradient?: boolean;
}

export function PolarRadialCon2({
   highlightedProperty,
  loading, unit, pageWidth,
    pageHeight, angleDegrees, fillColours,
   rotationalFrequency, radialFrequency,
   spokeAngle0, spokeAngle1,
   clipRadius, spokeUnit,
   radialColourGradient
  }: PolarRadialCon2Params) {

var svgEls: JSX.Element[] = []
loading = loading ? loading : false;
unit = unit ? unit : 300;
pageHeight = pageHeight ? pageHeight : 512;
pageWidth = pageWidth ? pageWidth : 512;
fillColours = fillColours ? fillColours : ["black", "white"];
angleDegrees = angleDegrees ? angleDegrees : 0;
rotationalFrequency = rotationalFrequency ? rotationalFrequency : 1;
radialFrequency = radialFrequency ? radialFrequency : 1; 
spokeAngle0 = spokeAngle0 ? spokeAngle0 : 0;
spokeAngle1 = spokeAngle1 ? spokeAngle1 : 0;
clipRadius = clipRadius ? clipRadius : unit*2;
spokeUnit = spokeUnit ? spokeUnit : unit*2;

spokeAngle0 = degrees2Rads(spokeAngle0)
spokeAngle1 = degrees2Rads(spokeAngle1)

interface Point {
    x: number;
    y: number;
}

function point(x: number, y: number) {return {x: x, y: y};}
function svg(p: Point) : string {
 return `${p.x},${p.y}` 
}

interface BezierCurve {
   p0: Point;
   p1: Point;
   p2: Point;
   p3: Point;
}

function renderPathBezier(bz: BezierCurve) {
  var d = `M${bz.p0.x}, ${bz.p0.y} C${bz.p1.x},${bz.p1.y} ${bz.p2.x},${bz.p2.y} ${bz.p3.x},${bz.p3.y}`;
  return d;
}

function createBezierCurve( angle0: number, spokeUnit: number, angleDiff: number  ) : BezierCurve {
  var p1 = polar2Cartes(spokeUnit/2,  angle0+angleDiff);
  const angle2 =  Math.PI + angle0 - angleDiff;
  var p3 =  polar2Cartes(spokeUnit, angle0)
  var p2Delta = polar2Cartes(spokeUnit/2, angle2) 
  var p2 = {x: p3.x+p2Delta.x, y:p3.y+p2Delta.y};  
  return {p0: point(0,0), p1:p1, p2:p2, p3:p3 }
}

var d = "";

for (var done =0;  done < radialFrequency; done++) {
   const radius = unit * (done+1) / radialFrequency;
d=`${d} M -${radius} 0 A ${radius} ${radius}, 0, 1, 0, ${radius} 0 A ${radius} ${radius}, 0, 1, 0, -${radius} 0 `;
}

var firstBezier0: BezierCurve | null = null;
var firstBezier1: BezierCurve | null = null;

const highlightSpokeAngle0 = 'spokeAngle0'==highlightedProperty;
const highlightSpokeAngle1 = 'spokeAngle1'==highlightedProperty;

for (var done =0; done < rotationalFrequency ; done++) {
    const angle0 = 2 * Math.PI * done / rotationalFrequency
    var bz0 = createBezierCurve(angle0, spokeUnit, spokeAngle0);
    var bz1 = createBezierCurve(angle0, spokeUnit, spokeAngle1);
    if (done==0) {
      firstBezier0 = bz0;
      firstBezier1 = bz1;
    }
    d = `${d} ${renderPathBezier(bz0)} ${renderPathBezier(bz1)}`
    if (highlightSpokeAngle0 || highlightSpokeAngle1) {
        break;
    }
} 

const gradientId = "gradient" + Math.floor(Math.random() * 100000);
const clipPathId=  "clipPath" + Math.floor(Math.random() * 100000);

const pathId = "onlyme";
var path  = <path clip-path ={`url(#${clipPathId})`} id= {pathId} fill={`url(#${gradientId})`} stroke = {"black"} fillRule={"evenodd"} d={`${d}`} />
svgEls.push(path)

var height = 2 * clipRadius;
var width = 2 * clipRadius;

var minx=-clipRadius;
var miny=-clipRadius;
var maxx=clipRadius;
var maxy=clipRadius;

width = maxx-minx;
height = maxy-miny;

const viewBox = `${minx} ${miny} ${width} ${height}`;

function renderBezier(bezierCurve: BezierCurve, colour: string) : JSX.Element{
  return <polyline strokeWidth={5} stroke={colour} fill={'none'} fillOpacity={10} 
  points={`${svg(bezierCurve.p0)} ${svg(bezierCurve.p1)}  ${svg(bezierCurve.p2)}  ${svg(bezierCurve.p3)}`}/>
}

function renderHighlight(bezierCurve0: BezierCurve, bezierCurve1: BezierCurve) : JSX.Element[] {
 return [renderBezier(bezierCurve0, 'red'), renderBezier(bezierCurve1, 'blue')];
}

function renderColourGradient(colours: string[], id: string, isRadial: boolean | undefined ) : JSX.Element{
  const stops: JSX.Element[] = []
  for (var i=0; i<colours.length; i++) {
      const percent = ""+ (i+1) * 100 / colours.length + "%";
      stops.push(<stop offset={percent} stop-color={colours[i]}/>); 
  }
return  (isRadial) ? <radialGradient id={id}>
{stops} 
</radialGradient>  : <linearGradient id={id} gradientTransform="rotate(90)">
{stops}
</linearGradient>
}


//console.log(`highlightedProperty: ${highlightedProperty}`);
return <svg height={pageHeight} viewBox={viewBox} width={pageWidth} fillRule={"evenodd"} 
xmlns="http://www.w3.org/2000/svg">
      <clipPath id={clipPathId}><circle cx={0} cy={0} r={clipRadius} ></circle></clipPath>
      <defs>
        {renderColourGradient(fillColours, gradientId, radialColourGradient)}
  </defs>
{svgEls}
{'clipRadius'==highlightedProperty && <circle cx={0} cy={0} fillOpacity={0.4} r={clipRadius}/>  }
{highlightSpokeAngle0 && firstBezier0 && firstBezier1 && renderHighlight(firstBezier0, firstBezier1) }
{highlightSpokeAngle1 && firstBezier1 && firstBezier0 && renderHighlight(firstBezier1, firstBezier0) }
{
  loading && 
<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="360 8.4 9.5" to="0 8.4 9.5" dur="5.0s" additive="sum" repeatCount="indefinite" />
}

</svg>
}

function degrees2Rads(degrees: number) : number{
   return 2 * Math.PI * degrees / 360;
}

function polar2Cartes(r: number, angle: number) : {x: number, y: number} {
  return  { x : r * Math.sin(angle), y: r * Math.cos(angle)}
}

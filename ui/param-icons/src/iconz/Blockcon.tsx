import React from 'react';
import {MultiShapeParams} from './Params'


export interface BlockConParams extends MultiShapeParams{
  horizontalCount: number;
  verticalCount: number
}

export function Blockcon({ loading, pageWidth, pageHeight, fillColours, horizontalCount, verticalCount}: BlockConParams) {

  var paths: JSX.Element[] = []

  if (!horizontalCount) {
    horizontalCount = 1
  }
  if (!verticalCount) {
    verticalCount = 1
 }

 pageHeight = pageHeight ? pageHeight : 512;
 pageWidth = pageWidth ? pageWidth : 512;

 fillColours = fillColours ? fillColours : ["lime", "blue", "red", "green", "purple"];

  let boxWidth = pageWidth / horizontalCount;
  let boxHeight = pageHeight / verticalCount;
  for (let index = 0; index < (horizontalCount*verticalCount); index++) {
           let x = (index % horizontalCount) * boxWidth;
           let y = Math.floor(index / horizontalCount) * boxHeight;
           let fillColour = fillColours[index%(fillColours.length)]
           paths.push(<rect width={boxWidth} height={boxHeight} x={x} y={y} rx="1" ry="1" fill={fillColour} />) 
  }

  const viewBox = `0 0 ${pageWidth} ${pageHeight}`;
  return <svg height={pageHeight} viewBox={viewBox} width={pageWidth} 
  xmlns="http://www.w3.org/2000/svg">
  {paths}
  {
    loading && 
  <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="360 8.4 9.5" to="0 8.4 9.5" dur="5.0s" additive="sum" repeatCount="indefinite" />
  }
  </svg>

}

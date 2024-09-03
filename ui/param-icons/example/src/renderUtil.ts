import React from "react";
import ReactDOMServer from 'react-dom/server';
import { MetaData, MultiShapeParams } from 'param-icons';

export function renderAsSvgString(width: number, height: number,   metaData: MetaData,  params: MultiShapeParams) : string {
  const renderPs = {...params} 
  renderPs.pageHeight=height;
  renderPs.pageWidth=width;
console.log("renderAsSvgString ", width, height );
  const el: JSX.Element = metaData.render(renderPs);
  return  ReactDOMServer.renderToStaticMarkup(el);
}
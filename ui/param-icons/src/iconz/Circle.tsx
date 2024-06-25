import React from 'react';


export interface Circle {
  cx: number,
  cy: number,
  radius: number,
  colour: string
}

export function renderSvgCircle(circle: Circle, key: string) : JSX.Element{
  return <circle key={key} cx={circle.cx} cy={circle.cy} r={circle.radius}  fill={circle.colour}/>
}




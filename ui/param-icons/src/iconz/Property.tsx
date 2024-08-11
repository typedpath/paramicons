import React from 'react';
import { PolarRadialCon2Params, PolarRadialCon2 } from './PolarRadialCon2';
import { PolarRadialConParams, PolarRadialCon } from './PolarRadialCon';

import {CirclyconParams, Circlycon} from './Circlycon';
import { MultiShapeParams } from './Params';
import {SpiralconParams, Spiralcon} from './Spiralcon';
import {BlockConParams, Blockcon} from './Blockcon'

export interface Property {
  name: string,
  description: string,
  type: string,
  set: (target: any, newVal: any) => void,
  get: (target: any) => any
}

export function property(name: string, type: string, description: string) : Property {
  return {
  name: name,
   description: description,
   type: type,
   set: (target, newVal)=> {   target[name] = newVal;},
   get: (target) => target[name]   
  }
}

export interface AnimationParams {
  frameCount: number;
  msDuration: number;
  phaseAngle: number;
}

export interface MetaData {
  id: string,
  description: string,
  properties:  Property[];
  defaultParams: MultiShapeParams;
  render: (ps: MultiShapeParams) => JSX.Element;
  sampleParams: MultiShapeParams[];
  animationParams: ((params: MultiShapeParams) => AnimationParams) | null;
}

export interface Paramicon {
  metaData: MetaData,
  params: MultiShapeParams
} 

export const blockconParamsProperties: Property[] = [
  property('loading', 'boolean', 'Loading ... '),
  property('horizontalCount', 'float', 'Horizontal Count'),
  property('verticalCount', 'float', 'Vertical Count'),
  property('fillColours', 'colourList', 'Fill Colours')
]

export const defaultBlockconParams: BlockConParams = {
  horizontalCount: 3,
  verticalCount: 3,
  loading: false,
  fillColours: ["lime", "blue", "red", "green", "purple", "gray", "orange", "cyan", "violet", "brown"]
} 

export const defaultBlockconParams2: BlockConParams = {
  horizontalCount: 34,
  verticalCount: 32,
  loading: false,
  fillColours: ["lime", "blue", "red", "green", "purple", "gray", "orange", "cyan", "violet", "brown"]
} 

export const defaultBlockconParams3: BlockConParams = {
  horizontalCount: 7,
  verticalCount: 6,
  loading: false,
  fillColours: ["blue",  "purple", "cyan", "violet"]
} 

export const blockconMetaData: MetaData =
  {
    // change this if backward compatibility is an issue only
    id : "Blockcon.0",
    description: "Blockcon",
    properties: blockconParamsProperties,
    defaultParams: defaultBlockconParams, 
    sampleParams: [{...defaultBlockconParams}, {...defaultBlockconParams2}, {...defaultBlockconParams3}],
    render:  (ps) => {
          return <Blockcon 
                  pageWidth={ps.pageWidth} pageHeight={ps.pageHeight}  
                  loading={ps.loading}
                  fillColours={ps.fillColours} 
                  horizontalCount={(ps as BlockConParams).horizontalCount}
                  verticalCount={(ps as BlockConParams).verticalCount}
     />
  },
  animationParams: null

}

export const circlyIconParamsProperties: Property[] = [
  property('loading', 'boolean', 'Loading ... '),
  property('depth', 'float', 'Depth'),
  property('decreaseRatio', 'float', 'Decrease Ratio'),
  property('angleDegrees', 'float', 'Angle in Degrees'),
  property('fillColours', 'colourList', 'Fill Colours')
]



const defaultCirclyconParams: CirclyconParams = {
  margin: 10,
  depth: 14,
  decreaseRatio: 1.21,
  angleDegrees: 90,
  loading: false,
  fillColours: ["lime", "blue", "red", "green", "purple", "gray", "orange", "cyan", "violet", "brown"]
} 


const defaultCirclyconParams2: CirclyconParams = {
  margin: 10,
  depth: 3,
  decreaseRatio: 1.3,
  angleDegrees: 60,
  loading: false,
  fillColours: [ "red",  "orange", "yellow"]
} 

export const circlyIconMetaData: MetaData =
  {
    // change this if backward compatibility is an issue only
    id : "CirclyIcon.0",
    description: "CirclyIcon",
    properties: circlyIconParamsProperties,
    defaultParams: defaultCirclyconParams, 
    sampleParams: [{...defaultCirclyconParams}, {... defaultCirclyconParams2}],
    render:  (ps) => {
          return <Circlycon margin={10}
                  pageWidth={ps.pageWidth} pageHeight={ps.pageHeight}  
                  loading={ps.loading}
                  fillColours={ps.fillColours} 
                  angleDegrees={(ps as CirclyconParams).angleDegrees}
                  decreaseRatio={(ps as CirclyconParams).decreaseRatio}
                  depth={(ps as CirclyconParams).depth}
     />
  },
  animationParams: null

}

export const polarRadial2ConParamsProperties: Property[] = [
  property('rotationalFrequency', 'integer', 'Rotational Frequency'),
  property('unit', 'integer', 'Unit size'),
  property('fillColours', 'colourList', 'Fill Colours'),
  property('clipRadius', 'integer', 'Clip Radius'),
  property('radialFrequency', 'integer', 'Radial Frequency'),
  property('spokeAngle0', 'integer', 'SpokeAngle0'),
  property('spokeAngle1', 'integer', 'SpokeAngle1'),
  property('spokeUnit', 'integer', 'Spoke Unit'),
  property('loading', 'boolean', 'Loadingx'),
  property('radialColourGradient', 'boolean', 'Radial Colour Gradient'),
    ]

const defaultPolarRadialCon2Params: PolarRadialCon2Params = {
  rotationalFrequency: 20,
  radialFrequency: 10,
  angleDegrees: 90,
  unit: 300,
  clipRadius: 600,
  loading: false,
  spokeAngle0: 10,
  spokeAngle1: 15,
  fillColours: ["red", "orange", "yellow"]
}
 

const defaultPolarRadialCon2Params2: PolarRadialCon2Params = {
  rotationalFrequency: 30,
  radialFrequency: 5,
  angleDegrees: 90,
  unit: 200,
  clipRadius: 600,
  loading: false,
  spokeAngle0: 100,
  spokeAngle1: 40,
  spokeUnit: 400,
  fillColours: ["red", "orange", "yellow", "green", "blue", "indigo", "violet"],
} 

function cloneParams(ps: MultiShapeParams) : MultiShapeParams {
  const result = {...ps};
  if (ps.fillColours) result.fillColours = [... ps.fillColours]
  return result;
}

const defaultPolarRadialCon2Params3 = function () {
   const result = cloneParams(defaultPolarRadialCon2Params2) as PolarRadialCon2Params;
   result.rotationalFrequency=30;
   result.spokeAngle0=100;
   result.spokeAngle1=200;
   result.radialFrequency=5;
   return result;
}() 

const defaultPolarRadialCon2Params4 = function () {
  const result = cloneParams(defaultPolarRadialCon2Params2) as PolarRadialCon2Params;
  result.unit=300;
  result.clipRadius=600;
  result.spokeAngle0=300;
  result.spokeAngle1=60;
  result.radialFrequency=10;
  result.rotationalFrequency=15;
  return result;
}() 

const defaultPolarRadialCon2Params5 = function () {
  const result = cloneParams(defaultPolarRadialCon2Params2) as PolarRadialCon2Params;
  result.unit=100;
  result.clipRadius=2000;
  result.spokeUnit=2000;
  result.rotationalFrequency=30;
  result.spokeAngle0=-10;
  result.spokeAngle1=-35;
  result.radialFrequency=10;
  result.radialColourGradient = true;
  return result;
}() 

const defaultPolarRadialCon2Params6 = function () {
  const result = cloneParams(defaultPolarRadialCon2Params2) as PolarRadialCon2Params;
  result.unit=1000;
  result.clipRadius=2000;
  result.spokeUnit=2000;
  result.rotationalFrequency=50;
  result.spokeAngle0=100;
  result.spokeAngle1=-35;
  result.radialFrequency=10;
  return result;
}() 

export const defaultPolarRadialCon2Params7 = function () {
  const result = cloneParams(defaultPolarRadialCon2Params2) as PolarRadialCon2Params;
  result.unit=3000;
  result.clipRadius=4000;
  result.spokeUnit=4000;
  result.rotationalFrequency=35;
  result.spokeAngle0=300;
  result.spokeAngle1=60;
  result.radialFrequency=10;
  result.radialColourGradient=true;
  return result;
}() 

const defaultPolarRadialCon2Params8 = function () {
  const result = cloneParams(defaultPolarRadialCon2Params2) as PolarRadialCon2Params;
  result.unit=3900;
  result.clipRadius=4000;
  result.spokeUnit=4000;
  result.rotationalFrequency=15;
  result.spokeAngle0=300;
  result.spokeAngle1=60;
  result.radialFrequency=50;
  result.radialColourGradient=true;
  return result;
}() 

export const defaultPolarRadialCon2Params9 = function () {
  const result = cloneParams(defaultPolarRadialCon2Params2) as PolarRadialCon2Params;
  result.unit=30;
  result.clipRadius=400;
  result.spokeUnit=400;
  result.rotationalFrequency=10;
  result.spokeAngle0=120;
  result.spokeAngle1=-100;
  result.radialFrequency=5;
  result.radialColourGradient=true;
  return result;
}() 


export const polarRadialCon2MetaData: MetaData =
  {
    // change this if backward compatibility is an issue only
    id : "PolarRadialCon2.0",
    description: "Polar Radial Icon2",
    properties: polarRadial2ConParamsProperties,
    defaultParams: defaultPolarRadialCon2Params, 
    sampleParams: [{...defaultPolarRadialCon2Params}, defaultPolarRadialCon2Params2, defaultPolarRadialCon2Params3,
       defaultPolarRadialCon2Params4, defaultPolarRadialCon2Params5, defaultPolarRadialCon2Params6, defaultPolarRadialCon2Params7,
       defaultPolarRadialCon2Params8, defaultPolarRadialCon2Params9
      ],
    render:  (ps) => {
          return <PolarRadialCon2
          highlightedProperty={ps.highlightedProperty} 
          loading = {ps.loading}
          pageHeight = {ps.pageHeight}
          pageWidth = {ps.pageWidth}
          unit={ps.unit}
          fillColours={(ps as PolarRadialCon2Params).fillColours}
          radialFrequency={ (ps as PolarRadialCon2Params).radialFrequency} 
          rotationalFrequency={ (ps as PolarRadialCon2Params).rotationalFrequency} 
          spokeAngle0={ (ps as PolarRadialCon2Params).spokeAngle0 }
          spokeAngle1={ (ps as PolarRadialCon2Params).spokeAngle1 }
          spokeUnit={ (ps as PolarRadialCon2Params).spokeUnit }
          clipRadius={ (ps as PolarRadialCon2Params).clipRadius }
          radialColourGradient={ (ps as PolarRadialCon2Params).radialColourGradient }
          />
  },
  animationParams: null
}

export const polarRadialConParamsProperties: Property[] = [
  property('loading', 'boolean', 'Loading')
]

const defaultPolarRadialConParams: PolarRadialConParams = {
  angleDegrees: 90,
  loading: false,
  fillColours: ["lime", "blue", "red", "green", "purple", "gray", "orange", "cyan", "violet", "brown"]
} 

export const polarRadialConMetaData: MetaData =
  {
    // change this if backward compatibility is an issue only
    id : "PolarRadialCon.0",
    description: "Polar Radial Icon",
    properties: polarRadialConParamsProperties,
    defaultParams: defaultPolarRadialConParams, 
    sampleParams: [{...defaultCirclyconParams}],
    render:  (ps) => {
          return <PolarRadialCon 
          loading = {ps.loading}
          pageHeight = {ps.pageHeight}
          pageWidth = {ps.pageWidth}
          />
  },
  animationParams: null
}

export const spiralConParamsProperties: Property[] = [
  property('loading', 'boolean', 'Loading')
]

const spiralConParams: SpiralconParams = {
  angleDegrees: 90,
  loading: false,
  depth: 20,
  frequency: 10,
  decreaseRatio: 1.00,
  unit: 20,
  fillColours: ["lime", "blue", "red", "green", "purple", "gray", "orange", "cyan", "violet", "brown"]
} 

export const spiralConMetaData: MetaData =
  {
    // change this if backward compatibility is an issue only
    id : "SpiralCon.0",
    description: "Spiral Icon",
    properties: spiralConParamsProperties,
    defaultParams: spiralConParams, 
    sampleParams : [{...spiralConParams}],
    render:  (ps) => {
          return <Spiralcon 
          loading = {ps.loading}
          pageHeight = {ps.pageHeight}
          pageWidth = {ps.pageWidth}
          frequency = {(ps as SpiralconParams).frequency}
          depth = {(ps as SpiralconParams).depth}
          />
  },
  animationParams: null
}




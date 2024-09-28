import { defaultPolarRadialCon2Params7, defaultPolarRadialCon2Params9, MetaData, polarRadialCon2MetaData, 
  defaultBlockconParams, defaultBlockconParams2, blockconMetaData,
  Property, property } from "./Property"
import { TransitionCon, TransitionConParams } from "./TransitionCon"
import { AnimationParams } from './Property'

import React from "react"

export const transitionConParamsProperties: Property[] = [
  property('paramicon0', 'NullableParamicon', 'Paramicon 0 '),
  property('paramicon1', 'NullableParamicon', 'Paramicon 1 '),
  property('phaseAngle', 'float', 'Phase (0-360) '),
  property('msDuration', 'integer', 'milliseconds period'),
  property('frameCount', 'float', 'Frame Count')

]

const transitionConParams: TransitionConParams = {
  angleDegrees: 90,
  loading: false,
  fillColours: ["lime", "blue", "red", "green", "purple", "gray", "orange", "cyan", "violet", "brown"],
  paramicon0: {params: defaultPolarRadialCon2Params7, metaData: polarRadialCon2MetaData},
  paramicon1: {params: defaultPolarRadialCon2Params9, metaData: polarRadialCon2MetaData},
  phaseAngle: 0.0,
  frameCount: 100,
  msDuration:5000
} 

const transitionConParamsBlock: TransitionConParams = {
  angleDegrees: 90,
  loading: false,
  fillColours: ["lime", "blue", "red", "green", "purple", "gray", "orange", "cyan", "violet", "brown"],
  paramicon0: {params: defaultBlockconParams, metaData: blockconMetaData},
  paramicon1: {params: defaultBlockconParams2, metaData: blockconMetaData},
  phaseAngle: 0.0,
  frameCount: 100,
  msDuration:5000
} 

export const transitionConMetaData: MetaData =
  {
    // change this if backward compatibility is an issue only
    id : "TransitionCond.0",
    description: "Transition Con",
    properties: transitionConParamsProperties,
    defaultParams: transitionConParams, 
    sampleParams : [{...transitionConParams}, {...transitionConParamsBlock}],
    render:  (ps) => {
          return <TransitionCon 
          pageHeight = {ps.pageHeight}
          pageWidth = {ps.pageWidth}
          paramicon0 = {(ps as TransitionConParams).paramicon0}
          paramicon1 = {(ps as TransitionConParams).paramicon1}
          phaseAngle = {(ps as TransitionConParams).phaseAngle}
          msDuration={(ps as TransitionConParams).msDuration }
          frameCount={(ps as TransitionConParams).frameCount}
          />
  },
  animationParams: (params) => {
    return (params as AnimationParams);
  },
}

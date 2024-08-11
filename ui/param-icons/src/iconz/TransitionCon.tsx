import React, {Fragment}  from "react";
import {MultiShapeParams} from './Params'
import { AnimationParams, Paramicon } from './Property'

export interface TransitionConParams  extends MultiShapeParams, AnimationParams {
    paramicon0: Paramicon | null,
    paramicon1: Paramicon | null,
}


export function TransitionCon({pageWidth, pageHeight, paramicon0, paramicon1, phaseAngle: phaseAngle}: TransitionConParams) {
  if (paramicon0==null || paramicon1==null) {
     return <Fragment>N/A</Fragment>
  } 
  let params ={...paramicon0.params} 
  params.pageHeight=pageHeight;
  params.pageWidth=pageWidth;
  let phase = (phaseAngle * 2) / 360.0
   paramicon0.metaData.properties.forEach(
      (p) => {
           if (p.type == 'integer' || p.type=='float') {
               let newVal = (phase<=1) ? 
                  ((1-phase) * p.get(paramicon0.params) + Math.abs(phase) * p.get(paramicon1.params))
                  : 
                  ((phase-1) * p.get(paramicon0.params) + Math.abs(2-phase) * p.get(paramicon1.params))

               p.set(params, newVal)
           }
      } 
    )
    return <Fragment>{paramicon0.metaData.render(params)}</Fragment>
 }
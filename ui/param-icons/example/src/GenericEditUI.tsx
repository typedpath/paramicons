//TODO switch to generic property def
// TODO use this in Edit.tsx
import React, { Fragment } from 'react';

import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import { blockconMetaData, circlyIconMetaData, MetaData, polarRadialCon2MetaData, polarRadialConMetaData, Property, spiralConMetaData } from 'param-icons';
import ColourListSvg from './ColourListSvg';
import { EditParams } from './Edit';
import NullableParamiconEdit from './NullableParamiconEdit';


function editBoolean(params: object, onChange: () => void, prop: Property, key: string): JSX.Element {
  const isChecked = prop.get(params)

  return <FormControlLabel
    control={<Checkbox size={"small"} key={key} checked={isChecked} onChange={(e) => {
      prop.set(params, e.target.checked)
      onChange();
    }} />}
    label={prop.description}
  />
}

function editColourList(params: object, onChange: () => void, prop: Property, key: string): JSX.Element {
  function onChangeInner(colours: string[]) {
    prop.set(params, colours);
    onChange();
  }

  return <FormControlLabel key={key}
    control={<ColourListSvg onChange={onChangeInner} colours={prop.get(params)} cRadius={20} />}
    label={prop.description}
  />
}

function editText(params: object, onChange: () => void, prop: Property, key: string, onClick: () => void): JSX.Element {

  const current = prop.get(params);
  return <TextField size={"small"} onClick={onClick} key={key} variant={"outlined"} id="outlined-basic"
    disabled={false} label={prop.description} value={current}
    onChange={(e) => {
      prop.set(params, e.target.value)
      onChange();
    }} />
}
function editFloat(params: object, onChange: () => void, prop: Property, key: string, onClick: () => void): JSX.Element {

  const current = prop.get(params);
  return <TextField size={"small"} onClick={onClick} key={key} variant={"outlined"} id="outlined-basic" disabled={false} label={prop.description} value={isNaN(current) ? "" : current}
    onChange={(e) => {
      var val = parseFloat(e.target.value);
      if (isNaN(val)) {
        prop.set(params, undefined);
        onChange();
      }
      else {
        prop.set(params, val)
        onChange();
      }
    }} />
}

function editInt(params: object, onChange: () => void, prop: Property, key: string, onClick: () => void): JSX.Element {

  const current = prop.get(params);
  return <TextField size={"small"} onClick={onClick} key={key} variant={"outlined"} id="outlined-basic" disabled={false} label={prop.description} value={isNaN(current) ? "" : current}
    onChange={(e) => {
      var val = parseInt(e.target.value);
      if (isNaN(val)) {
        prop.set(params, undefined);
        onChange();
      }
      else {
        prop.set(params, val)
        onChange();
      }
    }} />
}




function editNullableParamicon(params: object, onChangeIn: () => void, prop: Property, key: string): JSX.Element {

  let metaDatas: MetaData[] = [circlyIconMetaData, polarRadialCon2MetaData, blockconMetaData, polarRadialConMetaData, spiralConMetaData]


  const current: EditParams | null = prop.get(params);
  const onChange = (p: EditParams | null) => {
    prop.set(params, p);
    onChangeIn();
  }
  return <NullableParamiconEdit metaDatas={metaDatas} editParams={current} onChange={onChange} inEditDefault={false} />
}


function edit(params: object, onChange: () => void, prop: Property, key: string): JSX.Element {
  var field;

  if (prop.type == 'boolean') {
    field = editBoolean(params, onChange, prop, key);
  } else if (prop.type == 'colourList') {
    field = editColourList(params, onChange, prop, key);
  } else if (prop.type == 'NullableParamicon') {
    field = editNullableParamicon(params, onChange, prop, key);
  } else if (prop.type == 'float') {
    field = editFloat(params, onChange, prop, key, () => { });
  } else if (prop.type == 'int') {
    field = editInt(params, onChange, prop, key, () => { });
  } else {
    field = editText(params, onChange, prop, key, () => { });
  }
  return field;
}

function propertyUi(ps: Property, params: object, onChange: () => void): JSX.Element {
  return <Fragment>{edit(params, onChange, ps, ps.name)}</Fragment>
}

export function editUi(params: object, properties: Property[], onChange: () => void): JSX.Element {
  return <Stack>
    {properties.map(ps => propertyUi(ps, params, onChange))}
  </Stack>
}
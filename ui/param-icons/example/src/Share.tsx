import React, { Fragment, useEffect, useState } from 'react';
import svgThumbnailExtra, { OpenGraphTagging } from './functions/svgThumbnailExtra';
import { MetaData, MultiShapeParams, Property } from 'param-icons';
import { Button } from '@mui/material';
import svgThumbnail from './functions/svgThumbnail';
import { renderAsSvgString } from './renderUtil';
import { editUi } from './GenericEditUI';



export interface ShareData {
  link: string | null
  openGraphTagging: OpenGraphTagging | null
  //  submitWithTagging: Boolean 
}

export interface ShareDataParams {
  metaData: MetaData,
  params: MultiShapeParams
  useExtraShare: boolean

}


export function defaultOpenGraphTagging(): OpenGraphTagging {
  return {
    title: "My Paramicon ??",
    url: "N/A",
    type: "paramicon",
    description: "A Paramicon",
    image: {
      url: "N/A",
      type: "application/jpg",
      width: 256,
      height: 256,
      alt: "an expression of meee"
    }
  }
}

export function ShareView({ metaData, params, useExtraShare }: ShareDataParams) {

  const [link, setLink] = useState<string | null>(null);
  const [extraShareSubmitted, setExtraShareSubmitted] = useState(false)
  const [openGraphTagging, setOpenGraphTagging] = useState(defaultOpenGraphTagging())



  useEffect(() => {

    if (!link && !useExtraShare && params) {
      let newParams = { ...params }
      newParams.loading = true

      let editParamsIn = `id=${metaData.id}&params=${encodeURI(JSON.stringify(params))}`
      svgThumbnail(editParamsIn, renderAsSvgString(600, 600, metaData, newParams))

        .then((data) => {
          setLink(data.toString())
          console.log('link:', link)
        }
        );
    }

    if (!link && useExtraShare && extraShareSubmitted && params) {
      let newParams = { ...params }
      newParams.loading = true

      let editParamsIn = `id=${metaData.id}&params=${encodeURI(JSON.stringify(params))}`
      svgThumbnailExtra(editParamsIn, renderAsSvgString(600, 600, metaData, newParams), openGraphTagging)
        .then((data) => {
          setLink(data.toString())
          console.log('link:', link)
        }
        );
    }

  }


  );


  const whatsappf = (title: string, text: string, url: string,) => {
    return `https://wa.me/?text=${title}%0D%0A${url}${text ? `%0D%0A%0D%0A${text}` : ''}`
  };

  // TODO should be generated by schemact4
  const properties: Property[] = [

    {
      name: "title",
      description: "Title",
      type: "string",
      set: (target: OpenGraphTagging, newVal: string) => { target.title = newVal },
      get: (target: OpenGraphTagging) => target.title
    },
    {
      name: "description",
      description: "Description",
      type: "string",
      set: (target: OpenGraphTagging, newVal: string) => { target.description = newVal },
      get: (target: OpenGraphTagging) => target.description
    },
    {
      name: "image.height",
      description: "Image Height",
      type: "int",
      set: (target: OpenGraphTagging, newVal: number) => { target.image.height = newVal },
      get: (target: OpenGraphTagging) => target.image.height
    },
    {
      name: "image.width",
      description: "Image Width",
      type: "int",
      set: (target: OpenGraphTagging, newVal: number) => { target.image.width = newVal },
      get: (target: OpenGraphTagging) => target.image.width
    }]

  const onChange = () => {
    setOpenGraphTagging({ ...openGraphTagging })
  }

  const onClickCreateShare = () => {
    setExtraShareSubmitted(true)
  }

  return <Fragment>
    {!link && useExtraShare && !extraShareSubmitted &&
      <Fragment>
        {editUi(openGraphTagging, properties, onChange)}
        <Button onClick={onClickCreateShare}>Create Share</Button>
      </Fragment>
    }


    {!link && (!useExtraShare || extraShareSubmitted) && "building Share link"}

    {link && <a href={whatsappf('my paramicon', 'take a look', link)} data-action="share/whatsapp/share" target="_blank">Share To WhatsApp </a>
    }
  </Fragment>
}

import React, {Fragment} from 'react';

export interface ShareData { 
  link: string | null
}
export function ShareView({link} : ShareData) {
  const whatsappf = (title: string, text: string, url: string, ) =>   
    {
    return `https://wa.me/?text=${title}%0D%0A${url}${text ? `%0D%0A%0D%0A${text}` : ''}`
    };
  

  return <Fragment>
    {link && <a href={whatsappf('my paramicon', 'take a look', link)} data-action="share/whatsapp/share" target="_blank">Share To WhatsApp </a>
  }
  </Fragment>
}

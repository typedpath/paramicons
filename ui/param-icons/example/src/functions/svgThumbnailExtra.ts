
// created by functionTypescriptClientTemplate
import axios from "axios";

//namespace org.testedsoftware.paramicons {

const urlPath = "/functions/svgThumbnailExtra" 

export default async function svgThumbnailExtra(editParams_in: string, svg_in: string, openGraphTagging_in: OpenGraphTagging) : Promise<string> {
    let url = urlPath
    if (window.location.href.indexOf("localhost")>=0) {
      url = 'https://mydevdomain' + urlPath
    }
    let body = {svg: svg_in,openGraphTagging: openGraphTagging_in}; 
    let editParams = editParams_in;    
       let res = await axios.post(url, body, {headers : {
         'Content-Type': 'text/plain',
       },
       params: { editParams}

     });
        return ""+res.data;
     }       


export interface OpenGraphTagging   {
     title: string
    type: string
    url: string
    image:  {
         url: string
        type: string
        width: number
        height: number
        alt: string
         } 
     } 



//}


// created by functionTypescriptClientTemplate
import axios from "axios";

//namespace org.testedsoftware.paramicons {

const urlPath = "/functions/svgThumbnail" 

export default async function svgThumbnail(editParams_in: string, svg_in: string) : Promise<string> {
    let url = urlPath
    if (window.location.href.indexOf("localhost")>=0) {
      url = 'https://schemactsample.testedsoftware.org/' + urlPath
    }
    let body = svg_in
    let editParams = editParams_in;    
       let res = await axios.post(url, body, {headers : {
         'Content-Type': 'text/plain',
       },
       params: { editParams}

     });
        return ""+res.data;
     }       

//}

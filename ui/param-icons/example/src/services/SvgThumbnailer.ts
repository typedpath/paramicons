import axios from "axios";

const urlPath = "/thumbnail/thumbnail"

export default async function svgThumbnail(svg: String, id: string,  paramsIn: object) : Promise<String> {
  let url = urlPath;
  //support local dev
  if (window.location.href.indexOf("localhost")>=0) {
       url = 'https://schemactsample.testedsoftware.org' + urlPath
  }
  let params = JSON.stringify(paramsIn)
  let res = await axios.post(url, svg, {headers : {
    'Content-Type': 'text/plain',
  },
  params: {
        id,
        params
  }

});
   return ""+res.data;
}

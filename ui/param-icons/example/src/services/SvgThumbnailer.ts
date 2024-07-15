import axios from "axios";

//TODO fix this - should be relative
const url = "https://devparamicons.testedsoftware.org/share/svgthumbnail"

export default async function svgThumbnail(svg: String, id: string,  paramsIn: object) : Promise<String> {
  //let urlWithParams = `url?id=${metaDataId}&params=selected=${strParams}`
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

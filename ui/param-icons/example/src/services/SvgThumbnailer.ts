import axios from "axios";

//TODO fix this - should be relative
const url = "https://devparamicons.testedsoftware.org/share/svgthumbnail"

export default async function svgThumbnail(svg: String) : Promise<String> {
  let res = await axios.post(url, svg, {headers : {
    'Content-Type': 'text/plain',
  }});
   return ""+res.data;
} 

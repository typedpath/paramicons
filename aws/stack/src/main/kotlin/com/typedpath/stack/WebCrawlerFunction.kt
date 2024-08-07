package com.typedpath.stack

object WebCrawlerFunction {
    fun webCrawlerEdgeFunctionJs() : String =
         WebCrawlerFunction.javaClass.getResource("/webCrawlerEdgeFunction.js").readText()

    fun webCrawlerLambdaFunctionUrlJs() : String =
        WebCrawlerFunction.javaClass.getResource("/webCrawlerLambdaFunctionUrl.js").readText()

    val webCrawlerFunctionCode = """
// inline
exports.handler = async(event, context, callback) => {
const request = event.Records[0].cf.request;
const response = event.Records[0].cf.response;
var uri = request.uri
console.log('uri 2 ', uri);
if (uri.indexOf("/view")<0) {
callback(null, response);
return;
}
console.log("input ", event);
console.log("request", request);
const userAgent = request.headers['user-agent'].value;
console.log("userAgent", userAgent)
var isWebcrawler = false;///Facebot|FacebookBot|facebookexternalhit|twitterbot/i.test(userAgent);
if (request.uri.indexOf("isWebcrawler=true")>=0) {
    isWebcrawler=true;
}
console.log("isWebcrawler", isWebcrawler);
if (isWebcrawler) {
        const newResponse = {
          status: '200',
          statusDescription: 'OK',
          headers: {
            "content-type": [{
              "key": "Content-Type",
              "value": "text/html; charset=utf-8"
            }],
            "cache-control": [{
              "key": "Cache-Control",
              "value": "max-age=100"
            }]
          },
          body: 'hello webcrawler',
        };
        callback(null, newResponse);
} else {
   console.log("here");
   callback(null, response);
 }
}   
""".trimIndent()

}
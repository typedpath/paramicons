exports.handler = async(event, context, callback) => {
    console.log('event', event);
    console.log('context', context);
    const request = event.Records[0].cf.request;
    const response = event.Records[0].cf.response;
    var uri = request.uri
    console.log('uri 3 ', uri);
    console.log('uri.indexOf("/view")', uri.indexOf("/view"));
    if (uri.indexOf("/view")<0) {
        console.log("not a view");
        callback(null, response);
        return;
    }
    console.log("input ", event);
    console.log("request", request);
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
                    "value": "max-age=1"
                }]
            },
            body: 'hello webcrawler xxx',
        };
    callback(null, newResponse);
}

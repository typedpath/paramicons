exports.handler = async(event, context, callback) => {
    console.log('event', event);
    console.log('context', context);
    console.log('callback', callback);

   // https://github.com/aws-samples/serverless-patterns/blob/main/cloudfront-lambda-url-java/LambdaFunction/src/main/java/com/example/App.java
   let data = {
      metaTitle: "myMetaTitle",
       metaDescription: "my met desc",
       metaImageUrl :"my image url"
    }

    let htmlContent = `
<\!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>my title</title>
    <meta property="fb:app_id" content="<your-fb-app-id>">
    <meta property="og:title" content="my meta title" />
    <meta property="og:description" content="my meta description" />
    <meta property="og:image" content="my image" />
    <meta property="og:url" content="ogurl" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_GB" />
  </head>
  <body>
   Hello Paramicons World
  </body>
</html>
`;

    const response = {
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
        body: htmlContent,
    };

    const response2 = {
        statusCode: '200',
        statusDescription: 'OK',
        headers: {
            "Content-Type": "text/html",
            "Cache-Control": "max-age=100"
        },
        body: htmlContent,
    };

    return response2;
    //callback(null, newResponse);
}

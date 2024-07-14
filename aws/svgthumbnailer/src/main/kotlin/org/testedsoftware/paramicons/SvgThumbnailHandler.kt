package org.testedsoftware.paramicons

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPResponse

//https://docs.aws.amazon.com/lambda/latest/dg/urls-invocation.html
// https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.proxy-format

class SvgThumbnailHandler : RequestHandler<APIGatewayV2HTTPEvent, APIGatewayV2HTTPResponse> {
    override fun handleRequest(
        input: APIGatewayV2HTTPEvent?,
        context: Context?
    ): APIGatewayV2HTTPResponse {
        val s3bucket = System.getenv("s3bucket")
        System.out.println("s3bucket: '$s3bucket'")
        val svg = input!!.body
        System.out.println("svg: $svg")
        val urlRoot = "https://$s3bucket"
        System.out.println("urlRoot ='$urlRoot'")
        val indexPage = thumbnailToS3(bucketName = s3bucket, urlRoot = urlRoot, svg = svg, width = 256, height=256)
        System.out.println("indexPage: $indexPage")

       return APIGatewayV2HTTPResponse.builder()
           //.withHeaders (mutableMapOf("header1" to "value1"))
           .withBody(indexPage)
           .withStatusCode(200)
           .build()
    }
}
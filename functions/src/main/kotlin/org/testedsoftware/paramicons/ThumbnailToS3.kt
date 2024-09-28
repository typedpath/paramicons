package org.testedsoftware.paramicons

import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.services.s3.model.PutObjectRequest
import java.io.ByteArrayInputStream


fun thumbnailToS3(bucketName: String,  svg: String, urlRoot: String, width: Int, height: Int, rawQueryString: String) : String {
    println("calling thumbnail")
    val thumbnail = thumbnail(svg = svg, urlRoot=urlRoot, rawQueryString=rawQueryString, width=width, height= height)
    println("called thumbnail image bytes: ${thumbnail.thumbnailImage.size}")

    //val s3Builder = AmazonS3Client.builder()
    //TODO fix this
    //s3Builder.region = Regions.US_EAST_1.getName()
    println("building s3 client")
    val s3 = AmazonS3ClientBuilder.standard()
        .withRegion(Regions.US_EAST_1)
        .build()
    //val s3 = s3Builder.build()
    println("writing index page")
    val indexPageMetadata = ObjectMetadata()
    val indexPageByteArray = thumbnail.indexPage.toByteArray()
    indexPageMetadata.contentLength = indexPageByteArray.size.toLong()
    indexPageMetadata.contentType = "text/html"
    s3.putObject(PutObjectRequest(bucketName, thumbnail.indexPageKey, ByteArrayInputStream(indexPageByteArray), indexPageMetadata))
    println("writing image")
    val thumbnailMetadata = ObjectMetadata()
    thumbnailMetadata.contentLength = thumbnail.thumbnailImage.size.toLong()
    thumbnailMetadata.contentType = "image/jpg"
    s3.putObject(PutObjectRequest(bucketName, thumbnail.thumbnailImageKey, ByteArrayInputStream(thumbnail.thumbnailImage), thumbnailMetadata))
    println("write complete")
    return "$urlRoot/${thumbnail.indexPageKey}"
}